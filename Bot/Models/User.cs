using Microsoft.AspNetCore.Identity;

namespace Bot.Models
{
    public class User : IdentityUser
    {
        public string Fullname { get; set; }
    }
}
