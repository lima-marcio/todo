using App.DTOs;
using App.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
  private readonly IUserUseCase _useCase;
  public UserController(IUserUseCase useCase)
  {
    _useCase = useCase;
  }

  [HttpGet]
  [Route("")]
  public async Task<IActionResult> GetUsers()
  {
    var users = await _useCase.GetAllUsersAsync();
    return Ok(users);
  }

  [HttpGet]
  [Route("{id}")]
  public async Task<IActionResult> GetUserById(int id)
  {
    var user = await _useCase.GetUserByIdAsync(id);
    if (user == null)
    {
      return NotFound($"User with ID {id} not found.");
    }
    return Ok(user);
  }

  [HttpPost]
  [Route("create")]
  public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
  {
    if (createUserDto == null || string.IsNullOrEmpty(createUserDto.Name) || string.IsNullOrEmpty(createUserDto.Email))
    {
      return BadRequest("Invalid user data.");
    }
    var user = await _useCase.CreateUserAsync(createUserDto);
    return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
  }

}
