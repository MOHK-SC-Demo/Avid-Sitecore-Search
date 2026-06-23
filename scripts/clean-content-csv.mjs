import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const sourcePath = path.join(rootDir, 'scripts/content.source.backup.csv');
const outputPath = path.join(rootDir, 'public/data/content.csv');
const tempPath = path.join(rootDir, 'scripts/content.cleaned.tmp.csv');

const HEADER =
  'content_type,title,description,url,date,document_type,price,related_products,length,views';

function parseCsvLine(line) {
  const fields = [];
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

function cleanText(value) {
  if (!value) return '';
  return (
    value
      .replace(/[\u{1F000}-\u{1FAFF}]/gu, '')
      .replace(/[\u2600-\u27BF]/g, '')
      .replace(/[\u25A0-\u25FF]/g, '')
      .replace(/\uFE0F/g, '')
      .replace(/\u200D/g, '')
      .replace(/[\u2018\u2019\u2032]/g, "'")
      .replace(/[\u201C\u201D\u2033]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\u2026/g, '...')
      .replace(/\u2022/g, '-')
      .replace(/\u00AE|\u00A9|\u2122/g, '')
      .replace(/\|/g, '-')
      .replace(/#\w+/g, '')
      .replace(/https?:\/\/\S+/gi, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function normalizeDate(value) {
  const cleaned = cleanText(value);
  if (!cleaned) return '';
  const parsed = new Date(cleaned);
  if (Number.isNaN(parsed.getTime())) return cleaned;
  return parsed.toISOString().slice(0, 10);
}

function normalizePrice(value) {
  const cleaned = cleanText(value);
  if (!cleaned) return '';
  if (cleaned.toLowerCase() === 'free') return '0';
  return cleaned.replace(/[$,]/g, '');
}

function cleanUrl(value) {
  if (!value) return '';
  return value.trim();
}

function normalizeViews(value) {
  const cleaned = cleanText(value);
  if (!cleaned) return '';
  return cleaned.replace(/,/g, '');
}

function escapeCsv(value) {
  const text = String(value ?? '');
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function row(values) {
  return values.map(escapeCsv).join(',');
}

function countRows(csvText) {
  const lines = csvText.split(/\r?\n/).filter(Boolean);
  const counts = { Product: 0, Article: 0, Video: 0 };
  for (const line of lines.slice(1)) {
    const type = line.split(',')[0];
    if (counts[type] !== undefined) counts[type]++;
  }
  return { total: lines.length - 1, counts };
}

const existingOutput = fs.existsSync(outputPath)
  ? fs.readFileSync(outputPath, 'utf8').replace(/^\uFEFF/, '')
  : '';

if (existingOutput.startsWith('content_type,') && !fs.existsSync(sourcePath)) {
  const { total, counts } = countRows(existingOutput);
  console.log(
    `Using existing public/data/content.csv (${total} rows: ${counts.Product} products, ${counts.Article} articles, ${counts.Video} videos)`,
  );
  console.log('Public URL path: /data/content.csv');
  process.exit(0);
}

const inputPath = fs.existsSync(sourcePath) ? sourcePath : outputPath;

const raw = fs.readFileSync(inputPath, 'utf8').replace(/^\uFEFF/, '');
const lines = raw.split(/\r?\n/);

const products = [];
const articles = [];
const videos = [];

let section = null;

for (const line of lines) {
  if (!line.trim()) continue;

  if (line.startsWith('Product Name,')) {
    section = 'product';
    continue;
  }
  if (line.startsWith('Date,Document Type,')) {
    section = 'article';
    continue;
  }
  if (line.startsWith('Date,Title,URL,Description,')) {
    section = 'video';
    continue;
  }
  if (line.startsWith('content_type,')) {
    continue;
  }

  const fields = parseCsvLine(line);

  if (section === 'product' && fields.length >= 4) {
    products.push({
      title: cleanText(fields[0]),
      description: cleanText(fields[1]),
      price: normalizePrice(fields[2]),
      url: cleanUrl(fields[3]),
    });
  } else if (section === 'article' && fields.length >= 5) {
    articles.push({
      date: normalizeDate(fields[0]),
      documentType: cleanText(fields[1]),
      title: cleanText(fields[2]),
      url: cleanUrl(fields[3]),
      relatedProducts: cleanText(fields[4]),
    });
  } else if (section === 'video' && fields.length >= 6) {
    videos.push({
      date: normalizeDate(fields[0]),
      title: cleanText(fields[1]),
      url: cleanUrl(fields[2]),
      description: cleanText(fields[3]),
      length: cleanText(fields[4]),
      views: normalizeViews(fields[5]),
    });
  }
}

const output = [HEADER];

for (const p of products) {
  output.push(
    row(['Product', p.title, p.description, p.url, '', '', p.price, '', '', '']),
  );
}

for (const a of articles) {
  output.push(
    row([
      'Article',
      a.title,
      '',
      a.url,
      a.date,
      a.documentType,
      '',
      a.relatedProducts,
      '',
      '',
    ]),
  );
}

for (const v of videos) {
  output.push(
    row([
      'Video',
      v.title,
      v.description,
      v.url,
      v.date,
      '',
      '',
      '',
      v.length,
      v.views,
    ]),
  );
}

const totalRows = products.length + articles.length + videos.length;
if (totalRows === 0) {
  throw new Error('No rows parsed from source CSV. Output was not written.');
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(tempPath, `${output.join('\n')}\n`, 'utf8');
fs.renameSync(tempPath, outputPath);

console.log(
  `Wrote ${products.length} products, ${articles.length} articles, ${videos.length} videos (${totalRows} total rows)`,
);
console.log('Public URL path: /data/content.csv');
