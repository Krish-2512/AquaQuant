
import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "Q-Lab",
  description: "LeetCode for Quant Finance",
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {/* Providers must wrap children */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

