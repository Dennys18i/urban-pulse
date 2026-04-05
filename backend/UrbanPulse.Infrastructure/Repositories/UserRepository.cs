using Microsoft.EntityFrameworkCore;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email) =>
            await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetByIdAsync(int id) =>
            await _context.Users.FindAsync(id);

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(string email) =>
            await _context.Users.AnyAsync(u => u.Email == email);

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetUsersWithSkillsAsync() =>
            await _context.Users
                .Where(u => u.Skills != null && u.Skills != "" && u.Address != null && u.Address != "")
                .ToListAsync();

        public async Task<List<User>> GetUsersWithToolsAsync() =>
            await _context.Users
                .Where(u => u.Tools != null && u.Tools != "" && u.Address != null && u.Address != "")
                .ToListAsync();

        public async Task<List<User>> GetUsersMatchingSkillOrToolNearbyAsync(
            string keyword, double lat, double lng, double radiusKm = 2.0)
        {
            
            var candidates = await _context.Users
                .Where(u =>
                    u.Latitude != null && u.Longitude != null &&
                    (
                        (u.Skills != null && u.Skills.ToLower().Contains(keyword.ToLower())) ||
                        (u.Tools != null && u.Tools.ToLower().Contains(keyword.ToLower()))
                    ))
                .ToListAsync();

            return candidates.Where(u => GetDistanceKm(lat, lng, u.Latitude!.Value, u.Longitude!.Value) <= radiusKm).ToList();
        }

        public async Task<List<User>> GetAllUsersAsync() =>
            await _context.Users.ToListAsync();

        private static double GetDistanceKm(double lat1, double lng1, double lat2, double lng2)
        {
            const double R = 6371;
            var dLat = ToRad(lat2 - lat1);
            var dLng = ToRad(lng2 - lng1);
            var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Cos(ToRad(lat1)) * Math.Cos(ToRad(lat2)) *
                    Math.Sin(dLng / 2) * Math.Sin(dLng / 2);
            return R * 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        }

        private static double ToRad(double deg) => deg * Math.PI / 180;
    }
}