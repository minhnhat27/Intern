using Bot.Data;
using Bot.Models;
using Bot.Request;
using Bot.Response;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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
                Signal = request.Signal,
                Price = request.Price,
                DateTime = request.Date
            };
            await _dbContext.BotSignals.AddAsync(Signal);

            var result = await _dbContext.SaveChangesAsync();
            return result > 0 ;
        }

        public async Task<bool> AddSignals(List<AddSignalRequest> requests)
        {
            List<BotSignal> listSignal = requests.Select(e => new BotSignal
            {
                Signal = e.Signal,
                Price = e.Price,
                DateTime = e.Date
            }).ToList();
            await _dbContext.BotSignals.AddRangeAsync(listSignal);
            var result = await _dbContext.SaveChangesAsync();
            return result > 0;
        }

        public async Task AddSignal(string text)
        {
            var message = text.Split('\n');
            var datetime = message[0].Trim().Split(" ")[2] + " " + message[0].Trim().Split(" ")[3];
            var tinhieu = message[1].Trim() == "Tin hieu long: Manh" ? "LONG" : "SHORT";
            var gia = message[2].Trim().Split(":")[1].Trim();

            var signal = new BotSignal
            {
                Signal = tinhieu,
                Price = double.Parse(gia),
                DateTime = DateTime.Parse(datetime)
            };
            await _dbContext.AddAsync(signal);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<IList<SignalResponse>> GetSignals()
        {
            return await _dbContext.BotSignals
                .OrderByDescending(e => e.DateTime)
                .Take(10)
                .Select(e => new SignalResponse
                {
                    Price = e.Price,
                    Signal = e.Signal,
                    DateTime = e.DateTime.ToString("dd/MM/yyyy HH:mm:ss"),
                }).ToListAsync();
        }
    }
}
