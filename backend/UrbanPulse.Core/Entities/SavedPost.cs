namespace UrbanPulse.Core.Entities
{
    public class SavedPost : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int EventId { get; set; }
        public Event Event { get; set; } = null!;
    }
}