import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend('re_VgYoJ2fc_Ea89pYdDBnMTBbmcy35uYScB');

export async function POSTEmail({ to }) {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [to],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
