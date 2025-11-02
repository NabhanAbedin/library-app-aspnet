using Backend.models.dtos;

namespace Backend.services.interfaces;
using Backend.models.Entities;

public interface IMyCollectionService
{
    public Task<IEnumerable<CartItemDto>> GetMyCollection(long userId);
    public Task<bool> AddMyCollection(long id);
    public Task<bool> RemoveMyCollection(long id);
    public Task<IEnumerable<CheckedOut>> GetCheckedOutCollection();
    //public Task<bool> AddCheckedOutCollection(long id);
}