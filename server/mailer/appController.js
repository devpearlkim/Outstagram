const nodemailer = require('nodemailer');
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const Mailgen = require('mailgen');

// FIXME OAuth2 설정 필요

const signup = async (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: 'gmail',
    auth: {
      user: EMAIL,
      password: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Mailgen',
      link: 'https://mailgen.js/',
    },
  });

  let response = {
    body: {
      name: 'devpearl',
      intro: '이메일 인증번호를 입력해주세요',
      table: {
        data: [{ number: 12345 }],
      },
      outro: 'thanks for using Outstagram',
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: 'Verification Code',
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: '이메일 발송이 성공적으로 완료되었습니다',
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });
};

module.exports = {
  signup,
};
