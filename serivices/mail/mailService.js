const transporter = require("../../config/mail");
const activationPendingTemplate = require("./templates/activationPending");
const accountActivatedTemplate = require("./templates/accountActivated");
const accountDeactivatedTemplate = require("./templates/accountDeactivated");
const accountCreatedByAdminTemplate = require("./templates/accountCreatedByAdmin");

const mailService = {
  sendActivationPending: async (toEmail, userName) => {
    const template = activationPendingTemplate(userName);
    return transporter.sendMail({
      from: `"Library Admin" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: toEmail,
      ...template,
    });
  },
    sendAccountActivated: async (toEmail, userName) => {
    const template = accountActivatedTemplate(userName);
    return transporter.sendMail({
      from: `"Library Admin" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: toEmail,
      ...template
    });
  },

  sendAccountDeactivated: async (toEmail, userName) => {
    const template = accountDeactivatedTemplate(userName);
    return transporter.sendMail({
      from: `"Library Admin" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: toEmail,
      ...template
    });
  },
   sendAccountCredentials: async (toEmail, userName, temporaryPassword) => {
    const template = accountCreatedByAdminTemplate(userName, toEmail, temporaryPassword);
    return transporter.sendMail({
      from: `"Library Admin" <${process.env.SMTP_USER}>`,
      to: toEmail,
      ...template
    });
  }
};

module.exports = mailService;
