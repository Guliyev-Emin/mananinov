using mananinov.animes.Models;
using Microsoft.EntityFrameworkCore;

namespace mananinov.animes.Data;

public class AnimeDbContext(DbContextOptions<AnimeDbContext> options) : DbContext(options)
{
    public DbSet<Anime> Animes { get; set; }
    
    public DbSet<AnimeTitles> AnimeTitles { get; set; }
    public DbSet<AnimeSynonyms> AnimeSynonyms { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("anime");
        modelBuilder.Entity<Anime>().ToTable("anime");
        modelBuilder.Entity<Anime>().Property(a => a.Id).HasColumnName("id");
        modelBuilder.Entity<Anime>().HasKey(a => a.Id);
        modelBuilder.Entity<Anime>().Property(a => a.NameOfficial).HasColumnName("name_official");
        modelBuilder.Entity<Anime>().Property(a => a.Status).HasColumnName("status");
        modelBuilder.Entity<Anime>().Property(a => a.RatingMpaa).HasColumnName("rating_mpaa");
        modelBuilder.Entity<Anime>().Property(a => a.RatingAge).HasColumnName("rating_age");
        modelBuilder.Entity<Anime>().Property(a => a.Episodes).HasColumnName("episodes");
        modelBuilder.Entity<Anime>().Property(a => a.EpisodesPlan).HasColumnName("episodes_plan");
        modelBuilder.Entity<Anime>().Property(a => a.Duration).HasColumnName("duration");
        modelBuilder.Entity<Anime>().Property(a => a.Description).HasColumnName("description");
        modelBuilder.Entity<Anime>().Property(a => a.Kind).HasColumnName("kind");
        modelBuilder.Entity<Anime>().Property(a => a.StatsScores).HasColumnName("stats_scores");
        modelBuilder.Entity<Anime>().Property(a => a.ReleaseDate).HasColumnName("release_date");
        modelBuilder.Entity<Anime>().Property(a => a.LatestEpisodeDate).HasColumnName("latest_episode_date");
        modelBuilder.Entity<Anime>().Property(a => a.Season).HasColumnName("season");
        modelBuilder.Entity<Anime>().Property(a => a.Franchise).HasColumnName("franchise");
        modelBuilder.Entity<Anime>().Property(a => a.NextAnimeId).HasColumnName("next_anime_id");
        modelBuilder.Entity<Anime>().Property(a => a.PreviousAnimeId).HasColumnName("previous_anime_id");
        modelBuilder.Entity<Anime>().Property(a => a.NumberInFranchise).HasColumnName("number_in_franchise");
        modelBuilder.Entity<Anime>().Property(a => a.StatsStatus).HasColumnName("stats_status");
        modelBuilder.Entity<Anime>().Property(a => a.PremiereDate).HasColumnName("premiere_date");
        
        modelBuilder.Entity<AnimeTitles>().ToTable("anime_titles");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.Id).HasColumnName("id");
        modelBuilder.Entity<AnimeTitles>().HasKey(t => t.Id);
        modelBuilder.Entity<AnimeTitles>().Property(t => t.AnimeId).HasColumnName("anime_id");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.NameOfficial).HasColumnName("name_official");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.NameRussian).HasColumnName("name_russian");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.NameEnglish).HasColumnName("name_english");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.NameJapanese).HasColumnName("name_japanese");
        modelBuilder.Entity<AnimeTitles>().Property(t => t.NameAzerbaijans).HasColumnName("name_azerbaijans");

        modelBuilder.Entity<AnimeSynonyms>().ToTable("anime_synonyms");
        modelBuilder.Entity<AnimeSynonyms>().Property(s => s.Id).HasColumnName("id");
        modelBuilder.Entity<AnimeSynonyms>().HasKey(s => s.Id);
        modelBuilder.Entity<AnimeSynonyms>().Property(s => s.AnimeTitleId).HasColumnName("anime_title_id");
        modelBuilder.Entity<AnimeSynonyms>().Property(s => s.Names).HasColumnName("names");
        
        // Связь Anime -> AnimeTitles (один-к-одному)
        modelBuilder.Entity<Anime>()
            .HasOne(a => a.AnimeTitles)
            .WithOne(t => t.Anime)
            .HasForeignKey<AnimeTitles>(t => t.AnimeId);
        
        // Связь AnimeTitles -> AnimeSynonyms (один-ко-многим)
        modelBuilder.Entity<AnimeTitles>()
            .HasMany(t => t.Synonyms)
            .WithOne(s => s.AnimeTitles)
            .HasForeignKey(s => s.AnimeTitleId);
    }
}
