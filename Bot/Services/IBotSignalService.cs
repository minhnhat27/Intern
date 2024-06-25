﻿using Bot.Models;
using Bot.Request;
using Bot.Response;

namespace Bot.Services
{
    public interface IBotSignalService
    {
        Task<IList<SignalResponse>> GetSignals();
        Task AddSignal(string text);
        string CacheSignal(string signal, string message);
    }
}
