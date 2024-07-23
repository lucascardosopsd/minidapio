import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface ResetPassProps {
  magicLink?: string;
}

export const ResetPass = ({ magicLink }: ResetPassProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img src="https://i.imgur.com/dAN7CaQ.png" alt="logo" />
        <Heading style={heading}>Seu link de recuperação</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Clique aqui👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Se você não solicitou esse e-mail ignore.
          </Text>
        </Section>

        <Text style={footer}>Reserva menu</Text>
      </Container>
    </Body>
  </Html>
);

ResetPass.PreviewProps = {
  magicLink: "https://reservamenu.com.br",
} as ResetPassProps;

export default ResetPass;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#5832a8",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
