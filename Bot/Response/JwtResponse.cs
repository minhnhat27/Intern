﻿namespace Bot.Response
{
    public class JwtResponse
    {
        public string Access_token { get; set; }
        public string Refresh_token { get; set; }
        public string? Name { get; set; }
        public IEnumerable<string> Roles { get; set; } = [];
    }
}
