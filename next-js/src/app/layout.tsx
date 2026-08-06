import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import Link from "next/link";
import "./globals.css";
export const metadata: Metadata = {
  title: "Note Passer",
  description: "Note passer app for notes that I have to pass",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="doodle">
        <nav>
          <h1>
            <Link href="/">Note passer</Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
