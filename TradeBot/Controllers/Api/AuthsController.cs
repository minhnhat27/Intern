using Microsoft.AspNetCore.Mvc;
using TradeBot.Data;
using TradeBot.Request;

namespace TradeBot.Controllers.Api
{
    [Route("api/auth")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly MyDbContext _DbContext;
        public AuthsController(MyDbContext context) => _DbContext = context;

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            //var user = _DbContext.Users.SingleOrDefault(e => e.Username == request.Username 
            //                && e.Password == request.Password);
            //if(user != null)
            //{
            //    return Ok(user);
            //}
            //else
            //{
            //    return NotFound();
            //}
            return Ok();
        }
    }
}
