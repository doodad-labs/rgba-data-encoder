import { PNG } from 'pngjs';
import fs from 'fs';
import { hexmap } from './utils'; // Ensure hexmap['0']=0, hexmap['f']=15

const data = fs.readFileSync('input.txt', 'utf8').trim();
const hex = Buffer.from(data).toString('hex').split('');

// Pad hex to even length if needed
if (hex.length % 2 !== 0) hex.push('0');

// Combine every two hex digits into one byte (0-255)
const packedBytes = [];
for (let i = 0; i < hex.length; i += 2) {
    const first = hexmap[hex[i]];     // 0-15
    const second = hexmap[hex[i + 1]]; // 0-15
    const combined = (first << 4) | second; // Pack into 0-255
    packedBytes.push(combined);
}

// Calculate image dimensions (4 bytes per pixel: R, G, B, A)
const PIXELS_PER_LINE = 500;
const totalPixels = Math.ceil(packedBytes.length / 4);
const lines = Math.ceil(totalPixels / PIXELS_PER_LINE);
const width = Math.min(totalPixels, PIXELS_PER_LINE);
const height = lines;

const png = new PNG({ width, height });

// Fill PNG with packed data
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const pixelIdx = (y * width + x) * 4; // RGBA offset
        const byteIdx = y * width * 4 + x * 4;

        // Set RGBA values (each byte holds 2 hex digits)
        png.data[pixelIdx]     = packedBytes[byteIdx]     || 0; // R
        png.data[pixelIdx + 1] = packedBytes[byteIdx + 1] || 0; // G
        png.data[pixelIdx + 2] = packedBytes[byteIdx + 2] || 0; // B
        png.data[pixelIdx + 3] = packedBytes[byteIdx + 3] || 0; // A
    }
}

// Save to file
png.pack().pipe(fs.createWriteStream('output.png'));