'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingLifestyleSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ReactSelect from 'react-select';
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
import { SurveySection } from "@/types/survey";

const activityOptions = [
  {value:'anime',label:'Anime'},
  {value:'esports',label:'Esports'},
  {value:'streaming',label:'Streaming'},
  {value:'fitness',label:'Fitness'},
  {value:'technology',label:'Technology'},
  {value:'music',label:'Music'},
  {value:'cosplay',label:'Cosplay'},
  {value:'collectibles',label:'Collectibles'},
  {value:'board_games',label:'Board Games'},
  {value:'fantasy_sports',label:'Fantasy Sports'},
  {value:'coding',label:'Coding'},
  {value:'movies',label:'Movies'},
  {value:'tv_shows',label:'TV Shows'},
  {value:'fashion',label:'Fashion'},
  {value:'travel',label:'Travel'},
  {value:'photography',label:'Photography'},
  {value:'other',label:'Other'},
];



const contentcreatorOptions = [
  { id: 'full_time', label: 'Yes, full-time' },
  { id: 'part_time', label: 'Yes, part-time' },
  { id: 'no_but_want_to', label: 'No, but I want to' },
  { id: 'not_interested', label: 'No, not interested' },
];



const esportpartOptions = [
  { value: 'none', label: 'Yes, regularly' },
  { value: 'under_500', label: 'Occasionally' },
  { value: '500_2000', label: 'No, but I want to' },
  { value: 'above_2000', label: ' No, not interested' },
];

const contentwatchOptions = [
  { id: 'daily', label: 'Daily' },
  { id: 'few_times_a_week', label: 'Few times a week' },
  { id: 'rarely', label: 'Rarely' },
];



const foodOptions = [
  { id: 'fast_food', label: 'Fast food (McDonald\'s, KFC, Dominos...)' },
  { id: 'snacks', label: 'Snacks (Lays, Kurkure, Pringles..)' },
  { id: 'healthy', label: 'Healthy options (Nuts, Protein bars, Fruits...)' },
];

const drinksOptions = [
  { id: 'energy', label: 'Energy drinks (Redbull, Monster.. even Sting counts' },
  { id: 'homemade', label: ' (Hot/Cold) Tea, Coffee, Lassi, Buttermilk...' },
  { id: 'water', label: 'Water' },
  { id: 'others', label: 'Coke, Mazza, Frooti, Paperboat...' },
];

const customPerOptions = [
  { id: 'yes', label: 'Yes, I use customized peripherals' },
  { id: 'want_to', label: 'No, but I would like to' },
  { id: 'not_interested', label: 'No, not interested' },
];




const merchspendsOptions = [
  { id: 'zero', label: '₹0 - I don\'t buy merch' },
  { id: '500_to_2000', label: '₹500-2000 - Occasional buyer ' },
  { id: '2000_to_5000', label: '₹2000-5000 - Enthusiast' },
  { id: '5000_plus', label: ' ₹5000+ - Hardcore collector' },
];



const contentconsumeOptions = [
  { id: 'yt', label: 'YouTube' },
  { id: 'twitch', label: 'Twitch' },
  { id: 'fb_insta', label: ' Facebook/Instagram' },
  { id: 'rooter', label: 'Rooter' },
  { id: 'loco', label: 'Loco' },
  { id: 'other', label: 'Other' },
];


const igsOptions = [
  { id: 'zero', label: '₹0 - I\'m strictly F2P ' },
  { id: '100_to_500', label: '₹100-500 - Casual spender' },
  { id: '500_to_2000', label: '₹500-2000 - Invested in the grind' },
  { id: '2000_plus', label: ' ₹2000+ - Take my money, devs!' },
];


const collectOptions = [
  { id: 'yes', label: 'Yes, actively' },
  { id: 'occasionally', label: 'Occasionally' },
  { id: 'not_interested', label: 'No, not interested'},
];




export default function GamingLifestyle() {
  const { updateResponses, goToPreviousSection, responses, setCurrentSection } = useSurvey();

  const savedData = responses?.gaming_lifestyle || {
    interest: [],
    other_interests: "",
    customised_peripherals: "",
    gaming_food: "",
    gaming_drink: "",
    watch_content: "",
    fav_creator: "",
    esp_participation: "",
    is_content_c: "",
    content_platforms: [],
    in_game_spends: "",
    merch_spends: "",
    collectibles: ""
  };

  const form = useForm<z.infer<typeof gamingLifestyleSchema>>({
    resolver: zodResolver(gamingLifestyleSchema),
    defaultValues: {
      interest: Array.isArray(savedData.interest) 
        ? savedData.interest 
        : (typeof savedData.interest === 'string' && savedData.interest) 
          ? [savedData.interest] 
          : [],
      other_interests: savedData.other_interests || "",
      customised_peripherals: savedData.customised_peripherals || "",
      gaming_food: savedData.gaming_food || "",
      gaming_drink: savedData.gaming_drink || "",
      watch_content: savedData.watch_content || "",
      fav_creator: savedData.fav_creator || "",
      esp_participation: savedData.esp_participation || "",
      is_content_c: savedData.is_content_c || "",
      content_platforms: savedData.content_platforms || [],
      in_game_spends: savedData.in_game_spends || "",
      merch_spends: savedData.merch_spends || "",
      collectibles: savedData.collectibles || ""
    }
  });

  // Custom styles for react-select
  const customStyles = {
    control: (base: Record<string, unknown>) => ({
      ...base,
      backgroundColor: 'white',
      borderColor: '#e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#cbd5e1',
      },
      minHeight: '42px',
    }),
    menu: (base: Record<string, unknown>) => ({
      ...base,
      backgroundColor: 'white',
      zIndex: 9999,
    }),
    option: (base: Record<string, unknown>, state: { isSelected?: boolean; isFocused?: boolean }) => ({
      ...base,
      backgroundColor: state.isSelected ? 'rgba(139, 92, 246, 0.1)' : state.isFocused ? 'rgba(139, 92, 246, 0.05)' : 'white',
      color: 'black',
      '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.05)',
      },
    }),
    multiValue: (base: Record<string, unknown>) => ({
      ...base,
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
    }),
    multiValueLabel: (base: Record<string, unknown>) => ({
      ...base,
      color: '#4b5563',
    }),
    multiValueRemove: (base: Record<string, unknown>) => ({
      ...base,
      color: '#4b5563',
      '&:hover': {
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        color: 'black',
      },
    }),
    input: (base: Record<string, unknown>) => ({
      ...base,
      color: 'black',
    }),
    placeholder: (base: Record<string, unknown>) => ({
      ...base,
      color: '#9ca3af',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base: Record<string, unknown>) => ({
      ...base,
      color: '#9ca3af',
    }),
  };

  // Function to handle form submission
  const handleSubmit = (values: z.infer<typeof gamingLifestyleSchema>) => {
    console.log('Form submitted with values:', values);
    updateResponses('gaming_lifestyle', values);
    
    // Get user's age and gender from demographics
    const age = responses.demographics?.age;
    const gender = responses.demographics?.gender;
    
    // Determine the correct family section
    let nextSection: SurveySection;
    
    if (age === 'Under 18') {
      nextSection = gender?.toLowerCase() === 'female' 
        ? 'gaming_family_under18_female' 
        : 'gaming_family_under18_male';
    } else if (age === '18-24') {
      nextSection = gender?.toLowerCase() === 'female'
        ? 'gaming_family_18to24_female'
        : 'gaming_family_18to24_male';
    } else {
      nextSection = gender?.toLowerCase() === 'female'
        ? 'gaming_family_25plus_female'
        : 'gaming_family_25plus_male';
    }
    
    console.log('Navigating to family section:', nextSection);
    setCurrentSection(nextSection);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 pt-24"
    >
      <Card className="w-full max-w-2xl glassmorphism space-y-8 p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Gaming Lifestyle
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming content creation and community involvement
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="interest"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Apart from gaming, what do you follow?</FormLabel>
                    <FormControl>
                      <Controller
                        name="interest"
                        control={form.control}
                        render={({ field }) => (
                          <ReactSelect
                            inputId="interests"
                            options={activityOptions}
                            value={activityOptions.filter(option => 
                              field.value && field.value.includes(option.value)
                            )}
                            onChange={(selectedOptions) => {
                              // Handle multi-select
                              const values = selectedOptions 
                                ? selectedOptions.map(option => option.value) 
                                : [];
                              field.onChange(values);
                              
                              // Clear "other" field if "other" is not selected
                              if (!values.includes('other')) {
                                form.setValue('other_interests', '');
                              }
                            }}
                            styles={customStyles}
                            className="w-full"
                            classNamePrefix="select"
                            placeholder="Select your interests"
                            isMulti
                            isSearchable
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                    {form.watch('interest')?.includes('other') && (
                      <FormField
                        control={form.control}
                        name="other_interests"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your other interests"
                                className="bg-background/50"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="customised_peripherals"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you use customised peripherals of topics you are interested in? Would you like to?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {customPerOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
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
              name="gaming_food"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guilty gaming food?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {foodOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
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
              name="gaming_drink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guilty gaming drink?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {drinksOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
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
              name="watch_content"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How frequently do you watch gaming content?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {contentwatchOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
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
              name="fav_creator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favorite gaming creator, streamer?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter names of the top creators, streamers you follow!"
                      className="bg-background/50 min-h-[20px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  

            <FormField
              control={form.control}
              name="esp_participation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Have you ever participated in an eSports tournament?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {esportpartOptions.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
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
              name="is_content_c"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you stream or create gaming content?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {contentcreatorOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
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
              name="content_platforms"
              render={() => (
                <FormItem>
                  <FormLabel>Which platforms do you use for streaming/watching gaming content?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {contentconsumeOptions.map((customize) => (
                      <FormField
                        key={customize.id}
                        control={form.control}
                        name="content_platforms"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(customize.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, customize.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== customize.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {customize.label}
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
              name="in_game_spends"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How much do you spend on in-game purchases per month?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {igsOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
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
              name="merch_spends"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>How much do you spend on gaming merchandise (apparel, collectibles, accessories) per month or 2 months?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {merchspendsOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
{/* collectibles */}
            <FormField
              control={form.control}
              name="collectibles"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Do you collect gaming-related items (cards, figurines, posters, in-game collectibles)?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="space-y-1"
                    >
                      {collectOptions.map((option) => (
                        <FormItem key={option.id} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
{/*             <FormField
              control={form.control}
              name="streams_content"
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
                      Do you create gaming content or stream?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('streams_content') && (
              <FormField
                control={form.control}
                name="platform_handles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Media Handles</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your YouTube, Twitch, or other handles"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.split(',').map(s => s.trim()))}
                        className="bg-background/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="follows_esports"
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
                      Do you follow esports?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {form.watch('follows_esports') && (
              <FormField
                control={form.control}
                name="favorite_esports"
                render={() => (
                  <FormItem>
                    <FormLabel>Favorite Esports Titles</FormLabel>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {esportsOptions.map((esport) => (
                        <FormField
                          key={esport.id}
                          control={form.control}
                          name="favorite_esports"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(esport.id)}
                                  onCheckedChange={(checked) => {
                                    const value = field.value || [];
                                    if (checked) {
                                      field.onChange([...value, esport.id]);
                                    } else {
                                      field.onChange(value.filter((val) => val !== esport.id));
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {esport.label}
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
            )}

            <FormField
              control={form.control}
              name="gaming_influencers"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Influencers You Follow</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {influencerOptions.map((influencer) => (
                      <FormField
                        key={influencer.id}
                        control={form.control}
                        name="gaming_influencers"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(influencer.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, influencer.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== influencer.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {influencer.label}
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
              name="gaming_communities"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Communities You're Part Of</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {communityOptions.map((community) => (
                      <FormField
                        key={community.id}
                        control={form.control}
                        name="gaming_communities"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(community.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, community.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== community.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {community.label}
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
              name="gaming_subscriptions"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Subscriptions You Have</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {subscriptionOptions.map((subscription) => (
                      <FormField
                        key={subscription.id}
                        control={form.control}
                        name="gaming_subscriptions"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(subscription.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, subscription.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== subscription.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {subscription.label}
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
              name="merchandise_spending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Merchandise Spending</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select spending range" />
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
              name="gaming_news_sources"
              render={() => (
                <FormItem>
                  <FormLabel>Where Do You Get Gaming News?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {newsSourceOptions.map((source) => (
                      <FormField
                        key={source.id}
                        control={form.control}
                        name="gaming_news_sources"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(source.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, source.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== source.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {source.label}
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
              name="gaming_events"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Events Participation</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {eventTypes.map((event) => (
                      <FormField
                        key={event.id}
                        control={form.control}
                        name="gaming_events"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(event.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, event.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== event.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {event.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
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
                Level Up!
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 
