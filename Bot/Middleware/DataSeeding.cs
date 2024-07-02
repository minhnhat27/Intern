using Bot.Data;
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
                Fullname = "Admin",
                Email = "minhnhat012340@gmail.com",
                NormalizedEmail = "minhnhat012340@gmail.com",
                UserName = "0123456789",
                NormalizedUserName = "0123456789",
                PhoneNumber = "0123456789",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ServiceEndDate = DateTime.Now.AddYears(1),
            };

            if (!context.Users.Any(u => u.UserName == user.UserName))
            {
                await userManager.CreateAsync(user, "Admin@123");
                await userManager.AddToRolesAsync(user, roles);
            }
        }
    }
}
