using Bot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bot.Data
{
    public class MyDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }
        public virtual DbSet<BotSignal> BotSignals { get; set; }
    }
}
