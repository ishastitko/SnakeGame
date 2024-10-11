using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using SnakeGame.Models;

namespace SnakeGame.Controllers;

public class GameController : Controller
{
    public IActionResult Play()
    {
        return View();
    }
}