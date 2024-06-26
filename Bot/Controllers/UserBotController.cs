using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Bot.DTO;
using Bot.Services.MiniServiceUserBot;

namespace Bot.Controllers
{
    [Route("/api/userBot")]
    [ApiController]
    public class UserBotController : ControllerBase
    {
        private readonly IUserBotService _userBotService;
        private readonly IConfiguration _configuration;

        public UserBotController(IConfiguration configuration, IUserBotService userBotService)
        {
            _configuration = configuration;
            _userBotService = userBotService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUserBot([FromBody] UserBotCreateDTO userBot)
        {
            try
            {
                var result = await _userBotService.AddUserBot(userBot);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetUserBots()
        {
            try
            {
                var result = await _userBotService.GetUserBots();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{userId}/{botTradingId}")]
        public async Task<IActionResult> GetUserBot(string userId, int botTradingId)
        {
            try
            {
                var result = await _userBotService.GetUserBot(userId, botTradingId);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound("UserBot not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{userId}/{botTradingId}")]
        public async Task<IActionResult> DeleteUserBot(string userId, int botTradingId)
        {
            try
            {
                var result = await _userBotService.DeleteUserBot(userId, botTradingId);
                if (result)
                {
                    return Ok("Delete successful");
                }
                return BadRequest("Delete failed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
