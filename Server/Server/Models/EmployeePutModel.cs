using Server.Core.Entities;

namespace Server.API.Models
{
    public class EmployeePutModel
    {
        public string EmployeeIdentification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRolePostModel> Roles { get; set; }
    }
}
