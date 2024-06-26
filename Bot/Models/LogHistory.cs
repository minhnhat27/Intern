namespace Bot.Models
{
    public class LogHistory
    {
        public int Id { get; set; }
        public string Signal { get; set; }
        public double ProfitPointTP { get; set; }
        public bool IsSL { get; set; }
        public DateTime DateTime { get; set; }
        public string? UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
