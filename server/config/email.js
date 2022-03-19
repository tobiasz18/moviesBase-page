const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()


let transporter = nodemailer.createTransport({
  service: "Gmail",
  source: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});

const contactMail = async (contact) => {
  try {
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'MovieBase',
        link: `${process.env.EMAIL_MAIN_URL}`
      }
    })

    var email = {
      body: {
        intro: [
          'Someone send you a message',
          `email: ${contact.email}`,
          `firstname: ${contact.firstname}`,
          `lastname: ${contact.lastname}`
        ],
        outro: [`${contact.message}`]
      }
    }


    let emailBody = mailGenerator.generate(email)
    let message = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Contact",
      html: emailBody
    }

    await transporter.sendMail(message)

    return true

  } catch (error) {
    if (error) throw error
  }
}

module.exports = { contactMail }