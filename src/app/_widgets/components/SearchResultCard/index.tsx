'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArticleCard } from '@sitecore-search/ui';
import type { ActionProp, ItemClickedAction } from '@sitecore-search/react';
import { DEFAULT_IMG_URL } from '@/app/_data/customizations';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

type ContentKind = 'product' | 'article' | 'video';

type SearchResultCardProps = {
  article: ArticleModel;
  index: number;
  layout: 'grid' | 'list';
  onItemClick?: ActionProp<ItemClickedAction>;
};

const KIND_LABEL: Record<ContentKind, string> = {
  product: 'Product',
  article: 'Article',
  video: 'Video',
};

function contentKind(type?: string): ContentKind {
  const value = (type || '').toLowerCase();
  if (value.includes('video')) return 'video';
  if (value.includes('article')) return 'article';
  return 'product';
}

function excerpt(article: ArticleModel): string {
  return article.subtitle || article.description || article.content_text || '';
}

const DUMMY_PRICES = [29, 49, 79, 99, 149, 199, 249, 299, 399, 499];

function dummyPrice(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash + id.charCodeAt(i) * (i + 1)) % DUMMY_PRICES.length;
  }
  return `$${DUMMY_PRICES[hash].toFixed(2)}`;
}

const TypeBadge = ({ kind }: { kind: ContentKind }) => (
  <span className="inline-flex items-center rounded-full bg-[#0f3d6f] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
    {KIND_LABEL[kind]}
  </span>
);

const ResultImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setImgSrc(DEFAULT_IMG_URL)}
    />
  );
};

const PlayMark = () => (
  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white shadow-lg">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-6 w-6 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  </span>
);

const SearchResultCard = ({ article, index, layout, onItemClick }: SearchResultCardProps) => {
  const kind = contentKind(article.type);
  const title = article.name || article.title || KIND_LABEL[kind];
  const summary = excerpt(article);
  const imageUrl = article.image_url?.trim() || DEFAULT_IMG_URL;
  const isList = layout === 'list';

  return (
    <ArticleCard.Root
      className={`group relative border border-avid-border rounded-md bg-avid-surface hover:shadow-lg ${
        isList ? 'my-4 flex w-full flex-row items-stretch overflow-hidden' : 'flex h-full flex-col overflow-hidden'
      }`}
    >
      {kind !== 'article' && (
        <div
          className={`relative flex-none overflow-hidden bg-avid-surface-elevated ${
            isList ? 'w-[28%]' : 'h-40 w-full'
          }`}
        >
          <ResultImage
            src={imageUrl}
            alt=""
            className={`h-full w-full ${kind === 'product' ? 'object-contain p-3' : 'object-cover'}`}
          />
          {kind === 'video' && <PlayMark />}
        </div>
      )}
      <div className={`relative flex flex-1 flex-col ${isList ? 'p-4' : 'p-4'} ${kind === 'article' ? 'border-l-4 border-[#0f3d6f]' : ''}`}>
        <Link
          className="focus:outline-avid-purple"
          href={`/detail/${article.id}`}
          aria-label={`${KIND_LABEL[kind]}: ${title}`}
          onClick={() => {
            onItemClick?.({
              id: article.id,
              index,
              sourceId: article.source_id,
            });
          }}
        >
          <span aria-hidden="true" className="absolute inset-0" />
          <TypeBadge kind={kind} />
          <ArticleCard.Title className={`text-base text-avid-text ${isList ? 'mt-2' : 'mt-3 line-clamp-3'}`}>
            {title}
          </ArticleCard.Title>
          {kind === 'product' ? (
            <p className="mt-2 text-lg font-semibold text-[#0f3d6f]">{dummyPrice(article.id)}</p>
          ) : null}
        </Link>
        {summary ? (
          <ArticleCard.Subtitle className={`mt-2 text-sm text-avid-text-muted ${isList ? 'line-clamp-3' : 'line-clamp-4'}`}>
            {summary}
          </ArticleCard.Subtitle>
        ) : null}
      </div>
    </ArticleCard.Root>
  );
};

export default SearchResultCard;
