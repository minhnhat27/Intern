﻿using Bot.Request;
using Bot.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bot.Controllers
{
    [Route("/api/logHistory")]
    [ApiController]
    public class LogHistoryController : ControllerBase
    {
        private readonly ILogHistoryService _logHistoryService;
        private readonly IConfiguration _configuration;

        public LogHistoryController(IConfiguration configuration, ILogHistoryService logHistoryService)
        {
            _configuration = configuration;
            _logHistoryService = logHistoryService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetLogHistory()
        {
            var result = await _logHistoryService.GetLogHistory();
            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddLogHistory([FromBody] LogHistoryRequest request)
        {
            try
            {
                var result = await _logHistoryService.AddLogHistory(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateLogHistory([FromBody] LogHistoryRequest request, int id) {
            try
            {
                if(request == null)
                {
                    return BadRequest("Vui lòng nhập giá trị cần thay đổi");
                }
                var result = await _logHistoryService.UpdateLogHistory(id,request);
                if (result != null)
                {
                    return Ok(result);
                }
                return BadRequest("Cập nhật thất bại");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteLogHistory(int id)
        {
            try
            {
                var result = await _logHistoryService.DeleteLogHistory(id);
                if (result)
                {
                    return Ok("Xóa thành công");
                }
                return BadRequest("Xóa thất bại");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
