namespace Backend.models.dtos;

public class BookQueryParameters
{
    public string? Search { get; set; }
    public string? SortBy { get; set; }
    public string? OrderBy { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
}