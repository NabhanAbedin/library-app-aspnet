using System.ComponentModel.DataAnnotations;

namespace Backend.models.dtos;

public class CreateBookDto
{
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string Author { get; set; }
    
    [Required]
    public string Genre { get; set; }
    
    [Required]
    public int Available { get; set; }
    
    public DateTime? Release { get; set; }
}