import * as z from 'zod';

export const demographicsSchema = z.object({
  ign: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional(),
  age: z.string({ required_error: 'Please select your age' }),
  gender: z.string({ required_error: 'Please select your gender' }),
  location: z.string().min(2, { message: 'Location is required' }),
});

export const demographicsUnder18Schema = z.object({
  grade: z.string({ required_error: 'Please select your grade/class' }),
  //school_type: z.string({ required_error: 'Please select your school type' }),
  //extracurricular: z.string({ required_error: 'Please select an option' }),
  //pocket_money: z.string({ required_error: 'Please select an amount' }),
  //travel_to_school: z.string({ required_error: 'Please select an option' }),
  //favorite_subjects: z.array(z.string()).min(1, { message: 'Select at least one subject' }),
  //study_hours: z.string({ required_error: 'Please select your study hours' }),
  //parent_control: z.string({ required_error: 'Please select an option' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const demographics18to24Schema = z.object({
  //education_level: z.string({ required_error: 'Please select your education level' }),
  //field_of_study: z.string({ required_error: 'Please select your field of study' }),
  //current_status: z.string({ required_error: 'Please select your current status' }),
  //living_situation: z.string({ required_error: 'Please select your living situation' }),
  //monthly_income: z.string({ required_error: 'Please select your monthly income' }),
  //income_source: z.string({ required_error: 'Please select your income source' }),
  //relationship_status: z.string({ required_error: 'Please select your relationship status' }),
  //career_aspirations: z.string({ required_error: 'Please select your career aspirations' }),
  occupation: z.string({ required_error: 'Please select your occupation' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const demographics25PlusSchema = z.object({
  //education_level: z.string({ required_error: 'Please select your education level' }),
  //employment_status: z.string({ required_error: 'Please select your employment status' }),
  //industry_sector: z.string({ required_error: 'Please select your industry sector' }),
  //annual_income: z.string({ required_error: 'Please select your annual income' }),
  marital_status: z.string({ required_error: 'Please select your marital status' }),
  //number_of_children: z.string({ required_error: 'Please select the number of children' }),
  //housing_type: z.string({ required_error: 'Please select your housing type' }),
  //financial_responsibilities: z.array(z.string()).min(1, { message: 'Select at least one responsibility' }),
  occupation: z.string({ required_error: 'Please select your occupation' }),
  igfr: z.string({ required_error: 'Please select an option' }),
});

export const gamingPreferencesSchema = z.object({
  platforms: z.array(z.string()).min(1, { message: 'Select at least one platform' }),
  favorite_game_1: z.string().optional(),
  favorite_game_2: z.string().optional(),
  favorite_game_3: z.string().optional(),
  favorite_game_1_other: z.string().optional(),
  favorite_game_2_other: z.string().optional(),
  favorite_game_3_other: z.string().optional(),
  next_game: z.string().optional(),
  gaming_spends: z.string({ required_error: 'Please select your spending preference' }),
  gaming_peripherals: z.array(z.string()).min(1, { message: 'Select at least one peripheral' }),
  gear_upgrade: z.string({ required_error: 'Please select your upgrade frequency' }),
  gear_features: z.object({
    performance: z.number().min(1).max(5).optional(),
    aesthetics: z.number().min(1).max(5).optional(),
    durability: z.number().min(1).max(5).optional(),
    price: z.number().min(1).max(5).optional(),
    brand: z.number().min(1).max(5).optional(),
  }).optional(),
  purchase_platforms: z.array(z.string()).min(1, { message: 'Select at least one platform' }),
  kreo_familiarity: z.string({ required_error: 'Please select your familiarity' }),
  spending_monthly: z.string({ required_error: 'Please select your spending range' }),
});

export const gamingHabitsSchema = z.object({
  gaming_start: z.string({ required_error: 'Select when you started gaming' }),
  gaming_frequency: z.string({ required_error: 'Select how often you play' }),
  game_type: z.string({ required_error: 'Select your preferred game type' }),
  game_buy: z.array(z.string()).min(1, { message: 'Select your preferred way to get games' }),
  mod_controller: z.string({ required_error: 'Select if you use modified controllers' }),
  uses_betting_apps: z.string({ required_error: 'Please select if you use betting apps' }).optional(),
  betting_platforms: z.array(z.string()).optional(),
});

export const gamingLifestyleSchema = z.object({
  interest: z.string().optional(),
  other_interests: z.string().optional(),
  customised_peripherals: z.string({ required_error: 'Please select an option' }),
  gaming_food: z.string().optional(),
  gaming_drink: z.string().optional(),
  watch_content: z.string({ required_error: 'Please select an option' }),
  fav_creator: z.string().optional(),
  esp_participation: z.string({ required_error: 'Please select an option' }),
  is_content_c: z.string({ required_error: 'Please select an option' }),
  content_platforms: z.array(z.string()).optional(),
  in_game_spends: z.string({ required_error: 'Please select your spending range' }),
  merch_spends: z.string({ required_error: 'Please select your spending range' }),
  collectibles: z.string({ required_error: 'Please select an option' })
});

export const gamingFamilyUnder18MaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  parent_gaming_rules: z.string({ required_error: 'Please select an option' }),
  parents_play_games: z.string({ required_error: 'Please select an option' }),
  gaming_with_siblings: z.string({ required_error: 'Please select frequency' }),
  homework_compromise: z.string({ required_error: 'Please select an option' }),
  friends_parents_rules: z.string({ required_error: 'Please select an option' }),
  gaming_arguments: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamilyUnder18FemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  parents_supportive: z.string({ required_error: 'Please rate your parents support' }),
  different_rules: z.string({ required_error: 'Please select an option' }),
  play_with_family: z.string({ required_error: 'Please select an option' }),
  hidden_gaming: z.string({ required_error: 'Please select an option' }),
  female_friends_play: z.string({ required_error: 'Please select an option' }),
  gender_comments: z.string({ required_error: 'Please select an option' }),
  family_encouragement: z.string({ required_error: 'Please select an option' }),
});

export const gamingFamily18to24MaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select your family perception' }),
  family_gamers: z.boolean().optional(),
  gaming_impact: z.string().optional(),
  character_preference: z.string({ required_error: 'Please select character preference' }),
  gender_bias: z.string({ required_error: 'Please select an option regarding gender bias' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  old_generation: z.string({ required_error: 'Please select your view on older generations' }),
  academic_networking: z.string().optional(),
});

export const gamingFamily18to24FemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().optional(),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  peers_reaction: z.string({ required_error: 'Please select typical reaction' }),
  women_communities: z.string({ required_error: 'Please select your answer' }),
  dating_supportive: z.string({ required_error: 'Please select level of support' }),
  gender_interactions: z.string({ required_error: 'Please select frequency' }),
  hide_gender: z.string({ required_error: 'Please select frequency' }),
  academic_networking: z.string().optional(),
  feel_represented: z.string({ required_error: 'Please select level of representation' }),
});

export const gamingFamily25PlusMaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  game_with_partner: z.string({ required_error: 'Please select frequency' }),
  time_management: z.string({ required_error: 'Please select how well you manage time' }),
  parenting_approach: z.string({ required_error: 'Please select your approach' }),
  pattern_changes: z.string({ required_error: 'Please select how patterns have changed' }),
  work_perception: z.string({ required_error: 'Please select how gaming is viewed' }),
  stress_relief: z.string({ required_error: 'Please select frequency' }),
  use_for_networking: z.string({ required_error: 'Please select an option' }),
  monthly_spending: z.string({ required_error: 'Please select spending amount' }),
  old_generation: z.string({ required_error: 'Please select an option' }),
  academic_networking: z.string({ required_error: 'Please describe the impact' }),
});

export const gamingFamily25PlusFemaleSchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().optional(),
  character_preference: z.string({ required_error: 'Please select your preference' }),
  gender_bias: z.string({ required_error: 'Please select an option' }),
  gender_bias_explanation: z.string().optional(),
  primary_reason: z.string({ required_error: 'Please select your primary reason' }),
  game_with_partner: z.string({ required_error: 'Please select frequency' }),
  female_experience: z.string({ required_error: 'Please select impact' }),
  family_balance: z.string({ required_error: 'Please select how well you balance' }),
  perspective_change: z.string().optional(),
  gender_interactions: z.string({ required_error: 'Please select frequency' }),
  representation: z.string({ required_error: 'Please select level of representation' }),
  gaming_networking: z.string({ required_error: 'Please select an option' }),
  community_support: z.string({ required_error: 'Please select level of support' }),
  stereotype_navigation: z.string({ required_error: 'Please select your approach' }),
});

export const gamingFamilySchema = z.object({
  family_perception: z.string({ required_error: 'Please select perception' }),
  family_gamers: z.boolean(),
  gaming_impact: z.string().min(10, { message: 'Please describe the impact' }),
  character_preference: z.string().optional(),
  gender_bias: z.string().optional(),
});

export const futureGamingSchema = z.object({
  future_gaming: z.array(z.string()).min(1, "Please select at least one option"),
  sustainability: z.string().min(1, "Please select an option"),
  referred: z.string().optional(),
  referrer_name: z.string().optional(),
  additional_feedback: z.string().optional(),
  favorite_product: z.string().optional(),
}); 
