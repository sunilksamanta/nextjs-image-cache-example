// NextJS Example Page Component
'use client';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import JSZip from 'jszip';

async function loadImages() {
  const response = await fetch('/api/download');
  const blob = await response.blob();
  const zip = await JSZip.loadAsync(blob);
  
  zip.forEach((relativePath, file) => {
    file.async('blob').then((blob) => {
      const imgURL = URL.createObjectURL(blob);
      console.log(imgURL);
      document.getElementById('image-container').innerHTML += `<img src="${imgURL}" alt="Product Image">`;
    });
  });
}


export default function Example() {
    loadImages();
    return (
        <div className={styles.container}>
        <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
    
        <main>
            <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
            </h1>
    
            <p className={styles.description}>
            Hello from the example page!
            </p>

            <div id="image-container"></div>
    
        
        </main>
        </div>
    );

}