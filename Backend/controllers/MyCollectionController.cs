using Backend.models.dtos;
using Backend.services.interfaces;
using Backend.models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.controllers;

[Route("api[controller]")]
[ApiController]
public class MyCollectionController : ControllerBase
{
    private readonly IMyCollectionService _myCollectionService;

    public MyCollectionController(IMyCollectionService myCollectionService)
    {
        _myCollectionService = myCollectionService;
    }

    [HttpGet("cart")]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCollection()
    {
        //will grab userId from jwt through middleware
        var userId = 0;
        //will try and parse userId if it doesn't exist return with unauthorized or bad request
        try
        {
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
        //grab userId from middleware
        var userId = 0; // this is temperory 

        try
        {
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
        var userId = 0;
        try
        {
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
        var userId = 0;
        try
        {   
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