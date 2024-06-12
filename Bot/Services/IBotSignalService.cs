using Bot.Models;
using Bot.Request;

namespace Bot.Services
{
    public interface IBotSignalService
    {
        Task<IList<BotSignal>> GetSignals();
        Task<bool> AddSignal(AddSignalRequest request);
        Task<bool> AddSignals(List<AddSignalRequest> requests);
    }
}
