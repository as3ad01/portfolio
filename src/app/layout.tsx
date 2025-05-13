import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navigation from '@/components/ui/Navigation';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

// We'll use CSS variables for the monospace font since Next.js doesn't have a good monospace font
// that matches Geist Mono's aesthetics through next/font/google

export const metadata: Metadata = {
  title: 'Mohamed Chams Eddine Lhouij | Full Stack Developer',
  description: 'Full Stack Software Developer specializing in Next.js, React, and modern web technologies. Building innovative digital solutions with a focus on user experience and clean architecture.',
  keywords: ['Full Stack Developer', 'Software Engineer', 'Next.js', 'React', 'TypeScript', 'Web Development', 'Frontend Developer', 'Backend Developer'],
  authors: [{ name: 'Mohamed Chams Eddine Lhouij' }],
  creator: 'Mohamed Chams Eddine Lhouij',
  publisher: 'Mohamed Chams Eddine Lhouij',

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Mohamed Chams Eddine Lhouij | Full Stack Developer</title>
        <meta name="description" content="Portfolio of a software engineer building for the next era of the internet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
