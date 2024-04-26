import { MailerService } from "@nestjs-modules/mailer";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { EQueues } from "src/constants/enums/queues.enums";

@Processor(EQueues.SEND_MAIL)
export class EmailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process("register")
  async registerEmail(job: Job<unknown>) {
    await this.mailerService.sendMail({
      to: job.data["to"],
      subject: "Welcome to my website",
      template: "./welcome",
      context: {
        name: job.data["name"]
      }
    });
  }
}
