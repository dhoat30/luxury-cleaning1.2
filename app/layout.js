'use client'
//import css file 
import './globals.css'
import './tokens.css'
// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import { Inter, Manrope } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../utlis/themeSettings'


import { GoogleTagManager } from '@next/third-parties/google'
import { Suspense } from 'react'
import AttributionTracker from '../components/Analytics/AttributionTracker'

// fonts settings

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  preload: true
})
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-gilda-display',
  preload: true
})

export default function RootLayout({ children }) {


  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <GoogleTagManager gtmId="GTM-WM36CTVJ" />

      <body >
        <Suspense fallback={null}>
          <AttributionTracker />
        </Suspense>
        <ThemeProvider theme={lightTheme}>
          {children}
          {/* <Footer /> */}
        </ThemeProvider>


      </body>
    </html>
  )
}
