using Microsoft.EntityFrameworkCore;

namespace Bot.Models
{
    [PrimaryKey(nameof(UserId), nameof(BotId))]
    public class UserBot
    {
        public string? UserId { get; set; }
        public User? User { get; set; }
        public int BotId {  get; set; }
        public BotTrading? BotTradings { get; set; }

    }
}
