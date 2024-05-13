import "@mantine/core/styles.css";
import "./globals.css";
import '@mantine/notifications/styles.css';
import { Space_Grotesk } from "next/font/google";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { NavigationProgress } from "@mantine/nprogress";
import NavBar from "@/components/nav/NavBar";
import { Notifications } from '@mantine/notifications';

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "The Reminder",
  description: "The Reminder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} h-screen`}>
        <MantineProvider>
          <NavigationProgress />
          <NavBar />
          <Notifications />
          <main className="w-full bg-cover flex flex-col max-w-7xl mx-auto h-full md:h-[calc(100%-82px)] space-y-10 p-5">
            <div className="w-full flex-1 ">{children}</div>
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
