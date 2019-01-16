using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{

   // [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route ("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase 
    {
        private readonly IDataRepository _repo;
        private readonly IMapper _mapper;
        public UserController (IDataRepository repo, IMapper mapper) 
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
         public async Task<IActionResult> GetUsers()
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);
           
            //userParams.UserId = currentUserId;
            // if (string.IsNullOrEmpty(userParams.Gender))
            // {
            //     userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            // }

             var users = await _repo.GetUsers();
            
            var userToReturn = _mapper.Map<IEnumerable<UserForListDtos>>(users);

            //Response header have pagination information 
            //Response.Addpagination(user.CurrentPage, user.PageSize, user.TotalCount, user.TotalPages);

            return Ok (userToReturn);
        }

        // [HttpGet ("{id}", Name = "GetUser")]
        // public async Task<IActionResult> GetUser (int id) {
        //     var user = await _repo.GetUser (id);

        //     var userToReturn = _mapper.Map<UserForDetailsDtos>(user);

        //     return Ok (userToReturn);
        // }

        [HttpGet]
        public async Task<IActionResult> GetUser(int id)
        {
           // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var user= await _repo.GetUser(id);
             var userToReturn = _mapper.Map<UserForDetailsDtos>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDtos userForUpdateDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userForRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userForRepo);

            if(await _repo.SaveAll())
                return NoContent();
            
            throw new Exception($"Updating user {id} failed on save");
        }

    }
}