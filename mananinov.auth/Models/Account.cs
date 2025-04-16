namespace mananinov.auth.Models;

public class Account
{
    public string Name { get; set; }
    public Guid GuidId { get; set; }
    public int Id { get; set; }
    public required string Email { get; set; }
    public string PasswordHash { get; set; }
    public bool EmailConfirmed { get; set; }
}