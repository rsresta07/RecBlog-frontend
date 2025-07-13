import React, { ReactNode } from "react";
import Header from "@/components/common/CommonHeader";
import Footer from "@/components/common/CommonFooter";
import { Poppins } from "next/font/google";
// import store from "@/redux/store";
// import { GoogleAnalytics } from '@next/third-parties/google'

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
});

interface LayoutProps {
  children: ReactNode;
}

const HeroLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <Provider store={store}>
    <main className={poppins.className}>
      <Header />
      <section className="bg-light-bg">{children}</section>
      <Footer />
    </main>
    // </Provider>
  );
};

export default HeroLayout;
