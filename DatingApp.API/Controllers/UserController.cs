using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase 
    {
        private readonly IDataRepository _repo;
            private readonly IMapper _mapper;
        public UsersController(IDataRepository repo, IMapper mapper)
        {
             _mapper = mapper;
            _repo = repo;
        }

         [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
           // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var users = await _repo.GetUsers();
           
            // userParams.UserId = currentUserId;
            // if (string.IsNullOrEmpty(userParams.Gender))
            // {
            //     userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            // }

            // var user = await _repo.GetUsers(userParams);
            
             var userToReturn = _mapper.Map<IEnumerable<UserForListDtos>>(users);

            // //Response header have pagination information 
            // Response.Addpagination(user.CurrentPage, user.PageSize, user.TotalCount, user.TotalPages);

            return Ok(userToReturn);
        }

         [HttpGet("user")]
        public async Task<IActionResult> GetUser(int id)
        {
           // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user= await _repo.GetUser(id);
             var userToReturn = _mapper.Map<UserForDetailsDtos>(user);

            return Ok(userToReturn);
        }
    }
}