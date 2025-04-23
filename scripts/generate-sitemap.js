const { execSync } = require('child_process');

console.log('Generating sitemap...');

try {
  // Run the next-sitemap command
  execSync('npx next-sitemap', { stdio: 'inherit' });
  console.log('Sitemap generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error.message);
  process.exit(1);
} 