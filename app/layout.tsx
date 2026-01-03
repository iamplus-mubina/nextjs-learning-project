import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';  // ✅ STEP 1: Import add करें

// ✅ STEP 2: Metadata object add करें
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ✅ STEP 3: fonts भी add करें (optional) */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}