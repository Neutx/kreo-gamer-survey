/**
 * JSON-LD Structured Data for SEO
 * 
 * This file contains utility functions to generate structured data
 * for better search engine visibility and rich results.
 */

// Website Schema
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kreo Ultimate Gamer Survey',
    description: "India's first comprehensive gaming lifestyle survey",
    url: process.env.SITE_URL || 'https://howindiagames.web.app',
    potentialAction: {
      '@type': 'SearchAction',
      'target': `${process.env.SITE_URL || 'https://howindiagames.web.app'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

// Organization Schema
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kreo Tech',
    url: 'https://kreo-tech.com',
    logo: `${process.env.SITE_URL || 'https://howindiagames.web.app'}/android-chrome-512x512.png`,
    sameAs: [
      'https://www.instagram.com/kreo_tech/',
      'https://x.com/kreosphere',
      // Add other social media profiles
    ]
  };
}

// Survey Structured Data
export function surveyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SurveyPage',
    name: 'Kreo Ultimate Gamer Survey',
    description: "Share your gaming preferences and lifestyle habits in India's first comprehensive gaming survey",
    provider: {
      '@type': 'Organization',
      name: 'Kreo Tech',
      url: 'https://kreo-tech.com'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Gamers'
    }
  };
}

/**
 * How to use these structured data objects in your components:
 * 
 * import { websiteJsonLd, organizationJsonLd } from '@/lib/structured-data';
 * 
 * export default function YourComponent() {
 *   return (
 *     <>
 *       <script
 *         type="application/ld+json"
 *         dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
 *       />
 *       // Your component JSX
 *     </>
 *   )
 * }
 */ 