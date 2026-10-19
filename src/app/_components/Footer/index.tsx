"use client"
import { JSX } from 'react';

import footerData from '@/app/_data/footer.json';
import { FOOTER_BACKGROUND_COLOR, FOOTER_TEXT_COLOR } from '@/app/_data/customizations';

const Footer = (): JSX.Element => {
  return (
    <footer className="relative w-full border-t border-avid-border pt-12 pb-12" style={{backgroundColor: FOOTER_BACKGROUND_COLOR}}>
      <div className="w-[80%] m-auto flex justify-between flex-wrap">
        {footerData.map((list) => (
          <div
            key={list.mainTitle}
            className="flex-grow-0 flex-shrink-0 basis-[18%] min-w-[140px] text-left"
          >
            <h4 className="text-lg font-bold mb-[30px]" style={{color: FOOTER_TEXT_COLOR}}>{list.mainTitle}</h4>
            <ul>
              {list.items.map((item) => (
                <li key={item.href} className="mb-2">
                  <a href={item.href} className="text-sm text-avid-text-muted hover:text-avid-text transition-colors" style={{color: FOOTER_TEXT_COLOR}}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
