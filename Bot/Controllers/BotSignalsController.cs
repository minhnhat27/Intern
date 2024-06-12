using Bot.Data;
using Bot.Models;
using Bot.Services;
using Microsoft.AspNetCore.Http;
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

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendMessage([FromForm] string text)
        {
            Console.WriteLine(text);
            await _hubContext.Clients.All.SendAsync("Signal", text);

            return Ok();
        }


        /*
        #VN30F1M Ngay 6/7/2024 9:15:00 AM bot web
         Tin hieu long: Manh
         Gia ban: 1308
         Target 1: 1304.1
         Target 2: 1300.2
         Target 3: 1293.6
         Target 4: 1287.1
         Cat lo: 1311.9 
        */
    }
}
