using App.DTOs;
using App.Interfaces;
using App.Models;

namespace App.UseCases;

public class UserUseCase : IUserUseCase
{
  private readonly IUserRepository _repository;

  public UserUseCase(IUserRepository repository)
  {
    _repository = repository;
  }

  public async Task<User> CreateUserAsync(CreateUserDto dto)
  {
    return await _repository.CreateUserAsync(dto);
  }

  public async Task<IEnumerable<User>> GetAllUsersAsync()
  {
    return await _repository.GetAllUsersAsync();
  }

  public async Task<User> GetUserByIdAsync(int id)
  {
    return await _repository.GetUserByIdAsync(id);
  }
}