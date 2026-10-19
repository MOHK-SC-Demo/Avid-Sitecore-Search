"use client"

import { JSX } from 'react'
import { PAGE_EVENTS_HOME } from '@/app/_data/constants';
import { HIGHLIGHTED_ARTICLES_RFKID, DEFAULT_QUESTION } from '@/app/_data/customizations';
import withPageTracking from '@/app/_hocs/withPageTracking';
import HomeHighlighted from '@/app/_widgets/HomeHighlighted';
import QuestionsAnswers from '@/app/_widgets/QuestionsAnswers'
import HomeHero from '@/app/_components/HomeHero';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

type HomeProps = {
  initialItems: ArticleModel[];
};

const Home = ({ initialItems }: HomeProps): JSX.Element => {
  return (
    <>
      <HomeHero />
      <div className="mx-auto w-[80%] pt-12 md:pt-16">
        <QuestionsAnswers
            rfkId="rfkid_qa"
            defaultKeyphrase={DEFAULT_QUESTION}
            defaultRelatedQuestions={2}
          />
      </div>
      <HomeHighlighted rfkId={HIGHLIGHTED_ARTICLES_RFKID} initialItems={initialItems} />
    </>
  );
}

export default withPageTracking(Home, PAGE_EVENTS_HOME);
