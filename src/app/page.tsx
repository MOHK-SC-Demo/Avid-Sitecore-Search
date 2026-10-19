import Home from '@/app/_components/Home';
import { getHighlightedContent } from '@/app/_data/highlightedContent';

export default async function Page() {
  const initialItems = await getHighlightedContent();
  return <Home initialItems={initialItems} />;
}
