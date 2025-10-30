namespace Backend.models.Entities;

public class CheckedOut
{
    public long Id { get; set; }
    public long BookId { get; set; }
    public long UserId { get; set; }
    public Book Book { get; set; }
    public User User { get; set; }
    
}