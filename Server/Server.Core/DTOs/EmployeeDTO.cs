﻿using Server.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.DTOs
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string EmployeeIdentification { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public List<EmployeeRoleDTO> Roles { get; set; }
    }
}
