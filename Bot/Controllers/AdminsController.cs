using Bot.Data;
using Bot.Request;
using Bot.Services.MiniServiceBotSignal;
using Bot.Services.MiniServiceCaching;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Globalization;

namespace Bot.Controllers
{
    [Route("api/admin")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminsController : ControllerBase
    {
        private readonly IHubContext<MessageHub> _hubContext;
        private readonly IBotSignalService _botSignalService;
        private readonly ICachingService _cachingService;
        public AdminsController(IHubContext<MessageHub> hubContext, IBotSignalService botSignalService, ICachingService cachingService)
        {
            _hubContext = hubContext;
            _botSignalService = botSignalService;
            _cachingService = cachingService;
        }

        [HttpPost("signal/add")]
        public async Task<IActionResult> AddSignal([FromBody] AdminSignalRequest request)
        {
            var dateTime = DateTime.Now;
            var DateTimeFormat = dateTime.ToString("yyyy-MM-dd HH:mm:ss");
            var signal = request.Status.ToUpper();

            var message = "";
            var messageResponse = "";

            if (request.Status == "CANCEL_ALL" || request.Status == "CANCEL_VITHE")
            {
                messageResponse = request.Status;
            }
            else if(request.Price == 0 && request.StopOrderValue != 0 && request.OrderNumber != 0)
            {
                messageResponse = "STOP_ORDER_ONLY\n" 
                    + request.Status + "\n" 
                    + request.OrderNumber + "\n"
                    + request.StopOrderValue;
            }
            else
            {
                CultureInfo culture = new CultureInfo("en-US");
                culture.NumberFormat.NumberDecimalSeparator = ".";

                if (request.Status == "SHORT")
                {
                    var catLo = Math.Round(request.Price * 1.003, 1);

                    if (request.StopOrderValue != 0)
                    {
                        catLo = Math.Round(request.StopOrderValue, 1);
                    }

                    message = $"#VN30 Ngay {DateTimeFormat} bot server\n"
                        + $"Tin hieu {signal.ToLower()}: Manh\n"
                        + $"Gia mua: {Math.Round(request.Price, 1).ToString(culture)}\n"
                        + $"Target 1: {Math.Round(request.Price * 0.997, 1).ToString(culture)}\n"
                        + $"Target 2: {Math.Round(request.Price * 0.994, 1).ToString(culture)}\n"
                        + $"Target 3: {Math.Round(request.Price * 0.989, 1).ToString(culture)}\n"
                        + $"Target 4: {Math.Round(request.Price * 0.984, 1).ToString(culture)}\n"
                        + $"Cat lo: {catLo.ToString(culture)}";
                }
                else
                {
                    var catLo = Math.Round(request.Price * 0.997, 1);

                    if (request.StopOrderValue != 0)
                    {
                        catLo = Math.Round(request.StopOrderValue, 1);
                    }

                    message = $"#VN30 Ngay {DateTimeFormat} bot server\n"
                        + $"Tin hieu {signal.ToLower()}: Manh\n"
                        + $"Gia mua: {Math.Round(request.Price, 1).ToString(culture)}\n"
                        + $"Target 1: {Math.Round(request.Price * 1.003, 1).ToString(culture)}\n"
                        + $"Target 2: {Math.Round(request.Price * 1.006, 1).ToString(culture)}\n"
                        + $"Target 3: {Math.Round(request.Price * 1.01, 1).ToString(culture)}\n"
                        + $"Target 4: {Math.Round(request.Price * 1.016, 1).ToString(culture)}\n"
                        + $"Cat lo: {catLo.ToString(culture)}";
                }

                messageResponse = _botSignalService.CacheSignal(signal, message);

                if (!message.Equals(messageResponse))
                {
                    messageResponse += request.StopOrderValue == 0
                        ? " NO_STOP_ORDER"
                        : " STOP_ORDER";
                }
                else
                {
                    messageResponse += request.StopOrderValue == 0
                        ? "\nNO_STOP_ORDER"
                        : "\nSTOP_ORDER";
                }

                if (request.OrderNumber != 0)
                {
                    messageResponse += " " + request.OrderNumber;
                }

                await _botSignalService.AddSignal(message);
                messageResponse = messageResponse.Replace(DateTimeFormat, dateTime.ToString("dd/MM/yyyy HH:mm:ss"));
            }

            await _hubContext.Clients.All.SendAsync("AdminSignal", messageResponse);

            return Ok();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (Path.GetExtension(file.FileName) != ".js")
                {
                    throw new Exception("File js only");
                }

                var path = Path.Combine(Directory.GetCurrentDirectory(), "Response", "script.js");
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }

        [HttpPost("upload-ext")]
        public async Task<IActionResult> UploadExt(IFormFile file)
        {
            try
            {
                if (Path.GetExtension(file.FileName) != ".rar")
                {
                    throw new Exception("File rar only");
                }

                var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ext.rar");
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }
    }
}
