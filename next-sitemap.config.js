/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://luxurycleaning.nz",
  generateRobotsTxt: true,
  sitemapSize: 1000,
};
