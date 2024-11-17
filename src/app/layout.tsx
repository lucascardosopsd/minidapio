import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { Toaster } from "sonner";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import "react-quill/dist/quill.bubble.css";
import "swiper/css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Minidapio | Cardápio digital",
  description:
    "A solução simples, prática e definitiva para elevar o nível do atendimento do seu restaurante.",
  openGraph: {
    title: "Minidapio | Cardápio digital",
    description:
      "A solução simples, prática e definitiva para elevar o nível do atendimento do seu restaurante.",
    url: "https://www.minidapio.com.br",
    siteName: "Minidapio",
    images: [
      {
        url: "https://i.imgur.com/QBGQlnz.png",
        width: 200,
        height: 200,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <head>
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-G023WJD8Y3"
          />
          <Script>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-G023WJD8Y3');
          `}
          </Script>
        </head>
        <body className={poppins.className}>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            defaultTheme="dark"
            enableSystem
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
