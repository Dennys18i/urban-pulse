namespace UrbanPulse.Core.Entities
{
    public class Report : BaseEntity
    {
        public int ReportedByUserId { get; set; }
        public User ReportedByUser { get; set; } = null!;
        public int EventId { get; set; }
        public Event Event { get; set; } = null!;
        public string Details { get; set; } = string.Empty;   
    }
}