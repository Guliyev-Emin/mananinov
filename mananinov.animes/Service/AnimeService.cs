using mananinov.animes.Models;
using mananinov.animes.Repositories.Interfaces;

namespace mananinov.animes.Service;

public class AnimeService(IAnimeRepository repository)
{
    public async Task<Anime?> GetAnimeById(int id)
    {
        return await repository.GetAnimeByIdAsync(id);
    }
}