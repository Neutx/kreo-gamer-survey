'use client';

import React from 'react';
import { SurveyProvider } from '@/context/SurveyContext';
import SurveyLayout from '@/components/survey/SurveyLayout';
import Background from '@/components/survey/Background';
import { surveyJsonLd } from '@/lib/structured-data';
import SurveyWrapper from '@/components/survey/SurveyWrapper';

export default function SurveyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(surveyJsonLd()) }}
      />
      <SurveyProvider>
        <Background />
        <SurveyWrapper>
          <SurveyLayout />
        </SurveyWrapper>
      </SurveyProvider>
    </>
  );
} 