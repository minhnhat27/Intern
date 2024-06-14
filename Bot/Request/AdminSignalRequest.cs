namespace Bot.Request
{
    public class AdminSignalRequest
    {
        public float Price { get; set; } = 0;
        public int OrderNumber { get; set; } = 0;
        public string StopOrder { get; set; } = "";
        public float StopOrderValue { get; set; } = 0;
        public string Status { get; set; }
    }
}
