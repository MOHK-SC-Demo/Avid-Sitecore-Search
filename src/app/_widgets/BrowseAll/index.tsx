"use client"
import { useState, JSX } from 'react';
import ArticleItemCard from '@/app/_widgets/components/ArticleCard';
import ArticleHorizontalItemCard from '@/app/_widgets/components/ArticleHorizontalCard';
import CardViewSwitcher from '@/app/_widgets/components/CardViewSwitcher';
import Spinner from '@/app/_widgets/components/Spinner';
import QueryResultsSummary from '@/app/_widgets/components/QueryResultsSummary';
import { GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import type { ArticleModel } from '@/app/_widgets/SearchResults';
import React from 'react';

const SEARCH_CONFIG = {
  source: (process.env.NEXT_PUBLIC_SEARCH_SOURCE || '1208979') as string,
};

const BrowseAllComponent = (): JSX.Element => {
  const {
    actions: { onItemClick },
    queryResult,
  } = useSearchResults<ArticleModel>({
    query: (query) => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const { isLoading, isFetching, data } = queryResult;
  const totalItems = data?.total_item ?? 0;
  const articles = data?.content ?? [];
  const hasResults = articles.length > 0;

  const defaultCardView = 'list';
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <Spinner loading />
      </div>
    );
  }

  return (
    <div>
      <div className="flex relative max-w-full px-4 text-avid-text text-opacity-75">
        {isFetching && (
          <div className="w-full h-full fixed top-0 left-0 bottom-0 right-0 z-30 bg-avid-surface opacity-50">
            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center z-40">
              <Spinner loading />
            </div>
          </div>
        )}
        {hasResults ? (
          <section className="flex flex-col w-full">
            <section className="flex justify-between text-xs mb-4">
              <QueryResultsSummary
                currentPage={1}
                itemsPerPage={articles.length}
                totalItems={totalItems}
                totalItemsReturned={articles.length}
              />
              <CardViewSwitcher
                onToggle={onToggle}
                defaultCardView={defaultCardView}
                GridIcon={GridIcon}
                ListIcon={ListBulletIcon}
              />
            </section>

            {dir === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 xl:gap-x-6 gap-y-3 xl:gap-y-4">
                {articles.map((a, index) => (
                  <ArticleItemCard key={a.id} article={a as ArticleModel} index={index} onItemClick={onItemClick} />
                ))}
              </div>
            ) : (
              <div className="w-full">
                {articles.map((a, index) => (
                  <ArticleHorizontalItemCard
                    key={a.id}
                    article={a as ArticleModel}
                    index={index}
                    onItemClick={onItemClick}
                    displayText={true}
                  />
                ))}
              </div>
            )}
          </section>
        ) : (
          !isFetching && (
            <div className="w-full flex justify-center">
              <h3 className="text-avid-text-muted py-10">No items available</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const BrowseAllWidget = widget(BrowseAllComponent, WidgetDataType.SEARCH_RESULTS, 'content');
export default BrowseAllWidget;
