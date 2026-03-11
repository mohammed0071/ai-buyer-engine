import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NuGen Longevity | The Operating System for Human Longevity",
  description: "Measure. Understand. Optimize. Transform your biology with AI-driven insights, advanced diagnostics, and personalized protocols.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        {children}
      </body>
    </html>
  );
}
