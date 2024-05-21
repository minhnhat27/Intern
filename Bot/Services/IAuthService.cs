using Bot.DTO;
using Bot.Request;
using Microsoft.AspNetCore.Identity;

namespace Bot.Services
{
    public interface IAuthService
    {
        Task<TokenModel?> Login(LoginRequest request);
        Task<IdentityResult> Register(RegisterRequest request);
        Task<TokenModel?> RefreshToken(TokenModel token);

        Task Logout(string userId);
    }
}
