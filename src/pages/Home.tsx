import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WorksWheel, { defaultHighlightItems } from "../components/WorksWheel";
import SocialCards, { CardItem } from "../components/ui/card-fan-carousel";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";

const EVENT_CARDS: CardItem[] = [
  { imgUrl: "/assets/events/event-1.jpg", alt: "NCS Event 1" },
  { imgUrl: "/assets/events/event-2.jpg", alt: "NCS Event 2" },
  { imgUrl: "/assets/events/event-3.jpg", alt: "NCS Event 3" },
  { imgUrl: "/assets/events/event-4.jpg", alt: "NCS Event 4" },
  { imgUrl: "/assets/events/event-5.webp", alt: "NCS Event 5" },
  { imgUrl: "/assets/events/event-6.jpg", alt: "NCS Event 6" },
  { imgUrl: "/assets/events/event-7.webp", alt: "NCS Event 7" },
  { imgUrl: "/assets/events/event-8.webp", alt: "NCS Event 8" },
  { imgUrl: "/assets/events/event-9.jpeg", alt: "NCS Event 9" },
  { imgUrl: "/assets/events/event-10.jpeg", alt: "NCS Event 10" },
];

interface ClubItem {
  id: string;
  name: string;
  logo: string;
  descCard: string;
  color: string;
  glowColor: string;
  badgeShadow: string;
  tags: string[];
  description: string;
  logoPosition: "left" | "right";
}

const CLUBS_DATA: ClubItem[] = [
  {
    id: "programming",
    name: "PROGRAMMING",
    logo: "/assets/programming-logo.svg",
    descCard: "/assets/clubs/programming-desc.svg",
    color: "#FDD344",
    glowColor: "rgba(253, 211, 68, 0.45)",
    badgeShadow: "rgba(255, 240, 122, 0.35)",
    tags: ["Competitive Programming", "Algorithms & DSA", "Problem Solving", "Hackathons"],
    description:
      "Mastering algorithms, data structures, and competitive problem-solving. We code, optimize, and represent the society in premier hackathons and global coding arenas.",
    logoPosition: "right",
  },
  {
    id: "development",
    name: "DEVLOPMENT",
    logo: "/assets/dev-logo.svg",
    descCard: "/assets/clubs/dev-desc.svg",
    color: "#6663FF",
    glowColor: "rgba(102, 99, 255, 0.45)",
    badgeShadow: "rgba(130, 153, 255, 0.35)",
    tags: ["Full-Stack Web", "Modern Frontend", "APIs & Cloud", "Open Source"],
    description:
      "Architecting modern web applications, scalable backend systems, APIs, and mobile platforms. Turning ambitious concepts into production-grade software.",
    logoPosition: "left",
  },
  {
    id: "designing",
    name: "DESIGNING",
    logo: "/assets/design-logo.svg",
    descCard: "/assets/clubs/design-desc.svg",
    color: "#FF6DFD",
    glowColor: "rgba(255, 109, 253, 0.45)",
    badgeShadow: "rgba(255, 134, 200, 0.35)",
    tags: ["UI/UX Design", "Design Systems", "Prototyping & Figma", "Motion & 3D"],
    description:
      "Crafting intuitive user interfaces, digital experiences, motion design, and visual identities. Blending aesthetics with purpose to create delightful products.",
    logoPosition: "right",
  },
  {
    id: "technical",
    name: "TECHNICAL",
    logo: "/assets/tech-logo.svg",
    descCard: "/assets/clubs/tech-desc.svg",
    color: "#B3FD44",
    glowColor: "rgba(179, 253, 68, 0.45)",
    badgeShadow: "rgba(184, 245, 66, 0.35)",
    tags: ["AI & Machine Learning", "DevOps & Cloud", "Cybersecurity", "Systems & IoT"],
    description:
      "Exploring cutting-edge technologies, AI & Machine Learning, cloud infrastructure, DevOps, and systems engineering that power the next digital era.",
    logoPosition: "left",
  },
];

function ClubLogoFlip({
  club,
  isHovered,
}: {
  club: ClubItem;
  isHovered: boolean;
}) {
  return (
    <div
      className="relative shrink-0 flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px]"
        animate={{
          rotateY: isHovered ? 180 : 0,
          scale: isHovered ? 1.06 : 1,
        }}
        transition={{
          duration: 0.65,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face: The Original Club Logo (Always visible by default) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={club.logo}
            alt={`${club.name} Club Logo`}
            className="size-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
            loading="eager"
          />
        </div>

        {/* Back Face: Description Card from Figma (revealed on 3D flip) */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <img
            src={club.descCard}
            alt={`${club.name} Description`}
            className="size-full object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
            loading="eager"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [hoveredClub, setHoveredClub] = useState<string | null>(null);

  useEffect(() => {
    if (!document.querySelector('script[src*="@splinetool/viewer"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://cdn.spline.design/@splinetool/viewer@2.0.75/build/spline-viewer.js";
      document.head.appendChild(script);
    }
  }, []);

  const navigate = (route: string) => {
    window.location.hash = `/${route}`;
  };

  return (
    <div className="relative min-h-full w-full bg-transparent px-4 sm:px-8 md:px-12 xl:px-[70px] pt-[27px] font-['Satoshi_Variable:Regular',Arial,sans-serif] text-white">
      {/* Navigation */}
      <Navbar currentRoute="home" onNavigate={navigate} />

      {/* Hero Section */}
      <section className="relative mx-auto mt-[40px] md:mt-[60px] xl:mt-[75px] flex flex-col lg:flex-row w-full max-w-[1539px] items-center lg:items-start justify-between gap-10 xl:gap-6">
        <div className="flex w-full lg:w-[50%] xl:w-[738px] max-w-[738px] flex-col items-center lg:items-start pt-[10px] md:pt-[20px] lg:pt-[33px] text-center lg:text-left">
          <h1 className="flex flex-col font-['Satoshi:Black',Arial,sans-serif] text-[58px] sm:text-[84px] md:text-[104px] lg:text-[112px] xl:text-[132px] font-black leading-[1.02] tracking-[-2px] sm:tracking-[-3.5px] uppercase">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, #ffffff 0%, #e2e2e2 40%, #8e8e8e 100%)",
              }}
            >
              NIBBLE
            </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, #ffffff 0%, #e2e2e2 40%, #8e8e8e 100%)",
              }}
            >
              COMPUTER
            </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, #ffffff 0%, #e2e2e2 40%, #8e8e8e 100%)",
              }}
            >
              SOCIETY
            </span>
          </h1>

          <p className="mt-[20px] sm:mt-[30px] lg:mt-[36px] font-['Satoshi:Medium',Arial,sans-serif] text-[13px] sm:text-[15px] md:text-[16px] font-medium tracking-[2.5px] sm:tracking-[3.5px] text-[#d4d4d8] uppercase">
            WE CODE • WE DESIGN • WE DEVELOP
          </p>

          <div className="mt-[24px] sm:mt-[32px]">
            <LiquidMetalButton
              label="Join the Community"
              onClick={() => navigate("recruitment")}
              width={260}
              height={56}
              fontSize={18}
              fontWeight={600}
              icon={<span className="text-[20px] font-light leading-none">↗</span>}
            />
          </div>
        </div>

        <div className="relative flex w-full lg:w-[50%] xl:w-[816px] max-w-[816px] aspect-4/3 sm:aspect-auto h-[380px] sm:h-[480px] md:h-[580px] lg:h-[660px] xl:h-[725px] shrink-0 lg:shrink items-center justify-center overflow-hidden">
          <spline-viewer
            url="https://prod.spline.design/uf2wIxgO0yhwMjDR/scene.splinecode"
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>
      </section>

      {/* Clubs Section */}
      <section className="mx-auto mt-[160px] w-full max-w-[1600px] px-6 text-center">
        <h2 className="text-[52px] sm:text-[68px] md:text-[80px] font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-[#dcdcdc] to-[#71717a]">
          CLUBS
        </h2>
        <p className="mx-auto mt-6 max-w-[1240px] text-[18px] sm:text-[22px] md:text-[24px] font-normal leading-[1.45] text-[#b3b3b3]">
          Explore our specialized clubs in Web Development, Programming, Design, and Technology.
          Discover new skills, unleash your creativity, and turn your ideas into reality. Join our vibrant community and build your future with us!
        </p>

        <div
          className="mt-[80px] md:mt-[100px] flex flex-col items-center gap-[45px] sm:gap-[60px] md:gap-[72px] w-full"
          onMouseLeave={() => setHoveredClub(null)}
        >
          {CLUBS_DATA.map((club) => {
            const isHovered = hoveredClub === club.id;
            const hasActiveHover = hoveredClub !== null;
            const isFaded = hasActiveHover && !isHovered;

            return (
              <div
                key={club.id}
                onMouseEnter={() => setHoveredClub(club.id)}
                onClick={() => setHoveredClub(isHovered ? null : club.id)}
                className={cn(
                  "flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] transition-all duration-300 cursor-pointer select-none",
                  isFaded ? "opacity-35 blur-[0.5px] scale-[0.98]" : "opacity-100 scale-100",
                )}
              >
                {/* 1. Left Logo (for Development and Technical) */}
                {club.logoPosition === "left" && (
                  <ClubLogoFlip club={club} isHovered={isHovered} />
                )}

                {/* 2. Club Title */}
                <span
                  className={cn(
                    "font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight leading-none transition-all duration-300",
                    isHovered ? "text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]" : "text-white",
                  )}
                >
                  {club.name}
                </span>

                {/* 3. Right Logo (for Programming and Designing) */}
                {club.logoPosition === "right" && (
                  <ClubLogoFlip club={club} isHovered={isHovered} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mx-auto mt-[160px] md:mt-[180px] w-full max-w-[1600px] px-6 text-center">
        <h2 className="text-[52px] sm:text-[68px] md:text-[80px] font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-[#dcdcdc] to-[#71717a]">
          HIGHLIGHTS
        </h2>
        <p className="mx-auto mt-6 max-w-[1240px] text-[18px] sm:text-[22px] md:text-[24px] font-normal leading-[1.45] text-[#b3b3b3]">
          From brainstorming ideas to building amazing things, every moment tells a story. Take a look at our events, workshops, and the people who make our community thrive.
        </p>

        {/* Interactive WorksWheel Turning Carousel */}
        <div className="relative mt-12 md:mt-16 w-full h-[650px] sm:h-[750px] md:h-[840px] lg:h-[920px] rounded-[32px] overflow-hidden border border-white/10 bg-[#070707] shadow-2xl">
          <WorksWheel
            items={defaultHighlightItems}
            label="NCS FAMILY"
            action="View"
            className="h-full w-full bg-transparent"
          />
        </div>
      </section>

      {/* Events Section */}
      <section className="mx-auto mt-[160px] md:mt-[180px] w-full max-w-[1600px] px-6 text-center">
        <h2 className="text-[52px] sm:text-[68px] md:text-[80px] font-black tracking-tight uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-[#dcdcdc] to-[#71717a]">
          EVENTS
        </h2>
        <p className="mx-auto mt-6 max-w-[1240px] text-[18px] sm:text-[22px] md:text-[24px] font-normal leading-[1.45] text-[#b3b3b3]">
          Ideas worth sharing. Experiences worth remembering. Join us for events that spark curiosity, inspire creativity, and bring our community together.
        </p>

        {/* Event Cards Fan Carousel */}
        <div className="mt-2 sm:mt-4 w-full flex justify-center">
          <SocialCards cards={EVENT_CARDS} />
        </div>
      </section>

      {/* Footer with Moving Team Photo */}
      <Footer />
    </div>
  );
}
