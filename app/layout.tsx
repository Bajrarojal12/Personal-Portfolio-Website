import type {Metadata} from 'next';
import {Inter, Poppins} from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rojal Bajracharya | Digital Marketer & AI Marketing Learner',
  description: 'Personal portfolio of Rojal Bajracharya - Digital Marketer and AI Marketing Learner based in Kathmandu, Nepal. Crafting data-driven growth strategies.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

