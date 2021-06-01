var nodemailer = require("nodemailer");

function email(tomail, mess, nameofuser) {
  var name = `
  <hr>
  <h3 >Dear ${nameofuser} !</h3>   \n
  <p > <b> These Are the list Of Vaccine Center Having Slot For You: </b><br></p>
  <hr>
  <a href='${process.env.LINKTODELETE}${tomail}'>Click Here ! If you Don't Want Further Emails. </a>
  <hr>
  <br>
  `;

  var transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPWD,
    },
  });

  var mailOptions = {
    from: "getvaccine@gmail.com",
    to: `${tomail}`,
    subject: "GetVaccine - Remainder For Vacant Vaccine Slot .Book it Fast ⚡",
    html: name + `${mess}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = { email };
