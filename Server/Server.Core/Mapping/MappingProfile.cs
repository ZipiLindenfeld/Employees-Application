using AutoMapper;
using Server.Core.DTOs;
using Server.Core.Entities;

namespace Server.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
            CreateMap<EmployeeRole, EmployeeRoleDTO>().ReverseMap();
            CreateMap<Role, RoleDTO>().ReverseMap();

        }
    }
}
