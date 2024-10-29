import './globals.css';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aircraft Recognition Training',
  description: 'Train your aircraft recognition skills',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage: 'url(https://i.ibb.co/rGv24R0/NCR-Study-Guide.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7,
          }}
        />
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
