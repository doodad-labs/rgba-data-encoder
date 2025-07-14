import { PNG } from 'pngjs';
import fs from 'fs';

const png = PNG.sync.read(fs.readFileSync('./test/bad-apple.mp4.png'));
let hex = '';

for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
        const idx = (y * png.width + x) * 4;

        // Read each channel and convert back to 2-char hex
        hex += png.data[idx].toString(16).padStart(2, '0');      // R
        hex += png.data[idx + 1].toString(16).padStart(2, '0');  // G
        hex += png.data[idx + 2].toString(16).padStart(2, '0');  // B
        hex += png.data[idx + 3].toString(16).padStart(2, '0');  // A
    }
}

// Trim padding and convert to original data
const decodedData = Buffer.from(hex.replace(/0+$/, ''), 'hex').toString('utf8');
const originalData = fs.readFileSync('./test/bad-apple.mp4', 'utf8').trim();
console.log(originalData === decodedData ? 'Decoded data matches original!' : 'Decoded data does not match original.');