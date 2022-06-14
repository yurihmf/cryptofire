import Head from 'next/head'
import React from 'react'
import {Footer} from '../'
import {Header} from '../'
import { LayoutProps } from '../../interfaces/Layout'

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>CryptoFire</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main>
          {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout