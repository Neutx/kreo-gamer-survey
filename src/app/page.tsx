'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Boxes } from "@/components/ui/background-boxes";
import InfiniteMovingCardsDemo from '@/components/infinite-moving-cards-demo';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isCheckingSubmission, setIsCheckingSubmission] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSurveyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCheckingSubmission(true);
    
    // Go directly to the survey without checking for previous submissions
    router.push('/survey');
    
    setIsCheckingSubmission(false);
  };

  if (!mounted) return null;

  // Add a GamingCard component
  const GamingCard = ({ icon, title, description, index }: { icon: string, title: string, description: string, index: number }) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl transition-all duration-300"
        style={{ minHeight: '250px' }}
      >
        <GlowingEffect
          spread={15}
          disabled={false}
          proximity={100}
          inactiveZone={0.01}
          borderWidth={1}
        />
        <div className="relative z-10">
          <div className="text-4xl mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </motion.div>
    );
  };

  // Step card component for How It Works section
  const StepCard = ({ number, title, description, index, hasArrow = false }: { 
    number: string, 
    title: string, 
    description: string, 
    index: number,
    hasArrow?: boolean 
  }) => {
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="relative"
        style={{ minHeight: '180px' }}
      >
        <div className="relative bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl transition-all duration-300 h-full">
          <div className="absolute -top-6 left-4 z-20 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-5xl font-bold">{number}</div>
          <div className="pt-8 relative z-10">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </div>
        </div>
        {hasArrow && (
          <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 z-20">
            <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Admin Navigation - Only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 z-50 bg-black/70 p-3 rounded-lg">
          <div className="flex flex-col gap-2">
            <Link href="/admin-view">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Admin View
              </Button>
            </Link>
            <Link href="/survey">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Survey Page
              </Button>
            </Link>
            <Link href="/survey/already-submitted">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Already Submitted
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        {/* Mobile Background */}
        <div className="md:hidden absolute inset-0 w-full h-full">
          <Image 
            src="/hero-bg.jpg" 
            alt="Gaming Background Mobile" 
            fill
            sizes="100vw"
            className="object-cover object-center brightness-[0.4]"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-black/70 z-10"></div>
        </div>

        {/* Desktop Background with Boxes */}
        <div className="hidden md:block absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
        </div>
        
        <div className="relative z-30 flex min-h-screen flex-col items-center justify-center text-center px-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight font-stardom">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                How India Games
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 max-w-3xl mx-auto font-stardom">
              The largest gaming survey in India where gamers contribute to shape the future of gaming. This is a survey for the gamers, by the gamers, to understand how India games.
            </p>
            
            <div className="mb-10 max-w-3xl mx-auto px-6 py-3 rounded-lg bg-gradient-to-r from-purple-900/60 to-pink-900/60 backdrop-blur-sm border border-purple-500/30">
              <p className="text-base sm:text-lg text-white">
                <span className="font-bold text-yellow-300">3 Lucky Winners</span> to fill the survey would win a <span className="font-bold text-purple-300">Kreo Gaming Product</span> of their choice + <span className="font-bold">Everyone</span> who fills the form unlocks a <span className="font-bold text-green-300">discount code</span>
              </p>
            </div>
            
            <div className="pointer-events-auto">
              <Button 
                onClick={handleSurveyClick}
                disabled={isCheckingSubmission}
                className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-stardom"
              >
                {isCheckingSubmission ? (
                  <>
                    <span className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
                    Checking...
                  </>
                ) : (
                  'Take The Survey'
                )}
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg 
              className="w-10 h-10 sm:w-12 sm:h-12 text-white opacity-70" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              India&apos;s First Comprehensive <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Gamer Survey
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We&apos;re on a mission to understand the Indian gaming community better. Your responses will help shape the future of gaming in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Gaming Preferences',
                description: 'Share your favorite games, platforms, and genres to help us understand what Indian gamers love.'
              },
              {
                icon: '⏱️',
                title: 'Gaming Habits',
                description: 'Tell us about your gaming schedule, how much time you spend gaming, and your skill level.'
              },
              {
                icon: '💰',
                title: 'Gaming Lifestyle',
                description: 'Share insights about your spending habits, streaming preferences, and gaming setup.'
              }
            ].map((item, index) => (
              <GamingCard key={index} icon={item.icon} title={item.title} description={item.description} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              How It <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Works</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Complete the survey in just a few minutes and help us understand the Indian gaming landscape.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                number: '01',
                title: 'Start Survey',
                description: 'Begin the survey by providing some basic information about yourself.'
              },
              {
                number: '02',
                title: 'Answer Questions',
                description: 'Share your gaming preferences, habits, and lifestyle through our interactive survey. Your progress is auto-saved. Feel free to take a smoke break'
              },
              {
                number: '03',
                title: 'Pick the product that you want',
                description: 'After filling the form, you\'ll be asked what product you want, make that selection'
              },
              {
                number: '04',
                title: 'Get Insights & Win',
                description: 'Once we analyze the data, you\'ll get access to exclusive insights & 3 Lucky winners will win the product that they\'ve chosen and we\'ll reveal the coupon code'
              }
            ].map((item, index) => (
              <StepCard 
                key={index} 
                number={item.number} 
                title={item.title} 
                description={item.description} 
                index={index}
                hasArrow={index < 3} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What Gamers Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Saying</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Hear from gamers who have already taken the survey.
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto pb-8">
            <InfiniteMovingCardsDemo />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-purple-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Share Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">Gaming Story?</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10">
              Join thousands of Indian gamers in shaping the future of gaming. Your voice matters!
            </p>
            <Link href="/survey">
              <Button className="text-lg px-10 py-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Take The Survey Now
              </Button>
            </Link>
            <p className="text-gray-300 mt-6">
              Takes only 5 minutes to complete
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">How India Games</h3>
              <p className="text-gray-400 mt-2">© 2025 Kreo. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/Kreosphere/" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://x.com/kreosphere" className="text-gray-400 hover:text-[#1DA1F2] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.instagram.com/kreosphere/" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div className="mb-4 md:mb-0">
              <a href="#" className="hover:text-purple-500 transition-colors">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a href="#" className="hover:text-purple-500 transition-colors">Terms of Service</a>
            </div>
            <div>
              <p>Designed with ❤️ by Kreo Tech</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 