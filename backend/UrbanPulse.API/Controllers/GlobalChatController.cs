using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UrbanPulse.Core.DTOs.Chat;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.API.Controllers;

[ApiController]
[Route("api/global-chat")]
[Authorize]
public class GlobalChatController : ControllerBase
{
    private readonly AppDbContext _context;

    public GlobalChatController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("messages")]
    public async Task<IActionResult> GetMessages([FromQuery] int page = 1, [FromQuery] int pageSize = 50)
    {
        var messages = await _context.GlobalMessages
            .Include(m => m.Sender)
            .OrderByDescending(m => m.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new GlobalMessageDto
            {
                Id = m.Id,
                Text = m.Text,
                SenderId = m.SenderId,
                SenderFullName = m.Sender.FullName ?? m.Sender.Email,
                SenderAvatarUrl = m.Sender.AvatarUrl,
                CreatedAt = m.CreatedAt,
            })
            .ToListAsync();

        messages.Reverse();
        return Ok(messages);
    }
}