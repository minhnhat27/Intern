﻿using Microsoft.AspNetCore.Mvc;
using Bot.Data;
using Bot.Request;
using Bot.Services;
namespace Bot.Controllers
{
    [Route("/api/expense")]
    [ApiController]
    public class ExpenseControlller : ControllerBase
    {
        private readonly IExpenseService _expenseService;
        private readonly IConfiguration _configuration;

        public ExpenseControlller(IConfiguration configuration, IExpenseService expenseService)
        {
            _configuration = configuration;
            _expenseService = expenseService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddExpense([FromBody] ExpenseRequest expense)
        {
            try
            {
                var result = await _expenseService.AddExpense(expense);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetExpense()
        {
            try
            {
                var result = await _expenseService.GetExpenses();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateExpense([FromBody] ExpenseRequest expense, int id)
        {
            try
            {
                if (expense == null)
                {
                    return BadRequest("Vui lòng nhập giá trị cần thay đổi");
                }
                else
                {
                    var result = await _expenseService.UpdateExpense(id, expense);
                    if (result!=null)
                    {
                        return Ok(result);
                    }
                    return BadRequest("Cập nhật thất bại");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteExpense(int id) {
            try
            {
                var result = await _expenseService.DeleteExpense(id);
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
