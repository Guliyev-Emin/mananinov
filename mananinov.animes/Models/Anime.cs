namespace mananinov.animes.Models;

public class Anime
{
    public int Id { get; set; }
    public string NameOfficial { get; set; }
    public string Status { get; set; }
    public string RatingMpaa { get; set; }
    public string RatingAge { get; set; }
    public int Episodes { get; set; }
    public int EpisodesPlan { get; set; }
    public int Duration { get; set; }
    public string Description { get; set; }
    public string Kind { get; set; }
    public short StatsScores { get; set; }
    public DateTime ReleaseDate { get; set; }
    public DateTime LatestEpisodeDate { get; set; }
    public string Season { get; set; }
    public string Franchise { get; set; }
    public string NextAnimeId { get; set; }
    public string PreviousAnimeId { get; set; }
    public string NumberInFranchise { get; set; }
    public string StatsStatus { get; set; }
    public DateTime PremiereDate { get; set; }
    public ICollection<AnimeGenres> AnimeGenres { get; set; }
    public AnimeImages Images { get; set; }
    public AnimeStudios AnimeStudios { get; set; }
    public AnimeTitles AnimeTitles { get; set; }
    
    
}