using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Bot.Models
{
    [PrimaryKey(nameof(Month), nameof(BotTradingId))]
    public class PriceBot
    {
        public int Month { get; set; }
        public double Price { get; set; }
        public int Discount { get; set; }
        public int BotTradingId { get; set; }
        public BotTrading BotTrading { get; set; } 

    }
}
