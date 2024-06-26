using Bot.DTO;
using Bot.Request;
using Bot.Response;
using Microsoft.AspNetCore.Identity;

namespace Bot.Services
{
    public interface IAuthService
    {
        Task<JwtResponse?> Login(LoginRequest request);
        Task<IdentityResult> Register(RegisterRequest request);
        Task<TokenModel?> RefreshToken(TokenModel token);
        Task Logout(TokenModel token);
        Task<bool> SendPasswordResetTokenAsync(string email);
        bool VerifyResetToken(string email, string token);
        Task<bool> ResetPasswordAsync(string email, string token, string newPassword);
        Task<bool> SendRegisterTokenAsync(string email);
    }
}
