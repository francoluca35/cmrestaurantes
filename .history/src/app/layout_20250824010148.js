import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "CM Restaurantes - Gestión Gastronómica Inteligente",
  description: "Sistema completo de gestión para restaurantes. Simplificamos, diseñamos e innovamos para que tu negocio gastronómico sea más eficiente y rentable.",
  keywords: "restaurantes, gestión gastronómica, sistema POS, delivery, e-commerce, takeaway",
  authors: [{ name: "CM Restaurantes" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "CM Restaurantes - Gestión Gastronómica Inteligente",
    description: "Sistema completo de gestión para restaurantes. Simplificamos, diseñamos e innovamos.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
