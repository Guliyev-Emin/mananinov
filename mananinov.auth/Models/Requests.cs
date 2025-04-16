namespace mananinov.auth.Models;

public record AccountRequest(string Name, string Email, string Password);

public record LoginRequest(string Name, string Password);

public record ResendConfirmation(string Email);