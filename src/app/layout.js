import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";
import "@mantine/notifications/styles.css";
import { Space_Grotesk } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import NavBar from "@/components/nav/NavBar";
import { Notifications } from "@mantine/notifications";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "@/provider/Provider";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "The Reminder",
  description: "The Reminder",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} h-screen`}>
        <Providers session={session}>
          <NavigationProgress />
          <NavBar />
          <Notifications />
          {children}
        </Providers>
      </body>
    </html>
  );
}
