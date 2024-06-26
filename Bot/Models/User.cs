using Microsoft.AspNetCore.Identity;

namespace Bot.Models
{
    public class User : IdentityUser
    {
        public string Fullname { get; set; }
        public Salary? Salary { get; set; }
        public ICollection<BotTrading>? BotTradings { get; set; }
        public ICollection<UserBot>? UserBots { get; set; }
        public ICollection<ProfitLoss> ProfitLoss { get; set; } = new List<ProfitLoss>();
        public ICollection<LogHistory> LogHistory { get; set; } = new List<LogHistory>();
        public ICollection<PurchaseHistory> PurchaseHistory { get; set; } = new List<PurchaseHistory>();
    }
}
