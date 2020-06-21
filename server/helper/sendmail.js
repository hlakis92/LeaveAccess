let debug = require('debug')('server:helper:sendmail');
let nodemailer = require('nodemailer');
let config = require('../../config');
let configMail = config.mailConfig;
let mailConfig = {
  "Mailservice": configMail.service,
  "Mailusername": configMail.username,
  "Mailpassword": configMail.password,
  "MailHost": configMail.host,
  "MailPort": configMail.port,
  "FromAddress": configMail.fromAddress || "asys.vaghasiya@gmail.com",
  "ToAddress": configMail.toAddress || "asys.vaghasiya@gmail.com",
  "pdfPath": configMail.pdfPath,
};

let transport = nodemailer.createTransport({
  service: mailConfig.Mailservice,
  host: mailConfig.MailHost,
  port: mailConfig.MailPort,
  auth: {
    user: mailConfig.Mailusername,
    pass: mailConfig.Mailpassword
  }
});

function sendMail(ToAddress, Subject, replyTo, htmlData, attachments, callback) {
  debug("sendMail", ToAddress);
  if (mailConfig.ToAddress !== "") {
    ToAddress = mailConfig.ToAddress;
  }
  let mailOptions = {
    from: mailConfig.FromAddress,
    to: ToAddress,
    subject: Subject,
    replyTo: (replyTo == null || replyTo == undefined ? mailConfig.Mailusername : replyTo.toString() + " <" + mailConfig.Mailusername.toString() + ">"),
    html: htmlData, // html body
    attachments: attachments
  }
  transport.sendMail(mailOptions, function (err, responseStatus) {
    if (attachments.length)
      attachments.forEach(data => {
        fs.unlinkSync(data.path);
      });
    if (err) {
      callback({
        status: false,
        error: err
      });
    } else {
      callback({
        status: true,
        data: responseStatus
      });
    }
  });
}

async function convertHTMLToPDF(htmlData, fileName) {
  let path = mailConfig.pdfPath;
  let html = htmlData;
  let filePath = path + fileName;
  const pdf = require('html-pdf');
  let fileResult = await new Promise((resolve) => {
    pdf.create(html).toFile(filePath, resolve);
  });
  return (filePath).toString();
}


module.exports = {
  sendMail: sendMail,
  convertHTMLToPDF: convertHTMLToPDF,
}
