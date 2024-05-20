import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/misc/ThemeProvider";
import AuthProvider from "@/components/misc/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Reserva | Cardápio Digital",
  description:
    "Cardápio digital gratuito que atende as necessidades simples do seu estabelecimento",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body className={poppins.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            enableSystem
            defaultTheme="dark"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
