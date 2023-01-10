using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Helper;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class TeamController : BaseApiController
    {
        private readonly IImageHelper _imageHelper;
        private readonly IConverterHelper _converterHelper;
        private readonly IUserHelper _userHelper;
        private readonly IMailHelper _mailHelper;

        public TeamController(IImageHelper imageHelper,
            IConverterHelper converterHelper,
            IUserHelper userHelper,
            IMailHelper mailHelper)
        {
            _imageHelper = imageHelper;
            _converterHelper = converterHelper;
            _userHelper = userHelper;
            _mailHelper = mailHelper;
        }

        [HttpGet]
        [Route("getteammembers")]
        public async Task<IActionResult> Index()
        {
            return Ok(await _userHelper.GetUsersByRoleAsync("TeamMember"));
        }

        [HttpPost]
        [Route("createteammember")]
        public async Task<IActionResult> CreateTeamMember([FromForm] CreateTeamMemberModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userExists = await _userHelper.GetUserByEmailAsync(model.UserName);

            if (userExists == null)
            {
                try
                {
                    var imagePath = string.Empty;
                    if (model.ImageFile != null && model.ImageFile.Length > 0)
                    {
                        imagePath = await _imageHelper.UploadImageAsync(model.ImageFile, "users");

                    }
              
                    var teamMember = _converterHelper.ToTeamMember(model, imagePath, true);

                    await _userHelper.AddUserAsync(teamMember, "123456");
                    await _userHelper.AddUserToRoleAsync(teamMember, model.Role);

                    var myToken = await _userHelper.GeneratePasswordResetTokenAsync(teamMember);

                    var link = this.Url.Action(
                        "GetResetPasswordPage",
                        "Account",
                        new { token = myToken }, protocol: HttpContext.Request.Scheme);

                    Response response = _mailHelper.SendEmail(model.UserName, "Bilhetica AEROA Password Reset", $"<h1>Bilhetica AEROA Password Reset</h1>" +
                    $"To reset the password click in this link:</br></br>" +
                    $"<a href = \"{link}\">Reset Password</a>");

                    if (response.IsSuccess)
                    {
                        return Ok("The instructions to recover your password has been sent to email.");
                    }

                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return BadRequest(new ProblemDetails { Title = ex.Message });
                }
              
            }

            return Ok(model);
        }

        [HttpPut]
        [Route("updateteammember")]
        public async Task<IActionResult> UpdateTeamMember([FromForm] CreateTeamMemberModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userExists = await _userHelper.GetUserByEmailAsync(model.UserName);

            if (userExists == null)
                return NotFound();
        
            try
            {
                userExists.FirstName = model.FirstName;
                userExists.LastName = model.LastName;
                userExists.PhoneNumber = model.PhoneNumber;
                userExists.Address = model.Address;


                var imagePath = string.Empty;
                if (model.ImageFile != null && model.ImageFile.Length > 0)
                {
                    imagePath = await _imageHelper.UploadImageAsync(model.ImageFile, "users");
                    userExists.ImageId = imagePath;
                }
      
                await _userHelper.UpdateUserAsync(userExists);

            }
            catch (DbUpdateConcurrencyException ex)
            {
                return BadRequest(new ProblemDetails { Title = ex.Message });
            }

            return Ok(model);
        }


        [HttpDelete]
        [Route("deleteteammember/{id}")]
        public async Task<IActionResult> Delete(string? id)
        {
            if (id == null)
                return NotFound();


            var teamMember = await _userHelper.GetUserByIdAsync(id);

            if (teamMember == null)
                return NotFound();

            try
            {
                await _userHelper.DeleteUserAsync(teamMember);

                return Ok("team member successfully deleted");

            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }

        [HttpGet]
        [Route("getteammemberbyid/{id}")]
        public async Task<ActionResult<User>> GetById(string? id)
        {
            if (id == null)
                return NotFound();

            var teamMember = await _userHelper.GetUserByIdAsync(id);

            if (teamMember == null)
                return NotFound();
 
            return Ok(teamMember);

         
        }
    }
}
