using mananinov.auth.Models;
using mananinov.auth.Service;
using Microsoft.AspNetCore.Mvc;
using Models_LoginRequest = mananinov.auth.Models.LoginRequest;

namespace mananinov.auth.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController(AccountService services) : ControllerBase
{
    // [HttpPost("login")]
    // public IActionResult Login([FromBody] Models_LoginRequest request)
    // {
    //     var token = services.Login(request.Name, request.Password);
    //     return Ok(token);
    // }
    
    // Регистрация с отправкой подтверждения
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] AccountRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var result = await services.RegisterAsync(request.Name, request.Email, request.Password, baseUrl);
        if (result.Success)
        {
            return Ok(new { message = result.Message });
        }
        return BadRequest(new { message = result.Message });
    }

    [HttpGet("confirm-email")]
    public IActionResult ConfirmEmail([FromQuery] string token)
    {
        var result = services.ConfirmEmail(token);
            
        if (result.Result.Success)
        {
            // В реальном приложении здесь можно сделать редирект на страницу успешного подтверждения
            return Ok(new { message = result.Result.Message });
        }
            
        return BadRequest(new { message = result.Result.Message });
    }
    
    [HttpPost("resend-confirmation")]
    public async Task<IActionResult> ResendConfirmation([FromBody] ResendConfirmation request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
            
        var result = await services.ResendConfirmationEmailAsync(request.Email, baseUrl);
            
        if (result.Success)
        {
            return Ok(new { message = result.Message });
        }
            
        return BadRequest(new { message = result.Message });
    }
}
