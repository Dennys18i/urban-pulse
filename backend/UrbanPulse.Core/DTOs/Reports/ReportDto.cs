namespace UrbanPulse.Core.DTOs.Reports
{
    public class CreateReportDto
    {
        public int EventId { get; set; }
        public string Details { get; set; } = string.Empty;
    }
}