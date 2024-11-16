// src/app/layout.tsx


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../styles/custom.scss'
import { AuthProvider } from '../context/AuthContext';
import AppNavbar from './components/Header/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuickbetMovies",
  description: "QuickbetMovies",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}