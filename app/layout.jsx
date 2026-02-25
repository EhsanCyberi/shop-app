export const dynamic = "force-dynamic"
import "./styles/globals.css"
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContex";
import { Session } from "./components/Session";
export default async function RootLayout({ children }) {
  const user = await Session()
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <Header user={user}/>
            {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
