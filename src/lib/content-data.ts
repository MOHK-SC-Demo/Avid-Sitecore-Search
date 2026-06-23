import fs from 'fs';
import path from 'path';

const CSV_COLUMNS = [
  'content_type',
  'title',
  'description',
  'url',
  'date',
  'document_type',
  'price',
  'related_products',
  'length',
  'views',
] as const;

export type ContentEntity = 'product' | 'content' | 'video';

export type ContentItem = {
  id: string;
  content_type: string;
  entity: ContentEntity;
  title: string;
  description: string;
  url: string;
  date: string;
  document_type: string;
  price: string;
  related_products: string;
  length: string;
  views: string;
  image_url: string;
};

const ENTITY_BY_CONTENT_TYPE: Record<string, ContentEntity> = {
  Product: 'product',
  Article: 'content',
  Video: 'video',
};

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'item'
  );
}

function uniqueId(title: string, seen: Map<string, number>): string {
  const base = slugify(title);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

function toEntity(contentType: string): ContentEntity {
  return ENTITY_BY_CONTENT_TYPE[contentType] ?? 'content';
}

function rowToItem(fields: string[], seen: Map<string, number>): ContentItem | null {
  if (fields.length !== CSV_COLUMNS.length) {
    return null;
  }

  const [
    content_type,
    title,
    description,
    url,
    date,
    document_type,
    price,
    related_products,
    length,
    views,
  ] = fields;

  if (!content_type || !title) {
    return null;
  }

  return {
    id: uniqueId(title, seen),
    content_type,
    entity: toEntity(content_type),
    title,
    description,
    url,
    date,
    document_type,
    price,
    related_products,
    length,
    views,
    image_url: '',
  };
}

export function getContentCsvPath(): string {
  return path.join(process.cwd(), 'public/data/content.csv');
}

export function loadContentItems(): ContentItem[] {
  const csvPath = getContentCsvPath();
  const raw = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const seen = new Map<string, number>();
  const items: ContentItem[] = [];

  for (const line of lines.slice(1)) {
    const item = rowToItem(parseCsvLine(line), seen);
    if (item) {
      items.push(item);
    }
  }

  return items;
}
