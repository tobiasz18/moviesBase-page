const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

/** Step 1 nodemailer */
let transporter = nodemailer.createTransport({
  service: "Gmail",
  source: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  },
});


const verifyMail = async (emailUser, emailToken) => {
  try {
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'MovieBase',
        link: `${process.env.EMAIL_MAIN_URL}`
      }
    })
    let email = {
      body: {
        name: `${emailUser}`,
        intro: 'Welcome to MovieBase! We\'re very excited to have you on board.',
        action: {
          instructions: `To get started using MovieBase, please confirm your account below`,
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`
          }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
      }
    }
    /** Generate an HTML email with the provided contents,  ↓ message obj */
    let emailBody = mailGenerator.generate(email)


    /** Step 2 nodemailer*/
    let message = {
      from: process.env.EMAIL,
      to: emailUser,
      subject: "Welcome to MovieBase - email verification",
      html: emailBody
    }
    /** Step 3 nodemailer*/
    await transporter.sendMail(message)

    return true

  } catch (error) {
    if (error) throw error
  }
}


const contactMail = async (contact) => {
  try {
    let mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'MovieBase',
        link: `${process.env.EMAIL_MAIN_URL}`
      }
    })

    let email = {
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

module.exports = { contactMail, verifyMail }