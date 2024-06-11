using Azure.Core;
using Bot.Models;
using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bot.Controllers
{
    [Route("api/botsignal")]
    [ApiController]
    public class BotSignalsController : ControllerBase
    {
        private readonly IBotSignalService _botSignalService;
        public BotSignalsController(IBotSignalService botSignalService) => _botSignalService = botSignalService;
        [HttpGet]
        public async Task<IActionResult> GetSignals()
        {
            return Ok(await _botSignalService.GetSignals());
        }
        [HttpPost("signal")]
        public async Task<IActionResult> AddSignal(AddSignalRequest request)
        {
            var result = await _botSignalService.AddSignal(request);
            if (result)
            {
                return Ok();
            }
            return BadRequest(result);
        }
        [HttpPost("signals")]
        public async Task<IActionResult> AddSignals(List<AddSignalRequest> requests)
        {
            var result = await _botSignalService.AddSignals(requests);
            if (result)
            {
                return Ok();
            }
            return BadRequest(result);
        }

    }
}
