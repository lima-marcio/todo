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
    var taskItem = new TaskItem(dto.Title, dto.Description);
    _context.TaskItems.Add(taskItem);
    await _context.SaveChangesAsync();
    return taskItem;
  }

  public async Task<IEnumerable<TaskItem>> GetAllTasksItemAsync()
  {
    var result = _context.TaskItems.ToListAsync();
    return await result;
  }

  public async Task<TaskItem> GetTaskItemByIdAsync(int id)
  {
    var taskItem = _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id);
    if (taskItem == null)
    {
      throw new KeyNotFoundException($"TaskItem with id {id} not found.");
    }
    return await taskItem;
  }
}