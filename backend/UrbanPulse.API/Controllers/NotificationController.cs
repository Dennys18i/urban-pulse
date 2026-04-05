using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;
using UrbanPulse.API.Hubs;
using UrbanPulse.Core.DTOs.Notifications;
using UrbanPulse.Core.Interfaces;

namespace UrbanPulse.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _service;
        private readonly IHubContext<NotificationHub> _hub;

        public NotificationController(INotificationService service, IHubContext<NotificationHub> hub)
        {
            _service = service;
            _hub = hub;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            return Ok(await _service.GetForUserAsync(userId));
        }

        [HttpGet("unread-count")]
        public async Task<IActionResult> GetUnreadCount()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var count = await _service.GetUnreadCountAsync(userId);
            return Ok(new { count });
        }

        [HttpPost("send")]
        public async Task<IActionResult> Send([FromBody] CreateNotificationDto dto)
        {
            var notification = await _service.SendAsync(dto);
            await _hub.Clients.User(dto.UserId.ToString())
                .SendAsync("NewNotification", notification);
            return Ok(notification);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await _service.MarkAsReadAsync(id, userId);
            return Ok();
        }

        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            await _service.MarkAllAsReadAsync(userId);
            return Ok();
        }
    }
}