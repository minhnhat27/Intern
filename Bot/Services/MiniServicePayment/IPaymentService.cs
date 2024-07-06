﻿using Bot.Request;

namespace Bot.Services.MiniServicePayment
{
    public interface IPaymentService
    {
        Task<string> CreatePaymentLink(PaymentRequest request);
        Task CheckPayment(string userId);
    }
}
