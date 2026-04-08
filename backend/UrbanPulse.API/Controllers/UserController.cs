namespace UrbanPulse.API.Controllers;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using UrbanPulse.Core.DTOs.User;
using UrbanPulse.Core.Interfaces;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IEventService _eventService;
    private readonly Cloudinary _cloudinary;

    public UserController(IUserService userService, IEventService eventService)
    {
        _userService = userService;
        _eventService = eventService;

        var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
        var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
        var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");

        var account = new Account(cloudName, apiKey, apiSecret);
        _cloudinary = new Cloudinary(account);
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var profile = await _userService.GetProfileAsync(userId);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var profile = await _userService.GetProfileAsync(id);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            var all = await _userService.GetAllUsersAsync();
            return Ok(all);
        }
        var users = await _userService.SearchUsersAsync(query);
        return Ok(users);
    }

    [HttpGet("with-skills")]
    public async Task<IActionResult> GetUsersWithSkills()
    {
        var users = await _userService.GetUsersWithSkillsAsync();
        return Ok(users);
    }

    [HttpGet("with-tools")]
    public async Task<IActionResult> GetUsersWithTools()
    {
        var users = await _userService.GetUsersWithToolsAsync();
        return Ok(users);
    }

    [HttpGet("my-posts")]
    public async Task<IActionResult> GetMyPosts()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var events = await _eventService.GetByUserIdAsync(userId);
        return Ok(events);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var result = await _userService.UpdateProfileAsync(userId, dto);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost("avatar")]
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };
        var extension = Path.GetExtension(file.FileName).ToLower();
        if (!allowedExtensions.Contains(extension))
            return BadRequest(new { message = "Invalid file type." });

        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            PublicId = $"avatars/user_{userId}",
            Overwrite = true,
            Transformation = new Transformation().Width(300).Height(300).Crop("fill").Gravity("face"),
        };

        var uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.Error != null)
            return BadRequest(new { message = uploadResult.Error.Message });

        var avatarUrl = uploadResult.SecureUrl.ToString();
        await _userService.UpdateAvatarAsync(userId, avatarUrl);

        return Ok(new { avatarUrl });
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAccount()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        await _userService.DeleteAccountAsync(userId);
        return Ok();
    }

    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        var result = await _userService.ChangePasswordAsync(userId, dto);
        if (!result) return BadRequest("Current password is incorrect.");
        return Ok();
    }
}