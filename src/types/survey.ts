import { Timestamp } from 'firebase/firestore';

export type SurveySection = 
  | 'demographics'
  | 'demographics_under18'
  | 'demographics_18to24'
  | 'demographics_25plus'
  | 'gaming_preferences'
  | 'gaming_habits'
  | 'gaming_lifestyle'
  | 'gaming_family_under18_male'
  | 'gaming_family_under18_female'
  | 'gaming_family_18to24_male'
  | 'gaming_family_18to24_female'
  | 'gaming_family_25plus_male'
  | 'gaming_family_25plus_female'
  | 'future_gaming';

export interface DemographicsBase {
  ign: string;
  email: string;
  age: string;
  gender: string;
  location: string;
}

export interface DemographicsUnder18 {
  grade: string;
  igfr: string;
}

export interface Demographics18to24 {
  occupation: string;
  igfr?: string;
}

export interface Demographics25Plus {
  occupation: string;
  marital_status: string;
  igfr?: string;
}

export interface UserInfo {
  session_id?: string;
  start_time?: Timestamp;
  last_updated?: Timestamp;
  completion_status?: 'in_progress' | 'completed';
  completion_percentage?: number;
  current_section?: SurveySection;
  ip_address?: string;
  device_fingerprint?: string;
  completion_time?: Timestamp;
}

export interface SurveyData {
  user_info?: UserInfo;
  demographics: DemographicsBase;
  demographics_under18?: DemographicsUnder18;
  demographics_18to24?: Demographics18to24;
  demographics_25plus?: Demographics25Plus;
  gaming_preferences: {
    platforms: string[];
    favorite_game_1?: string;
    favorite_game_2?: string;
    favorite_game_3?: string;
    next_game?: string;
    gaming_spends?: string;
    gaming_peripherals: string[];
    gear_upgrade?: string;
    gear_features?: {
      performance?: number;
      aesthetics?: number;
      durability?: number;
      price?: number;
      brand?: number;
    };
    purchase_platforms: string[];
    kreo_familiarity?: string;
    spending_monthly: string;
  };
  gaming_habits: {
    gaming_start: string;
    gaming_frequency: string;
    game_type: string;
    game_buy: string[];
    mod_controller: string;
  };
  gaming_lifestyle: {
    interest?: string[] | string;
    other_interests?: string;
    customised_peripherals: string;
    gaming_food?: string;
    gaming_drink?: string;
    watch_content: string;
    fav_creator?: string;
    esp_participation: string;
    is_content_c: string;
    content_platforms: string[];
    in_game_spends: string;
    merch_spends: string;
    collectibles: string;
  };
  gaming_family_under18_male?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    parent_gaming_rules?: string;
    parents_play_games?: string;
    gaming_with_siblings?: string;
    homework_compromise?: string;
    friends_parents_rules?: string;
    gaming_arguments?: string;
  };
  gaming_family_under18_female?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    parents_supportive?: string;
  };
  gaming_family_18to24_male?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    old_generation?: string;
    academic_networking?: string;
  };
  gaming_family_18to24_female?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    peers_reaction?: string;
    women_communities?: string;
    dating_supportive?: string;
    gender_interactions?: string;
    hide_gender?: string;
    academic_networking?: string;
    feel_represented?: string;
  };
  gaming_family_25plus_male?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    game_with_partner?: string;
    time_management?: string;
    parenting_approach?: string;
    pattern_changes?: string;
    work_perception?: string;
    stress_relief?: string;
    use_for_networking?: string;
    monthly_spending?: string;
    old_generation?: string;
    academic_networking?: string;
  };
  gaming_family_25plus_female?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    gender_bias_explanation?: string;
    primary_reason?: string;
    game_with_partner?: string;
    female_experience?: string;
    family_balance?: string;
    perspective_change?: string;
    gender_interactions?: string;
    representation?: string;
    gaming_networking?: string;
    community_support?: string;
    stereotype_navigation?: string;
  };
  future_gaming: {
    future_gaming: string[];
    sustainability: string;
    referred?: string;
    referrer_name?: string;
    additional_feedback?: string;
    favorite_product?: string;
  };
} 