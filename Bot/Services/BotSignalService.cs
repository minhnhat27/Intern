using Bot.Data;
using Bot.Models;
using Bot.Request;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class BotSignalService : IBotSignalService
    {
        private readonly MyDbContext _dbContext;
        public BotSignalService(MyDbContext dbContext) => _dbContext = dbContext;

        public async Task<bool> AddSignal(AddSignalRequest request)
        {
            var Signal = new BotSignal()
            {
                Date = DateOnly.FromDateTime(request.Date),
                Time = TimeOnly.FromDateTime(request.Date), 
                Signal = request.Signal,
                Price = request.Price,
            };
            await _dbContext.BotSignals.AddAsync(Signal);

            var result = await _dbContext.SaveChangesAsync();
            return result > 0 ;
        }

        public async Task<bool> AddSignals(List<AddSignalRequest> requests)
        {
            List<BotSignal> listSignal = requests.Select(e => new BotSignal
            {
                Date = DateOnly.FromDateTime(e.Date),
                Time = TimeOnly.FromDateTime(e.Date),
                Signal = e.Signal,
                Price = e.Price,
            }).ToList();
            await _dbContext.BotSignals.AddRangeAsync(listSignal);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0 ;
        }

        public async Task<IList<BotSignal>> GetSignals()
        {
            return await _dbContext.BotSignals.ToListAsync();
        }
    }
}
