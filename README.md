# Kreo Gamer Survey

<div align="center">
  <img src="public/controller.svg" alt="Kreo Gamer Survey" width="200" height="200" />
  <h3>India's first comprehensive gamer lifestyle survey platform</h3>
</div>

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.5.0-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

## 📊 About

Kreo Gamer Survey is a sleek, modern web application designed to collect comprehensive data on gaming habits and preferences across India. The platform features a multi-section survey flow with conditional questions based on user demographics, real-time data saving, and an analytics dashboard for administrators.

## ✨ Features

- **Adaptive Survey Flow** - Questions dynamically adapt based on age, gender, and other user attributes
- **Real-time Data Saving** - Responses are saved instantly to Firebase
- **Unique User Tracking** - Prevents duplicate submissions while allowing users to resume incomplete surveys
- **Admin Dashboard** - Visualize and export collected data
- **Responsive Design** - Optimized experience across all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm or yarn
- Firebase account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/kreo-gamer-survey.git
cd kreo-gamer-survey

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase configuration
```

### Development

```bash
# Start the development server
npm run dev
```

Visit http://localhost:3000 to see the application.

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS, Shadcn UI
- **Form Management**: React Hook Form, Zod
- **Analytics**: Chart.js, React-Chartjs-2
- **SEO**: next-sitemap for automated sitemap generation

## �� Survey Sections

- **Demographics** - Customized based on age group (Under 18, 18-24, 25+)
- **Gaming Preferences** - Platforms, genres, games, spending
- **Gaming Habits** - Time spent, skill level, competitive play
- **Gaming Lifestyle** - Streaming, merchandise, communities
- **Gaming & Family** - Age/gender-specific dynamics
- **Future of Gaming** - VR, metaverse, sustainability

## 📈 Admin Features

- **Dashboard** - Overview statistics and completion rates
- **Response Viewer** - Detailed view of individual responses
- **Analytics** - Visual representation of survey trends
- **Export** - Download data in CSV format

## 🔍 SEO Features

- **Automatic Sitemap Generation** - A sitemap.xml file is automatically generated during the build process
- **Robots.txt Generation** - A robots.txt file is created to guide search engine crawlers
- **Custom Sitemap Configuration** - Exclusion of admin routes and custom URL configuration

### Generating Sitemap Manually

```bash
# Generate sitemap without building the application
node scripts/generate-sitemap.js
```

## 📄 License

This project is proprietary and confidential. Unauthorized copying or distribution is prohibited.

---

<div align="center">
  <p>Built with ❤️ by Kreo Tech</p>
</div>
