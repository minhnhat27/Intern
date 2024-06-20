using Bot.DTO;
using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NuGet.Common;
using System.Security.Claims;
using static System.Net.WebRequestMethods;

namespace Bot.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _configuration;
        public AuthsController(IAuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var result = await _authService.Login(request);
                if (result != null)
                {
                    return Ok(result);
                }
                else return Unauthorized("Tên tài khoản hoặc mật khẩu không chính xác");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                var result = await _authService.Register(request);
                if (result.Succeeded)
                {
                    return NoContent();
                }
                else return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenModel token)
        {
            try
            {
                var result = await _authService.RefreshToken(token);
                if (result != null)
                {
                    return Ok(result);
                }
                else return Unauthorized("Invalid attempt!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] TokenModel token)
        {
            try
            {
                await _authService.Logout(token);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("router")]
        public IActionResult Router()
        {
            //var referer = Request.Headers["Referer"].ToString();
            //if (string.IsNullOrEmpty(referer))
            //{
            //    return BadRequest();
            //}
            //else
            //{
            //    var path = Path.Combine(Directory.GetCurrentDirectory(), "Response", "script.js");
            //    var script = System.IO.File.ReadAllText(path);

            //    return Content(script);
            //}
            try
            {
                //var path = Path.Combine(Directory.GetCurrentDirectory(), "Response", "script.js");
                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "script.js");
                var script = System.IO.File.ReadAllText(path);

                return Content(script);
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("send-code")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var result = await _authService.SendPasswordResetTokenAsync(request.Email);
            if (!result)
            {
                return BadRequest("Failed to send reset token.");
            }

            return Ok("Reset token sent.");
        }

        [HttpPost("confirm-code")]
        public IActionResult VerifyResetToken([FromBody] VerifyResetTokenRequest request)
        {
            var result = _authService.VerifyResetToken(request.Email, request.Token);
            if(!result)
            {
                return BadRequest("Invalid or expired reset token.");
            }
            return Ok("Reset token verified");
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ConfirmResetPassword([FromBody] ConfirmResetPasswordRequest request)
        {
            var result = await _authService.ResetPasswordAsync(request.Email, request.Token, request.NewPassword);
            if (!result)
            {
                return BadRequest("Failed to reset password.");
            }

            return Ok("Password has been reset.");
        }
    }
}
