import { useState } from 'react';
import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import type { ActionProp, ItemClickedAction } from '@sitecore-search/react';
import { DEFAULT_IMG_URL } from '@/app/_data/customizations';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

type ArticleItemCardProps = {
  className?: string;
  article: ArticleModel;
  index: number;
  onItemClick?: ActionProp<ItemClickedAction>;
};


const ArticleItemCard = ({ className = '', article, index, onItemClick }: ArticleItemCardProps) => {
  const initialImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;
  const [imgSrc, setImgSrc] = useState(initialImageUrl);

  const title = article.name || article.title || 'Article';

  return (
    <ArticleCard.Root
      key={article.id}
      className={`group relative border border-avid-border rounded-md hover:shadow-lg hover:scale-102 hover:transition-all hover:ease-linear hover:duration-300 focus-within:scale-102 focus-within:transition-all focus-within:ease-linear focus-within:duration-300 focus-within:hover:shadow-lg bg-avid-surface ${className}`}
    >
      <div className="aspect-h-1 aspect-w-1 h-28 w-full overflow-hidden rounded-t-md bg-avid-surface-elevated sm:aspect-none">
        <Image
          src={imgSrc}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={title}
          width={500}
          height={115}
          loading="lazy"
          onError={() => setImgSrc(DEFAULT_IMG_URL)}
        />
      </div>
      <div className="m-4 flex-col justify-between relative">
        <Link
          className="focus:outline-avid-purple"
          href={`/detail/${article.id}`}
          aria-label={`View details for ${title}`}
          onClick={() => {
            onItemClick?.({
              id: article.id,
              index,
              sourceId: article.source_id,
            });
          }}
        >
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ArticleCard.Title className="mt-4 text-base h-[100px] overflow-hidden">
            {title}
          </ArticleCard.Title>
        </Link>
        <ArticleCard.Subtitle className="mt-3 text-sm text-avid-text-muted">
          {article.type}
        </ArticleCard.Subtitle>
      </div>
    </ArticleCard.Root>
  );
};

export default ArticleItemCard;
