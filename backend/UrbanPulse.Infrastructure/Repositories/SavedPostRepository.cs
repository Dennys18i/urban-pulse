using Microsoft.EntityFrameworkCore;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.Infrastructure.Repositories
{
    public class SavedPostRepository : ISavedPostRepository
    {
        private readonly AppDbContext _db;

        public SavedPostRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<bool> IsSavedAsync(int userId, int eventId) =>
            await _db.SavedPosts.AnyAsync(s => s.UserId == userId && s.EventId == eventId);

        public async Task SaveAsync(int userId, int eventId)
        {
            if (await IsSavedAsync(userId, eventId)) return;
            _db.SavedPosts.Add(new SavedPost { UserId = userId, EventId = eventId });
            await _db.SaveChangesAsync();
        }

        public async Task UnsaveAsync(int userId, int eventId)
        {
            var saved = await _db.SavedPosts
                .Where(s => s.UserId == userId && s.EventId == eventId)
                .ToListAsync();
            if (!saved.Any()) return;
            _db.SavedPosts.RemoveRange(saved);
            await _db.SaveChangesAsync();
        }

        public async Task<List<Event>> GetSavedEventsAsync(int userId) =>
            await _db.SavedPosts
                .Where(s => s.UserId == userId)
                .Include(s => s.Event)
                    .ThenInclude(e => e.CreatedByUser)
                .Select(s => s.Event)
                .Where(e => e.IsActive)
                .OrderByDescending(e => e.CreatedAt)
                .ToListAsync();
    }
}