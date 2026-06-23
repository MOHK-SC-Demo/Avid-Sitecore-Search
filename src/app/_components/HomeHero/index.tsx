"use client"

import { JSX, useRef, useEffect } from 'react';
import {
  HOME_HERO_VIDEO_URL,
  HOME_HERO_HEADLINE,
  HOME_HERO_SUBHEADLINE,
  HOME_HERO_DESCRIPTION,
} from '@/app/_data/customizations';

const HomeHero = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {});
    };

    play();
    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, []);

  return (
    <section
      className="relative -mt-[100px] w-full min-h-screen overflow-hidden bg-black"
      aria-label="Homepage hero"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={HOME_HERO_VIDEO_URL} type="video/mp4" />
      </video>

      {/* Gradient overlays matching avid.com hero readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-[10%] pb-16 pt-[120px] md:pb-24">
        <div className="max-w-[720px]">
          <h1 className="text-[2.5rem] font-light leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            {HOME_HERO_HEADLINE}
          </h1>
          <p className="mt-5 text-lg font-normal leading-[1.35] text-white md:mt-6 md:text-[1.375rem]">
            {HOME_HERO_SUBHEADLINE}
          </p>
          <p className="mt-5 max-w-[38rem] text-[0.9375rem] font-normal leading-[1.6] text-[#a9b4bf] md:mt-6 md:text-base">
            {HOME_HERO_DESCRIPTION}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
