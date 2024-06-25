using Bot.Models;
using Bot.Request;
using Bot.Response;
using System.Threading.Tasks;

namespace Bot.Services
{
    public interface ILogHistoryService
    {
        Task<LogHistory> AddLogHistory(LogHistoryRequest logHistory);
        Task<LogHistory> UpdateLogHistory(int id, LogHistoryRequest logHistory);
        Task<List<LogHistory>> GetLogHistory();
        Task<bool> DeleteLogHistory(int id);
    }
}
