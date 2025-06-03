import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import RootProviders from "@/components/Providers/RootProviders";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Finance Tracker",
    description: "Personal finance dashboard",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            data-arp=""
            className="dark"
            style={{ colorScheme: "dark" }}
        >
            <body className={`${inter.className} flex`}>
                <main className="flex-1">
                    <RootProviders>{children}</RootProviders>
                </main>
            </body>
        </html>
    );
}
