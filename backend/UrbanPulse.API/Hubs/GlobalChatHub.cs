using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using UrbanPulse.Core.DTOs.Chat;
using UrbanPulse.Core.Entities;
using UrbanPulse.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace UrbanPulse.API.Hubs;

[Authorize]
public class GlobalChatHub : Hub
{
    private readonly AppDbContext _context;

    public GlobalChatHub(AppDbContext context)
    {
        _context = context;
    }

    public async Task SendMessage(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return;

        var userIdStr = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out var userId)) return;

        var user = await _context.Users.FindAsync(userId);
        if (user == null) return;

        var message = new GlobalMessage
        {
            Text = text.Trim(),
            SenderId = userId,
            CreatedAt = DateTime.UtcNow,
        };

        _context.GlobalMessages.Add(message);
        await _context.SaveChangesAsync();

        var dto = new GlobalMessageDto
        {
            Id = message.Id,
            Text = message.Text,
            SenderId = userId,
            SenderFullName = user.FullName ?? user.Email,
            SenderAvatarUrl = user.AvatarUrl,
            CreatedAt = message.CreatedAt,
        };

        await Clients.All.SendAsync("NewGlobalMessage", dto);
    }
}