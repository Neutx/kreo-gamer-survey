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
  parent_control: string;
}

export interface Demographics18to24 {
  occupation: string;
}

export interface Demographics25Plus {
  occupation: string;
  marital_status: string;
}

export interface SurveyData {
  demographics: DemographicsBase;
  demographics_under18?: DemographicsUnder18;
  demographics_18to24?: Demographics18to24;
  demographics_25plus?: Demographics25Plus;
  gaming_preferences: {
    platforms: string[];
    favorite_games: string[];
    preferred_genre: string[];
    spending_monthly: string;
    gaming_setup: string;
    device_ownership: string[];
    gaming_peripherals: string[];
    internet_speed: string;
    favorite_developers: string[];
    payment_methods: string[];
  };
  gaming_habits: {
    hours_weekly: string;
    play_time: string[];
    multiplayer_preference: string;
    skill_level: string;
    years_gaming: string;
  };
  gaming_lifestyle: {
    customised_peripherals: string;
    watch_content: string;
    content_platforms: string[];
    esp_participation: string;
    is_content_c: string;
    in_game_spends: string;
    merch_spends: string;
    collectibles: string;
    platform_handles?: string[];
    platform_names?: string[];
    peripherals_customized?: string[];
    merchandise_spending?: string[];
    collectibles_owned?: string[];
    esports_participation?: string[];
    game_spending?: string[];
    streaming_platforms?: string[];
    gaming_food?: string;
    gaming_drink?: string;
    fav_creator?: string;
    interest?: string;
    other_interests?: string;
  };
  gaming_family_under18_male?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
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
    parents_supportive?: string;
    different_rules?: string;
    play_with_family?: string;
    hidden_gaming?: string;
    female_friends_play?: string;
    gender_comments?: string;
    family_encouragement?: string;
  };
  gaming_family_18to24_male?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
    primary_reason?: string;
    social_relationships?: string;
    game_with_roommates?: string;
    balance_gaming?: string;
    influence_friends?: string;
    college_events?: string;
    replace_social?: string;
    gaming_career?: string;
    old_generation?: string;
    academic_networking?: string;
  };
  gaming_family_18to24_female?: {
    family_perception: string;
    family_gamers: boolean;
    gaming_impact: string;
    character_preference?: string;
    gender_bias?: string;
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
    metaverse_interest: string;
    vr_adoption: string;
    cloud_gaming: string;
    sustainability: string;
  };
} 