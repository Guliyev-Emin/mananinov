using System.Security.Cryptography;
using mananinov.auth.Models;
using mananinov.auth.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace mananinov.auth.Service;

//[Authorize]
public class AccountService(IUserRepository userRepository, JwtService jwtService, IEmailService emailService)
{
    private static readonly Dictionary<string, (string Email, DateTime Expires)> ConfirmationTokens = new();

    // public string Login(string name, string password)
    // {
    //     var account = accountRepository.GetByName(name);
    //     var result = new PasswordHasher<Account>().VerifyHashedPassword(account!, account!.PasswordHash, password);
    //     if (result == PasswordVerificationResult.Success)
    //         return jwtService.GenerateToken(account);
    //     throw new Exception("Password doesn't match");
    // }

    public async Task<(bool Success, string Message)> RegisterAsync(string name, string email, string password, string baseUrl)
    {
        try
        {
            var existingAccounts = await userRepository.GetByEmailAsync(email);

            if (existingAccounts is not null) return (false, "Пользователь с таким email уже существует");

            var account = new Account
            {
                GuidId = Guid.NewGuid(),
                Name = name,
                Email = email,
                EmailConfirmed = false
            };
            
            account.PasswordHash = new PasswordHasher<Account>().HashPassword(account, password);
 
            await userRepository.CreateAsync(account);

            var token = GenerateConfirmationToken(account.Email);

            var confirmationLink = $"{baseUrl}/account/confirm-email?token={token}";

            await emailService.SendConfirmationEmailAsync(account.Email, confirmationLink);

            return (true, "Регистрация успешна. Проверьте вашу почту для подтверждения аккаунта.");
        }
        catch (Exception ex)
        {
            return (false, $"Ошибка при регистрации: {ex.Message}");
        }
    }

    public async Task<(bool Success, string Message)> ConfirmEmail(string token)
    {
        if (!ConfirmationTokens.TryGetValue(token, out var tokenInfo))
            return (false, "Недействительный токен подтверждения");

        if (tokenInfo.Expires < DateTime.UtcNow)
        {
            ConfirmationTokens.Remove(token);
            return (false, "Срок действия токена истек");
        }

        var email = tokenInfo.Email;
        var account = await userRepository.GetByEmailAsync(email);

        if (account is not null) return (false, "Аккаунт не найден");

        account!.EmailConfirmed = true;
        ConfirmationTokens.Remove(token);
        await userRepository.UpdateAsync(account);
        return (true, "Email успешно подтвержден");
    }

    public async Task<(bool Success, string Message)> ResendConfirmationEmailAsync(string email, string baseUrl)
    {
        var account = await userRepository.GetByEmailAsync(email);

        if (account!.EmailConfirmed) return (false, "Email уже подтвержден");

        string token = GenerateConfirmationToken(email);
        
        var confirmationLink = $"{baseUrl}/account/confirm-email?token={token}";

        await emailService.SendConfirmationEmailAsync(email, confirmationLink);

        return (true, "Письмо с подтверждением отправлено повторно");
    }

    private static string GenerateConfirmationToken(string email)
    {
        var randomBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }
        string token = Convert.ToBase64String(randomBytes)
            .Replace("+", "-")
            .Replace("/", "_")
            .Replace("=", "");
        ConfirmationTokens[token] = (email, DateTime.UtcNow.AddHours(1));
        return token;
    }
}