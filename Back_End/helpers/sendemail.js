const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'email.punya.fahmi@gmail.com',
        pass: 'F@hmIH@5s@N189'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;
