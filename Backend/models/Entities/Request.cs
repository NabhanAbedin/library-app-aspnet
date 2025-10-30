namespace Backend.models.Entities;

public class Request
{
    public long? Id { get; set; }
    public string? Title { get; set; }
    public string? Author { get; set; }
    public string? Genre { get; set; }
    public string? AuthorName  { get; set; }
    public string? AuthorBio  { get; set; }
    public int? AuthorAge  { get; set; }
    public string? Type { get; set; }
}