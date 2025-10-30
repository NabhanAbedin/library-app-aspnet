using Backend.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.models.Entities;
using Backend.models.dtos;
using Backend.services.interfaces;


namespace Backend.controllers;

[Route("api/[controller]")]
[ApiController]
public class CatalogController : ControllerBase
{
    private readonly ICatalogService _catalogService;
    
    public CatalogController(ICatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet("books")]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks([FromQuery] BookQueryParameters query)
    {
        var books = await _catalogService.GetBooks(query);
        return  Ok(books);
    }

    [HttpDelete("books/{id}")]
    public async Task<IActionResult> DeleteBookById(int id)
    {
        var deleted = await _catalogService.DeleteBookById(id);

        if (!deleted)
        {
            return  NotFound();
        }
        return NoContent();
    }
    
}