import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/context/CartContext";
import CartModal from "./components/CartModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ElectroShop",
  description: "La mejor tienda de electrónica online",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
};

export default RootLayout;




