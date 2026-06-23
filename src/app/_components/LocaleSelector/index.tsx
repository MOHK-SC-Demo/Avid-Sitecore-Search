import { Globe } from 'lucide-react';
import React, { JSX, useContext } from 'react';

import { LanguageContext } from '@/app/_contexts/languageContext';
import type { ILanguageContext } from '@/app/_contexts/languageContext';
import locales from '@/app/_data/languages';

const LocaleSelector = (): JSX.Element => {
  const { language, setLanguage } = useContext<ILanguageContext>(LanguageContext);
  const handleChange = (e: { target: { value: string } }): void => {
    setLanguage(e.target.value as Language);
  };
  return (
    <div className="flex items-center">
      <Globe className="text-avid-text-muted" />
      <select className="select cursor-pointer bg-transparent text-avid-text" onChange={handleChange} defaultValue={language}>
        {locales.map((locale, index) => (
          <option value={locale.value} key={index}>{locale.label}</option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;
