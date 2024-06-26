using Bot.Data;
using Bot.DTO;
using Bot.Models;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services
{
    public class PurchaseHistoryService : IPurchaseHistoryService
    {
        private readonly MyDbContext _dbContext;
        public PurchaseHistoryService(MyDbContext myDbContext)
        {
            _dbContext = myDbContext;
        }

        public async Task<PurchaseHistoryDTO> AddPurchaseHistory(PurchaseHistoryCreateDTO purchaseHistory)
        {
            var entity = new PurchaseHistory
            {
                PriceBot = purchaseHistory.PriceBot,
                StartDate = purchaseHistory.StartDate,
                EndDate = purchaseHistory.EndDate,
                PaymentMethod = purchaseHistory.PaymentMethod,
                Status = purchaseHistory.Status,
                Date = purchaseHistory.Date,
                UserId = purchaseHistory.UserId
            };
            await _dbContext.PurchaseHistories.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return new PurchaseHistoryDTO
            {
                Id = entity.Id,
                PriceBot = entity.PriceBot,
                StartDate = entity.StartDate,
                EndDate = entity.EndDate,
                PaymentMethod = entity.PaymentMethod,
                Status = entity.Status,
                Date = entity.Date,
                UserId = entity.UserId
            };
        }

        public async Task<bool> DeletePurchaseHistory(int id)
        {
            var purchaseHistory = await _dbContext.PurchaseHistories.FindAsync(id);
            if (purchaseHistory != null)
            {
                _dbContext.Remove(purchaseHistory);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<PurchaseHistoryDTO>> GetPurchaseHistories()
        {
            return await _dbContext.PurchaseHistories
                .Select(ph => new PurchaseHistoryDTO
                {
                    Id = ph.Id,
                    PriceBot = ph.PriceBot,
                    StartDate = ph.StartDate,
                    EndDate = ph.EndDate,
                    PaymentMethod = ph.PaymentMethod,
                    Status = ph.Status,
                    Date = ph.Date,
                    UserId = ph.UserId
                }).ToListAsync();
        }

        public async Task<PurchaseHistoryDTO> UpdatePurchaseHistory(int id, PurchaseHistoryUpdateDTO purchaseHistory)
        {
            var existingPurchaseHistory = await _dbContext.PurchaseHistories.FindAsync(id);
            if (existingPurchaseHistory == null)
            {
                return null;
            }
            existingPurchaseHistory.PriceBot = purchaseHistory.PriceBot;
            existingPurchaseHistory.StartDate = purchaseHistory.StartDate;
            existingPurchaseHistory.EndDate = purchaseHistory.EndDate;
            existingPurchaseHistory.PaymentMethod = purchaseHistory.PaymentMethod;
            existingPurchaseHistory.Status = purchaseHistory.Status;
            existingPurchaseHistory.Date = purchaseHistory.Date;
            existingPurchaseHistory.UserId = purchaseHistory.UserId;

            await _dbContext.SaveChangesAsync();
            return new PurchaseHistoryDTO
            {
                Id = existingPurchaseHistory.Id,
                PriceBot = existingPurchaseHistory.PriceBot,
                StartDate = existingPurchaseHistory.StartDate,
                EndDate = existingPurchaseHistory.EndDate,
                PaymentMethod = existingPurchaseHistory.PaymentMethod,
                Status = existingPurchaseHistory.Status,
                Date = existingPurchaseHistory.Date,
                UserId = existingPurchaseHistory.UserId
            };
        }
    }
}
