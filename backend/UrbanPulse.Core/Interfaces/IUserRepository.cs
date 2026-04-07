using UrbanPulse.Core.Entities;

namespace UrbanPulse.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(int id);
        Task AddAsync(User user);
        Task<bool> ExistsAsync(string email);
        Task DeleteAsync(User user);
        Task UpdateAsync(User user);
        Task<List<User>> GetUsersWithSkillsAsync();
        Task<List<User>> GetUsersWithToolsAsync();
        Task<List<User>> GetUsersMatchingSkillOrToolNearbyAsync(string keyword, double lat, double lng, double radiusKm = 2.0);
        Task<List<User>> GetAllUsersAsync();
        Task<List<User>> SearchUsersAsync(string query);
    }
}