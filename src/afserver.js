const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = 5001;
const user = 'usr';
const pass = 'pass';
const emailHost = 'smtp.gmail.com';
const emailPort = 465;
const ssl = true;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/sendEmail', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const transporter = nodemailer.createTransport({
        host: emailHost,
        port: emailPort,
        secure: ssl,
        auth: {
            user: user,
            pass: pass
        }
    });

    transporter.verify((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    const mailOptions = {
        from: '<' + user + '>' + req.body.name,
        to: req.body.to,
        bcc: (req.body.bcc !== undefined) ? req.body.bcc : null,
        subject: req.body.subject,
        text: (req.body.text !== undefined) ? req.body.text : '',
        html: req.body.html
    };

    try {
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                res.json(error);
            } else {
                res.json({yo: info.response});
            }
        });

        res.send({ success: true, msg: 'Email successfully sent!' });
    } catch (err) {
        res.send({ success: false, msg: err });
    }

});

app.listen(port, function () {
    console.log('Server is running. Point your browser to: http://localhost:' + port);
});