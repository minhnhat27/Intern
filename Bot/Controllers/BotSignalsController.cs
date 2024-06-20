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
        private readonly IConfiguration _configuration;
        public BotSignalsController(IBotSignalService botSignalService, 
            ICachingService cachingService,
            IHubContext<MessageHub> hubContext,
            IConfiguration configuration)
        {
            _botSignalService = botSignalService;
            _cachingService = cachingService;
            _hubContext = hubContext;
            _configuration = configuration;
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
        public async Task<IActionResult> SendMessage([FromForm] SendMessageRequest request)
        {
            if(request.Key != _configuration["MessageToken"])
            {
                return BadRequest();
            }
            else
            {
                var now = TimeOnly.FromDateTime(DateTime.Now);
                var noon = new TimeOnly(12, 00);
                var message = request.Text.Split('\n');
                var signal = message[1].Trim() == "Tin hieu long: Manh" ? "LONG" : "SHORT";

                if (now < noon)
                {
                    if (_cachingService.Get<string>("Morning") != null
                        && _cachingService.Get<string>("Morning") != signal)
                    {
                        request.Text += "\nREVERSE";
                    }
                    _cachingService.Set("Morning", signal, TimeSpan.FromHours(3));
                }
                else
                {
                    if (_cachingService.Get<string>("Afternoon") != null
                        && _cachingService.Get<string>("Afternoon") != signal)
                    {
                        request.Text += "\nREVERSE";
                    }
                    _cachingService.Set("Afternoon", signal, TimeSpan.FromHours(3));
                }

                await _hubContext.Clients.All.SendAsync("Signal", request.Text);
                //await _botSignalService.AddSignal(text);

                return Ok();
            }
        }
    }
}
