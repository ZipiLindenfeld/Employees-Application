using Microsoft.EntityFrameworkCore;
using Server.Core.Entities;
using Server.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            var user = await _context.Users.FirstAsync(u => u.Id == id);
            if (user != null)
                return user;
            return null;

        }
        public async Task<User> AddUserAsync(User user)
        {
            var r = await _context.Users.FirstOrDefaultAsync(u => user.Password == u.Password && user.UserName == u.UserName);
            if (r == null)
                _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> UpdateUserAsync(int id, User user)
        {
            User user1 = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            if (user1 != null)
            {
                user1.UserName = user.UserName;
                user1.Password = user.Password;

            }
            else
                return await AddUserAsync(user);
            await _context.SaveChangesAsync();
            return user1;

        }
    }
}
