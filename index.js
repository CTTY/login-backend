const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account)=>{
        const htmlEmail = `
        <h3>Contact Details</h3>
        <ul>
            <li>From: ${req.body.from}</li>
            <li>Title: ${req.body.title}</li>
        </ul>
        <h3>Content</h3>
        <p>${req.body.content}</p>
        `

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'testlululu123@gmail.com',
                   pass: 'Secretpassword'
               }
        })

        const mailOptions = {
            from: req.body.from, // sender address
            to: 'lumingabby@gmail.com', // list of receivers
            subject: req.body.title, // Subject line
            html: req.body.content// plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

