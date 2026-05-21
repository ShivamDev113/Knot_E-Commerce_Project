import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import gsap from "gsap";

import animationData from "../assets/lottie/Shopping Cart Loader.json";

const PageLoader = () => {
  const loaderRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      loaderRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
      }
    )

      .fromTo(
        logoRef.current,
        {
          scale: 0.6,
          opacity: 0,
          y: 40,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
        }
      )

      .fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

    gsap.to(barRef.current, {
      x: "220%",
      duration: 1.5,
      repeat: -1,
      ease: "power1.inOut",
    });

    gsap.to(glow1Ref.current, {
      x: 80,
      y: 40,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(glow2Ref.current, {
      x: -60,
      y: -30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Animated Glow Backgrounds */}

      <div
        ref={glow1Ref}
        className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-cyan-500/20 blur-[130px] rounded-full"
      ></div>

      <div
        ref={glow2Ref}
        className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-pink-500/20 blur-[130px] rounded-full"
      ></div>

      {/* Glass Card */}

      <div
        className="
        relative
        w-[340px]
        md:w-[420px]
        rounded-[40px]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_0_60px_rgba(255,255,255,0.08)]
        px-8 py-12
        flex flex-col items-center
      "
      >
        {/* Rotating Ring */}

        <div className="absolute w-[260px] h-[260px] border border-cyan-400/20 rounded-full animate-spin-slow"></div>

        {/* Lottie */}

        <div ref={logoRef} className="w-52 h-52 relative z-10">
          <Lottie animationData={animationData} loop={true} />
        </div>

        {/* Brand Text */}

        <div ref={textRef}>
          <h1
            className="
            text-5xl
            font-black
            tracking-[8px]
            mt-2
            bg-gradient-to-r
            from-cyan-300
            via-white
            to-pink-300
            bg-clip-text
            text-transparent
          "
          >
            KNOT
          </h1>

          <p className="text-center text-white/60 tracking-[4px] uppercase text-xs mt-3">
            Preparing Your Fashion Journey
          </p>
        </div>

        {/* Loading Bar */}

        <div className="w-64 h-[5px] bg-white/10 rounded-full overflow-hidden mt-8 relative">
          <div
            ref={barRef}
            className="
            absolute
            left-[-40%]
            top-0
            w-1/3
            h-full
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            via-white
            to-pink-400
          "
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;