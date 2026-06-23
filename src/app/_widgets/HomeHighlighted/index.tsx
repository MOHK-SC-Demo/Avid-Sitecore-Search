"use client"
import { JSX } from 'react';
import { HIGHLIGHTED_ARTICLES_CONTENT_TYPE } from '@/app/_data/customizations';
import ArticleCard from '@/app/_widgets/components/ArticleCard';
import type { ArticleModel } from '@/app/_widgets/SearchResults';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

export const HomeHighlightedComponent = (): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel>({
    query: (query) => {
      query.getRequest().setSearchFilter(new FilterEqual('type', HIGHLIGHTED_ARTICLES_CONTENT_TYPE));

      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach(source => {
            query.getRequest().addSource(source.trim());
        });
      }
    },
  });
  const articlesToShow = articles.slice(0, 3);
  return (
    <>
    <p className="w-full flex justify-around text-avid-text my-10 text-2xl">Highlighted Articles</p>
    <div className="w-full flex justify-around text-avid-text my-10">
      
      <div className="grid grid-cols-3 gap-x-5 gap-y-3 w-[80%]">
        {articlesToShow.map((a, index) => (
          <ArticleCard article={a} key={index} index={index} />
        ))}
      </div>
    </div>
    </>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
