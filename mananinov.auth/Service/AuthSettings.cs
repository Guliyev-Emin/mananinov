namespace mananinov.auth.Service;

public class AuthSettings
{
    public TimeSpan Expires { get; set; }
    public string? SecretKey { get; set; }
}