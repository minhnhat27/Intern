using Bot.DTO;
namespace Bot.Services
{
    public interface IPurchaseHistoryService
    {
        Task<PurchaseHistoryDTO> AddPurchaseHistory(PurchaseHistoryCreateDTO purchaseHistory);
        Task<bool> DeletePurchaseHistory(int id);
        Task<List<PurchaseHistoryDTO>> GetPurchaseHistories();
        Task<PurchaseHistoryDTO> UpdatePurchaseHistory(int id, PurchaseHistoryUpdateDTO purchaseHistory);
    }
}
