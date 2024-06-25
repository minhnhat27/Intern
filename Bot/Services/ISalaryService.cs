using Bot.DTO;

namespace Bot.Services
{
    public interface ISalaryService
    {
        Task<SalaryDTO> AddSalary(SalaryCreateDTO salary);
        Task<bool> DeleteSalary(int month, int year, string userId);
        Task<List<SalaryDTO>> GetSalaries();
        Task<SalaryDTO> UpdateSalary(int month, int year, string userId, SalaryUpdateDTO salary);
    }
}
