using Microsoft.EntityFrameworkCore;
using TradeBot.Data;
using TradeBot.Models;

namespace TradeBot.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _DbContext;
        public UserRepository(MyDbContext context) => _DbContext = context;
        public async Task CreateUser(User user)
        {
            await _DbContext.Users.AddAsync(user);
            await _DbContext.SaveChangesAsync();
        }

        public async Task DeleteUser(User user)
        {
            _DbContext.Remove(user);
            await _DbContext.SaveChangesAsync();
        }

        public async Task<User?> FindUserById(string id)
        {
            return await _DbContext.Users.FindAsync(id);
        }

        public async Task<List<User>> GetAll()
        {
            return await _DbContext.Users.ToListAsync();
        }

        public async Task UpdateUser(User user)
        {
            _DbContext.Update(user);
            await _DbContext.SaveChangesAsync();
        }
    }
}
