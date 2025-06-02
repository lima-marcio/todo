using App.DTOs;
using App.Models;

namespace App.Interfaces;

public interface ITaskItemUseCase
{
  Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto taskItem);
}