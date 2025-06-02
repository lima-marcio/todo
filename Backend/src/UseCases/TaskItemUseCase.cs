using App.DTOs;
using App.Interfaces;
using App.Models;

namespace App.UseCases;

public class TaskItemUseCase : ITaskItemUseCase
{
  private readonly ITaskItemRepository _repository;
  private readonly IUserRepository _userRepository;

  public TaskItemUseCase(
    ITaskItemRepository repository,
    IUserRepository userRepository
    )
  {
    _repository = repository;
    _userRepository = userRepository;
  }

  public async Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto dto)
  {
    if (dto == null || string.IsNullOrEmpty(dto.Title) || string.IsNullOrEmpty(dto.Description))
    {
      throw new ArgumentException("Invalid task item data.");
    }

    var user = await _userRepository.GetUserByIdAsync(dto.UserId);
    if (user == null)
    {
      throw new KeyNotFoundException($"User with id {dto.UserId} not found.");
    }
    return await _repository.CreateTaskItemAsync(dto);
  }

  public async Task<bool> DeleteTaskItemAsync(int id)
  {
    var taskItem = _repository.GetTaskItemByIdAsync(id);

    if (taskItem == null)
    {
      return false;
    }
    await _repository.DeleteTaskItemByIdAsync(id);
    return true;
  }

  public async Task<IEnumerable<TaskItem>> GetTaskItemsByUserIdAsync(int userId)
  {
    return await _repository.GetTaskItemsByUserIdAsync(userId);
  }

}