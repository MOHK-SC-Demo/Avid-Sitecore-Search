'use client';

import { useState } from 'react';

import { DEFAULT_IMG_URL } from '@/app/_data/customizations';
import { getImageUrlFromItem } from '@/app/_utils/image';

type ProductImageProps = {
  item: Record<string, unknown>;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

const ProductImage = ({ item, alt, className, width, height }: ProductImageProps) => {
  const initialImageUrl = getImageUrlFromItem(item);
  const [imgSrc, setImgSrc] = useState(initialImageUrl);
  const [hasErrored, setHasErrored] = useState(false);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (!hasErrored) {
          setHasErrored(true);
          setImgSrc(DEFAULT_IMG_URL);
        }
      }}
    />
  );
};

export default ProductImage;
