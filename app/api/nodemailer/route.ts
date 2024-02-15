import { compileTemplate } from '@/lib/compileTemplate';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: Request) {
  const formData = await request.formData()
  const email = formData.get('email')

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });
  
  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email.toString(),
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from Jervi (${email})`,
    html: compileTemplate(email.toString(), 'https://gacem.netlify.app/', 'https://github.com/Jervi-sir')
  };
  
  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return Response.json({ message: 'Email sent'  })
  } catch (err) {
    return Response.json({ error: err }, { status: 500 })
  }
  
}
