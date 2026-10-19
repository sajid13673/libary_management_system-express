module.exports = (userName) => ({
  subject: 'Library Account Status Update - Inactive',
  text: `Hello ${userName},\n\nThis is to notify you that your library account status has been changed to inactive.\n\nYour access to borrowing books and signing into the portal is currently restricted. If you believe this is an error or would like to reactivate your access, please reach out to the library administration.\n\nBest regards,\nLibrary Management Team`,
  html: `
    <div style="font-family: sans-serif; padding: 20px; line-height: 1.6; max-width: 600px;">
      <h2 style="color: #dc3545;">Account Access Suspended</h2>
      <p>Hello ${userName},</p>
      <p>This is an automated structural notification regarding your library account status.</p>
      
      <div style="background-color: #fff3cd; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0; color: #856404;">
        <strong>Account Status: Inactive / Disabled</strong><br>
        Your user permissions have been temporarily suspended. Your active sessions have been invalidated and portal logins are currently restricted.
      </div>
      
      <p><strong>What should you do?</strong><br>
      If you have outstanding book returns, require clarification on policy compliance, or believe this change was made in error, please contact the library administration desk directly to resolve the restriction.</p>
      
      <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;">
      <p style="font-size: 0.85em; color: #666;">This is an automated system notification. Please do not reply directly to this email.</p>
    </div>
  `,
});
