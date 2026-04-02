namespace UrbanPulse.Core.DTOs.User
{
    public class UpdateProfileDto
    {
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Bio { get; set; }
        public List<string> Skills { get; set; } = new();
        public List<string> Tools { get; set; } = new();
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}