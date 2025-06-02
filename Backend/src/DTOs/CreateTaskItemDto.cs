namespace App.DTOs;

public class CreateTaskItemDto
{
  public int UserId { get; set; }
  public string? Title { get; set; }
  public string? Description { get; set; }

  public CreateTaskItemDto(string? title, string? description)
  {
    Title = title;
    Description = description;
  }
}