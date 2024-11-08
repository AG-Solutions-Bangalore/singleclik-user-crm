import Brands from "@/components/base/Brands";
import DownloadSection from "@/components/base/DownloadSection";
import FAQSection from "@/components/base/FAQSection";
import Features from "@/components/base/Features";
import Footer from "@/components/base/Footer";
import Hero from "@/components/base/Hero";
import Newsletter from "@/components/base/Newsletter";
import OurTeam from "@/components/base/OurTeam";
import Pricing from "@/components/base/Pricing";

import RootLayout from "@/layouts/RootLayout";

const Login = () => {
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden">
        <div className="relative z-10">
          <RootLayout />
          <Hero />
          <hr className="bg-black " />
          <DownloadSection />
          <hr className="bg-black " />
          <Features />
          <hr className="bg-black " />
          <Pricing />
          <hr className="bg-black " />
          <Newsletter />
          <hr className="bg-black " />
          <FAQSection />
          <hr className="bg-black " />
          <OurTeam />
          <hr className="bg-black" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
