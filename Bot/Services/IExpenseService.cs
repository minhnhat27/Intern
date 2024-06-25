using Bot.Request;
using Bot.Models;
namespace Bot.Services
{
    public interface IExpenseService
    {
        Task<Expense> AddExpense(ExpenseRequest expense);
        Task<Expense> UpdateExpense(int id,ExpenseRequest expense);
        Task<List<Expense>> GetExpenses();
        Task<bool> DeleteExpense(int id);

    }
}
