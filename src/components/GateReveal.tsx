"use client"

import React, { useEffect, useRef, useState } from "react"

interface GateRevealProps {
  children: React.ReactNode
  gateSrc?: string
  revealDistance?: number
  className?: string
}

export default function GateReveal({
  children,
  gateSrc = "/Group.svg",
  revealDistance = 1800,
  className = "",
}: GateRevealProps) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const left = leftRef.current
    const right = rightRef.current
    const overlay = overlayRef.current
    const hint = hintRef.current

    if (!left || !right || !overlay) return

    let target = 0
    let current = 0
    let raf = 0
    let locked = true
    let scrollY = window.scrollY
    let touchY = 0

    const clamp = (v: number, min = 0, max = 1) =>
      Math.min(max, Math.max(min, v))

    /* ----------------------------------------------------------
       UNLOCK PAGE
    ---------------------------------------------------------- */

    const unlockPage = () => {
      if (!locked) return

      locked = false

      const body = document.body
      const y = scrollY

      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      body.style.overscrollBehavior = ""

      window.scrollTo(0, y)

      setOpened(true)
    }

    /* ----------------------------------------------------------
       INITIAL LOCK
    ---------------------------------------------------------- */

    scrollY = window.scrollY

    const body = document.body

    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    body.style.overflow = "hidden"
    body.style.overscrollBehavior = "none"

    /* ----------------------------------------------------------
       SCROLL → GATE PROGRESS
    ---------------------------------------------------------- */

    const addScroll = (delta: number) => {
      target = clamp(target + delta / revealDistance)
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      addScroll(e.deltaY)
    }

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()

      const y = e.touches[0]?.clientY ?? touchY
      const delta = touchY - y

      touchY = y

      addScroll(delta)
    }

    const onClick = () => {
      // Allow tapping anywhere on gate/hint to smoothly trigger reveal
      target = 1
    }

    window.addEventListener("wheel", onWheel, {
      passive: false,
    })

    window.addEventListener("touchstart", onTouchStart, {
      passive: true,
    })

    window.addEventListener("touchmove", onTouchMove, {
      passive: false,
    })

    overlay.addEventListener("click", onClick)

    /* ----------------------------------------------------------
       ANIMATION LOOP
    ---------------------------------------------------------- */

    const animate = () => {
      current += (target - current) * 0.12

      const p = clamp(current)

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - p, 3)

      /*
       * Gate moves from the center outward.
       *
       * 0    = closed
       * 0.5  = half open
       * 1    = completely open
       */

      const distance = eased * 108

      /*
       * Slight perspective rotation.
       * Very subtle so the SVG remains clean.
       */

      const rotate = eased * 3.5

      left.style.transform = `
        translate3d(-${distance}vw, 0, 0)
        rotateY(-${rotate}deg)
      `

      right.style.transform = `
        translate3d(${distance}vw, 0, 0)
        rotateY(${rotate}deg)
      `

      /*
       * Fade only at the very end.
       */

      const fade =
        p > 0.92
          ? 1 - (p - 0.92) / 0.08
          : 1

      left.style.opacity = String(fade)
      right.style.opacity = String(fade)

      /*
       * Scroll hint disappears immediately.
       */

      if (hint) {
        hint.style.opacity = String(
          Math.max(0, 1 - p * 8)
        )
      }

      /*
       * Progress bar.
       */

      if (progressRef.current) {
        progressRef.current.style.transform =
          `scaleX(${p})`
      }

      /*
       * Fully open.
       */

      if (target >= 0.999 && p >= 0.99) {
        unlockPage()
        return
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    /* ----------------------------------------------------------
       CLEANUP
    ---------------------------------------------------------- */

    return () => {
      cancelAnimationFrame(raf)

      window.removeEventListener(
        "wheel",
        onWheel
      )

      window.removeEventListener(
        "touchstart",
        onTouchStart
      )

      window.removeEventListener(
        "touchmove",
        onTouchMove
      )

      overlay.removeEventListener("click", onClick)

      /*
       * Always restore body.
       */

      body.style.position = ""
      body.style.top = ""
      body.style.left = ""
      body.style.right = ""
      body.style.width = ""
      body.style.overflow = ""
      body.style.overscrollBehavior = ""
    }
  }, [revealDistance])

  /*
   * Reduced motion
   */

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      setOpened(true)
    }
  }, [])

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#05070D",
      }}
    >
      {/* =====================================================
          YOUR EXISTING WEBSITE
      ===================================================== */}

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>

      {/* =====================================================
          GATE
      ===================================================== */}

      {!opened && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,

            width: "100vw",
            height: "100dvh",

            overflow: "hidden",

            background: "#05070D",

            perspective: "1400px",

            touchAction: "none",

            userSelect: "none",

            cursor: "pointer",
          }}
        >
          {/* =================================================
              LEFT GATE
          ================================================= */}

          <div
            ref={leftRef}
            style={{
              position: "absolute",

              left: 0,
              top: 0,

              width: "50vw",
              height: "100dvh",

              overflow: "hidden",

              transformOrigin: "right center",

              willChange:
                "transform, opacity",

              transformStyle:
                "preserve-3d",

              background: "#05070D",
            }}
          >
            <img
              src={gateSrc}
              alt=""
              draggable={false}
              style={{
                position: "absolute",

                left: 0,
                top: "50%",

                width: "100vw",
                height: "100dvh",

                transform:
                  "translateY(-50%)",

                maxWidth: "none",

                objectFit: "cover",

                objectPosition: "center",

                pointerEvents: "none",

                userSelect: "none",

                display: "block",
              }}
            />
          </div>

          {/* =================================================
              RIGHT GATE
          ================================================= */}

          <div
            ref={rightRef}
            style={{
              position: "absolute",

              right: 0,
              top: 0,

              width: "50vw",
              height: "100dvh",

              overflow: "hidden",

              transformOrigin: "left center",

              willChange:
                "transform, opacity",

              transformStyle:
                "preserve-3d",

              background: "#05070D",
            }}
          >
            <img
              src={gateSrc}
              alt=""
              draggable={false}
              style={{
                position: "absolute",

                right: 0,
                top: "50%",

                width: "100vw",
                height: "100dvh",

                transform:
                  "translateY(-50%)",

                maxWidth: "none",

                objectFit: "cover",

                objectPosition: "center",

                pointerEvents: "none",

                userSelect: "none",

                display: "block",
              }}
            />
          </div>

          {/* =================================================
              CENTER SEAM
          ================================================= */}

          <div
            style={{
              position: "absolute",

              left: "50%",
              top: 0,

              width: "1px",
              height: "100%",

              transform:
                "translateX(-50%)",

              background:
                "rgba(255,255,255,0.08)",

              pointerEvents: "none",

              opacity: 0.8,
            }}
          />

          {/* =================================================
              SCROLL HINT
          ================================================= */}

          <div
            ref={hintRef}
            style={{
              position: "absolute",

              left: "50%",
              bottom:
                "clamp(28px, 6vh, 60px)",

              transform:
                "translateX(-50%)",

              zIndex: 10,

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              gap: 12,

              color:
                "rgba(255,255,255,0.82)",

              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

              fontSize:
                "clamp(9px, 1vw, 12px)",

              fontWeight: 600,

              letterSpacing:
                "0.3em",

              whiteSpace: "nowrap",

              pointerEvents: "none",

              transition:
                "opacity 0.3s ease",
            }}
          >
            <span>
              SCROLL TO ENTER
            </span>

            <svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              style={{
                animation:
                  "gateArrow 1.5s ease-in-out infinite",
              }}
            >
              <path
                d="M8 2V20"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />

              <path
                d="M3 15L8 20L13 15"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* =================================================
              PROGRESS
          ================================================= */}

          <div
            style={{
              position: "absolute",

              left: 0,
              right: 0,
              bottom: 0,

              height: "2px",

              background:
                "rgba(255,255,255,0.12)",

              zIndex: 20,
            }}
          >
            <div
              ref={progressRef}
              style={{
                width: "100%",
                height: "100%",

                background:
                  "rgba(255,255,255,0.9)",

                transform:
                  "scaleX(0)",

                transformOrigin:
                  "left center",

                willChange:
                  "transform",
              }}
            />
          </div>

          {/* =================================================
              INLINE ANIMATION
          ================================================= */}

          <style>{`
            @keyframes gateArrow {
              0%,
              100% {
                transform: translateY(0);
                opacity: 0.5;
              }

              50% {
                transform: translateY(6px);
                opacity: 1;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              * {
                animation: none !important;
                transition: none !important;
              }
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
