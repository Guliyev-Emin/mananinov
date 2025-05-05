namespace mananinov.animes.Models;

public class AnimeTitles
{
    public int Id { get; set; }
    public int AnimeId { get; set; }
    public string NameOfficial { get; set; }
    public string NameRussian { get; set; }
    public string NameEnglish { get; set; }
    public string NameJapanese { get; set; }
    public string NameAzerbaijans { get; set; }
    public ICollection<AnimeSynonyms> Synonyms { get; set; }
}