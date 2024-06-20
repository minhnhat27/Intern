using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bot.Models
{
    public class ProfitLoss
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProfitLossId { get; set; }
        public double Price { get; set; }
        public DateOnly Date {  get; set; }
        public string? UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
