namespace Backend.models.Entities;

public class User
{
    public long Id { get; set; }
    public string Username { get; set; }
    public string Passwordhash { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public string Role { get; set; } = "User";
}