using Backend.data;
using Backend.models.dtos;
using Backend.models.Entities;
using Backend.services.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Backend.services.implementations;

public class RequestsService : IRequestsService
{
    private readonly LibraryAppContext _context;

    public RequestsService(LibraryAppContext context)
    {
        _context = context;
    }
    
    public async Task<object> GetRequests()
    {
        var requests = await _context.Requests.ToListAsync();
    
        var bookRequests = requests
            .Where(r => !string.IsNullOrEmpty(r.Title))
            .Select(r => new BookRequestDto
            {
                id = r.Id,
                Title = r.Title,
                Author = r.Author,
                Genre = r.Genre
            });

        var authorRequests = requests
            .Where(r => !string.IsNullOrEmpty(r.AuthorName))
            .Select(r => new AuthorRequestDto
            {
                id = r.Id,
                AuthorName = r.AuthorName,
                AuthorBio = r.AuthorBio,
                AuthorAge = r.AuthorAge
            });

        var genreRequests = requests
            .Where(r => !string.IsNullOrEmpty(r.Type))
            .Select(r => new GenreRequestDto
            {
                id = r.Id,
                Type = r.Type
            });

        return new
        {
            BookRequests = bookRequests,
            AuthorRequests = authorRequests,
            GenreRequests = genreRequests
        };
        

    }
    
    public async Task<Request> GetRequest(long id)
    {
        var request =  await _context.Requests.FindAsync(id);
        if (request == null)
        {
            throw new Exception("request not found");
            
        }
        
        return request;
    }

    public async Task<Request> AddBookRequest(BookRequestDto bookRequest)
    {
        var existingRequest = await _context.Requests
            .FirstOrDefaultAsync(r => r.Title == bookRequest.Title &&  r.Author == bookRequest.Author);

        if (existingRequest != null)
        {
            throw new  Exception("Request with the same title already exists");
        }
        
        var request = new Request
        {
            Title = bookRequest.Title,
            Author = bookRequest.Author,
            Genre = bookRequest.Genre
        };
        
        _context.Requests.Add(request);
        await _context.SaveChangesAsync();
        
        return request;
        

    }

    public async  Task<Request> AddAuthorRequest(AuthorRequestDto authorRequest)
    {
        var existingRequest = await _context.Requests
            .FirstOrDefaultAsync(r => r.AuthorName == authorRequest.AuthorName);
        
        if (existingRequest != null) 
        {
            throw new  Exception("Request with the same author already exists");
        }

        var request = new Request
        {
            AuthorName = authorRequest.AuthorName,
            AuthorBio = authorRequest.AuthorBio,
            AuthorAge = authorRequest.AuthorAge
        };
        
        _context.Requests.Add(request);
        await _context.SaveChangesAsync();
        
        return request;

    }

    public async  Task<Request> AddGenreRequest(GenreRequestDto genreRequest)
    {
        var existingRequest = await  _context.Requests
            .FirstOrDefaultAsync(r => r.Type == genreRequest.Type);

        if (existingRequest != null)
        {
            throw new  Exception("Request with the same genre already exists");
        }

        var request = new Request
        {
            Type = genreRequest.Type,
        };
        
        _context.Requests.Add(request);
        await _context.SaveChangesAsync();
        
        return request;

    }
}