using Microsoft.AspNetCore.Mvc;
using Bot.DTO;
using Bot.Services.MiniServiceUser;
using Microsoft.AspNetCore.Authorization;
using Bot.Request;
using Bot.Data;

namespace Bot.Controllers
{
    [Route("/api/user")]
    [ApiController]
    [Authorize(Roles ="Admin")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUser([FromBody] UserCreateDTO user)
        {
            try
            {
                var result = await _userService.AddUser(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                var result = await _userService.GetUsers();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("get/{userId}")]
        public async Task<IActionResult> GetUser(string userId)
        {
            try
            {
                var result = await _userService.GetUser(userId);
                if (result != null)
                {
                    return Ok(result);
                }
                return NotFound(ErrorMessage.USER_NOT_FOUND);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{userId}")]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO user, string userId)
        {
            try
            {
                var result = await _userService.UpdateUser(userId, user);
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

        [HttpDelete("delete/{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            try
            {
                var result = await _userService.DeleteUser(userId);
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

        [HttpPost("lockout")]
        public async Task<IActionResult> Lockout([FromBody] UserIdRequest request)
        {
            try
            {
                await _userService.LockoutUser(request.UserId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("unlock")]
        public async Task<IActionResult> Unlock([FromBody] UserIdRequest request)
        {
            try
            {
                await _userService.UnlockUser(request.UserId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
