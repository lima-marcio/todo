using App.DTOs;
using App.Models;

namespace App.Interfaces;

public interface ITaskItemRepository
{
  Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto dto);
  Task<TaskItem> GetTaskItemByIdAsync(int id);
  Task<bool> DeleteTaskItemByIdAsync(int id);
  Task<IEnumerable<TaskItem>> GetTaskItemsByUserIdAsync(int userId);
}