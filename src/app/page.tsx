import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialsSection from "../components/TestimonialsSection";
import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";
import ServiceSection from "@/components/ServiceSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServiceSection />
      <AboutUsSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
