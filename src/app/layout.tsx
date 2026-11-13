import type { Metadata } from 'next';
import './globals.css';
import { SubscriptionProvider } from '@/context/SubscriptionContext';
import { ProjectProvider } from '@/context/ProjectContext';

export const metadata: Metadata = {
  title: 'WAVE — AI-Powered Trend Intelligence & Venture Building Platform',
  description: 'Ride the Wave. Build at the Right Time. Discover rising trends, evaluate market gaps, and turn ideas into structured actionable business ventures.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-warm-ivory text-deep-sage antialiased min-h-screen">
        <SubscriptionProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </SubscriptionProvider>
      </body>
    </html>
  );
}
