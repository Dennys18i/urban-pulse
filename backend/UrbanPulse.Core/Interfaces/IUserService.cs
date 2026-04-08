using UrbanPulse.Core.DTOs.User;

namespace UrbanPulse.Core.Interfaces
{
    public interface IUserService
    {
        Task<UserProfileDto?> GetProfileAsync(int userId);
        Task<UserProfileDto?> UpdateProfileAsync(int userId, UpdateProfileDto dto);
        Task<string> UpdateAvatarAsync(int userId, string avatarUrl);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto dto);
        Task DeleteAccountAsync(int userId);
        Task<List<UserProfileDto>> GetUsersWithSkillsAsync();
        Task<List<UserProfileDto>> GetUsersWithToolsAsync();
        Task<List<UserProfileDto>> GetAllUsersAsync();
        Task<List<UserProfileDto>> SearchUsersAsync(string query);
    }
}