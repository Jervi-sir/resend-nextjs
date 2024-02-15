import { EmailTemplate } from '@/components/email-template';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <gacembekhira@gmail.com>',
    to: ['gacempron@gmail.com'],
    subject: 'Hello world',
    react: EmailTemplate({ firstName: 'John' }),
  });
  return new NextResponse(JSON.stringify({ answer: data }), {
    status: 200,
  });
}
