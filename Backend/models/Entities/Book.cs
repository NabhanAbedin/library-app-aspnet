namespace Backend.models.Entities;

public class Book
{
    public long Id { get; set; }
    public string Title { get; set; }
    public long AuthorId { get; set; }
    public long GenreId { get; set; }
    public DateTime? Release { get; set; }
    public int Available { get; set; }
    public Author Author { get; set; }
    public Genre Genre { get; set; }
    
}