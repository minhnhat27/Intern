using Bot.Data;
using Bot.Models;
using Bot.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace Bot.Middleware
{
    public class AuthJwt
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        public AuthJwt(RequestDelegate requestDelegate, IConfiguration configuration)
        {
            _next = requestDelegate;
            _config = configuration;
        }

        public string? ValidateToken(string token, bool validateLifetime)
        {
            var parameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateLifetime = validateLifetime,
                ValidAudience = _config["JWT:Audience"],
                ValidIssuer = _config["JWT:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWT:Key"] ?? ""))
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, parameters, out SecurityToken securityToken);
            JwtSecurityToken jwtSecurityToken = (JwtSecurityToken)securityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid Refresh token");

            return principal.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public async Task InvokeAsync(HttpContext context, MyDbContext dbContext)
        {
            if(context.Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
            {
                var tokenBearer = authorizationHeader.ToString().Substring("Bearer ".Length).Trim();
                var userId = ValidateToken(tokenBearer, true);
                if (userId != null)
                {
                    var user = await dbContext.Users.FindAsync(userId);
                    if (user != null)
                    {
                        var token = await dbContext.UserTokens.FindAsync(userId, "Bot", "Refresh_Token");
                        if (token != null && tokenBearer == token.Value)
                        {
                            return;
                        }
                    }
                }
            }

            await _next(context);
        }
    }
}
