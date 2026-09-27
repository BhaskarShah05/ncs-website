import React from "react";
import SphereImageGrid from "./ui/img-sphere";
import { ALL_38_TEAM_MEMBERS } from "../data/teamMembers";
import { CursorDrivenParticleTypography } from "./ui/cursor-driven-particles-typography";
import { GlassFilter } from "./ui/liquid-glass";
import { ConnectSocialIcons } from "./ui/ConnectSocialIcons";

export function Footer() {
  return (
    <footer id="connect" className="relative flex flex-col items-center pt-[80px] pb-[70px] text-center w-full bg-transparent text-white select-none overflow-hidden">
      {/* Huge Interactive NIBBLE with Cursor-Driven Particle Typography */}
      <div className="relative w-full max-w-[1600px] h-[260px] sm:h-[340px] md:h-[400px] flex items-center justify-center -mb-2">
        <h2 className="sr-only">NIBBLE</h2>
        <CursorDrivenParticleTypography
          text="NIBBLE"
          fontSize={320}
          fontFamily="'Satoshi:Black', 'Satoshi', Arial, sans-serif"
          particleSize={1.9}
          particleDensity={3.2}
          dispersionStrength={26}
          returnSpeed={0.08}
          className="w-full h-full min-h-[260px] sm:min-h-[340px] md:min-h-[400px]"
        />
      </div>

      {/* LET'S CONNECT Card - Transparent Liquid Crystal */}
      <GlassFilter />
      <div className="relative mt-[35px] w-[720px] max-w-[92%] rounded-[32px] overflow-hidden p-[1px] transition-all duration-500 hover:scale-[1.015] group">
        {/* Crystal Outer Bevel & Prismatic Rim */}
        <div
          className="absolute inset-0 rounded-[32px] pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-80"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 35%, rgba(147, 197, 253, 0.25) 60%, rgba(244, 114, 182, 0.2) 80%, rgba(255, 255, 255, 0.35) 100%)",
          }}
        />

        {/* Liquid Crystal Glass Body */}
        <div
          className="relative rounded-[31px] px-8 sm:px-12 py-8 overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(28px) saturate(200%)",
            WebkitBackdropFilter: "blur(28px) saturate(200%)",
            boxShadow:
              "0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.06), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.5), inset 0 -1.5px 2px 0 rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Specular Liquid Light Sheen */}
          <div
            className="absolute -top-[55%] -left-[20%] w-[140%] h-[110%] rounded-[100%] pointer-events-none opacity-30 blur-xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
            }}
          />

          {/* Subtly Animated Liquid Caustics / Prismatic Sheen */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[31px] opacity-20 transition-opacity duration-500 group-hover:opacity-35"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.35) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(244, 114, 182, 0.3) 0%, transparent 50%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-[34px] sm:text-[38px] font-black tracking-tight text-white uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] font-['Satoshi:Bold',sans-serif]">
              LET’S CONNECT
            </h3>
            <p className="mt-1 text-[18px] sm:text-[20px] text-[#e0e0e0] font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              Follow NCS and stay in the loop.
            </p>

            {/* Social Logos from Frame 1171276380.svg */}
            <div className="mt-6 flex justify-center items-center">
              <ConnectSocialIcons />
            </div>
          </div>
        </div>
      </div>

      {/* 3D INTERACTIVE IMAGE SPHERE SECTION */}
      <div className="relative mt-[60px] w-full max-w-[1200px] flex items-center justify-center">
        {/* Left Botanical Leaf attached to side */}
        <div className="absolute left-0 sm:left-4 md:left-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] md:w-[170px] md:h-[170px]">
          <img src="/assets/cbf28.svg" alt="" className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
        </div>

        {/* 3D Image Sphere */}
        <div className="relative z-20 flex justify-center items-center py-4">
          <SphereImageGrid
            images={ALL_38_TEAM_MEMBERS}
            containerSize={640}
            sphereRadius={240}
            dragSensitivity={0.8}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            baseImageScale={0.15}
            hoverScale={1.3}
            perspective={1000}
            autoRotate={true}
            autoRotateSpeed={0.25}
          />
        </div>

        {/* Right Botanical Leaf attached to side */}
        <div className="absolute right-0 sm:right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none w-[90px] h-[90px] sm:w-[130px] sm:h-[130px] md:w-[170px] md:h-[170px]">
          <img src="/assets/ac2ff.svg" alt="" className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(236,72,153,0.6)]" />
        </div>
      </div>

      {/* Slogan & Copyright */}
      <p className="mt-[60px] text-[34px] font-semibold tracking-tight text-white max-w-[1200px] px-4 font-['Satoshi:Medium',sans-serif]">
        Designing, Coding, And Tomorrow’s Innovations Today.
      </p>
      <p className="mt-3 text-[20px] text-gray-400 font-normal">
        Designed and developed with <span className="text-red-500 inline-block animate-pulse">❤️</span> by Nibble Computer Society
      </p>
    </footer>
  );
}

export default Footer;
