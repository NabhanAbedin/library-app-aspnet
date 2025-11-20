using Backend.services.interfaces;
using Backend.models.Entities;
using Backend.models.dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.controllers;

[Route("api/[controller]")]
[ApiController]
public class RequestsController : ControllerBase
{
    private readonly IRequestsService _requestsService;

    public RequestsController(IRequestsService requestsService)
    {
        _requestsService = requestsService;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetRequests()
    {
        try
        {
            var requests = await _requestsService.GetRequests();
            return Ok(requests);
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id:long}")]
    public async Task<ActionResult<Request>> GetRequestById(long id)
    {
        try
        {
            var request = await _requestsService.GetRequest(id);
            return Ok(request);
        }
        catch (Exception e)
        {
            return  StatusCode(500, new { message = e.Message });
        }
    }

    [HttpPost("books")]
    public async Task<IActionResult> AddBookRequest(BookRequestDto bookRequest)
    {
        try
        {
            if (string.IsNullOrEmpty(bookRequest.Title))
            {
                return BadRequest();
            }
            
            var request = await _requestsService.AddBookRequest(bookRequest);
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });  
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }

    [HttpPost("authors")]
    public async Task<IActionResult> AddAuthorRequest(AuthorRequestDto authorRequest)
    {
        try
        {
            if (string.IsNullOrEmpty(authorRequest.AuthorName))
            {
                return BadRequest();
            }
            var request = await _requestsService.AddAuthorRequest(authorRequest);
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });  
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }

    [HttpPost("genres")]
    public async Task<IActionResult> AddGenreRequest(GenreRequestDto genreRequest)
    {
        try
        {
            if (string.IsNullOrEmpty(genreRequest.Type))
            {
                return BadRequest();
            }

            var request = await _requestsService.AddGenreRequest(genreRequest);
            return Ok();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { error = ex.Message });  
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message });
        }
    }
    
    
}