using Bot.DTO;
using Bot.Request;
using Bot.Response;
using Microsoft.AspNetCore.Identity;

namespace Bot.Services.MiniServiceAuth
{
    public interface IAuthService
    {
        Task<JwtResponse?> Login(LoginRequest request, bool isExtension);
        Task<IdentityResult> Register(RegisterRequest request);
        Task<TokenModel> RefreshToken(TokenModel token, bool isExtension);
        Task Logout(TokenModel token);
        Task<bool> SendPasswordResetTokenAsync(string email);
        bool VerifyResetToken(string email, string token);
        Task<bool> ResetPasswordAsync(string email, string token, string newPassword);
        Task<bool> SendRegisterTokenAsync(string email);
    }
}
