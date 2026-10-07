import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera, Image as ImageIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HighlightsGallery } from "../components/HighlightsGallery";
import WorksWheel, { defaultHighlightItems } from "../components/WorksWheel";

export default function Gallery() {
  const navigate = (route: string) => {
    window.location.hash = `/${route}`;
  };

  return (
    <div className="relative min-h-full w-full bg-transparent px-4 sm:px-8 md:px-12 xl:px-[70px] pt-[27px] font-['Satoshi_Variable:Regular',Arial,sans-serif] text-white">
      {/* Navigation */}
      <Navbar currentRoute="gallery" onNavigate={navigate} />

      {/* Hero Header */}
      <section className="relative mx-auto mt-[40px] md:mt-[60px] xl:mt-[75px] max-w-[1539px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-pink-300 mb-6">
            <Camera size={16} />
            <span>NCS MOMENTS & MEMORIES</span>
          </div>

          <h1 className="font-['Satoshi:Black',Arial,sans-serif] text-[48px] sm:text-[72px] md:text-[96px] lg:text-[112px] font-black uppercase tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e2e2e2] to-[#888888]">
            PHOTO GALLERY
          </h1>

          <p className="mx-auto mt-6 max-w-[880px] text-[16px] sm:text-[20px] md:text-[22px] font-normal leading-[1.5] text-[#b3b3b3]">
            Take a look through our lens — late-night coding sessions, hackathon victories,
            workshops, stage presentations, and the unforgettable bonds that make our community.
          </p>
        </motion.div>
      </section>

      {/* Interactive WorksWheel Carousel Section */}
      <section className="mx-auto mt-[80px] md:mt-[100px] w-full max-w-[1539px]">
        <div className="relative w-full h-[600px] sm:h-[720px] md:h-[820px] lg:h-[900px] rounded-[32px] overflow-hidden border border-white/10 bg-[#070707] shadow-2xl">
          <WorksWheel
            items={defaultHighlightItems}
            label="NCS HIGHLIGHTS"
            action="View"
            className="h-full w-full bg-transparent"
          />
        </div>
      </section>

      {/* Multi-Column Animated Perspective Highlights Gallery */}
      <section className="mx-auto mt-[120px] md:mt-[160px] w-full max-w-[1539px] text-center">
        <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-tight text-white mb-4">
          SCROLLING ARCHIVES
        </h2>
        <p className="text-[17px] text-[#a1a1aa] max-w-[700px] mx-auto mb-8">
          Explore high-resolution moments captured across multiple seasons of Nibble Computer Society.
        </p>

        <div className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#050505]">
          <HighlightsGallery />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
