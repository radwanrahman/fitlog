import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitLog",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" />
        </PlanProvider>
      </body>
    </html>
  );
}
