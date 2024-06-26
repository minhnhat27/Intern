using Bot.Data;
using Bot.DTO;
using Bot.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot.Services.MiniServiceUser
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
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
            return await _userManager.Users
                .Select(u => new UserDTO
                {
                    UserId = u.Id,
                    UserName = u.UserName,
                    Email = u.Email,
                    Fullname = u.Fullname,
                    // Map other properties
                }).ToListAsync();
        }

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
                // Map other properties
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

    }
}
