namespace Backend.models.dtos;

public class GenreQueryParameters
{
    public string? Search { get; set; }
    public string? OrderBy {get; set;} = "desc";
    
}