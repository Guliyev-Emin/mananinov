namespace mananinov.animes.Models;

public class AnimeSynonyms
{
    public int Id { get; set; }
    public int AnimeTitleId { get; set; }
    public string Names { get; set; }
    public AnimeTitles AnimeTitles { get; set; }
}