namespace UrbanPulse.Core.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public bool IsActive { get; set; } = true;
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Bio { get; set; }
        public bool IsVerified { get; set; } = false;
        public double TrustScore { get; set; } = 0;
        public string? Skills { get; set; }
        public string? Tools { get; set; }
        public string? AvatarUrl { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
    }
}