using Bot.DbContext;
using Bot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bot.Middleware
{
    public class DataSeeding
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
                if (context != null)
                {
                    if (context.Database.GetPendingMigrations().Any())
                    {
                        context.Database.Migrate();
                    }
                    await InitializeRoles(scope.ServiceProvider, context);
                }
            }
        }
        private static async Task InitializeRoles(IServiceProvider serviceProvider, MyDbContext context)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            string[] roles = { "Admin", "User" };

            foreach (string role in roles)
            {
                if (!context.Roles.Any(r => r.Name == role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
            await InitializeUsers(serviceProvider, context, roles);
        }
        private static async Task InitializeUsers(IServiceProvider serviceProvider, MyDbContext context, string[] roles)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();

            var user = new User
            {
                Fullname = "Ly Duc Minh",
                Email = "ducminh200692@gmail.com",
                NormalizedEmail = "ducminh200692@gmail.com",
                UserName = "0936793913",
                NormalizedUserName = "0936793913",
                PhoneNumber = "0936793913",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ServiceEndDate = DateTimeOffset.Now.AddYears(30),
            };

            if (!context.Users.Any(u => u.UserName == user.UserName))
            {
                await userManager.CreateAsync(user, "Minh@123");
                await userManager.AddToRolesAsync(user, roles);
            }
        }
    }
}
