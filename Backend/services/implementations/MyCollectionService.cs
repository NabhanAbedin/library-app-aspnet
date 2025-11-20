using Backend.models.Entities;
using Backend.services.interfaces;
using Backend.data;
using Backend.models.dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.services.implementations;

public class MyCollectionService : IMyCollectionService
{
    private readonly LibraryAppContext _context;

    public MyCollectionService(LibraryAppContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<CartItemDto>> GetMyCollection(long userId)
    {
        
        var cart = await _context.Carts
            .Where(c => c.UserId == userId)
            .Include(c => c.User)
            .Include(c => c.Book)
                .ThenInclude(b => b.Author)
            .Select(c => new CartItemDto
            {
                Id = c.Id,
                BookId = c.BookId,
                Username = c.User.Username,
                BookTitle = c.Book.Title,
                AuthorName = c.Book.Author.Name,
                GenreType = c.Book.Genre.Type
            })
            .ToListAsync();
        
        return cart;
            
    }

    public async Task AddMyCollection(long userId, List<long> bookIds)
    {
        var cartItems = bookIds.Select(bookId => new Cart
        {
            UserId = userId,
            BookId = bookId
        }).ToList();
        
        _context.Carts.AddRange(cartItems);
       await _context.SaveChangesAsync();

       
    }

    public async Task<bool> RemoveMyCollection(long id, long  userId)
    {
        var cartItem =  await _context.Carts.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (cartItem == null)
        {
            return false;
        }
        _context.Carts.Remove(cartItem);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<CheckedOutDto>> GetCheckedOutCollection(long userId)
    {
        var checkedOutBooks = await _context.CheckedOuts
            .Where(c => c.UserId ==  userId && c.ReturnedTime == null)
            .Include(c => c.Book)
                .ThenInclude(b => b.Author)
            .Select(c => new CheckedOutDto
            {
                Id = c.Id,
                BookId = c.BookId,
                BookTitle = c.Book.Title,
                AuthorName = c.Book.Author.Name,
                CheckedOutTime = c.CheckedOutTime,
                DueDate = c.DueDate,
            })
            .ToListAsync();

        return checkedOutBooks;
    }

    public async Task AddCheckedOutCollection(long userId, List<long> bookIds)
    {
        using var transaction = await _context.Database.BeginTransactionAsync();
    
        try
        {
            var currentCheckoutCount = await _context.CheckedOuts
                .CountAsync(c => c.UserId == userId && c.ReturnedTime == null);

            if (currentCheckoutCount + bookIds.Count > 5)
            {
                throw new InvalidOperationException("You cannot add more than 5 books to your checked out");
            }
        
            var dueDate = DateTime.UtcNow.AddDays(7);

            var checkedOutItems = bookIds.Select(bookId => new CheckedOut
            {
                UserId = userId,
                BookId = bookId,
                CheckedOutTime = DateTime.UtcNow,
                DueDate = dueDate,
            }).ToList();
        
            _context.CheckedOuts.AddRange(checkedOutItems);

            await _context.Books
                .Where(b => bookIds.Contains(b.Id))
                .ExecuteUpdateAsync(setters => setters
                    .SetProperty(b => b.Available, b => b.Available - 1)
                );
        
            var cartItems = await _context.Carts
                .Where(c => c.UserId == userId && bookIds.Contains(c.BookId))
                .ToListAsync();
        
            _context.Carts.RemoveRange(cartItems);
        
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();
            
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    public async Task<CartItemDto?> GetItemById(long cartItemId, long userId)
    {
        var cartItem = await _context.Carts
            .Where(c => c.Id == cartItemId && c.UserId == userId)
            .Include(c => c.User)
            .Include(c => c.Book)
            .ThenInclude(b => b.Author)
            .Select(c => new CartItemDto
            {
                Id = c.Id,
                BookId = c.BookId,
                Username = c.User.Username,
                BookTitle = c.Book.Title,
                AuthorName = c.Book.Author.Name,
                GenreType = c.Book.Genre.Type
            })
            .FirstOrDefaultAsync();

        if (cartItem == null)
        {
            return null;
        }

        return cartItem;

    }
}