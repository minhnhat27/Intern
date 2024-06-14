using Bot.Data;
using Bot.Models;
using Bot.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(opt =>
{
    //opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
    //opt.UseMySQL(builder.Configuration.GetConnectionString("MysqlConnection") ?? "");
    opt.UseMySQL(builder.Configuration.GetConnectionString("MysqlCloudConnection") ?? "");
});
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddTokenProvider("Bot", typeof(DataProtectorTokenProvider<User>));

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
});
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("MyCors", opt =>
    {
        opt.WithOrigins("https://smartpro.vps.com.vn", "https://smarteasy.vps.com.vn", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddSignalR();

builder.Services.AddMemoryCache();
builder.Services.AddSingleton<ICachingService, CachingService>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IBotSignalService, BotSignalService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("MyCors");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<MessageHub>("/signal");
app.MapGet("/", () => "Hello World!");

app.Run();
