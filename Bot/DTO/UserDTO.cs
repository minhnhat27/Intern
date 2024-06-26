namespace Bot.DTO
{
    public class UserDTO
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        // Add other properties as needed
    }

    public class UserCreateDTO
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Fullname { get; set; }
        public string Password { get; set; }
        // Add other properties as needed
    }

    public class UserUpdateDTO
    {
        public string Email { get; set; }
        public string Fullname { get; set; }
        // Add other properties as needed
    }
}
