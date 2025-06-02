using App.Data;
using App.DTOs;
using App.Interfaces;
using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Repositories;

public class TaskItemRepository : ITaskItemRepository
{
  private readonly AppDbContext _context;
  public TaskItemRepository(AppDbContext context)
  {
    _context = context;
  }

  public async Task<TaskItem> CreateTaskItemAsync(CreateTaskItemDto dto)
  {
    var taskItem = new TaskItem(dto.UserId, dto.Title, dto.Description);
    _context.TaskItems.Add(taskItem);
    await _context.SaveChangesAsync();
    return taskItem;
  }

  public async Task<bool> DeleteTaskItemByIdAsync(int id)
  {
    var taskItem = _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id).Result;
    if (taskItem == null)
    {
      return false;
    }
    _context.TaskItems.Remove(taskItem);
    return true;
  }

  public async Task<TaskItem> GetTaskItemByIdAsync(int id)
  {
    return await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id);
  }

  public async Task<IEnumerable<TaskItem>> GetTaskItemsByUserIdAsync(int userId)
  {
    return await _context.TaskItems.Where(t => t.UserId == userId).ToListAsync();
  }

}