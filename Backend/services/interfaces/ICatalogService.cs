using Backend.models.Entities;
using Backend.models.dtos;
namespace Backend.services.interfaces;

public interface ICatalogService
{
    Task<IEnumerable<Book>> GetBooks(BookQueryParameters query);
    Task<Book> CreateBook(CreateBookDto bookDto);
    Task<bool> DeleteBookById(long id);
    Task<long> FindOrCreateAuthor(string authorname);
    Task<Book?> GetBookByIdAsync(long id);
}