const { siteUrl } = require('./next-sitemap.config');

// bundle analyzer 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
        qualities: [70, 75, 100],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'cms.luxurycleaning.nz',
            port: '',
            pathname: '/**'
        }],
    },
    env: {
        url: "https://cms.luxurycleaning.nz",
        siteUrl: "https://luxurycleaning.nz",
        name: "Luxury Cleaning - Tauranga",
        darkLogo: "/dark-logo.png",
        gurpreet: "/gurpreet.jpg"
    },

}

module.exports = withBundleAnalyzer(nextConfig)
