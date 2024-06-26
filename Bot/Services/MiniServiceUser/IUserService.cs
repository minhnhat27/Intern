using Bot.DTO;
namespace Bot.Services.MiniServiceUser
{
    public interface IUserService
    {
        Task<UserDTO> AddUser(UserCreateDTO user);
        Task<bool> DeleteUser(string userId);
        Task<List<UserDTO>> GetUsers();
        Task<UserDTO> GetUser(string userId);
        Task<UserDTO> UpdateUser(string userId, UserUpdateDTO user);
    }
}
