import { DEFAULT_IMG_URL } from '@/app/_data/customizations';

const IMAGE_CANDIDATE_KEYS = [
  'image_url',
  'imageUrl',
  'image',
  'imageURL',
  'ImageUrl',
  'ImageURL',
  'IMAGE_URL',
  'IMAGE URL',
  'Image URL',
  'image url',
] as const;

function normalizeImageUrl(raw?: string | null): string {
  if (!raw) return DEFAULT_IMG_URL;
  const value = raw.trim();
  if (!value) return DEFAULT_IMG_URL;

  let absoluteUrl: string;

  if (value.startsWith('//')) {
    absoluteUrl = `https:${value}`;
  } else if (value.startsWith('/')) {
    absoluteUrl = `https://www.watts.ca${value}`;
  } else if (value.startsWith('http://')) {
    absoluteUrl = value.replace('http://', 'https://');
  } else if (value.startsWith('https://')) {
    absoluteUrl = value;
  } else {
    return DEFAULT_IMG_URL;
  }

  // Proxy external images through our API route to avoid CORS/hotlink issues on Vercel
  return `/api/img?url=${encodeURIComponent(absoluteUrl)}`;
}

export function getImageUrlFromItem(item: Record<string, unknown> | undefined): string {
  if (!item) return DEFAULT_IMG_URL;

  for (const key of IMAGE_CANDIDATE_KEYS) {
    const candidate = item[key];
    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeImageUrl(candidate);
    }
  }

  return DEFAULT_IMG_URL;
}
