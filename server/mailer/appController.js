const nodemailer = require('nodemailer');
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const Mailgen = require('mailgen');

// FIXME OAuth2 설정 필요
// NOTE testAccount로 메일 발송
// const signup = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: 'maddison53@ethereal.email',
//       pass: 'jn7jnAPss4f63QBp6D',
//     },
//   });

//   const message = {
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>', // html body
//   };

//   transporter.sendMail(message).then(() => {
//     return res
//       .status(201)
//       .json({ msg: 'You got mail' })
//       .catch((error) => {
//         return res.status(500).json({ error });
//       });
//   });
// };

const signup = async (req, res) => {
  console.log(req.body);
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
