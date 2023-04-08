const express = require('express');
const router = express.Router();

const isValidEmail = require('../validators/email_validator')

const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

const { authMiddleware } = require('../middlewere/protected_routes');

//https://mailtrap.io/inboxes/1920531/messages/3056738580
//https://blog.logrocket.com/send-emails-nodejs-nodemailer/

router.post('/sendEmail', (req, res) => {
    //console.log(req.body)
    const { from, to, subject, body } = req.body;
    if (!from || !to || !subject || !body) {
        return res.status(400).json({ error: "One or more mandatory field is empty" });
    }
    if (!isValidEmail(from)) {
        return res.status(400).json({ error: "Invalid from email" });
    }
    if (!isValidEmail(to)) {
        return res.status(400).json({ error: "Invalid to email" });
    }

    // initialize nodemailer
    // var transporter = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "19524dbc233dbc",
    //       pass: "248504bcb68772"
    //     }
    //   });

    var transporter = nodemailer.createTransport({
        host: process.env.MAIL_SMTP_SERVER_HOST,
        port: process.env.MAIL_SMTP_SERVER_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./email_templates/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./email_templates/'),
    };

    // use a template file with nodemailer
    transporter.use('compile', hbs(handlebarOptions))

    var mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject,
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            to: to, // replace {{name}} with Adebola
            subject: subject, // replace {{company}} with My Company
            body: body
        }
    };
    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(400).json({ error: "Cannot send email" });
        }
        console.log('Message sent: ' + info.response);
        return res.status(200).send("email sent successfully")
    });

})

module.exports = router;