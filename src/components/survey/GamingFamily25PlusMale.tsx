'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingFamily25PlusMaleSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const oldgenOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'Sometimes' },
];
const perceptionOptions = [
  { value: 'waste_of_time', label: 'A waste of time' },
  { value: 'fun_hobby', label: 'A fun hobby' },
  { value: 'potential_career', label: 'A potential career' },
  { value: 'dont_care', label: 'They don\'t care' },
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




const perceptionOptions = [
  { value: 'waste_of_time', label: 'A waste of time' },
  { value: 'fun_hobby', label: 'A fun hobby' },
  { value: 'potential_career', label: 'A potential career' },
  { value: 'dont_care', label: 'They don\'t care' },
];

const characterOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_human', label: 'Non-human' },
  { value: 'custom', label: 'Custom avatar' },
];

const reasonOptions = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'socializing', label: 'Socializing' },
  { value: 'competitive', label: 'Competitive gaming' },
  { value: 'stress_relief', label: 'Stress relief' },
];

const frequencyOptions = [
  { value: 'always', label: 'Always' },
  { value: 'often', label: 'Often' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' },
];

const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'sometimes', label: 'Sometimes' },
];

const timeManagementOptions = [
  { value: 'very_well', label: 'Very well - I have a good balance' },
  { value: 'somewhat_well', label: 'Somewhat well - Occasional conflicts' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'somewhat_difficult', label: 'Somewhat difficult - Regular conflicts' },
  { value: 'very_difficult', label: 'Very difficult - Significant conflicts' },
];

const parentingApproachOptions = [
  { value: 'strict_limits', label: 'Strict time/content limits' },
  { value: 'moderate_oversight', label: 'Moderate oversight with flexibility' },
  { value: 'educational_focus', label: 'Focus on educational games' },
  { value: 'play_together', label: 'We primarily play together as a family' },
  { value: 'minimal_restrictions', label: 'Minimal restrictions' },
  { value: 'no_children', label: 'I don\'t have children' },
];

const patternChangeOptions = [
  { value: 'play_less', label: 'I play less than when I was younger' },
  { value: 'play_more', label: 'I play more than when I was younger' },
  { value: 'different_games', label: 'I play different types of games now' },
  { value: 'same_patterns', label: 'My gaming patterns haven\'t changed much' },
  { value: 'stopped_restarted', label: 'I stopped for years but restarted' },
];

const workPerceptionOptions = [
  { value: 'very_positive', label: 'Very positive - it\'s respected' },
  { value: 'somewhat_positive', label: 'Somewhat positive' },
  { value: 'neutral', label: 'Neutral/indifferent' },
  { value: 'somewhat_negative', label: 'Somewhat negative' },
  { value: 'very_negative', label: 'Very negative - it\'s looked down upon' },
  { value: 'hidden', label: 'I don\'t discuss gaming at work' },
];

const monthlySpendingOptions = [
  { value: 'none', label: 'Nothing (only free games)' },
  { value: 'under_500', label: 'Under ₹500 per month' },
  { value: '500_1000', label: '₹500-₹1,000 per month' },
  { value: '1000_3000', label: '₹1,000-₹3,000 per month' },
  { value: '3000_5000', label: '₹3,000-₹5,000 per month' },
  { value: 'over_5000', label: 'Over ₹5,000 per month' },
];

export default function GamingFamily25PlusMale() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();

  const savedData = (responses.gaming_family_25plus_male || {}) as {
    family_perception?: string;
    family_gamers?: boolean;
    gaming_impact?: string;
    character_preference?: string;
    gender_bias?: string;
    primary_reason?: string;
    game_with_partner?: string;
    time_management?: string;
    parenting_approach?: string;
    pattern_changes?: string;
    work_perception?: string;
    stress_relief?: string;
    use_for_networking?: string;
    monthly_spending?: string;
  };

  const form = useForm<z.infer<typeof gamingFamily25PlusMaleSchema>>({
    resolver: zodResolver(gamingFamily25PlusMaleSchema),
    defaultValues: {
      family_perception: savedData.family_perception || '',
      family_gamers: savedData.family_gamers || false,
      gaming_impact: savedData.gaming_impact || '',
      character_preference: savedData.character_preference || '',
      gender_bias: savedData.gender_bias || '',
      primary_reason: savedData.primary_reason || '',
      game_with_partner: savedData.game_with_partner || '',
      time_management: savedData.time_management || '',
      parenting_approach: savedData.parenting_approach || '',
      pattern_changes: savedData.pattern_changes || '',
      work_perception: savedData.work_perception || '',
      stress_relief: savedData.stress_relief || '',
      use_for_networking: savedData.use_for_networking || '',
      monthly_spending: savedData.monthly_spending || '',
    },
  });

  function onSubmit(values: z.infer<typeof gamingFamily25PlusMaleSchema>) {
    updateResponses('gaming_family_25plus_male', values);
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
            Gaming & Work-Life Balance
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us how gaming fits into your adult life
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
            
            
              
            <FormField
              control={form.control}
              name="old_generation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you feel gaming is misunderstood by older generations?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select perception" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {oldgenOptions.map((option) => (
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
              name="academic_networking"
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
              name="gender_bias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you think gaming has a gender bias?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select typical reaction" />
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
              name="promote_family"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you promote gaming in family/kids?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your answer" />
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
              name="character_preference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In-game character preference?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your character preference" />
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
            
            
            
            
{/*             <FormField
              control={form.control}
              name="family_perception"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How does your partner/family view your gaming?</FormLabel>
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
              name="game_with_partner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you game with your partner/spouse?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
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
              name="time_management"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How well do you manage time between work, family, and gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your experience" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeManagementOptions.map((option) => (
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
              name="parenting_approach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>If you have children, what&apos;s your approach to managing their gaming?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your approach" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {parentingApproachOptions.map((option) => (
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
              name="pattern_changes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How have your gaming patterns changed as you&apos;ve gotten older?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select how patterns have changed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {patternChangeOptions.map((option) => (
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
              name="work_perception"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How is gaming viewed in your professional environment?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select perception at work" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {workPerceptionOptions.map((option) => (
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
              name="stress_relief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you use gaming as a stress reliever from work/family responsibilities?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {frequencyOptions.map((option) => (
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
              name="use_for_networking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you use gaming for professional or social networking?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your answer" />
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
              name="monthly_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How much do you typically spend on gaming monthly?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select monthly spending" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {monthlySpendingOptions.map((option) => (
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
              name="gender_bias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you think gaming has a gender bias?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="gender_bias_yes" />
                        <FormLabel htmlFor="gender_bias_yes" className="font-normal">
                          Yes
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="gender_bias_no" />
                        <FormLabel htmlFor="gender_bias_no" className="font-normal">
                          No
                        </FormLabel>
                      </div>
                    </RadioGroup>
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
                        <SelectValue placeholder="Select your character preference" />
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
                      Do you involve your children/family in gaming?
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
                  <FormLabel>How does gaming fit into your work-life balance?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe how gaming affects your career, family responsibilities, and personal time..."
                      className="bg-background/50 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
 */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={goToPreviousSection}
                className="w-32"
              >
                Previous
              </Button>
              <Button 
                type="submit"
                className="w-32 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 
