
import "./globals.css";
import Providers from "./provider";

export const metadata = {
  title: "QuantPrep",
  description: "LeetCode for Quant Finance",
  icons: {
    icon: "/aqua_logo2.png", // This points to public/aqua_logo2.png
    shortcut: "/aqua_logo2.png",
    apple: "/aqua_logo2.png",
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

