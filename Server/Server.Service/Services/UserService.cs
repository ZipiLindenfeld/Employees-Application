using Server.Core.Entities;
using Server.Core.Repositories;
using Server.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Service.Services
{
    public class UserService:IUserService
    {
        private readonly IUserRepository _UserRepository;
        public UserService(IUserRepository userRepository)
        {
            _UserRepository = userRepository;
        }
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _UserRepository.GetUsersAsync();
        }
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _UserRepository.GetUserByIdAsync(id);
        }
        public async Task<User> AddUserAsync(User User)
        {
            return await _UserRepository.AddUserAsync(User);
        }
        public async Task<User> UpdateUserAsync(int id,User User)
        {
            return await _UserRepository.UpdateUserAsync(id,User);
        }
    }
}
