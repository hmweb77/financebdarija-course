import Course from "@/app/components/Home/Course";
import HappyClient from "@/app/components/Home/HappyClients";
import HeroSection from "@/app/components/Home/HeroSection";
import PricingComponent from "@/app/components/Home/Pricing";
import Feedback from "@/app/components/Home/Testimonials";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <HappyClient />
      <PricingComponent />
      <Course />
      <Feedback />
      <Footer />
    </>
  );
}
