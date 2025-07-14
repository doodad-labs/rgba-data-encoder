import { PNG } from 'pngjs';
import fs from 'fs';
import { hexmapInverse } from './utils';

const png = PNG.sync.read(fs.readFileSync('output.png'));
const packedBytes = [];

// Extract packed bytes from PNG
for (let i = 0; i < png.data.length; i += 4) {
    packedBytes.push(png.data[i]);     // R
    packedBytes.push(png.data[i + 1]); // G
    packedBytes.push(png.data[i + 2]); // B
    packedBytes.push(png.data[i + 3]); // A
}

// Unpack each byte into two hex digits
const hexDigits = [];
for (const byte of packedBytes) {
    const first = (byte >> 4) & 0x0F;  // High 4 bits (0-15)
    const second = byte & 0x0F;        // Low 4 bits (0-15)
    hexDigits.push(hexmapInverse[first], hexmapInverse[second]);
}

// Convert back to original data
const hexString = hexDigits.join('');
const originalData = Buffer.from(hexString, 'hex').toString('utf8');

console.log(originalData);