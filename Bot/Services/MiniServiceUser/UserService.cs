using Bot.DTO;
using Bot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Bot.Services.MiniServiceUser
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<UserDTO> AddUser(UserCreateDTO user)
        {
            var entity = new User
            {
                UserName = user.UserName,
                Email = user.Email,
                Fullname = user.Fullname,
                // Set other properties
            };
            var result = await _userManager.CreateAsync(entity, user.Password);
            if (result.Succeeded)
            {
                return new UserDTO
                {
                    UserId = entity.Id,
                    UserName = entity.UserName,
                    Email = entity.Email,
                    Fullname = entity.Fullname,
                    // Map other properties
                };
            }
            else
            {
                throw new Exception(string.Join("; ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task<bool> DeleteUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                return result.Succeeded;
            }
            return false;
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userDtos = new List<UserDTO>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDTO
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    Fullname = user.Fullname,
                    Roles = roles
                    // Map other properties
                };
                userDtos.Add(userDto);
            }

            return userDtos;
        }


        //public async Task<List<UserDTO>> GetUsers()
        //{
        //    var users = await _userManager.Users.ToListAsync();

        //    var userTasks = users.Select(async user =>
        //    {
        //        var roles = await _userManager.GetRolesAsync(user);
        //        return new UserDTO
        //        {
        //            UserId = user.Id,
        //            UserName = user.UserName,
        //            Email = user.Email,
        //            Fullname = user.Fullname,
        //            Roles = roles.ToList()
        //            // Map other properties
        //        };
        //    });

        //    var userDtos = await Task.WhenAll(userTasks);
        //    return userDtos.ToList();
        //}

        public async Task<UserDTO> GetUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            return new UserDTO
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Fullname = user.Fullname,
                Roles = _userManager.GetRolesAsync(user).Result.ToList()
            };
        }

        public async Task<UserDTO> UpdateUser(string userId, UserUpdateDTO user)
        {
            var existingUser = await _userManager.FindByIdAsync(userId);
            if (existingUser == null)
            {
                return null;
            }
            existingUser.Email = user.Email;
            existingUser.Fullname = user.Fullname;
            // Update other properties

            var result = await _userManager.UpdateAsync(existingUser);
            if (result.Succeeded)
            {
                return new UserDTO
                {
                    UserId = existingUser.Id,
                    UserName = existingUser.UserName,
                    Email = existingUser.Email,
                    Fullname = existingUser.Fullname,
                    // Map other properties
                };
            }
            else
            {
                throw new Exception(string.Join("; ", result.Errors.Select(e => e.Description)));
            }
        }

        public async Task<List<UserDTO>> GetUserByRole(string role)
        {
            var result = await _userManager.GetUsersInRoleAsync(role);

            var convert = await Task.Run(() => result.Select(u => new UserDTO
            {
                UserId = u.Id,
                UserName = u.UserName,
                Email = u.Email,
                Fullname = u.Fullname,
                Roles = _userManager.GetRolesAsync(u).Result.ToList()
            }).ToList());
            return convert;
        }

        public async Task<bool> AddRoleUser (string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.AddToRoleAsync(user, role);
            return result.Succeeded;
        }

        public async Task<bool> RemoveRoleUser(string userId, string role)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }
            var result = await _userManager.RemoveFromRoleAsync(user, role);
            return result.Succeeded;
        }

        public async Task<IList<String>> GetRolesUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return null;
            }
            return await _userManager.GetRolesAsync(user);
        }

    }
}
