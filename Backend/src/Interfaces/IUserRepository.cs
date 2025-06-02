using App.DTOs;
using App.Models;

namespace App.Interfaces;

public interface IUserRepository
{
  Task<User> CreateUserAsync(CreateUserDto dto);
  // Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto dto);
  Task<User> GetUserByIdAsync(int id);
  Task<IEnumerable<User>> GetAllUsersAsync();
}