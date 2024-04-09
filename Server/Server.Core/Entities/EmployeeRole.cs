using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class EmployeeRole
    {
        // מאפייני המחלקה
        public int RoleId { get; set; }
        public Role? Role { get; set; }
        public int EmployeeId { get; set; }
        public Employee? Employee { get; set; }
        public DateOnly StartDate { get; set; }
    }
}
