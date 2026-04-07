using Microsoft.EntityFrameworkCore;
using UrbanPulse.Core.Entities;
using UrbanPulse.Core.Interfaces;
using UrbanPulse.Infrastructure.Data;

namespace UrbanPulse.Infrastructure.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly AppDbContext _db;

        public ReportRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task AddAsync(Report report)
        {
            _db.Reports.Add(report);
            await _db.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(int userId, int eventId) =>
            await _db.Reports.AnyAsync(r => r.ReportedByUserId == userId && r.EventId == eventId);
    }
}