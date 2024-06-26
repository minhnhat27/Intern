using Bot.Data;
using Bot.Models;
using Bot.Request;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class LogHistoryService : ILogHistoryService
    {
        private readonly MyDbContext _dbContext;

        public LogHistoryService(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<LogHistory> AddLogHistory(LogHistoryRequest logHistory)
        {
            var _logHistory = new LogHistory
            {
                Signal = logHistory.Signal,
                DateTime = logHistory.DateTime,
                IsSL = logHistory.IsSL,
                ProfitPointTP = logHistory.ProfitPointTP,
                UserId = logHistory.UserId,
            };
            await _dbContext.LogHistorys.AddAsync(_logHistory);
            await _dbContext.SaveChangesAsync();
            return _logHistory;
        }


        public async Task<bool> DeleteLogHistory(int id)
        {
            var _logHistory = await _dbContext.LogHistorys.FindAsync(id);
            if (_logHistory != null)
            {
                _dbContext.Remove(_logHistory);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public Task<List<LogHistory>> GetLogHistory()
        {
            return _dbContext.LogHistorys.ToListAsync();
        }

        public async Task<LogHistory> UpdateLogHistory(int id, LogHistoryRequest logHistory)
        {
            var _logHistory = await _dbContext.LogHistorys.FindAsync(id);
            if (logHistory == null)
            {
                return null;
            }
            else
            {
                _logHistory.IsSL = logHistory.IsSL;
                _logHistory.Signal = logHistory.Signal;
                _logHistory.ProfitPointTP = logHistory.ProfitPointTP;
                _logHistory.UserId = logHistory.UserId;
                _logHistory.DateTime = logHistory.DateTime;
                await _dbContext.SaveChangesAsync();
                return _logHistory;
            }

        }

    }
}
