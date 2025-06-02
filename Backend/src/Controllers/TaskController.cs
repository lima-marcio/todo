using App.DTOs;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
  [HttpPost("create")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public IActionResult CreateTaskItem([FromBody] CreateTaskItemDto createTaskItemDto)
  {
    if (createTaskItemDto == null || string.IsNullOrEmpty(createTaskItemDto.Title))
    {
      return BadRequest("Invalid task item data.");
    }
    return Ok("Task item created successfully.");
  }
}