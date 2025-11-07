namespace Backend.services.interfaces;
using Backend.models.dtos;
using Backend.models.Entities;

public interface IAuthService
{
    Task<User> RegisterAsync(RegisterDto dto);
    Task<LoginResultDto> LoginAsync(LoginDto dto);
    
}