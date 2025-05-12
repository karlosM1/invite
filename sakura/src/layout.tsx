import type React from "react";
import "./globals.css";

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Date Invitation</title>
        <meta
          name="description"
          content="A fun interactive date invitation app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
