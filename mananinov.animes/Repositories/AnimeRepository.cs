using mananinov.animes.Data;
using mananinov.animes.Models;
using mananinov.animes.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace mananinov.animes.Repositories;

public class AnimeRepository(AnimeDbContext  context): IAnimeRepository
{
    public async Task<IEnumerable<Anime>> GetAll()
    {
        return await context.Animes.ToListAsync();
    }

    public async Task<Anime?> GetAnimeByIdAsync(int id)
    {
        return await context.Animes.FirstOrDefaultAsync(a => a.Id == id);
    }
}