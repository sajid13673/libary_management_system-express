module.exports = (userName) => ({
  subject: 'Registration Successful - Activation Pending',
  text: `Hello ${userName}, your library account is pending activation...`,
  html: `<h2>Welcome to the Library, ${userName}!</h2><p>Our admin is reviewing your account...</p>`
});
