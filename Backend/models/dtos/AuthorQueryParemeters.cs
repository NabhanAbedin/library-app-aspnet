namespace Backend.models.dtos;

public class AuthorQueryParemeters
{
    public string? Search { get; set; }
    public string? OrderBy { get; set; } = "desc";
    public string? From  { get; set; }
    public string? To { get; set; }
}