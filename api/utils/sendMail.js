import nodemailer from 'nodemailer';

export function sendEmail (email,token){
  
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MYEMAIL,
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: process.env.MYEMAIL,
        to: email,
        subject: 'forgot password',
        text: `https://auth-8dxr.onrender.com/reset-password/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return false;
        } else {
          console.log('Email sent: ' + info.response);
          return true;
        }
      });
}