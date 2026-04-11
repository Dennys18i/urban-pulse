namespace UrbanPulse.Core.DTOs.Chat;

public class GlobalMessageDto
{
    public int Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public int SenderId { get; set; }
    public string SenderFullName { get; set; } = string.Empty;
    public string? SenderAvatarUrl { get; set; }
    public DateTime CreatedAt { get; set; }
}