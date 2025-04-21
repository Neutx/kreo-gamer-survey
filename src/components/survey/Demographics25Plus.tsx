'use client';

import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { demographics25PlusSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const maritalStatusOptions = [
  { value: 'single', label: 'Single' },
  { value: 'relationship', label: 'In a Relationship' },
  { value: 'married', label: 'Married' },
  { value: 'married_with_kids', label: 'Married with Kids' },
  { value: 'complicated', label: 'It\'s complicated' },
];

const occupationOptions = [
  { value: 'software_engineer', label: 'Software Engineer' },
  { value: 'designer_marketer', label: 'Designer/Marketer' },
  { value: 'content_creator', label: 'Content Creator' },
  { value: 'doctor_lawyer', label: 'Doctor/Lawyer' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'founder_director', label: 'Founder/Director' },
  { value: 'self_employed', label: 'Self Employed' },
  { value: 'retired', label: 'Retired' },
  { value: 'other', label: 'Other' },
];

const igfriends = [
  { value: 'solo', label: 'I ride solo. No random folks' },
  { value: 'in_game_only', label: 'No. In-Game only!' },
  { value: 'online', label: 'Online - Off Game' },
  { value: 'acqintance', label: 'I know who they are..' },
  { value: 'met_them', label: 'Of Course - have met them offline' },
];

export default function Demographics25Plus() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.demographics_25plus || {}) as {
    occupation?: string;
    marital_status?: string;
    igfr?: string;
  };

  const form = useForm<z.infer<typeof demographics25PlusSchema>>({
    resolver: zodResolver(demographics25PlusSchema),
    defaultValues: {
      occupation: savedData.occupation || '',
      marital_status: savedData.marital_status || '',
      igfr: savedData.igfr || '',
    },
  });

  function onSubmit(values: z.infer<typeof demographics25PlusSchema>) {
    updateResponses('demographics_25plus', values);
    goToNextSection();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Level 1
          </h2>
          <p className="text-muted-foreground mt-2">
           Ice-Breaker
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do you do when you&apos;re not gaming? (Occupation)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your occupation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {occupationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your Marital Status?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {maritalStatusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="igfr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Have you met your in-game friends? (Occupation)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Vibe check" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {igfriends.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={goToPreviousSection}
                className="w-32"
              >
                Previous Level
              </Button>
              <Button 
                type="submit"
                className="w-32 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Level Up!
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 
