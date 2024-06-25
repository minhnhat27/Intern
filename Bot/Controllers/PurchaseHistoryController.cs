using Microsoft.AspNetCore.Mvc;
using Bot.DTO;
using Bot.Services;
using System.Threading.Tasks;

namespace Bot.Controllers
{
    [Route("/api/purchaseHistory")]
    [ApiController]
    public class PurchaseHistoryController : ControllerBase
    {
        private readonly IPurchaseHistoryService _purchaseHistoryService;
        private readonly IConfiguration _configuration;

        public PurchaseHistoryController(IConfiguration configuration, IPurchaseHistoryService purchaseHistoryService)
        {
            _configuration = configuration;
            _purchaseHistoryService = purchaseHistoryService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPurchaseHistory([FromBody] PurchaseHistoryCreateDTO purchaseHistory)
        {
            try
            {
                var result = await _purchaseHistoryService.AddPurchaseHistory(purchaseHistory);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetPurchaseHistories()
        {
            try
            {
                var result = await _purchaseHistoryService.GetPurchaseHistories();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdatePurchaseHistory([FromBody] PurchaseHistoryUpdateDTO purchaseHistory, int id)
        {
            try
            {
                var result = await _purchaseHistoryService.UpdatePurchaseHistory(id, purchaseHistory);
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
        public async Task<IActionResult> DeletePurchaseHistory(int id)
        {
            try
            {
                var result = await _purchaseHistoryService.DeletePurchaseHistory(id);
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
