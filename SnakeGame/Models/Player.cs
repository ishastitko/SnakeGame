using System.ComponentModel.DataAnnotations;

namespace SnakeGame.Models;

public class Player
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "Ilya";
    public int Record { get; set; } = 0;
    public List<int> Games { get; set; } = [];
}