"use client"
import { JSX } from 'react';
import ArticleCard from '@/app/_widgets/components/ArticleCard';
import type { ArticleModel } from '@/app/_widgets/SearchResults';
import type { SearchResultsInitialState } from '@sitecore-search/react';
import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type InitialState = SearchResultsInitialState<'itemsPerPage'>;

type HomeHighlightedProps = {
  initialItems?: ArticleModel[];
};

export const HomeHighlightedComponent = ({ initialItems = [] }: HomeHighlightedProps): JSX.Element => {
  const {
    actions: { onItemClick },
    queryResult: { data: { content: results = [] } = {} },
  } = useSearchResults<ArticleModel, InitialState>({
    state: {
      itemsPerPage: 3,
    },
    query: (query) => {
      if (SEARCH_CONFIG.source) {
        SEARCH_CONFIG.source.split('|').forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const articles = (results.length > 0 ? results : initialItems).slice(0, 3);

  return (
    <section aria-label="Recommended">
      <h2 className="w-full flex justify-around text-avid-text my-10 text-2xl">Recommended</h2>
      <div className="w-full flex justify-around text-avid-text my-10">
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 w-[80%] md:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard
              article={article}
              key={article.id}
              index={index}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
