using Microsoft.EntityFrameworkCore;
using SnakeGame.Models;

namespace SnakeGame.Data;

public class SnakeGameDbContext : DbContext
{
    public SnakeGameDbContext(DbContextOptions<SnakeGameDbContext> options) 
        : base(options) {}
    
    public DbSet<Player> Players { get; set; }
}