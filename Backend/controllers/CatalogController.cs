using Backend.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.models.Entities;
using Backend.models.dtos;
using Backend.services.interfaces;
using Microsoft.AspNetCore.Authorization;


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
    
    [Authorize(Roles = "Admin")]
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

    [Authorize(Roles = "Admin")]
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

    [Authorize(Roles = "Admin")]
    [HttpPost("authors")]
    public async Task<ActionResult<Author>> AddAuthor([FromBody] Author authorInfo)
    {
        try
        {
            var author = await _catalogService.CreateAuthor(authorInfo);
            
            return CreatedAtAction(nameof(getAuthorById),  new { id = author.Id }, author);
        }
        catch (InvalidOperationException e)
        {
            return  Conflict(new { message = e.Message });
        }
        
    }

    [HttpGet("authors/{id:long}")]
    public async Task<ActionResult<Author?>> getAuthorById(long id)
    {
        try
        {
            var author = await _catalogService.GetAuthorByIdAsync(id);
            return Ok(author);
        }
        catch (InvalidOperationException e)
        {
            return NotFound(new  { message = e.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("authors/{id:long}")]
    public async Task<IActionResult> DeleteAuthorById(long id)
    {
        var deleted = await _catalogService.DeleteAuthorById(id);
        if (!deleted)
        {
            return NotFound();
        }
        return NoContent();
    }

    [HttpGet("genres")]
    public async Task<ActionResult<IEnumerable<Genre>>> GetGenres([FromQuery] GenreQueryParameters query)
    {
        var genres = await _catalogService.GetGenres(query);
        return Ok(genres);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("genres")]
    public async Task<ActionResult<Genre>> AddGenre([FromBody] Genre genreInfo)
    {
        try
        {
            var  genre = await _catalogService.CreateGenre(genreInfo);
            return CreatedAtAction(nameof(GetGenreById),  new { id = genre.Id }, genre);
        }
        catch (InvalidOperationException e)
        {
           return Conflict(new { message = e.Message });
        }
    }

    [HttpGet("genres/{id:long}")]
    public async Task<ActionResult<Genre>> GetGenreById(long id)
    {
        try
        {
            var  genre = await _catalogService.GetGenreByIdAsync(id);
            return Ok(genre);
        }
        catch (InvalidOperationException e)
        {
            return NotFound(new {message = e.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("genres/{id:long}")]
    public async Task<IActionResult> DeleteGenreById(long id)
    {
        var deletedGenre = await _catalogService.DeleteGenreById(id);

        if (!deletedGenre)
        {
            return NotFound();
        }
        return NoContent();
    }
    
}