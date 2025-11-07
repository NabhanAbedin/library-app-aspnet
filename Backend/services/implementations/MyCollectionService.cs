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
        //will grab user Id from request
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

    public async Task<Cart> AddMyCollection(long userId, long  bookId )
    {
        var cart = new Cart
        {
            UserId = userId,
            BookId = bookId,
        };
        _context.Carts.Add(cart);
       await _context.SaveChangesAsync();

        return cart;
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

    public Task<IEnumerable<CheckedOut>> GetCheckedOutCollection()
    {
        throw new NotImplementedException();
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