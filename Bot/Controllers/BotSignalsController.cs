using Bot.Models;
using Bot.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bot.Controllers
{
    [Route("api/signal")]
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

    }
}
