using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
        private readonly IAuthReository authRepository;
        private readonly IConfiguration _config;
        public AuthController(IAuthReository authRepository, IConfiguration config)
        {
            _config = config;
            this.authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDtos user)
        {
            // if(!ModelState.IsValid)
            // {
            //    return BadRequest(ModelState);
            // }
            user.UserName = user.UserName.ToLower();
            if (await authRepository.UserExist(user.UserName))
            {
                return BadRequest("UserName Already Exist");
            }
            var userToCreate = new User
            {
                UserName = user.UserName

            };

            var CreatedUser = await authRepository.Register(userToCreate, user.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDtos userForLoginDtos)
        {
            var userFromRepo = await authRepository.Login(userForLoginDtos.UserName, userForLoginDtos.Password);
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
              return Ok(new {
                     token = tokenHandler.WriteToken(token)});
        }

    }
}