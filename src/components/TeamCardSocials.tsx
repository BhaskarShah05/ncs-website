import React from "react";

export interface SocialLink {
  type: "linkedin" | "github" | "codolio" | "x" | "instagram" | string;
  url: string;
}

interface TeamCardSocialsProps {
  links: SocialLink[];
  memberName?: string;
}

export const TeamCardSocials: React.FC<TeamCardSocialsProps> = ({
  links,
  memberName,
}) => {
  if (!links || links.length === 0) {
    return (
      <div
        className="absolute top-[492px] left-0 right-0 h-[60px] bg-black/95 z-20 pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="absolute top-[492px] left-0 right-0 h-[60px] bg-black flex items-center justify-center gap-2.5 px-2 z-20"
      onClick={(e) => e.stopPropagation()}
    >
      {links.map((item, index) => {
        const key = `${item.type}-${index}`;
        const commonClasses =
          "group/icon relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer";

        if (item.type === "github") {
          return (
            <a
              key={key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`${memberName || "Member"}'s GitHub`}
              aria-label="GitHub"
              className={commonClasses}
            >
              <img
                src="/assets/icons/GIT.svg"
                alt="GitHub"
                className="w-[42px] h-[42px] rounded-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
              />
            </a>
          );
        }

        if (item.type === "codolio") {
          return (
            <a
              key={key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`${memberName || "Member"}'s Codolio`}
              aria-label="Codolio"
              className={commonClasses}
            >
              <div className="w-[42px] h-[42px] rounded-full bg-[#1c1411] border border-[#d78137]/70 flex items-center justify-center shadow-[0_2px_8px_rgba(215,129,55,0.35)] group-hover/icon:border-[#f39c52] group-hover/icon:shadow-[0_0_12px_rgba(243,156,82,0.6)] transition-all">
                <img
                  src="/assets/icons/codolio.svg"
                  alt="Codolio"
                  className="w-[26px] h-[20px] object-contain"
                />
              </div>
            </a>
          );
        }

        if (item.type === "linkedin") {
          return (
            <a
              key={key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`${memberName || "Member"}'s LinkedIn`}
              aria-label="LinkedIn"
              className={commonClasses}
            >
              <div className="w-[42px] h-[42px] rounded-full bg-[#0A66C2] flex items-center justify-center shadow-[0_2px_8px_rgba(10,102,194,0.4)] group-hover/icon:shadow-[0_0_12px_rgba(10,102,194,0.7)] transition-all">
                <svg
                  className="w-[20px] h-[20px]"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
            </a>
          );
        }

        if (item.type === "x") {
          return (
            <a
              key={key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`${memberName || "Member"}'s X`}
              aria-label="X"
              className={commonClasses}
            >
              <div className="w-[42px] h-[42px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(255,255,255,0.3)] group-hover/icon:shadow-[0_0_12px_rgba(255,255,255,0.7)] transition-all">
                <svg
                  className="w-[18px] h-[18px]"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </a>
          );
        }

        if (item.type === "instagram") {
          return (
            <a
              key={key}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`${memberName || "Member"}'s Instagram`}
              aria-label="Instagram"
              className={commonClasses}
            >
              <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center shadow-[0_2px_8px_rgba(220,39,67,0.4)] group-hover/icon:shadow-[0_0_12px_rgba(220,39,67,0.7)] transition-all">
                <svg
                  className="w-[20px] h-[20px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </a>
          );
        }

        return null;
      })}
    </div>
  );
};
