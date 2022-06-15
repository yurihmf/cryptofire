import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

const Document = () => {
  return (
    <Html>
        <Head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}

export default Document