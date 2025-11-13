namespace Backend.models.dtos;

public class AuthorRequestDto
{
    public string AuthorName { get; set; }
    public string? AuthorBio { get; set; }
    public int? AuthorAge { get; set; }
}