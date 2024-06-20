using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bot.Models
{
    public class Expense
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ExpenseId { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public DateOnly Date {  get; set; }
        public string Description { get; set; }

    }
}
