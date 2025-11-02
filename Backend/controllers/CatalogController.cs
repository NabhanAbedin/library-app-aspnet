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

    [HttpPost("books")]
    public async Task<ActionResult<Book>> AddBook([FromBody] CreateBookDto bookDto)
    {
        try
        {
            var book = await _catalogService.CreateBook(bookDto);

            return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
        }
        catch (InvalidOperationException e)
        {
            return Conflict(new { message = e.Message });
        }
    }

    [HttpGet("books/{id:long}")]
    public async Task<ActionResult<Book>> GetBookById(long id)
    {
        var book = await _catalogService.GetBookByIdAsync(id);
        if (book == null) return NotFound();
        
        return Ok(book);
    }

    [HttpDelete("books/{id:long}")]
    public async Task<IActionResult> DeleteBookById(int id)
    {
        var deleted = await _catalogService.DeleteBookById(id);

        if (!deleted)
        {
            return  NotFound();
        }
        return NoContent();
    }

    [HttpGet("authors")]
    public async Task<ActionResult<IEnumerable<Author>>> GetAuthors([FromQuery] AuthorQueryParemeters query)
    {
        var authors = await _catalogService.GetAuthors(query);
        return Ok(authors);
    }

    [HttpGet("genres")]
    public async Task<ActionResult<IEnumerable<Genre>>> GetGenres([FromQuery] GenreQueryParameters query)
    {
        var genres = await _catalogService.GetGenres(query);
        return Ok(genres);
    }
    
}