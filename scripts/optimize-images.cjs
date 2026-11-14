const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const images = require('../src/config/images.json');

async function main() {
  const directory = path.join(__dirname, '../public/images');
  const output = path.join(directory, 'optimized');
  await fs.mkdir(output, { recursive: true });

  for (const [name, { source, widths }] of Object.entries(images)) {
    for (const width of widths) {
      const destination = path.join(output, `${name}-${width}.webp`);
      const result = await sharp(path.join(directory, source))
        .rotate()
        .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
        .webp({ lossless: true, effort: 6 })
        .toFile(destination);
      if (result.width !== width) {
        throw new Error(`${source} is too small for the requested ${width}px variant`);
      }
      console.log(`${name}-${width}.webp: ${(result.size / 1024).toFixed(1)} KiB`);
    }
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
