namespace Backend.data;
using Microsoft.EntityFrameworkCore;
using models.Entities;

public class LibraryAppContext : DbContext
{
    public LibraryAppContext (DbContextOptions<LibraryAppContext> options) : base (options)
    {}
    
    public DbSet<Author> Authors { get; set; }
    public DbSet<Book> Books { get; set; }
    public DbSet<Genre> Genres { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Cart> Carts { get; set; }
    public DbSet<CheckedOut> CheckedOuts { get; set; }
    public DbSet<Request> Requests { get; set; }
    
    
}