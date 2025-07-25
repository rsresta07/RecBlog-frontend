import React, { ReactNode } from "react";
import Header from "@/components/common/CommonHeader";
import Footer from "@/components/common/CommonFooter";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

interface LayoutProps {
  children: ReactNode;
}

/**
 * The top-level component for the app, which renders the header, the main section,
 * and the footer.
 *
 * @param children The content of the main section.
 *
 * @returns The JSX element for the app.
 */
const HeroLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className={poppins.className}>
      <Header />
      <section className="bg-light-bg">{children}</section>
      <Footer />
    </main>
  );
};

export default HeroLayout;
