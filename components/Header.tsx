import Head from 'next/head';
import React from 'react';

interface HeaderPropType {
  title: string;
}

function Header({ title }: HeaderPropType) {
  const description = 'Create, manage and embed forms with No-Code';
  const URL = 'https://formify.vercel.app';
  const image = URL + '/images/formify.png';
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="description" content={description}></meta>
      <title>{title}</title>

      <link rel="canonical" href={URL} />
      <link rel="icon" href="/favicon.ico" />

      {/* Open graph/Facebook */}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DevApt" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:site" content="@dev_apt" />
      <meta name="twitter:creator" content="@wahvinci" />
      <meta name="theme-color" content="#a5b4fc" />
    </Head>
  );
}

export default Header;
