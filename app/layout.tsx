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
            className="dark"
            style={{ colorScheme: "dark" }}
            data-arp=""
        >
            <body className={inter.className}>
                <RootProviders>{children}</RootProviders>
            </body>
        </html>
    );
}

// import "./globals.css";
// import { Inter } from "next/font/google";
// import type { Metadata } from "next";
// import RootProviders from "@/components/Providers/RootProviders";
// import Link from "next/link";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Finance Tracker",
//     description: "Personal finance dashboard",
// };

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html
//             lang="en"
//             data-arp=""
//             className="dark"
//             style={{ colorScheme: "dark" }}
//         >
//             <body className={`${inter.className} flex`}>
//                 {/* Sidebar */}
//                 <aside className="w-64 min-h-screen p-6 space-y-6 bg-white shadow-md dark:bg-gray-900">
//                     <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                         Finance Tracker
//                     </h1>
//                     <nav className="space-y-4 text-sm">
//                         <Link
//                             href="/"
//                             className="block text-blue-600 hover:underline dark:text-blue-400"
//                         >
//                             Dashboard
//                         </Link>
//                         <a
//                             href="/transaction"
//                             className="block text-gray-800 hover:underline dark:text-gray-300"
//                         >
//                             Transactions
//                         </a>
//                         <a
//                             href="/budgets"
//                             className="block text-gray-800 hover:underline dark:text-gray-300"
//                         >
//                             Budgets
//                         </a>
//                         <a
//                             href="/saving-goal"
//                             className="block text-gray-800 hover:underline dark:text-gray-300"
//                         >
//                             Savings Goals
//                         </a>
//                     </nav>
//                     <a
//                         href="#"
//                         className="text-sm text-gray-600 hover:underline dark:text-gray-400"
//                     >
//                         Log out
//                     </a>
//                 </aside>

//                 {/* Main Content with Providers */}
//                 <main className="flex-1 p-6 text-gray-900 bg-gray-50 dark:bg-black dark:text-white">
//                     <RootProviders>{children}</RootProviders>
//                 </main>
//             </body>
//         </html>
//     );
// }
