using Server.Core.Entities;

namespace Server.API.Models
{
    public class EmployeePostModel
    {
        public string EmployeeIdentification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }
    }
}
