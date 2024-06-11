using Bot.Data;
using Bot.Models;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class BotSignalService : IBotSignalService
    {
        private readonly MyDbContext _dbContext;
        public BotSignalService(MyDbContext dbContext) => _dbContext = dbContext;

        public async Task<IList<BotSignal>> GetSignals()
        {
            return await _dbContext.BotSignals.ToListAsync();
        }
    }
}
