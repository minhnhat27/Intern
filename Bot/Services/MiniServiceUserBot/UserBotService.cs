using Bot.Data;
using Bot.DTO;
using Bot.Models;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services.MiniServiceUserBot
{
    public class UserBotService : IUserBotService
    {
        private readonly MyDbContext _dbContext;
        public UserBotService(MyDbContext myDbContext)
        {
            _dbContext = myDbContext;
        }

        public async Task<UserBotDTO> AddUserBot(UserBotCreateDTO userBot)
        {
            var entity = new UserBot
            {
                UserId = userBot.UserId,
                BotTradingId = userBot.BotTradingId
            };
            await _dbContext.UserBots.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return new UserBotDTO
            {
                UserId = entity.UserId,
                BotTradingId = entity.BotTradingId
            };
        }

        public async Task<bool> DeleteUserBot(string userId, int botTradingId)
        {
            var userBot = await _dbContext.UserBots.FindAsync(userId, botTradingId);
            if (userBot != null)
            {
                _dbContext.Remove(userBot);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<UserBotDTO>> GetUserBots()
        {
            return await _dbContext.UserBots
                .Select(ub => new UserBotDTO
                {
                    UserId = ub.UserId,
                    BotTradingId = ub.BotTradingId
                }).ToListAsync();
        }

        public async Task<UserBotDTO> GetUserBot(string userId, int botTradingId)
        {
            var userBot = await _dbContext.UserBots.FindAsync(userId, botTradingId);
            if (userBot == null)
            {
                return null;
            }
            return new UserBotDTO
            {
                UserId = userBot.UserId,
                BotTradingId = userBot.BotTradingId
            };
        }
    }
}
