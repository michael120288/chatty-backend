import fs from 'fs';
import ejs from 'ejs';

const image_url = 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'

class ForgotPasswordTemplate {
  public passwordResetTemplate(username: string, resetLink: string):string{
    return ejs.render(fs.readFileSync(__dirname + '/forgot-password-template.ejs', 'utf8'),{
      username: username,
      resetLink: resetLink,
      image_url: image_url
    })
  }
}

export const forgotPasswordTemplate: ForgotPasswordTemplate = new ForgotPasswordTemplate();