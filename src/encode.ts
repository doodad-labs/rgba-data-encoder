import { PNG } from 'pngjs';
import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8').trim();
const hex = Buffer.from(data).toString('hex');

// Pad hex to be divisible by 8 (1 pixel = 8 hex chars)
const paddedHex = hex.padEnd(Math.ceil(hex.length / 8) * 8, '0');

// Create PNG
const width = Math.ceil(Math.sqrt(paddedHex.length / 8));
const height = Math.ceil((paddedHex.length / 8) / width);
const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const hexStartIdx = (y * width + x) * 8;
        const hexChunk = paddedHex.substr(hexStartIdx, 8).padEnd(8, '0');
        const idx = (y * width + x) * 4;

        // Split into 4 pairs of hex chars (e.g., "1a", "2b", "3c", "4d")
        const pairs = hexChunk.match(/.{2}/g) || ['00', '00', '00', '00'];

        // Store each pair in a channel (R, G, B, A)
        png.data[idx] = parseInt(pairs[0], 16);     // R
        png.data[idx + 1] = parseInt(pairs[1], 16); // G
        png.data[idx + 2] = parseInt(pairs[2], 16); // B
        png.data[idx + 3] = parseInt(pairs[3], 16); // A
    }
}

png.pack().pipe(fs.createWriteStream('output.png'));