import * as handlebars from 'handlebars';
import { WelcomeTemplate } from '@/lib/templates/yeee';

export function compileTemplate(emailto: string, grab_the_deal: string, find_me_here: string) {
  const template = handlebars.compile(WelcomeTemplate);
  const htmlBody = template({
    email: emailto,
    grab_the_deal: grab_the_deal,
    find_me_here: find_me_here,
  });
  return htmlBody
}