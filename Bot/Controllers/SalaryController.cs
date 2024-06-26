using Bot.DTO;
using Bot.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bot.Controllers
{
    [Route("/api/salary")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;
        private readonly IConfiguration _configuration;

        public SalaryController(IConfiguration configuration, ISalaryService salaryService)
        {
            _configuration = configuration;
            _salaryService = salaryService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddSalary([FromBody] SalaryCreateDTO salary)
        {
            try
            {
                var result = await _salaryService.AddSalary(salary);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetSalaries()
        {
            try
            {
                var result = await _salaryService.GetSalaries();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{month}/{year}/{userId}")]
        public async Task<IActionResult> UpdateSalary([FromBody] SalaryUpdateDTO salary, int month, int year, string userId)
        {
            try
            {
                var result = await _salaryService.UpdateSalary(month, year, userId, salary);
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

        [HttpDelete("delete/{month}/{year}/{userId}")]
        public async Task<IActionResult> DeleteSalary(int month, int year, string userId)
        {
            try
            {
                var result = await _salaryService.DeleteSalary(month, year, userId);
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
