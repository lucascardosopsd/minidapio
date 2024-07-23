"use server";

import { EmailParams, MailerSend, Sender } from "mailersend";

export const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
});

export const sender = new Sender(
  process.env.MAILERSEND_SENDER!,
  "Reserva Menu"
);

export const send = async ({ emailParams }: { emailParams: EmailParams }) => {
  mailerSend.email.send(emailParams);
};
