using App.DTOs;
using App.Models;

namespace App.Interfaces;

public interface IUserUseCase
{
  Task<User> CreateUserAsync(CreateUserDto dto);
  // Task<User> CreateUserAsync(CreateUserDto dto);
  // Task<User> GetUserByIdAsync(int id);
  // Task<IEnumerable<User>> GetAllUsersAsync();
  // Task<User> UpdateUserAsync(int id, UpdateUserDto dto);
  // Task DeleteUserAsync(int id);
}