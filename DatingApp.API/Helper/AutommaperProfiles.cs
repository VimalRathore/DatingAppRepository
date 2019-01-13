using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

namespace DatingApp.API.Helper
{
    public class AutommaperProfiles: Profile
    {
        public AutommaperProfiles()
        {
            CreateMap<User, UserForListDtos>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>{
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge())
            });
            CreateMap<User, UserForDetailsDtos>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            }) .ForMember(dest => dest.Age, opt =>{
                opt.ResolveUsing(d => d.DateOfBirth.CalculateAge())
            });
            CreateMap<Photo, PhotosForDetailedDtos>(); 
        }
        
    }
}