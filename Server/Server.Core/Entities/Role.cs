using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsManagementRole { get; set; }
        public Role()
        {

        }
        public Role(string name, bool isManagementRole)
        {
            Name = name;
            IsManagementRole = isManagementRole;
        }
    }
}
