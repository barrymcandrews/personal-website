const assert = require('assert/strict');
const sharp = require('sharp');
const images = require('../src/config/images.json');

async function main() {
  for (const [name, { source, widths }] of Object.entries(images)) {
    for (const width of widths) {
      const expected = await sharp(`public/images/${source}`)
        .rotate()
        .resize({ width, withoutEnlargement: true, kernel: 'lanczos3' })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const actual = await sharp(`public/images/optimized/${name}-${width}.webp`)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      for (const key of ['width', 'height', 'channels', 'size']) {
        assert.equal(actual.info[key], expected.info[key]);
      }
      for (let pixel = 0; pixel < actual.data.length; pixel += 4) {
        assert.equal(actual.data[pixel + 3], expected.data[pixel + 3]);
        // RGB beneath completely transparent pixels has no visible meaning.
        if (expected.data[pixel + 3] !== 0) {
          for (let channel = 0; channel < 3; channel++) {
            assert.equal(
              actual.data[pixel + channel],
              expected.data[pixel + channel],
              `${name}-${width}: visible pixel changed at byte ${pixel + channel}`
            );
          }
        }
      }
    }
    console.log(`${name}: all variants preserve every visible resized pixel`);
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
