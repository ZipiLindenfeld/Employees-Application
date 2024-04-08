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
        public string EmployeeIdentification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRole> Roles { get; set; }

        // Constructor
        public Employee()
        {
            Roles = new List<EmployeeRole>();
        }
        public Employee( string employeeIdentification, string firstName, string lastName, DateTime startDate, DateTime birthDate, Gender gender, bool status, List<EmployeeRole> roles)
        {
            EmployeeIdentification = employeeIdentification;
            FirstName = firstName;
            LastName = lastName;
            StartDate = startDate;
            BirthDate = birthDate;
            Gender = gender;
            Status = status;
            Roles = roles;
        }

    }


}




