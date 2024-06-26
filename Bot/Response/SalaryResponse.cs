using Bot.Models;

namespace Bot.Response
{
    public class SalaryResponse
    {
        public IList<Salary> SalaryList {  get; set; }
        public double Total { get; set; }
    }
}
