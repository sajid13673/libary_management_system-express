module.exports = (userName, email, temporaryPassword, loginUrl = 'http://localhost:3000/login') => ({
  subject: 'Welcome to the Library! Your Account Credentials',
  text: `Hello ${userName},\n\nAn account has been created for you by the library administrator.\n\nLogin Details:\nEmail: ${email}\nTemporary Password: ${temporaryPassword}\n\nPlease log in here: ${loginUrl}\n\nFor security reasons, you will be required to change your password immediately upon your first login.\n\nBest regards,\nLibrary Management Team`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Library Account Credentials</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 550px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              
              <!-- Top Accent Bar -->
              <tr>
                <td style="background-color: #28a745; height: 6px;"></td>
              </tr>
              
              <!-- Email Body Content -->
              <tr>
                <td style="padding: 40px 35px;">
                  <h2 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 24px; font-weight: 700; line-height: 1.3;">
                    Welcome to the Library, ${userName}! 📚
                  </h2>
                  
                  <p style="margin: 0 0 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                    An official profile has been generated for you by the system administrator. You can now access your account dashboard using the secure temporary credentials listed below.
                  </p>
                  
                  <!-- Secure Credentials Callout Card -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border: 1px solid #e1e4e6; border-radius: 8px; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 20px;">
                        <span style="display: block; margin-bottom: 12px; font-size: 14px; color: #6c757d; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Secure Access Parameters
                        </span>
                        <div style="font-size: 15px; color: #212529; margin-bottom: 8px;">
                          <strong style="color: #495057; width: 80px; display: inline-block;">Email:</strong> 
                          <span style="font-family: monospace; font-size: 16px; background-color: #e9ecef; padding: 2px 6px; border-radius: 4px;">${email}</span>
                        </div>
                        <div style="font-size: 15px; color: #212529;">
                          <strong style="color: #495057; width: 80px; display: inline-block;">Password:</strong> 
                          <span style="font-family: monospace; font-size: 16px; background-color: #e9ecef; padding: 2px 6px; border-radius: 4px; color: #dc3545; font-weight: bold;">${temporaryPassword}</span>
                        </div>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Security Notice Alert Box -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 0 6px 6px 0; margin-bottom: 28px;">
                    <tr>
                      <td style="padding: 14px 18px;">
                        <span style="color: #856404; font-size: 14px; line-height: 1.5; display: block;">
                          ⚠️ <strong>Security Advisory:</strong> For parameters protection, you will be prompted to replace this temporary password with a new personal sequence immediately upon completing your first login session.
                        </span>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- CTA Button Alignment -->
                  <p style="margin: 0; text-align: center;">
                    <a href="${loginUrl}" style="background-color: #28a745; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; font-size: 15px; box-shadow: 0 2px 4px rgba(40, 167, 69, 0.2);">
                      Access Library Portal
                    </a>
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td style="background-color: #fafbfc; border-top: 1px solid #eaeaea; padding: 24px 35px; text-align: center;">
                  <p style="margin: 0 0 6px 0; color: #7a7a7a; font-size: 14px; font-weight: 600;">
                    Library Administration Gateway
                  </p>
                  <p style="margin: 0; color: #9b9b9b; font-size: 12px; line-height: 1.4;">
                    This contains sensitive cryptographic access identifiers.<br>Do not forward this message or distribute these login assets.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `
});
