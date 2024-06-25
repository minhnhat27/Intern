using Microsoft.AspNetCore.Mvc;
using Bot.DTO;
using Bot.Services;
using System.Threading.Tasks;

namespace Bot.Controllers
{
    [Route("/api/priceBot")]
    [ApiController]
    public class PriceBotController : ControllerBase
    {
        private readonly IPriceBotService _priceBotService;
        private readonly IConfiguration _configuration;

        public PriceBotController(IConfiguration configuration, IPriceBotService priceBotService)
        {
            _configuration = configuration;
            _priceBotService = priceBotService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPriceBot([FromBody] PriceBotCreateDTO priceBot)
        {
            try
            {
                var result = await _priceBotService.AddPriceBot(priceBot);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetPriceBots()
        {
            try
            {
                var result = await _priceBotService.GetPriceBots();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{month}/{botTradingId}")]
        public async Task<IActionResult> GetPriceBot(int month, int botTradingId)
        {
            try
            {
                var result = await _priceBotService.GetPriceBot(month, botTradingId);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound("PriceBot not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{month}/{botTradingId}")]
        public async Task<IActionResult> UpdatePriceBot([FromBody] PriceBotUpdateDTO priceBot, int month, int botTradingId)
        {
            try
            {
                var result = await _priceBotService.UpdatePriceBot(month, botTradingId, priceBot);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Update failed");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{month}/{botTradingId}")]
        public async Task<IActionResult> DeletePriceBot(int month, int botTradingId)
        {
            try
            {
                var result = await _priceBotService.DeletePriceBot(month, botTradingId);
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
