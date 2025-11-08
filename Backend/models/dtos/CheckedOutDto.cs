using System.ComponentModel.DataAnnotations;
namespace Backend.models.dtos;

public class CheckedOutDto
{
    [Required]
    public long Id { get; set; }
    
    [Required]
    public long BookId { get; set; }
    
    [Required]
    public string BookTitle { get; set; }
    
    [Required]
    public string AuthorName { get; set; }
    
    [Required]
    public DateTime CheckedOutTime { get; set; }
    
    [Required]
    public DateTime DueDate { get; set; }
}