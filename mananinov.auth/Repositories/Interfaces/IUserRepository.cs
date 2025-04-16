using mananinov.auth.Models;

namespace mananinov.auth.Repositories.Interfaces;

public interface IUserRepository
{
    Task<Account> GetByIdAsync(Guid id);
    Task<Account?> GetByEmailAsync(string email);
    Task CreateAsync(Account account);
    Task UpdateAsync(Account account);
    Task DeleteAsync(Guid id);
}