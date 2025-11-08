using Backend.models.dtos;

namespace Backend.services.interfaces;
using Backend.models.Entities;

public interface IMyCollectionService
{
    public Task<IEnumerable<CartItemDto>> GetMyCollection(long userId);
    public Task<Cart> AddMyCollection(long userId, long bookId);
    public Task<bool> RemoveMyCollection(long id,  long  userId);
    public Task<IEnumerable<CheckedOutDto>> GetCheckedOutCollection(long userId);
    public Task<CartItemDto?> GetItemById(long cartItemId, long userId);
    public Task AddCheckedOutCollection(long userId, List<long> bookIds);
}