import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

const items = [
  {
    id: 1,
    url: '/assets/highlights/web/IMG_2969.jpg',
    title: 'NCS Family - InOut Grand Finale',
  },
  {
    id: 2,
    url: '/assets/highlights/web/DSC04982.JPG',
    title: 'NCS Event Moments',
  },
  {
    id: 3,
    url: '/assets/highlights/web/DSC05186.JPG',
    title: 'CodeCraft Workshop',
  },
  {
    id: 4,
    url: '/assets/highlights/web/DSC05537.JPG',
    title: 'Community Gathering',
  },
  {
    id: 5,
    url: '/assets/highlights/web/IMG_1634.JPG',
    title: 'Hackathon Ideation',
  },
  {
    id: 6,
    url: '/assets/highlights/web/IMG_1635.JPG',
    title: 'Team Collaboration',
  },
  {
    id: 7,
    url: '/assets/highlights/web/IMG_1647.JPG',
    title: 'Tech Talk & Keynote',
  },
  {
    id: 8,
    url: '/assets/highlights/web/IMG_1736.JPG',
    title: 'Design & Code Jam',
  },
  {
    id: 9,
    url: '/assets/highlights/web/IMG_1795.JPG',
    title: 'Annual Fest Celebrations',
  },
  {
    id: 10,
    url: '/assets/highlights/web/IMG_2403.JPG',
    title: 'Workshop Mentorship',
  },
  {
    id: 11,
    url: '/assets/highlights/web/IMG_2495.JPG',
    title: 'Project Presentations',
  },
  {
    id: 12,
    url: '/assets/highlights/web/IMG_2526.jpeg',
    title: 'Interactive Sessions',
  },
  {
    id: 13,
    url: '/assets/highlights/web/IMG_2554.jpeg',
    title: 'Hackathon Winners Showcase',
  },
  {
    id: 14,
    url: '/assets/highlights/web/IMG_2952.jpg',
    title: 'Team Camaraderie',
  },
  {
    id: 15,
    url: '/assets/highlights/web/IMG_2979.jpg',
    title: 'Grand Stage Presentations',
  },
  {
    id: 16,
    url: '/assets/highlights/web/IMG_2984.jpg',
    title: 'Community Spotlight',
  },
  {
    id: 17,
    url: '/assets/highlights/web/IMG_3002.jpg',
    title: 'Stage Address & Awards',
  },
  {
    id: 18,
    url: '/assets/highlights/web/IMG_3010.jpg',
    title: 'Behind the Scenes',
  },
  {
    id: 19,
    url: '/assets/highlights/web/IMG_3012.jpg',
    title: 'Celebrating Success',
  },
  {
    id: 20,
    url: '/assets/highlights/web/IMG_3016.jpg',
    title: 'Tech Showcase',
  },
  {
    id: 21,
    url: '/assets/highlights/web/IMG_4240.jpg',
    title: 'Orientation Day',
  },
  {
    id: 22,
    url: '/assets/highlights/web/IMG_4252.jpg',
    title: 'Freshers Interaction',
  },
  {
    id: 23,
    url: '/assets/highlights/web/IMG_4262.jpg',
    title: 'NCS Core Team Memories',
  },
];

const FULL_WIDTH_PX = 160;
const COLLAPSED_WIDTH_PX = 54;
const GAP_PX = 8;
const MARGIN_PX = 6;

interface ThumbnailsProps {
  index: number;
  setIndex: (i: number) => void;
}

function Thumbnails({ index, setIndex }: ThumbnailsProps) {
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailsRef.current) {
      let scrollPosition = 0;
      for (let i = 0; i < index; i++) {
        scrollPosition += COLLAPSED_WIDTH_PX + GAP_PX;
      }

      scrollPosition += MARGIN_PX;

      const containerWidth = thumbnailsRef.current.offsetWidth;
      const centerOffset = containerWidth / 2 - FULL_WIDTH_PX / 2;
      scrollPosition -= centerOffset;

      thumbnailsRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div
      ref={thumbnailsRef}
      className="overflow-x-auto py-3"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex items-center gap-2 h-24 sm:h-28 px-2" style={{ width: 'fit-content' }}>
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? 'active' : 'inactive'}
            variants={{
              active: {
                width: FULL_WIDTH_PX,
                marginLeft: MARGIN_PX,
                marginRight: MARGIN_PX,
                opacity: 1,
                scale: 1.05,
              },
              inactive: {
                width: COLLAPSED_WIDTH_PX,
                marginLeft: 0,
                marginRight: 0,
                opacity: 0.5,
                scale: 1,
              },
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`relative shrink-0 h-20 sm:h-24 md:h-26 overflow-hidden rounded-xl border transition-colors duration-200 cursor-pointer ${
              i === index
                ? 'border-indigo-400/90 shadow-[0_0_20px_rgba(99,102,241,0.6)] ring-2 ring-indigo-400/40'
                : 'border-white/10 hover:border-white/30 hover:opacity-80'
            }`}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
              loading="lazy"
            />
            {i === index && (
              <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function ThumbnailCarousel() {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      const targetX = -index * containerWidth;

      animate(x, targetX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  return (
    <div className="relative w-full max-w-[1520px] mx-auto px-2 sm:px-4">
      {/* Background Ambient Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[700px] w-[95vw] max-w-[1500px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25) 0%, rgba(236, 72, 153, 0.14) 45%, transparent 75%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="flex flex-col gap-6">
        {/* Main Carousel Frame */}
        <div
          className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#0b0f19] shadow-[0_25px_80px_rgba(0,0,0,0.95)]"
          ref={containerRef}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            drag="x"
            dragElastic={0.2}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_e, info) => {
              setIsDragging(false);
              const containerWidth = containerRef.current?.offsetWidth || 1;
              const offset = info.offset.x;
              const velocity = info.velocity.x;

              let newIndex = index;

              // If fast swipe, use velocity
              if (Math.abs(velocity) > 500) {
                newIndex = velocity > 0 ? index - 1 : index + 1;
              }
              // Otherwise use offset threshold (25% of container width)
              else if (Math.abs(offset) > containerWidth * 0.25) {
                newIndex = offset > 0 ? index - 1 : index + 1;
              }

              // Clamp index
              newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
              setIndex(newIndex);
            }}
            style={{ x }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="shrink-0 w-full h-[450px] sm:h-[580px] md:h-[680px] lg:h-[750px] xl:h-[820px] relative bg-black/50 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                  loading={item.id <= 3 ? 'eager' : 'lazy'}
                />
                {/* Soft gradient bottom overlay for title and readability */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-28 text-left pointer-events-none">
                  <p className="text-white text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-lg">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Previous Button */}
          <motion.button
            disabled={index === 0}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            whileHover={index !== 0 ? { scale: 1.1 } : {}}
            whileTap={index !== 0 ? { scale: 0.95 } : {}}
            className={`absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 size-12 sm:size-14 md:size-16 rounded-full flex items-center justify-center backdrop-blur-md border transition-all z-10 ${
              index === 0
                ? 'opacity-25 cursor-not-allowed bg-black/40 border-white/5 text-white/40'
                : 'bg-black/65 border-white/20 text-white shadow-2xl hover:bg-black/85 hover:border-white/40 cursor-pointer'
            }`}
            aria-label="Previous Slide"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Next Button */}
          <motion.button
            disabled={index === items.length - 1}
            onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
            whileHover={index !== items.length - 1 ? { scale: 1.1 } : {}}
            whileTap={index !== items.length - 1 ? { scale: 0.95 } : {}}
            className={`absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 size-12 sm:size-14 md:size-16 rounded-full flex items-center justify-center backdrop-blur-md border transition-all z-10 ${
              index === items.length - 1
                ? 'opacity-25 cursor-not-allowed bg-black/40 border-white/5 text-white/40'
                : 'bg-black/65 border-white/20 text-white shadow-2xl hover:bg-black/85 hover:border-white/40 cursor-pointer'
            }`}
            aria-label="Next Slide"
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Image Counter Badge */}
          <div className="absolute bottom-6 right-6 bg-black/75 backdrop-blur-md border border-white/20 text-white/95 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-base font-bold tracking-wider shadow-2xl">
            {index + 1} <span className="text-white/50">/</span> {items.length}
          </div>
        </div>

        {/* Thumbnails Row */}
        <Thumbnails index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
