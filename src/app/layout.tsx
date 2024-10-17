import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { DataProvider } from "@/contexts/data";
import Sidebar from "@/components/sidebar/sidebar";
import { User } from "@/interfaces/Idata";
import { ModalProvider } from "@/contexts/modals";

export const metadata: Metadata = {
  title: "Demo dashboard app",
  description: "Dashboard to showcase Gian Carlo skill in FE",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-primary",
});

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUsers = await getUsers();
  return (
    <html lang="en">
      <body
        className={`antialiased ${spaceGrotesk.className} grid grid-cols-[240px_minmax(900px,_1fr)] grid-rows-[auto_1fr] max-h-[100dvh] box-border`}
      >
        <h1 className="page-heading col-start-2 px-6">Dashboard</h1>
        <aside className="bg-black row-start-1 row-end-3">
          <Sidebar />
        </aside>
        <DataProvider initialState={initialUsers}>
          <ModalProvider>{children}</ModalProvider>
        </DataProvider>
      </body>
    </html>
  );
}
