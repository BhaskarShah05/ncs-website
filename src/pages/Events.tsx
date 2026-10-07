import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Sparkles, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SocialCards, { CardItem } from "../components/ui/card-fan-carousel";
import { LiquidMetalButton } from "../components/ui/liquid-metal-button";

const EVENT_GALLERY_CARDS: CardItem[] = [
  { imgUrl: "/assets/events/event-1.jpg", alt: "NCS Flagship Hackathon" },
  { imgUrl: "/assets/events/event-2.jpg", alt: "CodeCraft Sprint" },
  { imgUrl: "/assets/events/event-3.jpg", alt: "Design Workshop" },
  { imgUrl: "/assets/events/event-4.jpg", alt: "Speaker Keynote" },
  { imgUrl: "/assets/events/event-5.webp", alt: "Team Collaboration" },
  { imgUrl: "/assets/events/event-6.jpg", alt: "Award Ceremony" },
  { imgUrl: "/assets/events/event-7.webp", alt: "Mentorship Round" },
  { imgUrl: "/assets/events/event-8.webp", alt: "Project Demonstrations" },
  { imgUrl: "/assets/events/event-9.jpeg", alt: "NCS Hack Arena" },
  { imgUrl: "/assets/events/event-10.jpeg", alt: "Community Gathering" },
];

interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: "Hackathon" | "Workshop" | "Competition" | "Conference";
  date: string;
  venue: string;
  attendees: string;
  description: string;
  highlights: string[];
  status: "Upcoming" | "Annual Flagship" | "Completed";
  color: string;
}

const FEATURED_EVENTS: EventItem[] = [
  {
    id: "hackncs",
    title: "HackNCS 2026",
    tagline: "Flagship 36-Hour National Hackathon",
    category: "Hackathon",
    date: "Annual Flagship",
    venue: "Main Auditorium & Labs",
    attendees: "600+ Participants",
    description:
      "Our premier 36-hour hackathon bringing together students, developers, and designers to build cutting-edge solutions across AI, Web3, and Open Innovation.",
    highlights: ["₹1,50,000+ Prize Pool", "Industry Mentors", "Direct Hiring Tracks"],
    status: "Annual Flagship",
    color: "#6663FF",
  },
  {
    id: "codecraft",
    title: "CodeCraft",
    tagline: "Competitive Programming & Algorithmic Sprint",
    category: "Competition",
    date: "Bi-annual Series",
    venue: "Coding Labs & Online",
    attendees: "400+ Coders",
    description:
      "A fast-paced algorithmic coding battle testing speed, logic, and optimization across complex data structures and dynamic programming challenges.",
    highlights: ["Speed-Coding Arena", "Global Leaderboard", "Cash Rewards"],
    status: "Upcoming",
    color: "#FDD344",
  },
  {
    id: "designsprint",
    title: "DesignSprint",
    tagline: "UI/UX, 3D Motion & Design System Workshop",
    category: "Workshop",
    date: "Every Semester",
    venue: "Creative Studio",
    attendees: "250+ Designers",
    description:
      "An intensive design masterclass covering Figma workflows, design tokens, micro-interactions, and 3D web experiences with Spline and Three.js.",
    highlights: ["Figma to Code", "Interactive Prototyping", "Design Portfolio Review"],
    status: "Upcoming",
    color: "#FF6DFD",
  },
  {
    id: "devcon",
    title: "NCS TechCon",
    tagline: "Developer Conference & Keynote Sessions",
    category: "Conference",
    date: "Annual Summit",
    venue: "Convention Hall",
    attendees: "800+ Attendees",
    description:
      "Keynote talks from alumni working at leading tech enterprises, open-source contributors, and deep-dive sessions into scalable cloud architecture.",
    highlights: ["Alumni Speakers", "Panel Discussions", "Networking Lounges"],
    status: "Completed",
    color: "#B3FD44",
  },
];

export default function Events() {
  const navigate = (route: string) => {
    window.location.hash = `/${route}`;
  };

  return (
    <div className="relative min-h-full w-full bg-transparent px-4 sm:px-8 md:px-12 xl:px-[70px] pt-[27px] font-['Satoshi_Variable:Regular',Arial,sans-serif] text-white">
      {/* Navigation */}
      <Navbar currentRoute="events" onNavigate={navigate} />

      {/* Hero Header */}
      <section className="relative mx-auto mt-[40px] md:mt-[60px] xl:mt-[75px] max-w-[1539px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-sm font-medium text-purple-300 mb-6">
            <Sparkles size={16} />
            <span>NCS EVENT SERIES</span>
          </div>

          <h1 className="font-['Satoshi:Black',Arial,sans-serif] text-[48px] sm:text-[72px] md:text-[96px] lg:text-[112px] font-black uppercase tracking-tight leading-[1.05] bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e2e2e2] to-[#888888]">
            OUR EVENTS
          </h1>

          <p className="mx-auto mt-6 max-w-[880px] text-[16px] sm:text-[20px] md:text-[22px] font-normal leading-[1.5] text-[#b3b3b3]">
            From high-energy 36-hour hackathons and algorithmic contests to hands-on
            design sprints and alumni keynotes — explore how NCS drives innovation.
          </p>
        </motion.div>

        {/* Fan Carousel Visual */}
        <div className="mt-12 sm:mt-16 w-full flex justify-center">
          <SocialCards cards={EVENT_GALLERY_CARDS} />
        </div>
      </section>

      {/* Featured Events Grid */}
      <section className="mx-auto mt-[120px] md:mt-[160px] w-full max-w-[1539px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-black uppercase tracking-tight text-white">
              FLAGSHIP HAPPENINGS
            </h2>
            <p className="mt-2 text-[17px] text-[#a1a1aa] max-w-[600px]">
              Signature experiences created and executed by our developer, design, and tech teams.
            </p>
          </div>
          <LiquidMetalButton
            label="Join Recruitment"
            onClick={() => navigate("recruitment")}
            width={220}
            height={50}
            fontSize={16}
            fontWeight={600}
            icon={<ArrowRight size={18} />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_EVENTS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-[28px] border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-md p-8 sm:p-10 flex flex-col justify-between overflow-hidden group hover:border-white/25 transition-all duration-300"
            >
              {/* Top ambient color glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[90px] opacity-20 pointer-events-none group-hover:opacity-35 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              />

              <div>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}15`,
                    }}
                  >
                    {item.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-neutral-400 bg-white/5 border border-white/10">
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-5 text-[28px] sm:text-[36px] font-black uppercase tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-[15px] sm:text-[17px] font-medium text-neutral-300">
                  {item.tagline}
                </p>

                <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.6] text-neutral-400">
                  {item.description}
                </p>

                {/* Highlights tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-neutral-300"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom details bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4 text-xs sm:text-sm text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Calendar size={15} className="text-purple-400" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={15} className="text-blue-400" />
                  <span>{item.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-emerald-400" />
                  <span>{item.attendees}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
