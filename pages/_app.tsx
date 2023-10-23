import { RouteProvider } from '../context/RouteProvider'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return <RouteProvider>
          <Component {...pageProps} />  
         </RouteProvider>
}

export default MyApp
