﻿using Bot.DTO;
using Bot.Models;
using Bot.Request;
using Bot.Response;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
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
        private readonly ILogger<AuthService> _logger;
        private readonly ISendMailService _emailSender;
        private readonly ICachingService _cachingService;
        public AuthService(SignInManager<User> signInManager,
            UserManager<User> userManager, IConfiguration configuration, ILogger<AuthService> logger, ISendMailService emailSender, ICachingService cachingService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = configuration;
            _logger = logger;
            _emailSender = emailSender;
            _cachingService = cachingService;
        }
        private async Task<string> CreateJwt(User user, DateTime time)
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

        public async Task<JwtResponse?> Login(LoginRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, false);
            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(request.Username);
                if (user != null)
                {
                    var access_token = await CreateJwt(user, DateTime.UtcNow.AddMinutes(5));
                    var refresh_token = await CreateJwt(user, DateTime.UtcNow.AddDays(30));

                    var provider = "Bot";
                    var name = "Refresh_Token";

                    await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
                    //var refresh_token = await _userManager.GenerateUserTokenAsync(user, provider, name);
                    await _userManager.SetAuthenticationTokenAsync(user, provider, name, refresh_token);

                    return new JwtResponse
                    {
                        Access_token = access_token,
                        Refresh_token = refresh_token,
                        Name = user.Fullname,
                    };
                }
                throw new ArgumentNullException();
            }
            return null;
        }

        private string? ValidateToken(string token, out JwtSecurityToken jwtSecurityToken)
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
            var principal = tokenHandler.ValidateToken(token, parameters, out SecurityToken securityToken);
            jwtSecurityToken = (JwtSecurityToken) securityToken;

            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid Refresh token");

            return principal.FindFirstValue(ClaimTypes.NameIdentifier);
        }

        public async Task<TokenModel?> RefreshToken(TokenModel token)
        {
            var userId = ValidateToken(token.Refresh_token, out JwtSecurityToken jwtSecurityToken);
            if (userId == null)
            {
                throw new ArgumentNullException();
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentNullException();
            }

            var provider = "Bot";
            var name = "Refresh_Token";

            var access_token = await CreateJwt(user, DateTime.UtcNow.AddMinutes(5));
            var refresh_token = await CreateJwt(user, jwtSecurityToken.ValidTo);

            await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
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
                Id = Guid.NewGuid().ToString(),
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

        public async Task Logout(TokenModel token)
        {
            var userId = ValidateToken(token.Refresh_token, out JwtSecurityToken jwtSecurityToken);
            if (userId == null)
            {
                throw new ArgumentNullException();
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentNullException();
            }
            var provider = "Bot";
            var name = "Refresh_Token";
            await _userManager.RemoveAuthenticationTokenAsync(user, provider, name);
            await _userManager.UpdateSecurityStampAsync(user);
            await _signInManager.SignOutAsync();
        }

        public async Task<bool> SendPasswordResetTokenAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null) return false;

            var token = new Random().Next(100000, 999999).ToString();
            _cachingService.Set(email, token, TimeSpan.FromMinutes(5));

            var message = $"Your password reset code is: {token}";
            await _emailSender.SendEmailAsync(email, "Reset Password", message);

            return true;
        }

        public bool VerifyResetToken(string email, string token)
        {
            var cachedToken = _cachingService.Get<string>(email);
            if (cachedToken == null || cachedToken != token) return false;
            else
            {   
                return true;
            }
        }

        public async Task<bool> ResetPasswordAsync(string email, string token, string newPassword)
        {
            var isTokenValid = VerifyResetToken(email, token);
            if (!isTokenValid) return false;

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var t = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, t, newPassword);
            await _userManager.UpdateSecurityStampAsync(user);
            _cachingService.Remove(email);
            return result.Succeeded;
        }
    }
}
