﻿namespace Bot.DTO
{
    public class PriceBotDTO
    {
        public int Month { get; set; }
        public double Price { get; set; }
        public int Discount { get; set; }
        public int BotTradingId { get; set; }
    }

    public class PriceBotCreateDTO
    {
        public int Month { get; set; }
        public double Price { get; set; }
        public int Discount { get; set; }
        public int BotTradingId { get; set; }
    }

    public class PriceBotUpdateDTO
    {
        public double Price { get; set; }
        public int Discount { get; set; }
    }
}
