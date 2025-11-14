
import BookSection from "@/components/Home/Book";
import Course from "@/components/Home/Course";
import HappyClient from "@/components/Home/HappyClients";
import HeroSection from "@/components/Home/HeroSection";
import PricingComponent from "@/components/Home/Pricing";
import Feedback from "@/components/Home/Testimonials";
import React from "react";

const index = () => {
  return (
    <>
      <HeroSection />
    <BookSection/>
      <PricingComponent />
      <Course/>
      {/* <Feedback/> */}
     
  
    </>
  );
};

export default index;
