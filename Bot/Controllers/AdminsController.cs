﻿using Bot.Data;
using Bot.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Globalization;

namespace Bot.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IHubContext<MessageHub> _hubContext;
        public AdminsController(IHubContext<MessageHub> hubContext) => _hubContext = hubContext;

        [HttpPost("signal/add")]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSignal([FromBody] AdminSignalRequest request)
        {
            var dateTime = DateTime.Now;
            var date = DateOnly.FromDateTime(dateTime);
            var time = TimeOnly.FromDateTime(dateTime);
            var message = "";
            if (request.Status != "CANCEL_ALL")
            {
                CultureInfo culture = new CultureInfo("en-US");
                culture.NumberFormat.NumberDecimalSeparator = ".";
                if (request.Status == "SHORT")
                {
                    message = $"#VN30 Ngay {date} {time} bot server\n"
                        + $"Tin hieu {request.Status.ToLower()}: Manh\n"
                        + $"Gia mua: {Math.Round(request.Price, 1).ToString(culture)}\n"
                        + $"Target 1: {Math.Round(request.Price * 0.997, 1).ToString(culture)}\n"
                        + $"Target 2: {Math.Round(request.Price * 0.994, 1).ToString(culture)}\n"
                        + $"Target 3: {Math.Round(request.Price * 0.989, 1).ToString(culture)}\n"
                        + $"Target 4: {Math.Round(request.Price * 0.984, 1).ToString(culture)}\n"
                        + $"Cat lo: {Math.Round(request.Price * 0.997, 1).ToString(culture)}";
                }
                if (request.Status == "LONG")
                {
                    message = $"#VN30 Ngay {date} {time} bot server\n"
                        + $"Tin hieu {request.Status.ToLower()}: Manh\n"
                        + $"Gia mua: {Math.Round(request.Price, 1).ToString(culture)}\n"
                        + $"Target 1: {Math.Round(request.Price * 1.003, 1).ToString(culture)}\n"
                        + $"Target 2: {Math.Round(request.Price * 1.006, 1).ToString(culture)}\n"
                        + $"Target 3: {Math.Round(request.Price * 1.01, 1).ToString(culture)}\n"
                        + $"Target 4: {Math.Round(request.Price * 1.016, 1).ToString(culture)}\n"
                        + $"Cat lo: {Math.Round(request.Price * 0.997, 1).ToString(culture)}";
                }
            }
            else
            {
                message = request.Status;
            }

            await _hubContext.Clients.All.SendAsync("AdminSignal", message);

            return Ok();
        }
    }
}