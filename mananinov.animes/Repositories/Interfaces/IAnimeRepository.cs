using mananinov.animes.Models;

namespace mananinov.animes.Repositories.Interfaces;

public interface IAnimeRepository
{
    Task<IEnumerable<Anime>> GetAll();
    Task<Anime?> GetAnimeByIdAsync(int id);
    Task<Anime?> GetAnimeByIdWithRequiredFieldsAsync(int id);
    Task<List<Anime>> GetAllAnime();
    Task<Anime?> GetRandomAnime();
}