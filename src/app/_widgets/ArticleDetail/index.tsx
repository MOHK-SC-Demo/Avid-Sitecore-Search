import { JSX } from 'react';

import { DEFAULT_IMAGE } from '@/app/_data/constants';
import type { ArticleModel } from '@/app/_widgets/SearchResults';
import type { SearchResultsInitialState } from '@sitecore-search/react';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_SEARCH_SOURCE as string,
};

type ArticleDetailProps = {
  id?: string;
};

type InitialState = SearchResultsInitialState<'itemsPerPage'>;

export const ArticleDetailComponent = ({ id }: ArticleDetailProps): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      const equalFilter = new FilterEqual('id', id);
      query.getRequest().setSearchFilter(equalFilter);

      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach(source => {
            query.getRequest().addSource(source.trim());
        });
      }
    },
    state: {
      itemsPerPage: 1,
    },
  });
  let mainArticle: ArticleModel = { id: '', title: '' };
  if (articles.length > 0) {
    mainArticle = articles[0];
  }
  return (
    <div className="max-w-[1280px] m-auto pt-10">
      <div className="items-center flex justify-between">
        <div className="max-w-[50%] min-h-[300px] flex items-center flex-col">
          <h1 className="text-2xl font-bold text-avid-text w-full mb-3 mt-4">{mainArticle.name}</h1>
          <div className="text-left text-md text-avid-text">{mainArticle?.subtitle}</div>
          <div className="text-left leading-tight text-base text-avid-text-muted">{mainArticle?.description}</div>
        </div>
        <div className="max-w-[50%] min-h-[300px] flex items-center">
          <img className="max-w-[500px]" src={mainArticle.image_url || DEFAULT_IMAGE} />
        </div>
      </div>
    </div>
  );
};

const ArticleDetailWidget = widget(ArticleDetailComponent, WidgetDataType.SEARCH_RESULTS, 'content');

export default ArticleDetailWidget;