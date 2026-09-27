import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WorksWheel, { defaultHighlightItems } from "../components/WorksWheel";
import SocialCards, { CardItem } from "../components/ui/card-fan-carousel";

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
    color: "#B3FD44",
    glowColor: "rgba(179, 253, 68, 0.45)",
    badgeShadow: "rgba(184, 245, 66, 0.35)",
    tags: ["AI & Machine Learning", "DevOps & Cloud", "Cybersecurity", "Systems & IoT"],
    description:
      "Exploring cutting-edge technologies, AI & Machine Learning, cloud infrastructure, DevOps, and systems engineering that power the next digital era.",
    logoPosition: "left",
  },
];

export default function Home() {
  const [hoveredClub, setHoveredClub] = useState<string | null>(null);

  const navigate = (route: string) => {
    window.location.hash = `/${route}`;
  };

  return (
    <div className="relative min-h-full w-full bg-transparent px-[70px] pt-[27px] font-['Satoshi_Variable:Regular',Arial,sans-serif] text-white">
      {/* Navigation */}
      <Navbar currentRoute="home" onNavigate={navigate} />

      {/* Hero Section */}
      <section className="relative mx-auto mt-[75px] flex w-[1539px] max-w-full items-start justify-between">
        <div className="flex w-[738px] flex-col items-start pt-[33px]">
          <h1 className="flex flex-col font-['Satoshi:Black',Arial,sans-serif] text-[132px] font-black leading-[1.05] tracking-[-3.5px] uppercase">
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

          <p className="mt-[36px] font-['Satoshi:Medium',Arial,sans-serif] text-[16px] font-medium tracking-[3.5px] text-[#d4d4d8] uppercase">
            WE CODE • WE DESIGN • WE DEVELOP
          </p>

          <button
            type="button"
            onClick={() => navigate("recruitment")}
            className="mt-[28px] flex h-[52px] w-fit items-center justify-center gap-3 rounded-full border border-white/80 bg-transparent px-8 text-[18px] font-medium text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] cursor-pointer group"
          >
            <span>Join the Community</span>
            <span className="text-[20px] font-light transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>

        <div className="relative flex w-[816px] shrink-0 items-center justify-end">
          <img
            src="/assets/49496.svg"
            className="h-[725px] w-[816px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            alt="Nibble Computer Society Hero 3D Illustration"
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
                  <div
                    className="relative shrink-0 flex items-center justify-center"
                    style={{ perspective: 1200 }}
                  >
                    <motion.div
                      className="relative w-[110px] h-[125px] sm:w-[155px] sm:h-[180px] md:w-[185px] md:h-[215px] lg:w-[220px] lg:h-[250px]"
                      animate={{
                        rotateY: isHovered ? 180 : 0,
                        scale: isHovered ? 1.06 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front: Logo */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <img
                          src={club.logo}
                          alt={`${club.name} Club Logo`}
                          className="size-full object-contain"
                          style={{
                            filter: isHovered
                              ? `drop-shadow(0 15px 35px ${club.glowColor}) drop-shadow(0 0 25px ${club.glowColor})`
                              : `drop-shadow(0 12px 30px ${club.badgeShadow})`,
                          }}
                        />
                      </div>

                      {/* Back: Description Card */}
                      <div
                        className="absolute inset-0 flex flex-col justify-between rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] p-3.5 sm:p-4.5 lg:p-5 border bg-[#0a0a0d]/95 backdrop-blur-2xl text-left select-none overflow-hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          borderColor: `${club.color}60`,
                          boxShadow: `0 20px 45px -10px ${club.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        }}
                      >
                        {/* Top Neon Accent Line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2.5px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${club.color}, transparent)`,
                            boxShadow: `0 0 12px ${club.color}`,
                          }}
                        />

                        {/* Card Header */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] sm:text-[11px] lg:text-[13px] font-black tracking-wider uppercase"
                            style={{ color: club.color, fontFamily: "'Satoshi', Arial, sans-serif" }}
                          >
                            {club.name}
                          </span>
                          <span
                            className="size-2 sm:size-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: club.color,
                              boxShadow: `0 0 10px ${club.color}`,
                            }}
                          />
                        </div>

                        {/* Description */}
                        <p
                          className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13.5px] font-normal leading-[1.45] text-neutral-200 line-clamp-4 my-auto"
                          style={{ fontFamily: "'Satoshi', Arial, sans-serif" }}
                        >
                          {club.description}
                        </p>

                        {/* Domain Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                          {club.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] lg:text-[10.5px] font-medium border tracking-wide whitespace-nowrap"
                              style={{
                                backgroundColor: `${club.color}15`,
                                borderColor: `${club.color}35`,
                                color: club.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
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
                  <div
                    className="relative shrink-0 flex items-center justify-center"
                    style={{ perspective: 1200 }}
                  >
                    <motion.div
                      className="relative w-[110px] h-[125px] sm:w-[155px] sm:h-[180px] md:w-[185px] md:h-[215px] lg:w-[220px] lg:h-[250px]"
                      animate={{
                        rotateY: isHovered ? 180 : 0,
                        scale: isHovered ? 1.06 : 1,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Front: Logo */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                        }}
                      >
                        <img
                          src={club.logo}
                          alt={`${club.name} Club Logo`}
                          className="size-full object-contain"
                          style={{
                            filter: isHovered
                              ? `drop-shadow(0 15px 35px ${club.glowColor}) drop-shadow(0 0 25px ${club.glowColor})`
                              : `drop-shadow(0 12px 30px ${club.badgeShadow})`,
                          }}
                        />
                      </div>

                      {/* Back: Description Card */}
                      <div
                        className="absolute inset-0 flex flex-col justify-between rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] p-3.5 sm:p-4.5 lg:p-5 border bg-[#0a0a0d]/95 backdrop-blur-2xl text-left select-none overflow-hidden"
                        style={{
                          backfaceVisibility: "hidden",
                          WebkitBackfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                          borderColor: `${club.color}60`,
                          boxShadow: `0 20px 45px -10px ${club.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        }}
                      >
                        {/* Top Neon Accent Line */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2.5px]"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${club.color}, transparent)`,
                            boxShadow: `0 0 12px ${club.color}`,
                          }}
                        />

                        {/* Card Header */}
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] sm:text-[11px] lg:text-[13px] font-black tracking-wider uppercase"
                            style={{ color: club.color, fontFamily: "'Satoshi', Arial, sans-serif" }}
                          >
                            {club.name}
                          </span>
                          <span
                            className="size-2 sm:size-2.5 rounded-full shrink-0"
                            style={{
                              backgroundColor: club.color,
                              boxShadow: `0 0 10px ${club.color}`,
                            }}
                          />
                        </div>

                        {/* Description */}
                        <p
                          className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13.5px] font-normal leading-[1.45] text-neutral-200 line-clamp-4 my-auto"
                          style={{ fontFamily: "'Satoshi', Arial, sans-serif" }}
                        >
                          {club.description}
                        </p>

                        {/* Domain Tags */}
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
                          {club.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] lg:text-[10.5px] font-medium border tracking-wide whitespace-nowrap"
                              style={{
                                backgroundColor: `${club.color}15`,
                                borderColor: `${club.color}35`,
                                color: club.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
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
