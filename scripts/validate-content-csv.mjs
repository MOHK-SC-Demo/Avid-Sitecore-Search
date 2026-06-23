import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const csvPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/data/content.csv');

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

const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/).filter(Boolean);
const header = parseCsvLine(lines[0]);
const counts = { Product: 0, Article: 0, Video: 0 };
let invalid = 0;

for (let i = 1; i < lines.length; i++) {
  const fields = parseCsvLine(lines[i]);
  if (fields.length !== 10) invalid++;
  if (counts[fields[0]] !== undefined) counts[fields[0]]++;
}

console.log('Header:', header.join(' | '));
console.log('Counts:', counts);
console.log('Invalid row count:', invalid);
console.log('Product sample URL:', parseCsvLine(lines[1])[3]);
