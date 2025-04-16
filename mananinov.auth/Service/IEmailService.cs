namespace mananinov.auth.Service;

public interface IEmailService
{
    Task SendEmailAsync(string email, string subject, string message);
    Task SendConfirmationEmailAsync(string email, string confirmationLink);
}