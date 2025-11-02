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

    public Task<bool> AddMyCollection(long id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> RemoveMyCollection(long id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<CheckedOut>> GetCheckedOutCollection()
    {
        throw new NotImplementedException();
    }
}