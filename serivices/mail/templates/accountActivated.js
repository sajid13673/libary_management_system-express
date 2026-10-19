module.exports = (userName, loginUrl = 'http://localhost:3000/login') => ({
  subject: 'Library Account Status Update - Activated',
  text: `Hello ${userName},\n\nYour library account is active. Your login privileges and library access are fully enabled.\n\nYou can log in and manage your account using the following link: ${loginUrl}\n\nHappy reading,\nLibrary Management Team`,
  html: `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px;">
      <h2 style="color: #28a745;">Your Account is Active, ${userName}! 🎉</h2>
      <p>Hello,</p>
      <p>This is to confirm that your library account access status is currently set to <strong>Active</strong>.</p>
      
      <div style="background-color: #f8f9fa; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
        <strong>Account Status: Active / Fully Granted</strong><br>
        Your user access permissions are enabled. You are now free to log into the portal, search the library catalog, and borrow resources.
      </div>
      
      <p style="margin-top: 25px;">
        <a href="${loginUrl}" style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
          Log In to the Library Portal
        </a>
      </p>
      
      <p>If you have any questions or require support regarding your library privileges, please visit the administration desk.</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;">
      <p style="font-size: 0.85em; color: #666;">This is an automated system notification. Please do not reply directly to this email.</p>
    </div>
  `,
});
