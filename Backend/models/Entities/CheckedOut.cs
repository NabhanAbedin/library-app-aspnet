namespace Backend.models.Entities;

public class CheckedOut
{
    public long Id { get; set; }
    public long BookId { get; set; }
    public long UserId { get; set; }
    public DateTime CheckedOutTime { get; set; } = DateTime.UtcNow;
    public DateTime? ReturnedTime { get; set; } 
    public DateTime DueDate { get; set; }
    
    
    public Book Book { get; set; }
    public User User { get; set; }
    
}