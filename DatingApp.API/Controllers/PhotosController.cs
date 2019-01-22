using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Helper;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDataRepository _repository;
           private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IDataRepository repository, IMapper mapper,
                                IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _repository = repository;
            _mapper = mapper;

            Account acc = new Account(
                  _cloudinaryConfig.Value.Cloudname,
                   _cloudinaryConfig.Value.ApiKey,
                    _cloudinaryConfig.Value.ApiSecret

            );
            _cloudinary = new Cloudinary(acc);

        }

        [HttpPost]
         public async Task<IActionResult> AddPhotosForUser(int userId, [FromForm]PhotoForCreationDtos photoForCreationDto)
        {
            //Checking the User
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userForRepo = await _repository.GetUser(userId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if(file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name,stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if(!userForRepo.Photos.Any(u => u.IsMain))
                photo.IsMain = true;

            userForRepo.Photos.Add(photo);

            if(await _repository.SaveAll())
            {
                 var photoToReturn = _mapper.Map<PhotoForReturnDtos>(photo);
                 return CreatedAtRoute("GetPhoto",new { id = photo.Id }, photoToReturn);
            }

            return BadRequest("Could not add the Photo");
        }

         [HttpGet("{id}",Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repository.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDtos>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId,int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();
            var photoFromRepo = await _repository.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main Photo");

            var currentMainPhoto = await _repository.GetMainPhotoForUser(userId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain = true;

            if(await _repository.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not set the Photo as main");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
               return Unauthorized();

            var user = await _repository.GetUser(userId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();
            var photoFromRepo = await _repository.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("you can not delete your main photo");

                var deleparms = new DeletionParams(photoFromRepo.PublicId);
                var result = _cloudinary.Destroy(deleparms);

                if(photoFromRepo.PublicId != null)
                {
                if(result.Result == "ok")
                {
                    _repository.Delete(photoFromRepo);
                }
                }
                if(photoFromRepo.PublicId == null)
                {
                     _repository.Delete(photoFromRepo);
                }
                 if(await _repository.SaveAll())
                {
                    return Ok();
                }
                return BadRequest("Failed To Delete The Photo");

        }

               
        }
}