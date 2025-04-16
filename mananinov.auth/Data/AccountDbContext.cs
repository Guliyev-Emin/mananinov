using mananinov.auth.Models;
using Microsoft.EntityFrameworkCore;

namespace mananinov.auth.Data;

public class AccountDbContext(DbContextOptions<AccountDbContext> options) : DbContext(options)
{
    public DbSet<Account> Accounts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("users");
        modelBuilder.Entity<Account>().ToTable("users");
        modelBuilder.Entity<Account>()
            .Property(a => a.Id)
            .HasColumnName("id");
    
        modelBuilder.Entity<Account>()
            .HasKey(x => x.Id);
        
        modelBuilder.Entity<Account>().Property(a => a.GuidId).HasColumnName("guid");
        modelBuilder.Entity<Account>().Property(a => a.Name).HasColumnName("username");
        modelBuilder.Entity<Account>().Property(a => a.Email).HasColumnName("email");
        modelBuilder.Entity<Account>().Property(a => a.PasswordHash).HasColumnName("password_hash");
        modelBuilder.Entity<Account>().Property(a => a.EmailConfirmed).HasColumnName("email_verified");
    }
}