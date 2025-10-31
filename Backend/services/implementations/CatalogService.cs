using Backend.data;
using Backend.models.Entities;
using Backend.services.interfaces;
using Backend.models.dtos;
using Microsoft.EntityFrameworkCore;

namespace Backend.services.implementations;

public class CatalogService : ICatalogService
{
    private readonly LibraryAppContext _context;

    public CatalogService(LibraryAppContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Book>> GetBooks(BookQueryParameters query)
    {
       var booksQuery = _context.Books
           .Include(b => b.Author)
           .Include(b => b.Genre)
           .AsQueryable();

       if (!string.IsNullOrEmpty(query.Search))
       {
           booksQuery = booksQuery.Where(b => b.Title.Contains(query.Search));
       }

       if (query.From.HasValue)
       {
           booksQuery = booksQuery.Where(b => b.Release >= query.From.Value);
       }

       if (query.To.HasValue)
       {
           booksQuery = booksQuery.Where(b => b.Release <= query.To.Value);
       }

       if (!string.IsNullOrEmpty(query.SortBy) && query.OrderBy?.ToLower() == "desc")
       {
           booksQuery = booksQuery.OrderByDescending(b => b.Title);
       }
       else
       {
           booksQuery = booksQuery.OrderBy(b => b.Title);
       }
       return await booksQuery.ToListAsync();
       
    }

    public async Task<Book> CreateBook(CreateBookDto bookDto)
    {
        var existingBook = _context.Books
            .FirstOrDefault(b => b.Title == bookDto.Title && b.Author.Name == bookDto.Author);

        if (existingBook != null)
        {
            throw new InvalidOperationException("Book already exists");
        }
        
        var authorId = await  FindOrCreateAuthor(bookDto.Author);
        var genreId = await   FindOrCreateGenre(bookDto.Genre);

        var book = new Book
        {
            Title = bookDto.Title,
            AuthorId = authorId,
            GenreId = genreId,
            Release = bookDto.Release,
            Available = bookDto.Available,
        };
        
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        
        return book;
    }

    public async Task<long> FindOrCreateAuthor(string authorName)
    {
        var author = await _context.Authors.FirstOrDefaultAsync(a => a.Name  == authorName);

        if (author != null)
        {
            return author.Id;
        }
        var newAuthor = new Author {Name = authorName};
        _context.Authors.Add(newAuthor);
        await _context.SaveChangesAsync();
        
        return newAuthor.Id;
    }

    public async Task<long> FindOrCreateGenre(string genreType)
    {
        var genre = await _context.Genres.FirstOrDefaultAsync(g => g.Type == genreType);

        if (genre != null)
        {
            return genre.Id;
        }
        var newGenre = new Genre {Type = genreType};
        _context.Genres.Add((newGenre));
        await _context.SaveChangesAsync();
        return newGenre.Id;
    }

    public async Task<bool> DeleteBookById(long id)
    {
        var book = await _context.Books.FindAsync(id);
        if (book == null)
        {
            return false;
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Book?> GetBookByIdAsync(long id)
    {
        var book = await _context.Books
            .Include(b => b.Author)
            .Include(b => b.Genre)
            .FirstOrDefaultAsync(b => b.Id == id);

        return book;
    }
}