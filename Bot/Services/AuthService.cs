﻿using Bot.DTO;
using Bot.Models;
using Bot.Request;
using Microsoft.AspNetCore.Identity;
using Microsoft.DotNet.Scaffolding.Shared;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Bot.Services
{
    public class AuthService : IAuthService
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        public AuthService(SignInManager<User> signInManager,
            UserManager<User> userManager, IConfiguration configuration)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = configuration;
        }
        private async Task<string> CreateJwtToken(User user, DateTime time)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email ?? "")
            };
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWT:Key"] ?? ""));

            var jwtToken = new JwtSecurityToken(
                    issuer: _config["JWT:Issuer"],
                    audience: _config["JWT:Audience"],
                    claims: claims,
                    expires: time,
                    signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        public async Task<TokenModel?> Login(LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                if (user != null)
                {
                    var access_token = await CreateJwtToken(user, DateTime.UtcNow.AddMinutes(5));

                    var provider = "Bot";
                    var name = "Refresh_Token";

                    await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
                    var refresh_token = await _userManager.GenerateUserTokenAsync(user, provider, name);
                    await _userManager.SetAuthenticationTokenAsync(user, provider, name, refresh_token);

                    return new TokenModel
                    {
                        Access_token = access_token,
                        Refresh_token = refresh_token
                    };
                }
                return null;
            }
            return null;
        }

        public async Task<TokenModel?> RefreshToken(TokenModel token)
        {
            var parameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateLifetime = false,
                ValidAudience = _config["JWT:Audience"],
                ValidIssuer = _config["JWT:Issuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["JWT:Key"] ?? ""))
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token.Access_token, parameters, out SecurityToken securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;

            var user = await _userManager.FindByIdAsync(principal.FindFirstValue(ClaimTypes.NameIdentifier) ?? "");
            if (user == null || jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid access token");

            var provider = "Bot";
            var name = "Refresh_Token";

            var access_token = await CreateJwtToken(user, DateTime.UtcNow.AddMinutes(5));
            var isValid = await _userManager.VerifyUserTokenAsync(user, provider, name, token.Refresh_token ?? "");
            if (!isValid)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }

            await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
            var refresh_token = await _userManager.GenerateUserTokenAsync(user, provider, name);
            await _userManager.SetAuthenticationTokenAsync(user, provider, name, refresh_token);

            return new TokenModel
            {
                Access_token = access_token,
                Refresh_token = refresh_token
            };
        }

        public async Task<IdentityResult> Register(RegisterRequest request)
        {
            var User = new User()
            {
                Email = request.Email,
                NormalizedEmail = request.Email,
                UserName = request.PhoneNumber,
                NormalizedUserName = request.PhoneNumber,
                PhoneNumber = request.PhoneNumber,
                Fullname = request.Name,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
            };
            return await _userManager.CreateAsync(User, request.Password);

        }

        public async Task Logout(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                throw new Exception("User not found");
            }
            var provider = "Bot";
            var name = "Refresh_Token";
            await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
            await _userManager.UpdateSecurityStampAsync(user);
            await _signInManager.SignOutAsync();
        }
    }
}