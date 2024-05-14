using TradeBot.Models;

namespace TradeBot.Repository
{
    public interface IUserRepository
    {
        Task<User?> FindUserById(string id);
        Task<List<User>> GetAll();
        Task CreateUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(User user);
    }
}
