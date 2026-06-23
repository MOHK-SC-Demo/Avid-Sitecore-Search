import { ArticleCard } from '@sitecore-search/ui';
import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_IMG_URL } from '@/app/_data/customizations';

type ArticleItemCardProps = {
  className?: string;
  article: {
    id: string;
    name: string;
    title: string;
    type: string;
    image_url?: string;
    url: string;
    source_id: string;
  };
  index: number;
};


const ArticleItemCard = ({ className = '', article }: ArticleItemCardProps) => {
  const validImageUrl = article.image_url?.trim() ? article.image_url : DEFAULT_IMG_URL;

  return (
    <ArticleCard.Root
      key={article.id}
      className={`group relative border border-avid-border rounded-md hover:shadow-lg hover:scale-102 hover:transition-all hover:ease-linear hover:duration-300 focus-within:scale-102 focus-within:transition-all focus-within:ease-linear focus-within:duration-300 focus-within:hover:shadow-lg bg-avid-surface ${className}`}
    >
      <div className="aspect-h-1 aspect-w-1 h-28 w-full overflow-hidden rounded-t-md bg-avid-surface-elevated sm:aspect-none">
        <Image
          src={validImageUrl}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={article.name || article.title}
          width={500}
          height={115}
          loading="lazy"
        />
      </div>
      <div className="m-4 flex-col justify-between relative">
        <Link
          className="focus:outline-avid-purple"
          href={`/detail/${article.id}`}
          aria-label={`View details for ${article.name || article.title}`}
        >
          <span aria-hidden="true" className="absolute inset-0"></span>
          <ArticleCard.Title className="mt-4 text-base h-[100px] overflow-hidden">
            {article.name || article.title}
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
