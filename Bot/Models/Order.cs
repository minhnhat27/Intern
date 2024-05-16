using System.ComponentModel.DataAnnotations;

namespace Bot.Models
{
    public class Order
    {
        public int Id { get; set; }
        [MaxLength(100)]
        public string Name { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
