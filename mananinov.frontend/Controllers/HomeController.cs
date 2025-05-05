using System.Diagnostics;
using mananinov.animes.Models;
using mananinov.frontend.Models;
using Microsoft.AspNetCore.Mvc;


namespace mananinov.frontend.Controllers;

public class HomeController(ILogger<HomeController> logger) : Controller
{
    private readonly ILogger<HomeController> _logger = logger;

    public async Task<IActionResult> MainWindow()
    {
        using var http = new HttpClient();
        var res = await http.GetFromJsonAsync<Anime>("http://localhost:5030/anime/getRandomAnime");
        return View(res);
    }

    public async Task<IActionResult> Watch(int id)
    {
        using var http = new HttpClient();
        var requestData = new { Id = id };
        var res = await http.PostAsJsonAsync("http://localhost:5030/anime/watch", requestData);
        if (res.IsSuccessStatusCode)
        {
            var anime = await res.Content.ReadFromJsonAsync<Anime>();
            return View(anime);
        }
        return NotFound();
    }

    public IActionResult Login()
    {
        return View();
    }

    public IActionResult Register()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}