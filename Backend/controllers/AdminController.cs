using Backend.models.dtos;
using Backend.services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
   private readonly IAdminService _adminService;
   
   public AdminController(IAdminService adminService)
   {
      _adminService = adminService;
   }

   [HttpGet("checkout")]
   public async Task<ActionResult<AdminCheckOutDto>> getAllCheckout()
   {
      try
      {
         var checkedoutItems = await _adminService.GetAllCheckOuts();
         return Ok(checkedoutItems);
      }
      catch (Exception e)
      {
         return StatusCode(500, new { message = e.Message });
      }
   }
   [HttpPut("returns/{userId:long}/books/{bookId:long}")]
   public async Task<IActionResult> updateCheckout(long  userId, long  bookId)
   {
      try
      {
         var updateCheckoutDto = new UpdateCheckoutDto
         {
            userId = userId,
            bookId = bookId
         };
         
         await _adminService.Updatecheckout(updateCheckoutDto);
         return NoContent();
      }
      catch (Exception e)
      {
           return StatusCode(500,  new { message = e.Message });
      }
   }
   
}