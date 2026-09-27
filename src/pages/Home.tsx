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
                  "flex flex-col items-center w-full transition-all duration-300 cursor-pointer select-none",
                  isFaded ? "opacity-30 blur-[0.5px] scale-[0.98]" : "opacity-100 scale-100",
                )}
              >
                {/* Main Row: Logo + Title */}
                <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] group">
                  {club.logoPosition === "left" && (
                    <motion.img
                      src={club.logo}
                      alt={`${club.name} Club Logo`}
                      animate={{
                        scale: isHovered ? 1.08 : 1,
                        rotate: isHovered ? -3 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 15px 35px ${club.glowColor}) drop-shadow(0 0 25px ${club.glowColor})`
                          : `drop-shadow(0 12px 30px ${club.badgeShadow})`,
                      }}
                    />
                  )}

                  <span
                    className={cn(
                      "font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight leading-none transition-all duration-300",
                      isHovered ? "text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]" : "text-white",
                    )}
                  >
                    {club.name}
                  </span>

                  {club.logoPosition === "right" && (
                    <motion.img
                      src={club.logo}
                      alt={`${club.name} Club Logo`}
                      animate={{
                        scale: isHovered ? 1.08 : 1,
                        rotate: isHovered ? 3 : 0,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-all duration-300"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 15px 35px ${club.glowColor}) drop-shadow(0 0 25px ${club.glowColor})`
                          : `drop-shadow(0 12px 30px ${club.badgeShadow})`,
                      }}
                    />
                  )}
                </div>

                {/* Animated Description Card */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -16, scale: 0.96 }}
                      animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
                      exit={{ opacity: 0, height: 0, y: -12, scale: 0.96 }}
                      transition={{
                        height: { type: "spring", stiffness: 320, damping: 28 },
                        opacity: { duration: 0.22 },
                        scale: { duration: 0.22 },
                      }}
                      className="overflow-hidden w-full max-w-[960px] px-4 pt-6 sm:pt-8"
                    >
                      <div
                        className="relative rounded-[28px] border bg-[#0a0a0c]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl overflow-hidden transition-all duration-300"
                        style={{
                          borderColor: `${club.color}45`,
                          boxShadow: `0 16px 50px -10px ${club.glowColor}, inset 0 1px 0 0 rgba(255,255,255,0.1)`,
                        }}
                      >
                        {/* Glow accent pill at top */}
                        <div
                          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-48 rounded-full"
                          style={{
                            backgroundColor: club.color,
                            boxShadow: `0 0 16px 2px ${club.color}`,
                          }}
                        />

                        {/* Domain Tags */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-4">
                          {club.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide border transition-all"
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

                        {/* Description Text */}
                        <p
                          className="text-[17px] sm:text-[20px] md:text-[22px] font-normal leading-[1.55] text-neutral-200 text-center max-w-[820px] mx-auto tracking-normal"
                          style={{ fontFamily: "'Satoshi', Arial, sans-serif" }}
                        >
                          {club.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
