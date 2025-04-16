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
        var res = await service.GetAnimeById(record.id);
        return Ok();
    }
}