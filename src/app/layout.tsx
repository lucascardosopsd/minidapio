import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/misc/ThemeProvider";
import { Toaster } from "sonner";
import AuthProvider from "@/components/misc/AuthProvider";

import "swiper/css";
import "react-quill/dist/quill.bubble.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  openGraph: {
    title: "Minidapio | Cardápio digital",
    description:
      "A solução simples, prática e definitiva para elevar o nível do atendimento do seu restaurante.",
    url: "https://www.minidapio.com.br",
    siteName: "Minidapio",
    images: [
      {
        url: "https://i.imgur.com/3Oiin7K.png",
        width: 557,
        height: 291,
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
    <html lang="pt-BR" className="!scroll-smooth">
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
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
