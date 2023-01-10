using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Helper.Interfaces
{
    public interface IUserHelper
    {
        Task<User> GetUserByEmailAsync(string email);

        Task<IdentityResult> AddUserAsync(User user, string password);

        Task<SignInResult> LoginAsync(LoginModel model);

        Task LogoutAsync();

        Task<IdentityResult> UpdateUserAsync(User user);

        Task<IdentityResult> ChangePasswordAsync(User user, string oldPassword, string newPassword);
        // Vê se existe um determinado role, se não tiver cria, se existe na tabela 
        Task CheckRoleAsync(string rolename);
        // adiciona um role a um determinado user
        Task AddUserToRoleAsync(User user, string roleName);
        // confirma se o user já tem um determinado role
        Task<bool> IsUserInRoleAsync(User user, string roleName);

        //Task<SignInResult> ValidatePasswordAsync(User user, string password);

        Task<string> GenerateEmailConfirmationTokenAsync(User user);

        Task<IdentityResult> ConfirmEmailAsync(User user, string token);

        Task<User> GetUserByIdAsync(string userId);

        Task<string> GeneratePasswordResetTokenAsync(User user);

        Task<IdentityResult> ResetPasswordAsync(User user, string token, string password);

        Task<IdentityResult> DeleteUserAsync(User user);

        Task<List<User>> GetUsersByRoleAsync(string role);
    }
}
