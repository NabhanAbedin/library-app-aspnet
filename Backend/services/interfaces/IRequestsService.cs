using Backend.models.Entities;
using Backend.models.dtos;

namespace Backend.services.interfaces;

public interface IRequestsService
{
    public Task<object> GetRequests();
    public Task<Request> GetRequest(long id);
    public  Task<Request> AddBookRequest(BookRequestDto bookRequest);
    public  Task<Request> AddAuthorRequest(AuthorRequestDto authorRequest);
    public  Task<Request> AddGenreRequest(GenreRequestDto genreRequest);
}