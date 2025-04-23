/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://howindiagames.web.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin-view', '/api'],
      },
    ],
    additionalSitemaps: [],
  },
  generateIndexSitemap: false,
  outDir: './public',
  exclude: ['/admin-view', '/api/*', '/survey/thank-you'],
  // Include specific routes that should be in the sitemap
  additionalPaths: async (config) => {
    const result = [
      { loc: '/', changefreq: 'daily', priority: 1.0 },
      { loc: '/survey', changefreq: 'daily', priority: 0.8 },
    ];
    return result;
  },
} 