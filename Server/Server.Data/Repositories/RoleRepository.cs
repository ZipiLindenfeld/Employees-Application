using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Core.Entities;
using Server.Core.Repositories;

namespace Server.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }
        public async Task<Role> GetRoleByIdAsync(int id)
        {
            return await _context.Roles.FirstAsync(r => r.Id == id);
        }
        public async Task<Role> AddRoleAsync(Role role)
        {
            if (_context.Roles.IsNullOrEmpty())
                _context.Roles.Add(role);
            else
            {
                var r = await _context.Roles.FirstOrDefaultAsync(r => role.Name.Equals(r.Name));
                if (r == null)
                    _context.Roles.Add(role);
            }
            await _context.SaveChangesAsync();
            return role;
        }
    }
}
