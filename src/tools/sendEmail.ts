import { resend } from "@/lib/resend";

interface SendEmailProps {
  html: string;
  to: string;
}

export const sendEmail = async ({ html, to }: SendEmailProps) => {
  await resend.emails.send({
    from: "Acme <naoresponda@reservamenu.com.br>",
    to: [to],
    subject: "Nova senha Reserva",
    html,
  });
};
