using Bot.DTO;

namespace Bot.Services.MiniServiceUserBot
{
    public interface IUserBotService
    {
        Task<UserBotDTO> AddUserBot(UserBotCreateDTO userBot);
        Task<bool> DeleteUserBot(string userId, int botTradingId);
        Task<List<UserBotDTO>> GetUserBots();
        Task<UserBotDTO> GetUserBot(string userId, int botTradingId);
    }
}
