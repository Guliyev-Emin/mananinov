using mananinov.animes.Data;
using mananinov.animes.Models;
using mananinov.animes.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace mananinov.animes.Repositories;

public class AnimeRepository(AnimeDbContext  context, IMemoryCache memoryCache): IAnimeRepository
{
    //, IMemoryCache cache
    //private readonly TimeSpan _cacheExpiration = TimeSpan.FromMinutes(5);
    
    public async Task<IEnumerable<Anime>> GetAll()
    {
        return await context.Animes.ToListAsync();
    }

    public async Task<Anime?> GetAnimeByIdAsync(int id)
    {
        return await context.Animes.Include(a => a.AnimeTitles)
            .Include(a => a.Images).FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Anime?> GetAnimeByIdWithRequiredFieldsAsync(int id)
    {
        
        memoryCache.TryGetValue(id, out Anime? anime);

        if (anime != null) return anime;
       
        anime = await context.Animes.Include(a => a.AnimeTitles)
            .Include(a => a.Images)
            //.Include(a => a.AnimeGenres)
            .Where(a => a.Id == id)
            .Where(a => a.Episodes > 0 &&
                        a.Duration > 0 &&
                        !string.IsNullOrEmpty(a.Status) &&
                        !string.IsNullOrEmpty(a.RatingMpaa) &&
                        a.ReleaseDate.HasValue)
            .FirstOrDefaultAsync();
        
        if (anime != null)
            memoryCache.Set(id, anime, new MemoryCacheEntryOptions().SetAbsoluteExpiration(TimeSpan.FromMinutes(5)));

        return anime;
    }
    
    public async Task<Anime?> GetActiveAnimeByIdAsync(int id)
    {
        return await context.Animes
            .Where(a => a.Id == id && 
                        a.Status == "Active" && 
                        a.Episodes > 0 && 
                        a.Duration > 0)
            .FirstOrDefaultAsync();
    }
    
    public async Task<List<Anime>> GetAllAnime()
    {
        return await context.Animes.Where(a => a.Status == "released"
                                                          && a.PremiereDate.HasValue
                                                          && a.PremiereDate.Value.Year >= 1997 
                                                          && !string.IsNullOrEmpty(a.RatingAge)
                                                          && a.ReleaseDate.HasValue
                                                          && !string.IsNullOrEmpty(a.Description)).ToListAsync();
    }

    public async Task<Anime?> GetRandomAnime()
    {
        return await context.Animes.Include(a => a.AnimeTitles)
           .Include(a => a.Images)
           // .Include(a => a.AnimeStudios)
           // .Include(a => a.AnimeGenres)
            .Where(a => a.Status == "released"
                        && a.PremiereDate.HasValue
                        && a.PremiereDate.Value.Year >= 1997
                        && !string.IsNullOrEmpty(a.RatingAge)
                        && a.ReleaseDate.HasValue
                        && !string.IsNullOrEmpty(a.Description))
            .OrderBy(a => EF.Functions.Random())
            .FirstOrDefaultAsync();
    }
    
    //public async Task<Anime?> GetAnimeById(int id)
}