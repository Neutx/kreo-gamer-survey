'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSurvey } from '@/context/SurveyContext';
import ProgressIndicator from './ProgressIndicator';
import BasicDemographics from './BasicDemographics';
import DemographicsUnder18 from './DemographicsUnder18';
import Demographics18to24 from './Demographics18to24';
import Demographics25Plus from './Demographics25Plus';
import GamingPreferences from './GamingPreferences';
import GamingHabits from './GamingHabits';
import GamingLifestyle from './GamingLifestyle';
import GamingFamilyUnder18Male from './GamingFamilyUnder18Male';
import GamingFamilyUnder18Female from './GamingFamilyUnder18Female';
import GamingFamily18to24Male from './GamingFamily18to24Male';
import GamingFamily18to24Female from './GamingFamily18to24Female';
import GamingFamily25PlusMale from './GamingFamily25PlusMale';
import GamingFamily25PlusFemale from './GamingFamily25PlusFemale';
import FutureGaming from './FutureGaming';
import ThankYou from './ThankYou';
import ResumePrompt from './ResumePrompt';
import SavingIndicator from './SavingIndicator';

export default function SurveyLayout() {
  const { currentSection } = useSurvey();

  const renderSection = () => {
    console.log('Rendering section:', currentSection);
    switch (currentSection) {
      case 'demographics':
        return <BasicDemographics />;
      case 'demographics_under18':
        return <DemographicsUnder18 />;
      case 'demographics_18to24':
        return <Demographics18to24 />;
      case 'demographics_25plus':
        return <Demographics25Plus />;
      case 'gaming_preferences':
        return <GamingPreferences />;
      case 'gaming_habits':
        return <GamingHabits />;
      case 'gaming_lifestyle':
        return <GamingLifestyle />;
      case 'gaming_family_under18_male':
        return <GamingFamilyUnder18Male />;
      case 'gaming_family_under18_female':
        return <GamingFamilyUnder18Female />;
      case 'gaming_family_18to24_male':
        return <GamingFamily18to24Male />;
      case 'gaming_family_18to24_female':
        return <GamingFamily18to24Female />;
      case 'gaming_family_25plus_male':
        return <GamingFamily25PlusMale />;
      case 'gaming_family_25plus_female':
        return <GamingFamily25PlusFemale />;
      case 'future_gaming':
        return <FutureGaming />;
      default:
        console.log('No matching section found, rendering ThankYou');
        return <ThankYou />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator />
      <ResumePrompt />
      <SavingIndicator />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-20"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 
