import { Customer } from "./customer";
//import { MailerService } from '@nestjs-modules/mailer';

export class EmailService {
    //constructor(private readonly mailService: MailerService) {}

    public SendRegistrationEmail(customer: Customer): boolean
    {
        // this.mailService.sendMail({
        //     from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
        //     to: customer.Email,
        //     subject: "Test mail",
        //     text: "<h1>Hello</h1>",
        //   });        
        return true;
    }         
}