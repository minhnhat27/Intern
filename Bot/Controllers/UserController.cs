using Microsoft.AspNetCore.Mvc;
using Bot.DTO;
using System.Threading.Tasks;
using Bot.Services.MiniServiceUser;

namespace Bot.Controllers
{
    [Route("/api/user")]
    [ApiController]
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
            catch (System.Exception ex)
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
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
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
                return NotFound("User not found");
            }
            catch (System.Exception ex)
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
            catch (System.Exception ex)
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
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
