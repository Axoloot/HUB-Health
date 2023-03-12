import Head from 'next/head';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import '../../styles/card.css';
import '../../styles/layout.css';
import '../../styles/globals.css';
import UserProvider from '../providers/userProvider';

import { NavBar } from '../components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = window.localStorage.getItem(`user`);
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Hub HEALTH</title>

        <meta name="theme-color" content="#f2f2f2" />
      </Head>
      <UserProvider>
        {isLoggedIn && (
          <>
            <NavBar />
            <AnyComponent className="p-8" {...pageProps} />
          </>
        )}
        {!isLoggedIn && <AnyComponent {...pageProps} />}
      </UserProvider>
      <ToastContainer />
    </>
  );
}
