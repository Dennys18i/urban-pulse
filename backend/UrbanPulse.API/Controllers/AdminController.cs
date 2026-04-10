using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UrbanPulse.Core.Interfaces;

namespace UrbanPulse.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize]
public class AdminController : ControllerBase
{
    private readonly IAdminStatsRepository _adminStatsRepository;

    public AdminController(IAdminStatsRepository adminStatsRepository)
    {
        _adminStatsRepository = adminStatsRepository;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var stats = await _adminStatsRepository.GetStatsAsync();
        return Ok(stats);
    }
}