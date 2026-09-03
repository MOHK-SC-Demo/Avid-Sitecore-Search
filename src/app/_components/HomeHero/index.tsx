"use client"

import { JSX, useRef, useEffect } from 'react';
import {
  HOME_HERO_BACKGROUND_IMAGE_URL,
  HOME_HERO_HEADLINE,
  HOME_HERO_SUBHEADLINE,
  HOME_HERO_DESCRIPTION,
} from '@/app/_data/customizations';

const HomeHero = (): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;
    image.decoding = 'async';
  }, []);

  return (
    <section
      className="relative -mt-[100px] w-full min-h-screen overflow-hidden bg-[#0f3d6f]"
      aria-label="Homepage hero"
    >
      <img
        ref={imageRef}
        className="absolute inset-0 h-full w-full object-cover object-center"
        src={HOME_HERO_BACKGROUND_IMAGE_URL}
        alt="Commercial water infrastructure supported by Watts solutions"
      />

      {/* Layered overlays to match Watts dark-blue visual tone */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0b2746] via-[#0f3d6f]/70 to-[#0f3d6f]/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#0b2746]/85 via-[#0f3d6f]/45 to-transparent"
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
