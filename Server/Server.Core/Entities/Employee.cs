using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public enum Gender { Male, Female }

    public class Employee
    {
        public int Id { get; set; }
        public string? EmployeeIdentification { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRole>? Roles { get; set; }


    }


}




