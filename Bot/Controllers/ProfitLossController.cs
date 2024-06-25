using Microsoft.AspNetCore.Mvc;
using Bot.Services;
using System.Threading.Tasks;
using Bot.DTO;

namespace Bot.Controllers
{
    [Route("/api/profitLoss")]
    [ApiController]
    public class ProfitLossController : ControllerBase
    {
        private readonly IProfitLossService _profitLossService;
        private readonly IConfiguration _configuration;

        public ProfitLossController(IConfiguration configuration, IProfitLossService profitLossService)
        {
            _configuration = configuration;
            _profitLossService = profitLossService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddProfitLoss([FromBody] ProfitLossCreateDTO profitLoss)
        {
            try
            {
                var result = await _profitLossService.AddProfitLoss(profitLoss);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetProfitLosses()
        {
            try
            {
                var result = await _profitLossService.GetProfitLosses();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProfitLoss([FromBody] ProfitLossUpdateDTO profitLoss, int id)
        {
            try
            {
                var result = await _profitLossService.UpdateProfitLoss(id, profitLoss);
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProfitLoss(int id)
        {
            try
            {
                var result = await _profitLossService.DeleteProfitLoss(id);
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
