using UrbanPulse.Core.Entities;

namespace UrbanPulse.Core.Interfaces
{
    public interface IReportRepository
    {
        Task AddAsync(Report report);
        Task<bool> ExistsAsync(int userId, int eventId);
    }
}