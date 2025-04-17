'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { futureGamingSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ThankYou from './ThankYou';



const sustainableOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];





const futuregamingOptions = [
  { value: 'VR/AR', label: 'VR/AR gaming' },
  { value: 'cloud', label: 'Cloud gaming' },
  { value: 'blockchain', label: 'Blockchain gaming' },
  { value: 'esports', label: 'Esports going mainstream' },
  { value: 'india_based', label: 'More India-based game development' },
];


type FutureGamingFormType = z.infer<typeof futureGamingSchema>;


export default function FutureGaming() {
  const { updateResponses, goToPreviousSection, responses } = useSurvey();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const savedData = (responses.future_gaming || {}) as Partial<FutureGamingFormType>;

  const form = useForm<FutureGamingFormType>({
    resolver: zodResolver(futureGamingSchema),
    defaultValues: {
      metaverse_interest: savedData.metaverse_interest || '',
      vr_adoption: savedData.vr_adoption || '',
      cloud_gaming: savedData.cloud_gaming || '',
      sustainability: savedData.sustainability || '',
      ai_in_games: savedData.ai_in_games || '',
      blockchain_gaming: savedData.blockchain_gaming || '',
      subscription_services: savedData.subscription_services || '',
      future_spending: savedData.future_spending || '',
      future_gaming: savedData.future_gaming || [],
      additional_feedback: savedData.additional_feedback || '',
      referred: savedData.referred || '',
      referrer_name: savedData.referrer_name || '',
    },
  });

  // Watch the referred field to conditionally show the referrer name input
  const referred = form.watch('referred');

  function onSubmit(values: FutureGamingFormType) {
    console.log('Submitting final form', values);
    try {
      updateResponses('future_gaming', values);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  }

  if (isSubmitted) {
    return <ThankYou />;
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
            The Promised Land
          </h2>
          <p className="text-muted-foreground mt-2">
            Looking ahead into the future!
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
            <FormField
              control={form.control}
              name="future_gaming"
              render={() => (
                <FormItem>
                  <FormLabel>What excites you most about the future of gaming?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {futuregamingOptions.map((method) => (
                      <FormField
                        key={method.value}
                        control={form.control}
                        name="future_gaming"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method.value)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, method.value]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== method.value));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {method.label}
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
              name="sustainability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would you support sustainable and eco-friendly gaming gear if available?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your interest level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sustainableOptions.map((option) => (
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
              name="referred"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Were you referred by someone?</FormLabel>
                  <FormDescription className="text-gray-400">
                    This question is optional
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {referred === 'yes' && (
              <FormField
                control={form.control}
                name="referrer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of the person who referred you</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter their name"
                        className="bg-background/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="additional_feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would you like to share anything else with us?</FormLabel>
                  <FormDescription className="text-gray-400">
                    Feel free to share any thoughts, suggestions, or feedback about gaming in India.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Your thoughts and feedback are valuable to us..."
                      className="bg-background/50 min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-8">
              <Button 
                variant="outline" 
                type="button" 
                onClick={goToPreviousSection}
                className="w-32 h-12 text-base hover:bg-purple-500/10"
              >
                Previous
              </Button>
              <Button 
                type="submit"
                className="w-auto px-8 h-12 text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center gap-2 rounded-xl"
              >
                 Submit! (Surprise ahead 😉)
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
