using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Helper;
using DatingApp.API.Models;

namespace DatingApp.API.Controllers
{

    [ServiceFilter(typeof(LogUserActivity))]
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
         public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);
           
           userParams.UserId = currentUserId;
             if (string.IsNullOrEmpty(userParams.Gender))
             {
                 userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
             }

            var user = await _repo.GetUsers(userParams);
            
            var userToReturn = _mapper.Map<IEnumerable<UserForListDtos>>(user);

            //Response header have pagination information 
            Response.AddPagination(user.CurrentPage, user.PageSize, user.TotalCount, user.TotalPages);

            return Ok (userToReturn);
        }

        [HttpGet ("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
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

        [HttpPost("{id}/like/{receipentId}")]
        public async Task<IActionResult> LikeUser(int userId, int receipentId)
        {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

                var like = await _repo.GetLike(userId, receipentId);
                if(like != null)
                {
                 return BadRequest("You already like this user");
                }
                if(await _repo.GetUser(receipentId) == null)
                {
                    return NotFound();
                }

                like = new Like
                {
                    LikerId = userId,
                    LikeeId = receipentId
                };

                _repo.Add<Like>(like);
                if(await _repo.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Failed to like user!!!");



        }


    }
}