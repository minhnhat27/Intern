using Bot.Models;
using Bot.Request;
using Bot.Response;

namespace Bot.Services
{
    public interface IBotSignalService
    {
        Task<IList<SignalResponse>> GetSignals();
        Task AddSignal(string text);
        Task<bool> AddSignal(AddSignalRequest request);
        Task<bool> AddSignals(List<AddSignalRequest> requests);
    }
}
