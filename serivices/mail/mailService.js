const transporter = require("../../config/mail");
const activationPendingTemplate = require("./templates/activationPending");

const mailService = {
  sendActivationPending: async (toEmail, userName) => {
    const template = activationPendingTemplate(userName);
    return transporter.sendMail({
      from: `"Library Admin" <${process.env.SMTP_USER}>`,
      to: toEmail,
      ...template,
    });
  },
};

module.exports = mailService;
