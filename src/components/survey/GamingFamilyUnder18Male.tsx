'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingFamilyUnder18MaleSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { Checkbox } from '@/components/ui/checkbox';

const perceptionOptions = [
  { value: 'waste_of_time', label: 'A waste of time' },
  { value: 'fun_hobby', label: 'A fun hobby' },
  { value: 'potential_career', label: 'A potential career' },
  { value: 'dont_care', label: 'They don&apos;t care' },
];

const reasonOptions = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'socializing', label: 'Socializing' },
  { value: 'competitive', label: 'Competitive gaming' },
  { value: 'stress_relief', label: 'Stress relief' },
];

const biasOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'yes_can_talk', label: 'Yes. Can talk more about it...' },
];

const characterOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_human', label: 'Non-human' },
  { value: 'custom', label: 'Custom avatar' },
];

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'Sometimes' },
];

export default function GamingFamilyUnder18Male() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_family_under18_male || {}) as {
    family_perception?: string;
    family_gamers?: boolean;
    gaming_impact?: string;
    character_preference?: string;
    gender_bias?: string;
    primary_reason?: string;
    parent_gaming_rules?: string;
    parents_play_games?: string;
    gaming_with_siblings?: string;
    homework_compromise?: string;
    friends_parents_rules?: string;
    gaming_arguments?: string;
  };

  const form = useForm<z.infer<typeof gamingFamilyUnder18MaleSchema>>({
    resolver: zodResolver(gamingFamilyUnder18MaleSchema),
    defaultValues: {
      family_perception: savedData.family_perception || '',
      family_gamers: savedData.family_gamers || false,
      gaming_impact: savedData.gaming_impact || '',
      character_preference: savedData.character_preference || '',
      gender_bias: savedData.gender_bias || '',
      primary_reason: savedData.primary_reason || '',
      parent_gaming_rules: savedData.parent_gaming_rules || '',
      parents_play_games: savedData.parents_play_games || '',
      gaming_with_siblings: savedData.gaming_with_siblings || '',
      homework_compromise: savedData.homework_compromise || '',
      friends_parents_rules: savedData.friends_parents_rules || '',
      gaming_arguments: savedData.gaming_arguments || '',
    },
  });

  function onSubmit(values: z.infer<typeof gamingFamilyUnder18MaleSchema>) {
    updateResponses('gaming_family_under18_male', values);
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
            Gaming & Family
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about how gaming fits into your family life
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="family_perception"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What do your parents think about your gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select perception" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {perceptionOptions.map((option) => (
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
              name="family_gamers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Do you game with your family members?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaming_impact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How has gaming affected your life?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe any positive or negative impacts on your education, career connections, or opportunities..."
                      className="bg-background/50 min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="character_preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In-game character preference?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {characterOptions.map((option) => (
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
              name="gender_bias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you think gaming has a gender bias?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {biasOptions.map((option) => (
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
              name="primary_reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary reason to play games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your primary reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reasonOptions.map((option) => (
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
              name="parent_gaming_rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do your parents have specific rules about gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="parents_play_games"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do your parents play games?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="gaming_with_siblings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How often do you game with your siblings?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="homework_compromise"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have to compromise between gaming and homework?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="friends_parents_rules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do your friends&apos; parents have different gaming rules?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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
              name="gaming_arguments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have arguments about gaming with family?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yesNoOptions.map((option) => (
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

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousSection}
              >
                Previous
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 