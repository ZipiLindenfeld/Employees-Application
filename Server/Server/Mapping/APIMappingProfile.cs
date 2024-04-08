using AutoMapper;
using Server.API.Models;
using Server.Core.Entities;
namespace Server.API.Mapping
{
    public class APIMappingProfile : Profile
    {
        public APIMappingProfile()
        {
            CreateMap<EmployeeRolePostModel, EmployeeRole>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeePutModel, Employee>().ReverseMap();
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<UserPostModel, User>().ReverseMap();
            CreateMap<UserPutModel, User>().ReverseMap();


        }
    }
}
