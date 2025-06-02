namespace App.Models
{
  public class TaskItem
  {
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }

    public TaskItem(int userId, string? title, string? description)
    {
      UserId = userId;
      Title = title;
      Description = description;
    }
  }
}