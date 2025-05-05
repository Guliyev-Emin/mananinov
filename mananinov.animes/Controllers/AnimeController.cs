using mananinov.animes.Models;
using mananinov.animes.Service;
using Microsoft.AspNetCore.Mvc;

namespace mananinov.animes.Controllers;

[ApiController]
[Route("[controller]")]
public class AnimeController(AnimeService service) : ControllerBase
{
    [HttpPost("watch")]
    public async Task<IActionResult> Watch([FromBody] AnimeRecord record)
    {
        var res = await service.GetAnimeByIdWithRequiredFields(record.id);
        if (res is null)
            return NotFound();
        return Ok(res);
    }

    [HttpGet("getAllAnime")]
    public async Task<IActionResult> GetAll()
    {
        var result = await service.GetAllAnime();
        return Ok(result.Count);
    }

    [HttpGet("getRandomAnime")]
    public async Task<IActionResult> GetRandomAnime()
    {
        var result = await service.GetRandomAnime();
        return Ok(result);
    }
}   