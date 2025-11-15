namespace Backend.models.dtos;

public class LoginClientResponseDto
{
    public long UserId { get; set; }
    public string Username  { get; set; }
    public string Role { get; set; }
}