using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UrbanPulse.Core.DTOs.Reports;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;

namespace UrbanPulse.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReportController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;

        public ReportController(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] CreateReportDto dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var alreadyReported = await _reportRepository.ExistsAsync(userId, dto.EventId);
            if (alreadyReported)
                return BadRequest(new { message = "You have already reported this post" });

            var report = new Report
            {
                ReportedByUserId = userId,
                EventId = dto.EventId,
                Details = dto.Details,
                CreatedAt = DateTime.UtcNow,
                
            };

            await _reportRepository.AddAsync(report);
            return Ok();
        }
    }
}