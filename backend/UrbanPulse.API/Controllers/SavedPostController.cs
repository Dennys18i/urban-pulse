using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Core.Services;

namespace UrbanPulse.API.Controllers
{
    [ApiController]
    [Route("api/event")]
    [Authorize]
    public class SavedPostController : ControllerBase
    {
        private readonly ISavedPostRepository _savedPostRepository;
        private readonly IEventService _eventService;

        public SavedPostController(ISavedPostRepository savedPostRepository, IEventService eventService)
        {
            _savedPostRepository = savedPostRepository;
            _eventService = eventService;
        }

        [HttpPost("{id}/save")]
        public async Task<IActionResult> Save(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isSaved = await _savedPostRepository.IsSavedAsync(userId, id);

            if (isSaved)
                await _savedPostRepository.UnsaveAsync(userId, id);
            else
                await _savedPostRepository.SaveAsync(userId, id);

            return Ok(new { saved = !isSaved });
        }

        [HttpGet("{id}/save")]
        public async Task<IActionResult> GetSaveStatus(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var isSaved = await _savedPostRepository.IsSavedAsync(userId, id);
            return Ok(new { saved = isSaved });
        }

        [HttpGet("saved")]
        public async Task<IActionResult> GetSaved()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var events = await _savedPostRepository.GetSavedEventsAsync(userId);
            var result = events.Select(ev => new
            {
                ev.Id,
                ev.Description,
                ev.Type,
                ev.ImageUrl,
                ev.Latitude,
                ev.Longitude,
                Tags = ev.Tags.Split(",", System.StringSplitOptions.RemoveEmptyEntries).ToList(),
                ev.CreatedByUserId,
                CreatedByEmail = ev.CreatedByUser?.Email ?? "",
                CreatedByFullName = ev.CreatedByUser?.FullName,
                IsVerifiedUser = ev.CreatedByUser?.IsVerified ?? false,
                ev.CreatedAt,
                ev.IsActive,
                ev.IsCompleted,
            });
            return Ok(result);
        }
    }
}