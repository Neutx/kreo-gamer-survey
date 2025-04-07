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




export default function FutureGaming() {
  const { updateResponses, goToPreviousSection, responses, setCurrentSection, getSectionOrder } = useSurvey();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const savedData = (responses.future_gaming || {}) as {
    metaverse_interest?: string;
    vr_adoption?: string;
    cloud_gaming?: string;
    sustainability?: string;
    ai_in_games?: string;
    blockchain_gaming?: string;
    subscription_services?: string;
    future_spending?: string;
    future_gaming?: string[];
  };

  const form = useForm<z.infer<typeof futureGamingSchema>>({
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
    },
  });

  function onSubmit(values: z.infer<typeof futureGamingSchema>) {
    console.log('Submitting final form', values);
    try {
      // Update responses in context
      updateResponses('future_gaming', values);
      
      // Set submitted state to show ThankYou component
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

{/*             <FormField
              control={form.control}
              name="ai_in_games"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thoughts on AI in Games</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your thoughts on AI" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {aiInterestOptions.map((option) => (
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
              name="blockchain_gaming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interest in Blockchain Gaming</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your interest in blockchain gaming" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {blockchainOptions.map((option) => (
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
              name="vr_adoption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VR Gaming Plans</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your VR plans" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vrAdoptionOptions.map((option) => (
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
              name="cloud_gaming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Gaming Preference</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cloudGamingOptions.map((option) => (
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
              name="subscription_services"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Services vs. Game Ownership</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subscriptionOptions.map((option) => (
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
              name="future_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Future Gaming Spending Plans</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your future spending plans" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {spendingOptions.map((option) => (
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
              name="sustainability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance of Gaming Sustainability</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select importance level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sustainabilityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
                Submit! (Surprise ahead 😉)
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
}
