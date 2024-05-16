using Microsoft.AspNetCore.Identity;

namespace Bot.Models
{
    public class User : IdentityUser<int>
    {
        public string Fullname { get; set; }
        public ICollection<Order> Orders { get; } = new HashSet<Order>();
    }
}
