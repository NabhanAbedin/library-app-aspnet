namespace Backend.models.dtos;

public class BookRequestDto
{
    public long? id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
}