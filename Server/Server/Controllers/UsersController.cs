using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.API.Models;
using Server.Core.DTOs;
using Server.Core.Entities;
using Server.Core.Services;

// For more information on enabling Web API for userty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Server.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _UserService;
        private readonly IMapper _mapper;

        public UsersController(IUserService UserService, IMapper mapper)
        {
            _UserService = UserService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<User[]>> Get()
        {
            var user = await _UserService.GetUsersAsync();
            return Ok(user);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _UserService.GetUserByIdAsync(id);
            return Ok(user);
        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UserPostModel User)
        {
            var userToAdd = _mapper.Map<User>(User);
            var addedUser = await _UserService.AddUserAsync(userToAdd);
            var newUser = await _UserService.GetUserByIdAsync(addedUser.Id);
            return Ok(newUser);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UserPutModel User)
        {
            var userToUpdate = _mapper.Map<User>(User);
            var updateduser = await _UserService.UpdateUserAsync(id, userToUpdate);
            var newuser = await _UserService.GetUserByIdAsync(updateduser.Id);
            return Ok(newuser);

        }
    }
}
