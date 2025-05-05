using mananinov.animes.Models;
using mananinov.animes.Repositories.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace mananinov.animes.Service;

public class AnimeService(IAnimeRepository? repository)
{
    public async Task<Anime?> GetAnimeById(int id)
    {
        return await repository.GetAnimeByIdAsync(id);
    }

    public async Task<Anime?> GetAnimeByIdWithRequiredFields(int id)
    {
        return await repository.GetAnimeByIdWithRequiredFieldsAsync(id);
    }

    public async Task<List<Anime>> GetAllAnime()
    {
        
        return await repository.GetAllAnime();
    }

    public async Task<Anime?> GetRandomAnime()
    {
        return await repository.GetRandomAnime();
    }
}