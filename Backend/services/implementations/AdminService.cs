using Backend.data;
using Backend.models.dtos;
using Backend.services.interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.services.implementations;

public class AdminService : IAdminService
{
    private readonly LibraryAppContext _context;
    
    public AdminService(LibraryAppContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<AdminCheckOutDto>> GetAllCheckOuts()
    {
        var checkedOutItems = await _context.CheckedOuts
            .Include(C => C.User)
            .Include(c => c.Book)
            .ThenInclude(b => b.Author)
            .OrderBy(c => c.User.Username)
            .Select(c => new AdminCheckOutDto
            {
                Id = c.Id,
                Username = c.User.Username,
                BookId = c.Book.Id,
                BookTitle = c.Book.Title,
                AuthorName = c.Book.Author.Name,
                CheckedOutTime = c.CheckedOutTime,
                DueDate = c.DueDate,
                ReturnedTime = c.ReturnedTime,
            })
            .ToListAsync();
        
        return checkedOutItems;
    }

    public async Task Updatecheckout(UpdateCheckoutDto updateCheckoutDto) 
    {
        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            var checkoutItem = await _context.CheckedOuts
                    .Include(C => C.Book)
                .FirstOrDefaultAsync(c => c.UserId == updateCheckoutDto.userId &&  c.BookId == updateCheckoutDto.bookId)
                ;
            
            if (checkoutItem == null)
            {
                throw new KeyNotFoundException("checkoutitem not found");
            }
            
            checkoutItem.ReturnedTime = DateTime.UtcNow;
            checkoutItem.Book.Available += 1;
            
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}