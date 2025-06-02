using App.Data;
using App.DTOs;
using App.Interfaces;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Repositories;

public class UserRepository : IUserRepository
{
  private readonly AppDbContext _context;

  public UserRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<User> CreateUserAsync(CreateUserDto dto)
  {
    var user = new User(dto.Name, dto.Email);
    _context.Users.AddAsync(user);
    await _context.SaveChangesAsync();
    return user;
  }

  public async Task<IEnumerable<User>> GetAllUsersAsync()
  {
    var result = _context.Users.ToListAsync();
    return await result;
  }
  public Task<User> GetUserByIdAsync(int id)
  {
    var result = _context.Users.FirstOrDefaultAsync(u => u.Id == id);
    if (result == null)
    {
      throw new KeyNotFoundException($"User with id {id} not found.");
    }
    return result;
  }
}