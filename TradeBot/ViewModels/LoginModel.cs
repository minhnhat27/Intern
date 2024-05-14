using System.ComponentModel.DataAnnotations;

namespace TradeBot.ViewModels
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        public string Password { get; set; }
    }
}
