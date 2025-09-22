#!/usr/bin/env node

/**
 * MedhasMind Deployment Readiness Check
 * Run this before deploying to ensure everything is ready
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 MedhasMind Deployment Readiness Check\n');

const checks = [
  {
    name: 'Frontend Directory',
    check: () => fs.existsSync('frontend'),
    message: 'Frontend directory exists'
  },
  {
    name: 'Frontend Build',
    check: () => {
      try {
        const packageJson = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
        return packageJson.scripts && packageJson.scripts.build;
      } catch {
        return false;
      }
    },
    message: 'Frontend package.json with build script exists'
  },
  {
    name: 'Next.js Config',
    check: () => fs.existsSync('frontend/next.config.mjs') || fs.existsSync('frontend/next.config.js'),
    message: 'Next.js configuration file exists'
  },
  {
    name: 'Netlify Config',
    check: () => fs.existsSync('netlify.toml'),
    message: 'netlify.toml configuration exists'
  },
  {
    name: 'Environment Variables',
    check: () => {
      const envLocal = fs.existsSync('frontend/.env.local');
      if (!envLocal) return false;

      const envContent = fs.readFileSync('frontend/.env.local', 'utf8');
      return envContent.includes('NEXT_PUBLIC_API_URL') &&
             envContent.includes('NEXT_PUBLIC_SUPABASE_URL');
    },
    message: 'Frontend environment variables configured'
  },
  {
    name: 'API Client',
    check: () => fs.existsSync('frontend/lib/api.ts'),
    message: 'API client library exists'
  },
  {
    name: 'Auth Context',
    check: () => fs.existsSync('frontend/lib/auth-context.tsx'),
    message: 'Authentication context exists'
  },
  {
    name: 'Backend Directory',
    check: () => fs.existsSync('backend'),
    message: 'Backend directory exists'
  },
  {
    name: 'Backend Dependencies',
    check: () => fs.existsSync('backend/requirements.txt'),
    message: 'Backend requirements.txt exists'
  },
  {
    name: 'Database Schema',
    check: () => fs.existsSync('backend/supabase_setup.sql'),
    message: 'Database schema file exists'
  },
  {
    name: 'Deployment Guide',
    check: () => fs.existsSync('DEPLOYMENT.md'),
    message: 'Deployment documentation exists'
  }
];

let passed = 0;
let total = checks.length;

checks.forEach(({ name, check, message }) => {
  const result = check();
  const status = result ? '✅' : '❌';
  console.log(`${status} ${name}: ${message}`);
  if (result) passed++;
});

console.log(`\n📊 Results: ${passed}/${total} checks passed`);

if (passed === total) {
  console.log('\n🎉 All checks passed! Your MedhasMind platform is ready for deployment.');
  console.log('\n📋 Next Steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Connect repository to Netlify');
  console.log('3. Deploy backend to Vercel/Railway/Render');
  console.log('4. Update frontend environment variables');
  console.log('5. Deploy and test!');

  console.log('\n📖 See DEPLOYMENT.md for detailed instructions');
} else {
  console.log('\n⚠️  Some checks failed. Please fix the issues above before deploying.');
  console.log('\n🔧 Common fixes:');
  console.log('- Make sure all files are committed to Git');
  console.log('- Check that environment variables are set');
  console.log('- Ensure backend dependencies are installed');
}

console.log('\n📚 Read DEPLOYMENT.md for complete deployment guide');
console.log('🔗 Netlify: https://netlify.com');
console.log('🔗 Vercel: https://vercel.com');
console.log('🔗 Railway: https://railway.app');