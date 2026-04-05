using Microsoft.EntityFrameworkCore;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.Infrastructure.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly AppDbContext _db;

        public NotificationRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<List<Notification>> GetByUserIdAsync(int userId) =>
            await _db.Notifications
                .Where(n => n.UserId == userId)
                .OrderByDescending(n => n.CreatedAt)
                .Take(50)
                .ToListAsync();

        public async Task<int> GetUnreadCountAsync(int userId) =>
            await _db.Notifications.CountAsync(n => n.UserId == userId && !n.IsRead);

        public async Task AddAsync(Notification notification)
        {
            _db.Notifications.Add(notification);
            await _db.SaveChangesAsync();
        }

        public async Task MarkAsReadAsync(int notificationId, int userId)
        {
            var n = await _db.Notifications.FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId);
            if (n != null) { n.IsRead = true; await _db.SaveChangesAsync(); }
        }

        public async Task MarkAllAsReadAsync(int userId)
        {
            var notifications = await _db.Notifications.Where(n => n.UserId == userId && !n.IsRead).ToListAsync();
            notifications.ForEach(n => n.IsRead = true);
            await _db.SaveChangesAsync();
        }
    }
}