import fs from 'fs';
import ejs from 'ejs';
import { IResetPasswordParams } from '@user/interfaces/user.interface';

const image_url = 'https://w7.pngwing.com/pngs/120/102/png-transparent-padlock-logo-computer-icons-padlock-technic-logo-password-lock.png'

class ResetPasswordTemplate {
  public passwordResetConfirmationTemplate(templateParams:IResetPasswordParams):string{
    const {username,email,ipaddress,date} = templateParams
    return ejs.render(fs.readFileSync(__dirname + '/reset-password-template.ejs', 'utf8'),{
      username: username,
      email,
      ipaddress,
      date,
      image_url: image_url
    })
  }
}

export const resetPasswordTemplate: ResetPasswordTemplate = new ResetPasswordTemplate();