"use client"
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from '@/app/_components/Footer'
import Header from '@/app/_components/Header';
import DataBar from '@/app/_components/DataBar';
 import { LanguageContext } from '@/app/_contexts/languageContext';
 import useLanguage from '@/app/_hooks/useLanguage';
import { SEOWidget, WidgetsProvider } from '@sitecore-search/react';
import type { Environment } from '@sitecore-search/data';
import { useEffect } from "react";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const SEARCH_CONFIG = {
  env: process.env.NEXT_PUBLIC_SEARCH_ENV as Environment,
  customerKey: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_KEY,
  apiKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { language, setLanguage } = useLanguage();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Avid</title>
      </head>
      <body className={`${montserrat.variable} antialiased bg-avid-bg text-avid-text`}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
            <DataBar />
            <div className="bg-avid-bg text-avid-text">
              <WidgetsProvider 
                env={SEARCH_CONFIG.env}
                customerKey={SEARCH_CONFIG.customerKey}
                apiKey={SEARCH_CONFIG.apiKey}
                publicSuffix={true}
              >
                <SEOWidget rfkId={'demo_search_seo'} />
                <Header />
                <main className="w-full m-auto pt-[100px] min-h-[700px] bg-avid-bg text-avid-text">
                  {children}
                </main>
                <Footer />
              </WidgetsProvider>
            </div>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}
