import React from "react";
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

export default function Home() {
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
          <h1 className="flex flex-col font-['Satoshi:Black',Arial,sans-serif] text-[132px] font-black leading-[1.14] tracking-[-3.5px] uppercase">
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

          <p className="mt-[56px] font-['Satoshi:Medium',Arial,sans-serif] text-[16px] font-medium tracking-[3.8px] text-[#b3b3b3] uppercase">
            WE CODE • WE DESIGN • WE DEVELOP
          </p>

          <button
            type="button"
            onClick={() => navigate("recruitment")}
            className="mt-[36px] flex h-[50px] w-[308px] items-center justify-center gap-3 rounded-full border border-white bg-black text-[18px] font-medium text-white transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] cursor-pointer"
          >
            <span>Join the Community</span>
            <span className="text-[20px] font-light">↗</span>
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

        <div className="mt-[80px] md:mt-[100px] flex flex-col items-center gap-[45px] sm:gap-[60px] md:gap-[72px]">
          {/* 1. Programming */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <span className="font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight text-white leading-none">
              PROGRAMMING
            </span>
            <img
              src="/assets/programming-logo.svg"
              alt="Programming Club Logo"
              className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_12px_30px_rgba(255,240,122,0.25)]"
            />
          </div>

          {/* 2. Development */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/assets/dev-logo.svg"
              alt="Development Club Logo"
              className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_12px_30px_rgba(130,153,255,0.25)]"
            />
            <span className="font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight text-white leading-none">
              DEVLOPMENT
            </span>
          </div>

          {/* 3. Designing */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <span className="font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight text-white leading-none">
              DESIGNING
            </span>
            <img
              src="/assets/design-logo.svg"
              alt="Designing Club Logo"
              className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_12px_30px_rgba(255,134,200,0.25)]"
            />
          </div>

          {/* 4. Technical */}
          <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-9 lg:gap-[42px] group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/assets/tech-logo.svg"
              alt="Technical Club Logo"
              className="h-[80px] w-[69px] sm:h-[135px] sm:w-[117px] md:h-[180px] md:w-[155px] lg:h-[229px] lg:w-[198px] object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2 drop-shadow-[0_12px_30px_rgba(184,245,66,0.25)]"
            />
            <span className="font-['Satoshi:Black',Arial,sans-serif] text-[40px] sm:text-[72px] md:text-[100px] lg:text-[125px] xl:text-[140px] font-black uppercase tracking-tight text-white leading-none">
              TECHNICAL
            </span>
          </div>
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
