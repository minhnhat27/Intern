using Bot.DTO;

namespace Bot.Services.MiniServiceProfitLoss
{
    public interface IProfitLossService
    {
        Task<ProfitLossDTO> AddProfitLoss(ProfitLossCreateDTO profitLoss);
        Task<bool> DeleteProfitLoss(int id);
        Task<List<ProfitLossDTO>> GetProfitLosses();
        Task<ProfitLossDTO> UpdateProfitLoss(int id, ProfitLossUpdateDTO profitLoss);
    }
}
