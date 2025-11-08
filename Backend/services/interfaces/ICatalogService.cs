using Backend.models.Entities;
using Backend.models.dtos;
namespace Backend.services.interfaces;

public interface ICatalogService
{
    Task<IEnumerable<Book>> GetBooks(BookQueryParameters query);
    Task<Book> CreateBook(CreateBookDto bookDto);
    Task<bool> DeleteBookById(long id);
    Task<Book?> GetBookByIdAsync(long id);
    
    Task<IEnumerable<Author>> GetAuthors(AuthorQueryParemeters query);
    Task<Author> CreateAuthor(Author authorInfo);
    Task<bool> DeleteAuthorById(long id);
    Task<Author?> GetAuthorByIdAsync(long id);
    Task<IEnumerable<Genre>> GetGenres(GenreQueryParameters query);
    Task<Genre> CreateGenre(Genre genreInfo);
    Task<bool> DeleteGenreById(long id);
    Task<Genre?> GetGenreByIdAsync(long id);
    
    
}