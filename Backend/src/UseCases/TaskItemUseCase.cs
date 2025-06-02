using App.DTOs;
using App.Interfaces;
using App.Models;

namespace App.UseCases;

public class TaskItemUseCase : ITaskItemUseCase
{
  private readonly ITaskItemRepository _repository;
  private readonly CreateTaskItemDto _dto;

  public TaskItemUseCase(
    ITaskItemRepository repository,
    CreateTaskItemDto dto
  )
  {
    _repository = repository;
    _dto = dto;
  }

  public async Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto taskItem)
  {
    if (_dto == null || string.IsNullOrEmpty(_dto.Title) || string.IsNullOrEmpty(_dto.Description))
    {
      throw new ArgumentException("Invalid task item data.");
    }
    return await _repository.CreateTaskItemAsync(_dto);
  }
}