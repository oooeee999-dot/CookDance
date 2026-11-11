import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root = process.cwd();
const photoDir = path.join(root, 'public', 'images', 'platform');
const originals = path.join(root, 'design', 'platform-demo', 'originals');
await fs.mkdir(originals, { recursive: true });
for (const file of await fs.readdir(photoDir)) {
  if (!file.endsWith('.png')) continue;
  const source = path.join(photoDir, file);
  await sharp(source).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(path.join(photoDir, file.replace(/\.png$/, '.webp')));
  await fs.rename(source, path.join(originals, file));
  process.stdout.write(`${file} → WebP\n`);
}
