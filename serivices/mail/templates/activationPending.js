module.exports = (userName) => ({
  subject: 'Registration Successful - Account Activation Pending',
  text: `Hello ${userName},\n\nWelcome to the Library! Your account has been successfully created and is currently pending administrator activation.\n\nPlease wait until an administrator reviews and approves your access. We will notify you via email as soon as your account becomes active.\n\nBest regards,\nLibrary Management Team`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Registration Successful</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f6f8; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 550px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
              
              <!-- Top Accent Bar -->
              <tr>
                <td style="background-color: #007bff; height: 6px;"></td>
              </tr>
              
              <!-- Email Body Content -->
              <tr>
                <td style="padding: 40px 35px;">
                  <h2 style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 24px; font-weight: 700; line-height: 1.3;">
                    Welcome to the Library, ${userName}! 📚
                  </h2>
                  
                  <p style="margin: 0 0 24px 0; color: #4a4a4a; font-size: 16px; line-height: 1.6;">
                    Thank you for joining us. Your library account has been successfully registered and is now resting safely in our system database.
                  </p>
                  
                  <!-- Status Card Highlight -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e8f4ff; border-left: 4px solid #007bff; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 16px 20px;">
                        <strong style="color: #0056b3; font-size: 15px; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                          Current Status: Pending Activation
                        </strong>
                        <span style="color: #1f3a60; font-size: 14px; line-height: 1.5; display: block;">
                          Our library administrator is currently reviewing your registration details. No action is required from your side at this time.
                        </span>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="margin: 0 0 12px 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                    Please wait for system approval before trying to access the login dashboard portals. 
                  </p>
                  
                  <p style="margin: 0; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                    We will dispatch a secondary confirmation email directly to you the moment your user privileges are enabled.
                  </p>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td style="background-color: #fafbfc; border-top: 1px solid #eaeaea; padding: 24px 35px; text-align: center;">
                  <p style="margin: 0 0 6px 0; color: #7a7a7a; font-size: 14px; font-weight: 600;">
                    Library Management Team
                  </p>
                  <p style="margin: 0; color: #9b9b9b; font-size: 12px; line-height: 1.4;">
                    This is an automated operational notification message.<br>Please do not reply directly to this system message.
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
