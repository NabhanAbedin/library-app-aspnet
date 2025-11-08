using Backend.services.interfaces;
using Backend.data;
using Backend.models.dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.models.Entities;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;


namespace Backend.services.implementations;

public class AuthService : IAuthService
{
    private readonly LibraryAppContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(LibraryAppContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<LoginResultDto> RegisterAsync(RegisterDto dto)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);

        if (existingUser != null)
        {
            throw new InvalidOperationException("Username already exists");
        }

        if (string.IsNullOrWhiteSpace(dto.Password) || dto.Password.Length < 6)
        {
            throw new ArgumentException("Password do not fill requirements");
        }
        
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var user = new User
        {
            Username = dto.Username,
            Passwordhash = passwordHash,
            Role = "User",
            Created = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        var token = GenerateJwtToken(user);
        
        return new LoginResultDto
        {
            UserId = user.Id,
            Username = user.Username,
            Role = user.Role,
            Token = token
        };
    }

    public async Task<LoginResultDto> LoginAsync(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Username == dto.Username);

        if (user == null)
        {
            throw new UnauthorizedAccessException("Invalid username or password");
        }

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Passwordhash))
        {
            throw new UnauthorizedAccessException("Invalid password");
        }
        
        var token = GenerateJwtToken(user);

        return new LoginResultDto
        {
            UserId = user.Id,
            Username = user.Username,
            Role = user.Role,
            Token = token
        };
    }

    private string GenerateJwtToken(User user)
    {
        var key = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);
        var tokenHandler = new JwtSecurityTokenHandler();

        var claims = new[]
        {
            new Claim("userId", user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
            )
        };
        
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }


}