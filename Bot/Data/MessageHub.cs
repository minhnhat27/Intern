using Microsoft.AspNetCore.SignalR;

namespace Bot.Data
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("Signal", message);
        }
    }
}
