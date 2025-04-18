'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { futureGamingSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import ReactSelect from 'react-select';
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

const productOptions = [
  { value: 'Actus V2 Gaming Chair', label: 'Actus V2 Gaming Chair' },
  { value: 'Anzu White 52g Wireless Gaming Mouse', label: 'Anzu White 52g Wireless Gaming Mouse' },
  { value: 'Arctik Laptop Cooler', label: 'Arctik Laptop Cooler' },
  { value: 'Beluga Gaming Headphones', label: 'Beluga Gaming Headphones' },
  { value: 'Chimera Red Wireless Gaming Mouse', label: 'Chimera Red Wireless Gaming Mouse' },
  { value: 'Chimera White Wireless Gaming Mouse', label: 'Chimera White Wireless Gaming Mouse' },
  { value: 'Chimera Wireless Gaming Mouse', label: 'Chimera Wireless Gaming Mouse' },
  { value: 'Cirrus Gaming Chair', label: 'Cirrus Gaming Chair' },
  { value: 'Cliff Igneous Gaming MousePad', label: 'Cliff Igneous Gaming MousePad' },
  { value: 'Extendable Desk Stand', label: 'Extendable Desk Stand' },
  { value: 'Frost Mobile Cooler', label: 'Frost Mobile Cooler' },
  { value: 'GoPod- Premium Gorilla Grip Octopus Tripod', label: 'GoPod- Premium Gorilla Grip Octopus Tripod' },
  { value: 'GoRec Professional Wireless Mic', label: 'GoRec Professional Wireless Mic' },
  { value: 'Halo 12" Premium Ring Light', label: 'Halo 12" Premium Ring Light' },
  { value: 'Halo 12" Premium Ring Light + Tripod (Combo)', label: 'Halo 12" Premium Ring Light + Tripod (Combo)' },
  { value: 'Halo 18" Premium Ring Light', label: 'Halo 18" Premium Ring Light' },
  { value: 'Halo 18" Premium Ring Light + Tripod', label: 'Halo 18" Premium Ring Light + Tripod' },
  { value: 'Hawk Gaming Mouse - Black', label: 'Hawk Gaming Mouse - Black' },
  { value: 'Hawk White Gaming Mouse', label: 'Hawk White Gaming Mouse' },
  { value: 'Hidden Leaf Mousepad', label: 'Hidden Leaf Mousepad' },
  { value: 'Hive All Black RGB Wired Gaming Keyboard', label: 'Hive All Black RGB Wired Gaming Keyboard' },
  { value: 'Hive All White RGB Wired Gaming Keyboard', label: 'Hive All White RGB Wired Gaming Keyboard' },
  { value: 'Hive Black - Purple Wired Gaming Keyboard', label: 'Hive Black - Purple Wired Gaming Keyboard' },
  { value: 'Hive Full-Size All Black Wired Gaming Keyboard', label: 'Hive Full-Size All Black Wired Gaming Keyboard' },
  { value: 'Hive Full-Size All White Wired Gaming Keyboard', label: 'Hive Full-Size All White Wired Gaming Keyboard' },
  { value: 'Hive Full-Size Black - Purple Wired Gaming Keyboard', label: 'Hive Full-Size Black - Purple Wired Gaming Keyboard' },
  { value: 'Hive Full-Size White - Purple Wired Gaming Keyboard', label: 'Hive Full-Size White - Purple Wired Gaming Keyboard' },
  { value: 'Hive Lite RGB Membrane Keyboard', label: 'Hive Lite RGB Membrane Keyboard' },
  { value: 'Hive White-Purple Wired Gaming Keyboard', label: 'Hive White-Purple Wired Gaming Keyboard' },
  { value: 'Hydra Wired Gaming Earphones', label: 'Hydra Wired Gaming Earphones' },
  { value: 'Ikarus Black 55g Wireless Gaming Mouse', label: 'Ikarus Black 55g Wireless Gaming Mouse' },
  { value: 'Ikarus White 55g Wireless Gaming Mouse', label: 'Ikarus White 55g Wireless Gaming Mouse' },
  { value: 'Kast Black Dynamic Mic + Rod Pro Boom Arm Combo', label: 'Kast Black Dynamic Mic + Rod Pro Boom Arm Combo' },
  { value: 'Kast Black Dynamic Microphone', label: 'Kast Black Dynamic Microphone' },
  { value: 'Kast Dynamic Mic + Rod Pro Boom Arm Combo', label: 'Kast Dynamic Mic + Rod Pro Boom Arm Combo' },
  { value: 'Kast Dynamic Microphone', label: 'Kast Dynamic Microphone' },
  { value: 'Kast White Dynamic Microphone', label: 'Kast White Dynamic Microphone' },
  { value: 'Lynx Capture Card', label: 'Lynx Capture Card' },
  { value: 'Mirage Wireless RGB Gaming Controller Gamepad', label: 'Mirage Wireless RGB Gaming Controller Gamepad' },
  { value: 'Mouse Switches Pack of 3', label: 'Mouse Switches Pack of 3' },
  { value: 'Naruto Mousepad', label: 'Naruto Mousepad' },
  { value: 'Owl 4K Webcam', label: 'Owl 4K Webcam' },
  { value: 'Owl Full HD Streaming Webcam', label: 'Owl Full HD Streaming Webcam' },
  { value: 'Pass Through ABS Keycaps', label: 'Pass Through ABS Keycaps' },
  { value: 'Pegasus 49g Ultra-Light Wired Gaming Mouse', label: 'Pegasus 49g Ultra-Light Wired Gaming Mouse' },
  { value: 'Pegasus 58g Ultra-Light Wireless Black Gaming Mouse', label: 'Pegasus 58g Ultra-Light Wireless Black Gaming Mouse' },
  { value: 'Pegasus 58g Ultra-Light Wireless White Gaming Mouse', label: 'Pegasus 58g Ultra-Light Wireless White Gaming Mouse' },
  { value: 'Pop Filter', label: 'Pop Filter' },
  { value: 'Propel Gaming Mousepad', label: 'Propel Gaming Mousepad' },
  { value: 'Rec Premium Condenser Microphone with ANC', label: 'Rec Premium Condenser Microphone with ANC' },
  { value: 'RecRod Condenser Mic + Boom arm Combo', label: 'RecRod Condenser Mic + Boom arm Combo' },
  { value: 'Rod Boom arm/ Mic Stand', label: 'Rod Boom arm/ Mic Stand' },
  { value: 'Rod Pro Boom Arm/ Mic Stand', label: 'Rod Pro Boom Arm/ Mic Stand' },
  { value: 'STAYble 1.6 meter Premium Tripod Stand', label: 'STAYble 1.6 meter Premium Tripod Stand' },
  { value: 'STAYble 1.9 meter Premium Tripod Stand', label: 'STAYble 1.9 meter Premium Tripod Stand' },
  { value: 'Sakura Mousepad', label: 'Sakura Mousepad' },
  { value: 'Sasuke Mousepad', label: 'Sasuke Mousepad' },
  { value: 'Sk Rossi Premium Oversized T-Shirt', label: 'Sk Rossi Premium Oversized T-Shirt' },
  { value: 'Slab Key Light', label: 'Slab Key Light' },
  { value: 'Sonik Gaming Mic', label: 'Sonik Gaming Mic' },
  { value: 'Sonik Gaming Mic + Rod Pro Boom Arm Combo', label: 'Sonik Gaming Mic + Rod Pro Boom Arm Combo' },
  { value: 'Stayble Pro Video Tripod', label: 'Stayble Pro Video Tripod' },
  { value: 'Swarm All Black Wireless Gaming Keyboard', label: 'Swarm All Black Wireless Gaming Keyboard' },
  { value: 'Swarm All White Wireless Gaming Keyboard', label: 'Swarm All White Wireless Gaming Keyboard' },
  { value: 'Swarm Barebones Customized Keyboard', label: 'Swarm Barebones Customized Keyboard' },
  { value: 'Swarm Black Purple Wireless Gaming Keyboard', label: 'Swarm Black Purple Wireless Gaming Keyboard' },
  { value: 'Swarm White Purple Wireless Gaming Keyboard', label: 'Swarm White Purple Wireless Gaming Keyboard' },
  { value: 'Tundra Laptop Cooler', label: 'Tundra Laptop Cooler' },
  { value: 'Wasp- Mobile Gaming Trigger', label: 'Wasp- Mobile Gaming Trigger' },
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
      sustainability: savedData.sustainability || '',
      future_gaming: savedData.future_gaming || [],
      additional_feedback: savedData.additional_feedback || '',
      referred: savedData.referred || '',
      referrer_name: savedData.referrer_name || '',
      favorite_product: savedData.favorite_product || '',
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
              name="favorite_product"
              render={() => (
                <FormItem>
                  <FormLabel>Which Kreo product would you like to win?</FormLabel>
                  <p className="text-sm text-gray-500 mb-2">
                    Not sure what to get? Visit our website <a href="https://kreo-tech.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">kreo-tech.com</a>
                  </p>
                  <FormControl>
                    <Controller
                      name="favorite_product"
                      control={form.control}
                      render={({ field }) => (
                        <ReactSelect
                          inputId="favorite_product"
                          options={productOptions}
                          value={productOptions.find(option => option.value === field.value)}
                          onChange={(option) => field.onChange(option ? option.value : '')}
                          placeholder="Search for a product..."
                          classNamePrefix="react-select"
                          className="react-select-container"
                          isClearable
                          isSearchable
                        />
                      )}
                    />
                  </FormControl>
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
