// at top or wherever sendMail exported
module.exports.sendMail = async function(mailOptions){
  // noop during local development to avoid external SMTP timeouts
  // console.log('sendMail disabled in local dev. Mail would be:', mailOptions);
  return Promise.resolve(true);
}


const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "iloveimpact.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (options) => {
  transporter.sendMail(options, (err, data) => {
    if (err) {
      console.log("error Occured", err);
    } else {
      console.log("Email Sent");
    }
  });
};

module.exports.sendMail = sendMail;
