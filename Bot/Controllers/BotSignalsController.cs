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
        private readonly IHubContext<MessageHub> _hubContext;
        private readonly IConfiguration _configuration;
        public BotSignalsController(IBotSignalService botSignalService,
            IHubContext<MessageHub> hubContext,
            IConfiguration configuration)
        {
            _botSignalService = botSignalService;
            _hubContext = hubContext;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetSignals()
        {
            return Ok(await _botSignalService.GetSignals());
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendMessage([FromForm] SendMessageRequest request)
        {
            try
            {
                if (request.Key != _configuration["MessageToken"])
                {
                    return BadRequest();
                }
                else
                {
                    var message = request.Text.Split('\n');
                    var signal = message[1].Trim() == "Tin hieu long: Manh" ? "LONG" : "SHORT";

                    var messageResponse = _botSignalService.CacheSignal(signal, request.Text);

                    await _hubContext.Clients.All.SendAsync("Signal", messageResponse);
                    await _botSignalService.AddSignal(request.Text);

                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
