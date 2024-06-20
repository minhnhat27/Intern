using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bot.Models
{
    public class PurchaseHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseId { get; set; }
        public double PriceBot {  get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public DateTime Date {  get; set; }
        public string UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
