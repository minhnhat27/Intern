using Bot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Bot.Data
{
    public class MyDbContext : IdentityDbContext<User>
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public virtual DbSet<BotSignal> BotSignals { get; set; }
        public DbSet<BotTrading> BotsTrading { get; set; }
        public DbSet<UserBot> UserBots { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<LogHistory> LogHistorys { get; set; }
        public DbSet<PriceBot> PriceBots { get; set; }
        public DbSet<ProfitLoss> ProfitsLoss { get; set; }
        public DbSet<PurchaseHistory> PurchaseHistories { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //builder.Entity<User>()
            //    .HasMany(u => u.BotTradings)
            //    .WithMany(u => u.Users)
            //    .UsingEntity<UserBot>(
            //        l => l.HasOne<BotTrading>().WithMany().HasForeignKey(u => u.BotId),
            //        r => r.HasOne<User>().WithMany().HasForeignKey(u => u.UserId)
            //    );
        }

    }
}
