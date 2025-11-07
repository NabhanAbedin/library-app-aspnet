namespace Backend.models.dtos;
using Backend.models.Entities;

public class LoginResultDto
{
    public long UserId { get; set; }
    public string Username { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
}