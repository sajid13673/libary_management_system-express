const transporter = require("../../config/mail");
const activationPendingTemplate = require("./templates/activationPending");
const accountActivatedTemplate = require("./templates/accountActivated");
const accountDeactivatedTemplate = require("./templates/accountDeactivated");

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
  }
};

module.exports = mailService;
