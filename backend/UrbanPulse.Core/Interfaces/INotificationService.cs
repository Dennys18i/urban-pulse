using UrbanPulse.Core.DTOs.Notifications;

namespace UrbanPulse.Core.Interfaces
{
    public interface INotificationService
    {
        Task<List<NotificationDto>> GetForUserAsync(int userId);
        Task<int> GetUnreadCountAsync(int userId);
        Task<NotificationDto> SendAsync(CreateNotificationDto dto);
        Task MarkAsReadAsync(int notificationId, int userId);
        Task MarkAllAsReadAsync(int userId);
    }
}