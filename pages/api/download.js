import axios from 'axios';
import JSZip from 'jszip';

export default async function handler(req, res) {
  const zip = new JSZip();
  
  // Example: Fetch and add images to the zip
  const imageURLs = [
    'https://www.gstatic.com/webp/gallery3/1_webp_ll.png',
    'https://www.gstatic.com/webp/gallery3/1_webp_a.png',
    'https://www.gstatic.com/webp/gallery3/3_webp_a.png',
    'https://www.gstatic.com/webp/gallery/2.webp',
    'https://www.gstatic.com/webp/gallery/1.webp',
    'https://www.gstatic.com/webp/gallery/4.webp'

]; // Array of image URLs
  await Promise.all(imageURLs.map(async (url) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    zip.file(url.split('/').pop(), response.data);
  }));
  
  const content = await zip.generateAsync({ type: 'nodebuffer' });
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="images.zip"');
  res.send(content);
}
