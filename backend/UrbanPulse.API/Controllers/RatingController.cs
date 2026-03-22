namespace UrbanPulse.API.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Core.DTOs.Chat;

[ApiController]
[Route("api/chat/conversations/{conversationId}/rating")]
[Authorize]
public class RatingController : ControllerBase
{
    private readonly IRatingRepository _ratingRepository;
    private readonly IConversationRepository _conversationRepository;

    public RatingController(IRatingRepository ratingRepository, IConversationRepository conversationRepository)
    {
        _ratingRepository = ratingRepository;
        _conversationRepository = conversationRepository;
    }

    [HttpPost]
    public async Task<IActionResult> Rate(int conversationId, [FromBody] RateDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var existing = await _ratingRepository.GetByConversationAndUserAsync(conversationId, userId);
        if (existing != null) return BadRequest(new { message = "Already rated." });

        var conversation = await _conversationRepository.GetByIdAsync(conversationId);
        if (conversation == null) return NotFound();

        var ratedUserId = conversation.User1Id == userId ? conversation.User2Id : conversation.User1Id;

        var rating = new Rating
        {
            RatedUserId = ratedUserId,
            RatedByUserId = userId,
            ConversationId = conversationId,
            Value = dto.Rating,
        };

        await _ratingRepository.AddAsync(rating);
        return Ok();
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckRating(int conversationId)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var existing = await _ratingRepository.GetByConversationAndUserAsync(conversationId, userId);
        return Ok(new { hasRated = existing != null, value = existing?.Value });
    }
}