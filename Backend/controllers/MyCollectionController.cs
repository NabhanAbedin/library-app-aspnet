using System.Security.Claims;
using Backend.models.dtos;
using Backend.services.interfaces;
using Backend.models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MyCollectionController : ControllerBase
{
    private readonly IMyCollectionService _myCollectionService;

    public MyCollectionController(IMyCollectionService myCollectionService)
    {
        _myCollectionService = myCollectionService;
    }

    private long GetUserIdFromToken()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("userId")?.Value
                          ?? User.FindFirst("sub")?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
        {
            throw new UnauthorizedAccessException("Invalid token");
        }
        
        return userId;

    }

    [HttpGet("cart")]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCollection()
    {
        try
        {
            var userId = GetUserIdFromToken();
            var cart = await _myCollectionService.GetMyCollection(userId);
            return Ok(cart);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new {message = ex.Message});
        }
    }

    [HttpPost("cart/{bookId:long}")]
    public async Task<IActionResult> AddCollection(long bookId)
    {
        
        try
        {
            var  userId = GetUserIdFromToken();
            var cartItem = await _myCollectionService.AddMyCollection(userId, bookId);
            return CreatedAtAction(nameof(GetCartItemById), new { id = cartItem.Id }, cartItem);
        }
        catch (DbUpdateException e)
        {
            return StatusCode(500, new { message = e.Message});
        }
        catch (Exception e)
        {
            return  StatusCode(500, new {message = e.Message});
        }
    }

    [HttpGet("cart/{cartItemId:long}")]
    public async Task<ActionResult<CartItemDto>> GetCartItemById(long cartItemId)
    {
        try
        {
            var userId = GetUserIdFromToken();
            var cartItem = await _myCollectionService.GetItemById(cartItemId, userId);
            return Ok(cartItem);
        }
        catch (Exception e)
        {
            return NotFound();
        }
    }

    [HttpDelete("cart/{cartItemId:long}")]
    public async Task<IActionResult> RemoveMyCollection(long id)
    {
       
        try
        {   
            var userId = GetUserIdFromToken();
            var deletedItem =  await _myCollectionService.RemoveMyCollection(id, userId);

            if (!deletedItem)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = e.Message});
        }
    }
}