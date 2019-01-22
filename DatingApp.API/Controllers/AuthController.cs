using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthReository _repo;
        private readonly IConfiguration _config;

        public IMapper _mapper { get; }

        public AuthController(IAuthReository authRepository, IConfiguration config, IMapper mapper)
        {
            _config = config;
            _mapper = mapper;
            _repo = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDtos userForRegisterDtos)
         // public async Task<IActionResult> Register(string userName, string password)
        {

            userForRegisterDtos.UserName = userForRegisterDtos.UserName.ToLower();
             if (await _repo.UserExist(userForRegisterDtos.UserName))
             {
                 return BadRequest("UserName Already Exist");
             }
             var userToCreate = _mapper.Map<User>(userForRegisterDtos);

            var CreatedUser = await _repo.Register(userToCreate, userForRegisterDtos.Password);
            var userToReturn = _mapper.Map<UserForDetailsDtos>(CreatedUser);
            return CreatedAtRoute("GetUser", new {controller = "User", id = CreatedUser.Id});
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDtos userForLoginDtos)
        {
            
          //  throw new Exception("Computer says no!");
            var userFromRepo = await _repo.Login(userForLoginDtos.UserName, userForLoginDtos.Password);
            if (userFromRepo == null)
            {
                return Unauthorized();
            }
            var claim = new[]
            {
                 new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                 new Claim(ClaimTypes.Name, userFromRepo.UserName)
            };

             var key = new SymmetricSecurityKey(Encoding.UTF8
                           .GetBytes(_config.GetSection("AppSettings:Token").Value));
              var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
              var tokenDescriptor = new SecurityTokenDescriptor()
              {
                  Subject = new ClaimsIdentity(claim),
                  Expires = DateTime.Now.AddDays(1),
                  SigningCredentials = cred
              };

              var tokenHandler = new JwtSecurityTokenHandler();
              var token = tokenHandler.CreateToken(tokenDescriptor);

              var user = _mapper.Map<UserForListDtos>(userFromRepo);
              return Ok(new {
                     token = tokenHandler.WriteToken(token),
                     user
                     });
                     
           
        }

    }
}