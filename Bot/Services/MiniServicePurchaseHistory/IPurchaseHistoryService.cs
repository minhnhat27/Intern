using Bot.DTO;
using Microsoft.AspNetCore.Mvc;
using Bot.Response;
namespace Bot.Services.MiniServicePurchaseHistory
{
    public interface IPurchaseHistoryService
    {
        Task<PurchaseHistoryDTO> AddPurchaseHistory(PurchaseHistoryCreateDTO purchaseHistory);
        Task<bool> DeletePurchaseHistory(int id);
        Task<List<PurchaseHistoryDTO>> GetPurchaseHistories();
        Task<PurchaseHistoryDTO> UpdatePurchaseHistory(int id, PurchaseHistoryUpdateDTO purchaseHistory);
        Task<IList<PurchaseHistoryDTO>> GetPurchaseHistoriesMonthByUser(string userId, int month, int year);
        Task<IList<PurchaseHistoryDTO>> GetPurchaseHistoriesYearByUser(string userId, int year);
        Task<IList<PurchaseHistoryDTO>> GetPurchaseHistoriesAllByUser(string userId);
        Task<IList<PurchaseHistoryResponse>> GetRevenueMonth(int month, int year);
        Task<IList<PurchaseHistoryResponse>> GetRevenueYear(int year);
    }
}
