using Bot.DTO;
using Bot.Request;
using Bot.Response;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;

namespace Bot.Services
{
    public interface IAuthService
    {
        Task<JwtResponse?> Login(LoginRequest request);
        Task<IdentityResult> Register(RegisterRequest request);
        Task<TokenModel?> RefreshToken(TokenModel token);
        Task Logout(TokenModel token);
    }
}
