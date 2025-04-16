namespace mananinov.animes.Models;

public class AnimeImages
{
    public int Id { get; set; }
    public int AnimeId { get; set; }
    public string ImageType { get; set; }
    public string PreviewUrl { get; set; }
    public string Title { get; set; }
    public byte[] Data { get; set; }
}