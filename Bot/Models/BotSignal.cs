using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bot.Models
{
    public class BotSignal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SignalID { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly Time { get; set; }
        public string Signal { get; set; }

        [Range(0, double.MaxValue)]
        public double Price { get; set; }
    }
}
