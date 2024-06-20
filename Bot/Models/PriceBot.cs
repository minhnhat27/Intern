using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Bot.Models
{
    public class PriceBot
    {
        [Key]
        public int Month { get; set; }
        public double Price { get; set; }
        public int Discount { get; set; }
        [ForeignKey("BotTrading")]
        public int BotId { get; set; }
        public BotTrading? BotTrading{ get; set; }

    }
}
