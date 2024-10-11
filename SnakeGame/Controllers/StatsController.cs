using Microsoft.AspNetCore.Mvc;
using SnakeGame.Data;
using System;
using SnakeGame.Models;
using Microsoft.EntityFrameworkCore;

namespace SnakeGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StatsController : Controller
    {
        private readonly SnakeGameDbContext _context;

        public StatsController(SnakeGameDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("AddScore")]
        public async Task<IActionResult> AddScore(int score)
        {
            var player = await _context.Players.FirstOrDefaultAsync();

            if (player == null)
                player = new Player { Name = "Ilya2" };

            if (score != 0)
            {
                player.Games.Add(score);
                await _context.SaveChangesAsync();
            }

            return Ok();
        }

        [HttpGet]
        [Route("GetStats")]
        public async Task<IActionResult> GetStats()
        {
            var player = await _context.Players.FirstOrDefaultAsync();

            if (player == null)
            {
                return NotFound("No stats found.");
            }
            return View(player);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteScore(int score)
        {
            var player = await _context.Players.FirstOrDefaultAsync();
            if (player == null)
            {
                return NotFound("No stats found.");
            }

            var scoreToRemove = player.Games.FirstOrDefault(s => s == score);

            player.Games.Remove(scoreToRemove);
            await _context.SaveChangesAsync();

            return RedirectToAction("GetStats");
        }
    }

}
