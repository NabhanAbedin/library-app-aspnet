namespace Backend.models.dtos;

public class AdminCheckOutDto
{
    public long Id { get; set; }
    public long BookId { get; set; }
    public string Username { get; set; }
    public string BookTitle {get; set;}
    public string AuthorName { get; set; }
    public DateTime CheckedOutTime { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? ReturnedTime { get; set; }
    
    
}