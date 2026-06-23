"use client"

import { JSX } from 'react';
import { HEADER_BACKGROUND_COLOR } from '@/app/_data/customizations';
import Logo from '@/app/_components/Logo';
import PreviewSearch from '@/app/_widgets/PreviewSearch';
import { DarkmodeSwitch } from '@/app/_components/DarkModeSwitcher';
import LocaleSelector from '@/app/_components/LocaleSelector';
import Link from 'next/link';

const Header = (): JSX.Element => {
  return (
      <div className="w-full h-[100px] top-0 z-[500] flex justify-items-start fixed border-b border-avid-border" style={{backgroundColor: HEADER_BACKGROUND_COLOR}}>
        <div className="w-[80%] m-auto flex items-center text-avid-text justify-around">
          <div className="flex items-center justify-between">
            <Link href="/" tabIndex={1}>
              <Logo /> 
            </Link>
            <PreviewSearch rfkId="rfkid_6" />
            <DarkmodeSwitch />
            <LocaleSelector />
          </div>
        </div>
      </div>
  );
};

export default Header;
