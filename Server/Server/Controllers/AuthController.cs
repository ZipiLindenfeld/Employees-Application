using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Server.API.Models;
using Server.Core.Entities;
using Server.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;

    public AuthController(IConfiguration configuration, IUserService userService)
    {
        _configuration = configuration;
        _userService = userService;
    }
    [Authorize]
    [HttpPost("register")]
    public bool Register([FromBody] string password)
    {
        return password.Equals(_configuration["UsersPassword"]);
    }

    [HttpPost]
    public IActionResult Login([FromBody] UserPostModel loginModel)
    {
        var user = _userService.GetUsersAsync().Result.FirstOrDefault(u => u.UserName == loginModel.UserName);

        if (user!=null&&loginModel.Password == user.Password)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
               //אפשר להוסיף פה עוד פרטים
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(6),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
        return Unauthorized();
    }
}
