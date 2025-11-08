using System.ComponentModel.DataAnnotations;

namespace Backend.models.dtos;

public class CheckoutBooksDto
{
    [Required]
    public List<long> bookIds { get; set; }
}