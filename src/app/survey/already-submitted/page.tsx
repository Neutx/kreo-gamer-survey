'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Background from '@/components/survey/Background';

export default function AlreadySubmittedPage() {
  return (
    <>
      <Background />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl border border-purple-500/30 shadow-2xl"
        >
          <div className="text-6xl mb-6">🎮</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Thank You!
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            We&apos;ve already received your survey response. Each person can only submit once to ensure our data quality.
          </p>
          <p className="text-gray-400 mb-8">
            We appreciate your interest in our gaming survey. Your contribution helps us understand how India games.
          </p>
          <Link href="/">
            <Button className="px-8 py-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg transition-all duration-300">
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </>
  );
} 