'use client';

import React from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 opacity-90" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[url('/noise.svg')] bg-repeat opacity-20"></div>
    </div>
  );
} 