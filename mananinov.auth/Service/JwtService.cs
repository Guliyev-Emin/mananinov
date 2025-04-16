using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using mananinov.auth.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace mananinov.auth.Service;

public class JwtService(IOptions<AuthSettings> settings)
{
    public string GenerateToken(Account account)
    {
        var claims = new List<Claim>
        {
            new("email", account.Email),
            new("id", account.Id.ToString())
        };
        var jwtToken = new JwtSecurityToken(
            expires: DateTime.UtcNow.Add(settings.Value.Expires),
            claims: claims,
            signingCredentials: new SigningCredentials(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(settings.Value.SecretKey!)),
                SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(jwtToken);
    }
    
    
}