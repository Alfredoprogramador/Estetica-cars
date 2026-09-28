import type { Metadata } from "next";
import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { appConfig } from "@/data/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://carclean-pro.vercel.app"),
  title: appConfig.name,
  description: appConfig.description,
  applicationName: appConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full scroll-smooth bg-slate-50">
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-950">
        <ServiceWorkerRegistration />
        <AppHeader />
        <main className="flex-1">{children}</main>
        <AppFooter />
      </body>
    </html>
  );
}
