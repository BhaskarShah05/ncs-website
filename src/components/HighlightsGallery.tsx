import React from "react";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
} from "./AnimatedGallery";

const IMAGES_1 = [
  "/assets/highlights/web/DSC04982.JPG",
  "/assets/highlights/web/DSC05186.JPG",
  "/assets/highlights/web/DSC05537.JPG",
  "/assets/highlights/web/IMG_1634.JPG",
  "/assets/highlights/web/IMG_1635.JPG",
  "/assets/highlights/web/IMG_1647.JPG",
  "/assets/highlights/web/IMG_1736.JPG",
  "/assets/highlights/web/IMG_1795.JPG",
];

const IMAGES_2 = [
  "/assets/highlights/web/IMG_1957_1.jpeg",
  "/assets/highlights/web/IMG_2403.JPG",
  "/assets/highlights/web/IMG_2495.JPG",
  "/assets/highlights/web/IMG_2526.jpeg",
  "/assets/highlights/web/IMG_2554.jpeg",
  "/assets/highlights/web/IMG_2952.jpg",
  "/assets/highlights/web/IMG_2969.jpg",
  "/assets/highlights/web/IMG_2979.jpg",
];

const IMAGES_3 = [
  "/assets/highlights/web/IMG_2984.jpg",
  "/assets/highlights/web/IMG_3002.jpg",
  "/assets/highlights/web/IMG_3010.jpg",
  "/assets/highlights/web/IMG_3012.jpg",
  "/assets/highlights/web/IMG_3016.jpg",
  "/assets/highlights/web/IMG_4240.jpg",
  "/assets/highlights/web/IMG_4252.jpg",
  "/assets/highlights/web/IMG_4262.jpg",
];

export const HighlightsGallery: React.FC = () => {
  return (
    <div className="relative w-full">
      <ContainerScroll className="relative h-[160vh] sm:h-[175vh] w-full">
        <ContainerSticky className="h-screen w-full flex items-center justify-center">
          {/* Background Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div
              className="h-[550px] w-[85vw] max-w-[1250px] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(147, 51, 234, 0.18), rgba(59, 130, 246, 0.12), transparent 70%)",
                filter: "blur(90px)",
              }}
            />
          </div>

          {/* Top and Bottom soft fade masks to cleanly blend scrolling cards into the black background */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

          <GalleryContainer className="relative z-0 max-w-[1400px] w-full mx-auto px-4 sm:px-6 md:px-8 max-h-[86vh] sm:max-h-[90vh]">
            {/* Column 1 */}
            <GalleryCol yRange={["-16%", "4%"]} className="-mt-4">
              {IMAGES_1.map((imageUrl, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_12px_36px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-blue-500/60 hover:scale-[1.03]"
                >
                  <img
                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageUrl}
                    alt={`NCS Highlight Moment ${index + 1}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </GalleryCol>

            {/* Column 2 - Staggered Opposite Motion */}
            <GalleryCol yRange={["20%", "-10%"]} className="mt-[-28%]">
              {IMAGES_2.map((imageUrl, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_12px_36px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-purple-500/60 hover:scale-[1.03]"
                >
                  <img
                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageUrl}
                    alt={`NCS Highlight Moment ${index + 9}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </GalleryCol>

            {/* Column 3 */}
            <GalleryCol yRange={["-16%", "4%"]} className="-mt-4">
              {IMAGES_3.map((imageUrl, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_12px_36px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-indigo-500/60 hover:scale-[1.03]"
                >
                  <img
                    className="aspect-video block h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={imageUrl}
                    alt={`NCS Highlight Moment ${index + 17}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  );
};
