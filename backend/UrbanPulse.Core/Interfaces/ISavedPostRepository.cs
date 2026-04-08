using UrbanPulse.Core.Entities;

namespace UrbanPulse.Core.Interfaces
{
    public interface ISavedPostRepository
    {
        Task<bool> IsSavedAsync(int userId, int eventId);
        Task SaveAsync(int userId, int eventId);
        Task UnsaveAsync(int userId, int eventId);
        Task<List<Event>> GetSavedEventsAsync(int userId);
    }
}