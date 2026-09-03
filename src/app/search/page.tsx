"use client"
import { JSX, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { PAGE_EVENTS_SEARCH } from '@/app/_data/constants';
import withPageTracking from '@/app/_hocs/withPageTracking';
import QuestionsAnswers from '@/app/_widgets/QuestionsAnswers';
import SearchResults from '@/app/_widgets/SearchResults';
import BrowseAll from '@/app/_widgets/BrowseAll';

const SearchContent = (): JSX.Element => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const trimmedQuery = query.trim();

  return (
    <div className="max-w-[1248px] m-auto pt-10">
      <div>
        <h2 className="text-avid-text text-lg w-full text-left">
          {trimmedQuery ? `Showing results for "${trimmedQuery}"` : 'Showing all results'}
        </h2>
        {trimmedQuery ? (
          <>
            <QuestionsAnswers
              key={`${query}-questions`}
              rfkId="rfkid_qa"
              defaultKeyphrase={trimmedQuery}
              defaultRelatedQuestions={4}
            />
            <SearchResults
              key={`${query}-search`}
              rfkId="rfkid_7"
              defaultKeyphrase={trimmedQuery}
            />
          </>
        ) : (
          <BrowseAll rfkId="rfkid_7" />
        )}
      </div>
    </div>
  );
};

const Search = (): JSX.Element => (
  <Suspense fallback={<div className="max-w-[1248px] m-auto pt-10 text-avid-text">Loading...</div>}>
    <SearchContent />
  </Suspense>
);

export default withPageTracking(Search, PAGE_EVENTS_SEARCH);
