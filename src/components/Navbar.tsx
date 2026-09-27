import React from "react";

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export function Navbar({ currentRoute = "home", onNavigate }: NavbarProps) {
  const navItems = [
    { label: "Home", route: "home" },
    { label: "About", route: "about" },
    { label: "Project", route: "project" },
    { label: "Team", route: "team" },
    { label: "Alumni", route: "alumni" },
    { label: "Recruitment", route: "recruitment" },
  ];

  const handleNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = `/${route}`;
    }
  };

  const handleConnect = () => {
    document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="relative mx-auto h-[106px] w-[1539px] max-w-full overflow-hidden rounded-[53px] bg-white shadow-xl">
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[120px]">
        {/* NCS Logo */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="relative h-[54.39px] w-[122.96px] shrink-0 cursor-pointer transition-transform hover:scale-105"
          data-name="NCS Logo"
        >
          <img
            src="/assets/e1de9.svg"
            className="block size-full max-w-none object-contain"
            alt="Nibble Computer Society"
          />
        </button>

        {/* Nav Links */}
        <div className="flex items-center gap-[60px] font-['Satoshi',Arial,sans-serif] text-[29.1px] tracking-[0.11px] text-black" style={{ fontFamily: "'Satoshi', Arial, sans-serif", fontSize: "29.1px" }}>
          {navItems.map(({ label, route }) => (
            <button
              key={route}
              type="button"
              onClick={() => handleNav(route)}
              className="cursor-pointer font-normal whitespace-nowrap text-black transition-opacity hover:opacity-70"
              style={{ fontSize: "29.1px", fontFamily: "'Satoshi', Arial, sans-serif" }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Connect Button */}
        <button
          type="button"
          onClick={handleConnect}
          className="flex h-[66px] px-[38px] shrink-0 cursor-pointer items-center justify-center rounded-[33px] bg-black text-center font-normal tracking-[0.11px] text-[#fffefe] transition-all hover:bg-neutral-800"
          style={{ fontFamily: "'Satoshi', Arial, sans-serif", fontSize: "29.1px" }}
        >
          <span style={{ fontSize: "29.1px", fontFamily: "'Satoshi', Arial, sans-serif", lineHeight: 1 }}>
            Connect
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
