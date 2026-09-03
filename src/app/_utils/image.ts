import { DEFAULT_IMG_URL } from '@/app/_data/customizations';

const IMAGE_BASE_URL = 'https://www.watts.com';

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

  if (value.startsWith('//')) return `https:${value}`;
  if (value.startsWith('/')) return `${IMAGE_BASE_URL}${value}`;
  if (value.startsWith('http://')) return value.replace('http://', 'https://');
  if (value.startsWith('https://')) return value;

  return DEFAULT_IMG_URL;
}

export function getImageUrlFromItem(item: Record<string, unknown> | undefined): string {
  if (!item) return DEFAULT_IMG_URL;

  for (const key of IMAGE_CANDIDATE_KEYS) {
    const candidate = item[key];
    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeImageUrl(candidate);
    }
  }

  for (const [key, value] of Object.entries(item)) {
    if (/image/i.test(key) && typeof value === 'string' && value.trim()) {
      return normalizeImageUrl(value);
    }
  }

  return DEFAULT_IMG_URL;
}
