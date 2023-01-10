using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.DTOs;
using BilheticaAeronauticaWeb.Helper;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class AccountController : BaseApiController
    {
        public IUserHelper _userHelper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IMailHelper _mailHelper;
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager, IUserHelper userHelper, ITokenHelper tokenHelper, IMailHelper mailHelper)
        {
            _userHelper = userHelper;
            _tokenHelper = tokenHelper;
            _mailHelper = mailHelper;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("loginuser")]
        public async Task<ActionResult<UserDTO>> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = await _userHelper.LoginAsync(model);

            if (!result.Succeeded)
                return Unauthorized();

            var user = await _userHelper.GetUserByEmailAsync(model.Username);

            var roles = await _userManager.GetRolesAsync(user);

            int la = 0;

            if (roles[0] == "Customer")
                la = 1;
            if (roles[0] == "TeamMember")
                la = 2;
            if (roles[0] == "Admin")
                la = 3;

            return new UserDTO
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Token = await _tokenHelper.GenerateToken(user),
                AL = la

            };
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userHelper.GetUserByEmailAsync(model.UserName);
           

            if (user == null)
            {
                user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.UserName,
                    UserName = model.UserName,
                    Address = model.Address,
                    PhoneNumber = model.PhoneNumber
                };

                var result = await _userHelper.AddUserAsync(user, model.Password);

                
                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }

                await _userHelper.AddUserToRoleAsync(user, "Customer");

                string myToken = await _userHelper.GenerateEmailConfirmationTokenAsync(user);
                
                string tokenLink = Url.Action("ConfirmEmail", "Account", new
                {
                    userid = user.Id,
                    token = myToken
                }, protocol: HttpContext.Request.Scheme);

                Response response = _mailHelper.SendEmail(model.UserName, "Email confirmation", $"<h1>Email Confirmation</h1>" +
                       $"To allow the user, " +
                       $"plase click in this link:</br></br><a href = \"{tokenLink}\">Confirm Email</a>");

                if (response.IsSuccess)
                {
                    return Ok(new {
                        message = "The instructions to allow your user has been sent to email" });
                }

               
            }

            return Ok();
        }

        [HttpGet("[action]/{userId}/{token}")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            
            

            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrEmpty(token))
            {
                return NotFound();
            }


            var user = await _userHelper.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            Console.WriteLine(token);
            Console.WriteLine(userId);
            Console.WriteLine(user.EmailConfirmed);

            var result = await _userHelper.ConfirmEmailAsync(user, token);

            if (!result.Succeeded)
            {
                return NotFound();
            }

            return View("~/Pages/Email/ConfirmEmailSuccess.cshtml"); 
          
        }

        [Authorize(Roles = "Customer, TeamMember")]
        [HttpPut]
        [Route("changepassword")]

        public async Task<IActionResult> ChangePassword(ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            
            var user = await _userHelper.GetUserByEmailAsync(this.User.Identity.Name);

            if (user != null)
            {
                var result = await _userHelper.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(new ProblemDetails { Title = result.Errors.FirstOrDefault().Description });
                }
            }
            else
            {

                return BadRequest(new ProblemDetails { Title = "User not found." });
            }

        }

        [Authorize(Roles = "Customer, TeamMember")]
        [HttpPut]
        [Route("changeuser")]
        public async Task<ActionResult<UserDTO>> ChangeUser(ChangeUserModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userHelper.GetUserByEmailAsync(this.User.Identity.Name);

                if (user != null)
                {
                    user.FirstName = model.FirstName;
                    user.LastName = model.LastName;
                    user.Address = model.Address;
                    user.PhoneNumber = model.PhoneNumber;


                    var response = await _userHelper.UpdateUserAsync(user);

                    if (response.Succeeded)
                    {
                        var roles = await _userManager.GetRolesAsync(user);

                        int la = 0;

                        if (roles[0] == "Customer")
                            la = 1;
                        if (roles[0] == "TeamMember")
                            la = 2;
                        if (roles[0] == "Admin")
                            la = 3;

                        var auth = Request.Headers["Authorization"].ToString();

                        if(auth.StartsWith("Bearer "))
                            auth = auth.Substring(7);

                        return new UserDTO
                        {
                            UserName = user.UserName,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Address = user.Address,
                            PhoneNumber = user.PhoneNumber,
                            Token = auth,
                            AL = la

                        };
                    }
                    else
                    {
                        return BadRequest(new ProblemDetails { Title = response.Errors.FirstOrDefault().Description });
                    }
                }

                
            }

            return BadRequest();
        }



        [HttpPost]
        [Route("recoverpassword")]
        public async Task<IActionResult> RecoverPassword(RecoverPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userHelper.GetUserByEmailAsync(model.Email);
                if (user == null)
                {

                    return StatusCode(404, new { Title = "The email doesn't correspont to a registered user." });
                }

                var myToken = await _userHelper.GeneratePasswordResetTokenAsync(user);

                var link = this.Url.Action(
                    "GetResetPasswordPage",
                    "Account",
                    new { token = myToken }, protocol: HttpContext.Request.Scheme);

                Response response = _mailHelper.SendEmail(model.Email, "Shop Password Reset", $"<h1>Aeroa Password Reset</h1>" +
                $"To reset the password click in this link:</br></br>" +
                $"<a href = \"{link}\">Reset Password</a>");

                if (response.IsSuccess)
                {
                    return Ok("The instructions to recover your password has been sent to email.");
                }

            }

            return BadRequest(new ProblemDetails { Title = "Bad request" });
        }


        [HttpGet]
        public IActionResult GetResetPasswordPage()
        {
            return View("~/Pages/ResetPassword.cshtml");
        }


        [HttpPost]
        [Route("resetuserpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            var user = await _userHelper.GetUserByEmailAsync(model.Username);
            if (user != null)
            {
                var result = await _userHelper.ResetPasswordAsync(user, model.Token, model.Password);
                if (result.Succeeded)
                {
                    return Ok();

                }
            }

            return NotFound();
        }
    }
}
