'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingHabitsSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const gameStart = [
  { id: 'less_than_1', label: 'Less than a year ago' },
  { id: '1-3', label: '1-3 years ago' },
  { id: '3-5', label: '3-5 years ago' },
  { id: '5_plus', label: 'More than 5 years ago' },
];

const gType = [
  { id: 'single', label: 'Single Player - I Play solo' },
  { id: 'co-op', label: 'Co-op modes ++' },
  { id: 'Multiplayer', label: 'Multiplayer' },
  { id: 'Any', label: 'Any - I just like to play!' },
];

const buyingPref = [
  { id: 'buy_offline', label: 'Buy physical copy' },
  { id: 'buy_online', label: 'Buy online' },
  { id: 'crack', label: 'Use cracked version' },
];

const frequencyOptions = [
  { id: 'daily', label: 'Daily' },
  { id: 'few_times_week', label: 'Few times a week' },
  { id: 'occasionally', label: 'Occasionally' },
];

const modPref = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
];

type FormValues = z.infer<typeof gamingHabitsSchema>;

export default function GamingHabits() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_habits || {}) as FormValues;

  const form = useForm<FormValues>({
    resolver: zodResolver(gamingHabitsSchema),
    defaultValues: {
      gaming_start: savedData.gaming_start || '',
      gaming_frequency: savedData.gaming_frequency || '',
      game_type: savedData.game_type || '',
      game_buy: savedData.game_buy || [],
      mod_controller: savedData.mod_controller || '',
    },
  });

  function onSubmit(values: FormValues) {
    updateResponses('gaming_habits', values);
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
            Gaming Habits
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming routine and experience
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="gaming_start"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>When did you first start gaming?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {gameStart.map((slot) => (
                        <FormItem key={slot.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={slot.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {slot.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gaming_frequency"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How often do you play games?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {frequencyOptions.map((slot) => (
                        <FormItem key={slot.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={slot.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {slot.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="game_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you prefer single-player or multiplayer games?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {gType.map((slot) => (
                        <FormItem key={slot.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={slot.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {slot.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="game_buy"
              render={() => (
                <FormItem>
                  <FormLabel>Do you prefer buying a game (disk, online) or using a cracked version?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {buyingPref.map((slot) => (
                      <FormField
                        key={slot.id}
                        control={form.control}
                        name="game_buy"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(slot.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, slot.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== slot.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {slot.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mod_controller"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you use modified/experimental gaming controllers?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {modPref.map((slot) => (
                        <FormItem key={slot.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={slot.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {slot.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
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
