namespace UrbanPulse.Core.Entities;

public class GlobalMessage
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int SenderId { get; set; }
    public User Sender { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}