using Bot.Data;
using Bot.DTO;
using Bot.Models;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class ProfitLossService : IProfitLossService
    {
        private readonly MyDbContext _dbContext;
        public ProfitLossService(MyDbContext myDbContext)
        {
            _dbContext = myDbContext;
        }

        public async Task<ProfitLossDTO> AddProfitLoss(ProfitLossCreateDTO profitLoss)
        {
            var entity = new ProfitLoss
            {
                Price = profitLoss.Price,
                Date = profitLoss.Date,
                UserId = profitLoss.UserId
            };
            await _dbContext.ProfitLosses.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return new ProfitLossDTO
            {
                Id = entity.Id,
                Price = entity.Price,
                Date = entity.Date,
                UserId = entity.UserId
            };
        }

        public async Task<bool> DeleteProfitLoss(int id)
        {
            var profitLoss = await _dbContext.ProfitLosses.FindAsync(id);
            if (profitLoss != null)
            {
                _dbContext.Remove(profitLoss);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<ProfitLossDTO>> GetProfitLosses()
        {
            return await _dbContext.ProfitLosses
                .Select(pl => new ProfitLossDTO
                {
                    Id = pl.Id,
                    Price = pl.Price,
                    Date = pl.Date,
                    UserId = pl.UserId
                }).ToListAsync();
        }

        public async Task<ProfitLossDTO> UpdateProfitLoss(int id, ProfitLossUpdateDTO profitLoss)
        {
            var existingProfitLoss = await _dbContext.ProfitLosses.FindAsync(id);
            if (existingProfitLoss == null)
            {
                return null;
            }
            existingProfitLoss.Price = profitLoss.Price;
            existingProfitLoss.Date = profitLoss.Date;
            existingProfitLoss.UserId = profitLoss.UserId;

            await _dbContext.SaveChangesAsync();
            return new ProfitLossDTO
            {
                Id = existingProfitLoss.Id,
                Price = existingProfitLoss.Price,
                Date = existingProfitLoss.Date,
                UserId = existingProfitLoss.UserId
            };
        }
    }
}
