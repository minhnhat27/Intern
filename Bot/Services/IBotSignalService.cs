using Bot.Models;

namespace Bot.Services
{
    public interface IBotSignalService
    {
        Task<IList<BotSignal>> GetSignals();
    }
}
