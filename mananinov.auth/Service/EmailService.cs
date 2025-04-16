using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace mananinov.auth.Service;

public class EmailService(IOptions<EmailSettings> emailSettings) : IEmailService
{
    private readonly EmailSettings _emailSettings = emailSettings.Value;

    public async Task SendEmailAsync(string email, string subject, string message)
    {
        try
        {
            var mail = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
                Subject = subject,
                Body = message,
                IsBodyHtml = true
            };

            mail.To.Add(new MailAddress(email));

            using var client = new SmtpClient(_emailSettings.SmtpServer, _emailSettings.SmtpPort);
            client.Credentials = new NetworkCredential(_emailSettings.Username, _emailSettings.Password);
            client.EnableSsl = _emailSettings.EnableSsl;

            await client.SendMailAsync(mail);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ошибка отправки email: {ex.Message}");
            throw;
        }
    }

    public async Task SendConfirmationEmailAsync(string email, string confirmationLink)
    {
        const string subject = "Подтверждение регистрации";
        var message = $$"""

                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Подтверждение регистрации</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                    color: #333;
                                }
                                .email-container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #1a1a1a;
                                    border-radius: 10px;
                                    overflow: hidden;
                                    color: #fff;
                                }
                                .email-header {
                                    background-color: #111;
                                    padding: 20px;
                                    text-align: center;
                                    border-bottom: 1px solid #333;
                                }
                                .logo {
                                    font-size: 24px;
                                    font-weight: bold;
                                    text-decoration: none;
                                    background: linear-gradient(90deg, #6dde97, #4e9bf1, #e45e87);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    display: inline-block;
                                }
                                .email-content {
                                    padding: 30px 20px;
                                }
                                h2 {
                                    background: linear-gradient(90deg, #6dde97, #4e9bf1, #e45e87);
                                    -webkit-background-clip: text;
                                    -webkit-text-fill-color: transparent;
                                    background-clip: text;
                                    margin-top: 0;
                                    font-size: 22px;
                                    display: inline-block;
                                }
                                p {
                                    line-height: 1.6;
                                    margin-bottom: 15px;
                                    color: #ccc;
                                }
                                .button {
                                    display: inline-block;
                                    padding: 12px 24px;
                                    background-color: #4e9bf1;
                                    color: white;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-weight: bold;
                                    margin: 20px 0;
                                    text-align: center;
                                }
                                .button:hover {
                                    background-color: #3b7fd0;
                                }
                                .link-container {
                                    background-color: #222;
                                    padding: 12px;
                                    border-radius: 4px;
                                    word-break: break-all;
                                    margin: 15px 0;
                                }
                                .footer {
                                    background-color: #111;
                                    padding: 20px;
                                    text-align: center;
                                    font-size: 12px;
                                    color: #888;
                                    border-top: 1px solid #333;
                                }
                        
                                @media only screen and (max-width: 600px) {
                                    .email-container {
                                        width: 100%;
                                        border-radius: 0;
                                    }
                                    .email-content {
                                        padding: 20px 15px;
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="email-header">
                                    <a href="https://mananinov.com" class="logo">mananinov.com</a>
                                </div>
                                <div class="email-content">
                                    <h2>Подтверждение регистрации</h2>
                                    <p>Здравствуйте!</p>
                                    <p>Благодарим вас за регистрацию на mananinov.com. Для активации вашего аккаунта и присоединения к сообществу, пожалуйста, нажмите на кнопку ниже:</p>
                                    
                                    <div style="text-align: center;">
                                        <a href="{{confirmationLink}}" class="button">Подтвердить регистрацию</a>
                                    </div>
                                    
                                    <p>Если кнопка не работает, используйте следующую ссылку:</p>
                                    <div class="link-container">
                                        {{confirmationLink}}
                                    </div>
                                    
                                    <p>Ссылка действительна в течение 24 часов.</p>
                                    
                                    <p>Если вы не создавали учетную запись на нашем сайте, просто проигнорируйте это письмо.</p>
                                </div>
                                <div class="footer">
                                    <p>© 2025 mananinov.com. Все права защищены.</p>
                                    <p>Твой портал в мир аниме и манги</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        """;

        await SendEmailAsync(email, subject, message);
    }
}