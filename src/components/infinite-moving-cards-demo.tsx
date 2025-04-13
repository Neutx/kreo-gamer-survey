"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden w-full py-4">
      <div className="w-full relative z-10">
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
          className="pb-2"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This survey actually asks the right questions! It's refreshing to see someone trying to understand Indian gamers properly.",
    name: "Rahul S.",
    title: "PC Gamer",
  },
  {
    quote:
      "I loved how comprehensive this survey is. It covers everything from basic preferences to deeper questions about gaming lifestyle.",
    name: "Priya M.",
    title: "Mobile Gaming Enthusiast",
  },
  {
    quote: 
      "The survey was quick and easy to complete. I'm excited to see the results and how Indian gaming trends compare to global ones.",
    name: "Vikram J.",
    title: "Console Gamer",
  },
  {
    quote:
      "As a professional gamer, I appreciate that this survey asks about esports and competitive gaming. Most surveys miss that aspect.",
    name: "Aditi R.",
    title: "Esports Player",
  },
  {
    quote:
      "The family section was interesting - it's good to see someone recognizing how gaming is perceived in Indian households.",
    name: "Rohan M.",
    title: "RPG Enthusiast",
  },
]; 