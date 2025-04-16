using mananinov.auth.Data;
using mananinov.auth.Models;
using mananinov.auth.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mananinov.auth.Repositories;

public class UserRepository(AccountDbContext dbContext): IUserRepository
{
    public Task<Account> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task<Account?> GetByEmailAsync(string email)
    {
        return (await dbContext.Accounts.FirstOrDefaultAsync(a => a.Email == email))!;
    }
    
    public async Task CreateAsync(Account account)
    {
        await dbContext.Accounts.AddAsync(account);
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Account account)
    {
        dbContext.Accounts.Update(account);
        await dbContext.SaveChangesAsync();
    }

    public Task DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}