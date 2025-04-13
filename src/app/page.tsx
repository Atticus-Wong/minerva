'use client';
import ChatBox from "@/components/ChatBox";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex-col justify-center min-h-screen work-sans-text">
        <Section1 />
        <Section2 />
        <Section3 />
        <Footer />
      </div>
    </>

  );
}
