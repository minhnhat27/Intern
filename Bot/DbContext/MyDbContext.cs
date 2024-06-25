﻿using Bot.Models;
using Bot.Request;
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
        public DbSet<ProfitLoss> ProfitLosses { get; set; }
        public DbSet<PurchaseHistory> PurchaseHistories { get; set; }
        public DbSet<Salary> Salaries { get; set; }
    }
}
