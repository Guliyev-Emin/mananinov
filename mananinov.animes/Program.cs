using mananinov.animes.Controllers;
using mananinov.animes.Data;
using mananinov.animes.Repositories;
using mananinov.animes.Repositories.Interfaces;
using mananinov.animes.Service;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AnimeDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAnimeRepository, AnimeRepository>();
builder.Services.AddScoped<AnimeService>();
builder.Services.AddScoped<AnimeController>();

builder.Services.AddControllers();
var app = builder.Build();

app.UseRouting();
app.MapControllers();
app.Run();

