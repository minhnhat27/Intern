using Bot.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace Bot.Response
{
    public class LogHistoryResponse
    {
        public int LogHistoryId { get; set; }
        public string Signal { get; set; }
        public double ProfitPointTP { get; set; }
        public bool IsSL { get; set; }
        public DateTime DateTime { get; set; }
        public string? UserId { get; set; }
    }
}
