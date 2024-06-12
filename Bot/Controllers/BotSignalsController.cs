using Bot.Data;
using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Bot.Controllers
{
    [Route("api/signal")]
    [ApiController]
    public class BotSignalsController : ControllerBase
    {
        private readonly IBotSignalService _botSignalService;
        private readonly ICachingService _cachingService;
        private readonly IHubContext<MessageHub> _hubContext;

        public BotSignalsController(IBotSignalService botSignalService, 
            ICachingService cachingService,
            IHubContext<MessageHub> hubContext)
        {
            _botSignalService = botSignalService;
            _cachingService = cachingService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetSignals()
        {
            return Ok(await _botSignalService.GetSignals());
        }
        [HttpPost("addSignal")]
        public async Task<IActionResult> AddSignal(AddSignalRequest request)
        {
            var result = await _botSignalService.AddSignal(request);
            if (result)
            {
                return Ok();
            }
            return BadRequest(result);
        }
        [HttpPost("addSignals")]
        public async Task<IActionResult> AddSignals(List<AddSignalRequest> requests)
        {
            var result = await _botSignalService.AddSignals(requests);
            if (result)
            {
                return Ok();
            }
            return BadRequest(result);
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendMessage([FromForm] string text)
        {
            Console.WriteLine(text);
            await _hubContext.Clients.All.SendAsync("Signal", text);
            await _botSignalService.AddSignal(text);

            return Ok();
        }
    }
}
