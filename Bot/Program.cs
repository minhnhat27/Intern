using Bot.Data;
using Bot.Middleware;
using Bot.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using Bot.Controllers;
using Bot.Services.MiniServiceExpense;
using Bot.Services.MiniServiceBotTrading;
using Bot.Services.MiniServiceSalary;
using Bot.Services.MiniServiceAuth;
using Bot.Services.MiniServiceBotSignal;
using Bot.Services.MiniServiceCaching;
using Bot.Services.MiniServiceLogHistory;
using Bot.Services.MiniServicePriceBot;
using Bot.Services.MiniServiceProfitLoss;
using Bot.Services.MiniServicePurchaseHistory;
using Bot.Services.MiniServiceSendMail;
using Bot.Services.MiniServiceUserBot;
using Bot.Services.MiniServiceUser;
using Bot.Services.MiniServiceStatistics;
using Bot.Services.MiniServiceRole;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(opt =>
{
    //opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    //opt.UseMySQL(builder.Configuration.GetConnectionString("MysqlCloudConnection") ?? "");
    opt.UseMySQL(builder.Configuration.GetConnectionString("MysqlCloudConnection") ?? "");
});
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddTokenProvider("Bot", typeof(DataProtectorTokenProvider<User>))
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidAudience = builder.Configuration.GetSection("JWT:Audience").Value,
        ValidIssuer = builder.Configuration.GetSection("JWT:Issuer").Value,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JWT:Key").Value ?? "")),
    };
    options.Events = new JwtBearerEvents()
    {
        OnTokenValidated = context =>
        {
            var versionClaim = context.Principal?.FindFirstValue(ClaimTypes.Version);
            if (versionClaim != null && versionClaim == "Refresh_Token")
            {
                context.Fail("Requests with refresh tokens are not allowed.");
            }

            return Task.CompletedTask;
        }
    };
});
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("MyCors", opt =>
    {
        opt.WithOrigins("https://smartpro.vps.com.vn",
            "https://smarteasy.vps.com.vn",
            "http://localhost:3000",
            "http://192.168.1.171:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<ICachingService, CachingService>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRoleService,RoleService>();
builder.Services.AddScoped<IBotSignalService, BotSignalService>();

builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
builder.Services.AddSingleton<ISendMailService, SendMailService>();

builder.Services.AddScoped<IExpenseService, ExpenseService>();
builder.Services.AddScoped<ILogHistoryService, LogHistoryService>();
builder.Services.AddScoped<IPriceBotService, PriceBotService>();
builder.Services.AddScoped<IBotTradingService, BotTradingService>();
builder.Services.AddScoped<IProfitLossService, ProfitLossService>();
builder.Services.AddScoped<IPurchaseHistoryService, PurchaseHistoryService>();
builder.Services.AddScoped<ISalaryService, SalaryService>();
builder.Services.AddScoped<IUserBotService, UserBotService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IStatisticsService, StatisticsService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

DataSeeding.Initialize(app.Services).Wait();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("MyCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<MessageHub>("/realtimeSignal");

app.MapGet("/", () => "Hello World!");

app.Run();
