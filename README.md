# RGBA Data Encoder

Compress and encode data into a PNG, squash 4 bits of data into a single pixel, below is [doom.pdf](https://github.com/ading2210/doompdf) as a image:

![Doom.pdf as a image](./test/doom.pdf.png)

The compression isnt amazing and in most cases it doesnt compress but increases depending on the original data format, for example here is [bad apple](https://dn720401.ca.archive.org/0/items/TouhouBadApple/Touhou%20-%20Bad%20Apple.mp4) encoded:

![Touhou - Bad Apple](./test/bad-apple.mp4.png)

# RGBA Data Encoder  

This project encodes arbitrary data into PNG images by packing raw bytes into RGBA pixel channels. It works by converting input data into hexadecimal format, then storing two hex characters (one byte) per PNG channel (R, G, B, A), achieving 8 hex characters (4 bytes) of storage per pixel.  

The encoding is completely lossless - files can be perfectly reconstructed from the generated images. However, this is not a compression algorithm. For already compressed files like PDFs or videos, the PNG output will typically be slightly larger than the original. For uncompressed text files, the size remains about the same.  

Some example encodings are included:  
- [doom.pdf](https://github.com/ading2210/doompdf) encodes to a 4.8MB PNG (original 6.2MB)  
- A [Bad Apple video](https://dn720401.ca.archive.org/0/items/TouhouBadApple/Touhou%20-%20Bad%20Apple.mp4) frame encodes to a 37.8MB PNG (original 21.7MB)  

While this doesn't compress data, it provides an interesting way to represent any file as an image. Potential uses include archival storage, steganography, or simply as a novelty encoding method. The simple byte-level packing ensures reliable round-trips with no data loss.  

For developers looking to extend this, possible enhancements could include adding pre-compression with zlib, implementing more advanced bit-packing schemes to increase storage density, or adding encryption layers for security applications. The core algorithm provides a foundation for these more specialized use cases.
