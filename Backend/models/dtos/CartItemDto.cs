using System.ComponentModel.DataAnnotations;

namespace Backend.models.dtos;

public class CartItemDto
{
    [Required]
    public long Id { get; set; }
    [Required]
    public long BookId { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string BookTitle { get; set; }
    [Required]
    public string AuthorName { get; set; }
    [Required]
    public string GenreType { get; set; }
}