"use client"
import { useState } from 'react';

import ArticleItemCard from '@/app/_widgets/components/ArticleCard';
import ArticleHorizontalItemCard from '@/app/_widgets/components/ArticleHorizontalCard';
import CardViewSwitcher from '@/app/_widgets/components/CardViewSwitcher';
import Filter from '@/app/_widgets/components/Filter';
import QueryResultsSummary from '@/app/_widgets/components/QueryResultsSummary';
import ResultsPerPage from '@/app/_widgets/components/ResultsPerPage';
import SearchFacets from '@/app/_widgets/components/SearchFacets';
import SearchPagination from '@/app/_widgets/components/SearchPagination';
import SortOrder from '@/app/_widgets/components/SortOrder';
import Spinner from '@/app/_widgets/components/Spinner';
import { GridIcon, ListBulletIcon } from '@radix-ui/react-icons';
import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import { WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import React from 'react';

const SEARCH_CONFIG = {
  source: (process.env.NEXT_PUBLIC_SEARCH_SOURCE || '1208979') as string,
};

export type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};
type ArticleSearchResultsProps = {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
};
type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

export const SearchResultsComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 10,
}: ArticleSearchResultsProps) => {
  // Important: the backing API may return 0 items if keyphrase is omitted entirely.
  // When the user hasn't typed anything (empty q), send a whitespace keyphrase
  // so the request is still valid but should behave like "match all".
  const effectiveKeyphrase = defaultKeyphrase?.trim() ? defaultKeyphrase.trim() : ' ';
  const searchResults = useSearchResults<ArticleModel, InitialState>({
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: effectiveKeyphrase,
    },
    query: (query) => {
      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const { onItemClick } = searchResults.actions;
  const { sortType, page, itemsPerPage } = searchResults.state;
  const { isLoading, isFetching } = searchResults.queryResult;
  const {
    total_item: totalItems = 0,
    sort: { choices: sortChoices = [] } = {},
    facet: facets = [],
    content: articles = [],
  } = searchResults.queryResult.data ?? {};

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const hasResults = articles.length > 0;
  const defaultCardView = 'list';
  const [dir, setDir] = useState(defaultCardView);
  const onToggle = (value = defaultCardView) => setDir(value);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryError = (searchResults.queryResult as any)?.error;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spinner loading />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="max-w-[1248px] m-auto pt-10 text-avid-text">
        <h2 className="text-lg font-bold mb-2">Search request failed</h2>
        <pre className="whitespace-pre-wrap text-sm border border-avid-border rounded-md p-4 bg-avid-surface-elevated">
          {queryError?.message ?? String(queryError)}
        </pre>
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
        {hasResults && (
          <React.Fragment key="1">
            <section className="flex flex-col flex-none relative mt-4 mr-8 w-[25%]">
              <Filter />

              <SearchFacets facets={facets} />
            </section>
            <section className="flex flex-col flex-[4_1_0%]">
              {/* Sort Select */}
              <section className="flex justify-between text-xs">
                {hasResults && (
                  <QueryResultsSummary
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    totalItemsReturned={articles.length}
                  />
                )}
                <div>
                  <CardViewSwitcher
                    onToggle={onToggle}
                    defaultCardView={defaultCardView}
                    GridIcon={GridIcon}
                    ListIcon={ListBulletIcon}
                  />
                  <SortOrder options={sortChoices} selected={sortType} />
                </div>
              </section>

              {/* Results */}
              {dir === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-5 xl:gap-x-6 gap-y-3 xl:gap-y-4 ">
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

              <div className="flex flex-col md:flex-row md:justify-between text-xs">
                <ResultsPerPage defaultItemsPerPage={defaultItemsPerPage} />
                <SearchPagination currentPage={page} totalPages={totalPages} />
              </div>
            </section>
          </React.Fragment>
        )}
        {!hasResults && !isFetching && (
          <div className="w-full flex justify-center">
            <div className="text-center">
              <h3>0 Results</h3>
              <p className="text-xs text-avid-text-muted mt-2">
                source: {SEARCH_CONFIG.source} | keyphrase: &ldquo;{effectiveKeyphrase}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const SearchResultsWidget = widget(SearchResultsComponent, WidgetDataType.SEARCH_RESULTS, 'content');
export default SearchResultsWidget;
