import { loadImage } from '../loader';
import noise256 from './noise.base64';

async function getNoise(size: 256 | 512 | 1024 = 256) {
    if (size === 512) {
        return (await import('./noise512.png')).default;
    }
    if (size === 1024) {
        return (await import('./noise1024.png')).default;
    }
    return noise256;
}

export async function getNoiseImg(size: 256 | 512 | 1024 = 256) {
    const src = await getNoise(size);
    return loadImage(src);
}
