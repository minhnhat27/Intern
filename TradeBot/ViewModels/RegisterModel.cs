using System.ComponentModel.DataAnnotations;

namespace TradeBot.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Vui lòng nhập họ và tên")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập xác nhận mật khẩu")]
        [Compare("Password", ErrorMessage = "Mật khẩu xác nhận không khớp")]
        public string ConfirmPassword { get; set; }
    }
}
