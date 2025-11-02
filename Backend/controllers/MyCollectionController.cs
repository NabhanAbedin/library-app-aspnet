using Backend.models.dtos;
using Backend.services.interfaces;
using Microsoft.AspNetCore.Mvc;

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
}