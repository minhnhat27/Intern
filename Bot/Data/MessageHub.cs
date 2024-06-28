using Microsoft.AspNetCore.SignalR;

namespace Bot.Data
{
    public class MessageHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("Signal", message);
        }
        public async Task AdminSendMessage(string message)
        {
            await Clients.All.SendAsync("AdminSignal", message);
        }
        public async Task ServerMessage(string message)
        {
            await Clients.All.SendAsync("ServerMessage", message);
        }
    }
}
