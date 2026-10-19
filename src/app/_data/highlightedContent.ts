import { HIGHLIGHTED_ARTICLES_RFKID } from '@/app/_data/customizations';
import type { ArticleModel } from '@/app/_widgets/SearchResults';

const LIMIT = 3;

type DiscoverResponse = {
  widgets?: Array<{ content?: ArticleModel[] }>;
};

function searchConfig() {
  const customerKey = process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_KEY || '';
  return {
    domain: customerKey.split('-').pop() || '',
    apiKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY || '',
    sources: (process.env.NEXT_PUBLIC_SEARCH_SOURCE || '')
      .split('|')
      .map((source) => source.trim())
      .filter(Boolean),
  };
}

export async function getHighlightedContent(): Promise<ArticleModel[]> {
  const { domain, apiKey, sources } = searchConfig();
  if (!domain || !apiKey) return [];

  const response = await fetch(`https://discover.sitecorecloud.io/discover/v2/${domain}`, {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      context: {
        locale: { country: 'us', language: 'en' },
        page: { uri: '/' },
      },
      widget: {
        items: [
          {
            rfk_id: HIGHLIGHTED_ARTICLES_RFKID,
            entity: 'content',
            ...(sources.length ? { sources } : {}),
            search: { content: {}, limit: LIMIT },
          },
        ],
      },
    }),
    cache: 'no-store',
  });

  if (!response.ok) return [];

  const json = (await response.json()) as DiscoverResponse;
  const content = json.widgets?.[0]?.content;
  return Array.isArray(content) ? content.slice(0, LIMIT) : [];
}
