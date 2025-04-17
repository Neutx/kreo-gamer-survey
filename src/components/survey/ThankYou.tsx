'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Facebook } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function ThankYou() {
  const { toast } = useToast();
  const toastShownRef = useRef(false);

  useEffect(() => {
    // Only show toast once
    if (!toastShownRef.current) {
      toast({
        title: "Thanks for participating!",
        description: "We'll let you know if you win.",
        duration: 5000,
      });
      toastShownRef.current = true;
    }
  }, [toast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-10 w-10 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            Thank You for Participating! 🎮
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Your responses will help us understand the Indian gaming community better.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-muted-foreground"
        >
          <p>Share this survey with your fellow gamers!</p>
          <div className="flex justify-center gap-4 mt-4">
            <Button 
              onClick={() => window.open('https://www.facebook.com/sharer/sharer.php?u=' + window.location.href, '_blank')}
              className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white"
            >
              <Facebook className="h-4 w-4" />
              Share on Facebook
            </Button>
            <Button 
              onClick={() => window.open('https://twitter.com/intent/tweet?url=' + window.location.href, '_blank')}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Share on X
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
} 