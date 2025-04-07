'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="hero-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/70 to-indigo-900/90 z-20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center z-10 opacity-20" />
        
        <div className="hero-bg-desktop">
          <Image 
            src="/hero-bg.jpg" 
            alt="Gaming Background" 
            width={1920} 
            height={1080}
            className="hero-bg-image"
            priority
            quality={90}
          />
        </div>
        
        <div className="hero-bg-mobile">
          <Image 
            src="/hero-mobile.jpg" 
            alt="Gaming Background Mobile" 
            width={768} 
            height={1024}
            className="hero-bg-image"
            priority
            quality={90}
          />
        </div>
        
        <div className="relative z-30 flex min-h-screen flex-col items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Kreo Ultimate Gamer Survey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Are You Ready to Respawn? 🎮🔥 Help shape the future of gaming in India.
            </p>
            <Link href="/survey">
              <Button className="text-lg px-8 py-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Take The Survey
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg 
              className="w-10 h-10 text-white opacity-70" 
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-20 bg-black">
        <div className="container mx-auto px-4">
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                title: 'Start Survey',
                description: 'Begin the survey by providing some basic information about yourself.'
              },
              {
                number: '02',
                title: 'Answer Questions',
                description: 'Share your gaming preferences, habits, and lifestyle through our interactive survey.'
              },
              {
                number: '03',
                title: 'Save Progress',
                description: 'Your progress is automatically saved, so you can resume anytime if needed.'
              },
              {
                number: '04',
                title: 'Get Insights',
                description: "Once we analyze the data, you'll get access to exclusive insights about Indian gamers."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-5xl font-bold text-purple-600/20 absolute -top-6 left-0">{item.number}</div>
                <div className="pt-8">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                    <svg className="w-12 h-12 text-purple-600/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              What Gamers Are <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Saying</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Hear from gamers who have already taken the survey.
            </p>
          </motion.div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {[
                {
                  quote: "This survey actually asks the right questions! It&apos;s refreshing to see someone trying to understand Indian gamers properly.",
                  name: "Rahul S.",
                  title: "PC Gamer"
                },
                {
                  quote: "I loved how comprehensive this survey is. It covers everything from basic preferences to deeper questions about gaming lifestyle.",
                  name: "Priya M.",
                  title: "Mobile Gaming Enthusiast"
                },
                {
                  quote: "The survey was quick and easy to complete. I&apos;m excited to see the results and how Indian gaming trends compare to global ones.",
                  name: "Vikram J.",
                  title: "Console Gamer"
                }
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1">
                  <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
                    <div className="text-4xl text-purple-500 mb-4">&ldquo;</div>
                    <p className="text-gray-300 text-lg mb-6">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-gray-400 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0 bg-purple-600 hover:bg-purple-700 text-white" />
              <CarouselNext className="relative inset-0 translate-y-0 bg-purple-600 hover:bg-purple-700 text-white" />
            </div>
          </Carousel>
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
              Takes only 5-10 minutes to complete
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white">Kreo Ultimate Gamer Survey</h3>
              <p className="text-gray-400 mt-2">© 2023 Kreo. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition-colors">
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