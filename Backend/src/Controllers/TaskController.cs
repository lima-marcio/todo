using App.DTOs;
using App.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
  private readonly ITaskItemUseCase _useCase;
  public TaskController(ITaskItemUseCase useCase)
  {
    _useCase = useCase;
  }

  [HttpPost("create")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> CreateTaskItem([FromBody] CreateTaskItemDto createTaskItemDto)
  {
    if (createTaskItemDto == null || string.IsNullOrEmpty(createTaskItemDto.Title))
    {
      return BadRequest("Invalid task item data.");
    }
    var result = await _useCase.CreateTaskItemAsync(createTaskItemDto);
    return Created("$/api/task/{result.Id}", result);
  }

  [HttpDelete("delete/{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> DeleteTaskItem(int id)
  {
    if (id <= 0)
    {
      return BadRequest("Invalid task item ID.");
    }
    var result = await _useCase.DeleteTaskItemAsync(id);
    if (!result)
    {
      return NotFound("Task item not found.");
    }
    return Ok("Task item deleted successfully.");
  }

  [HttpGet("getByUserId/{id}")]
  [ProducesResponseType(StatusCodes.Status200OK)]
  public async Task<IActionResult> GetTaskItemByUserId(int id)
  {
    var result = await _useCase.GetTaskItemsByUserIdAsync(id);

    if (result == null)
    {
      return NotFound("Task item not found.");
    }
    return Ok(result);
  }
}