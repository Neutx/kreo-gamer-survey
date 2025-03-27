'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useSurvey } from '@/context/SurveyContext';
import { gamingPreferencesSchema } from '@/lib/survey-validation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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

const platforms = [
  { id: 'pc', label: 'PC Gaming 🖥️' },
  { id: 'playstation', label: 'PlayStation 🎮' },
  { id: 'xbox', label: 'Xbox 🎮' },
  { id: 'nintendo', label: 'Nintendo Switch 🎮' },
  { id: 'mobile', label: 'Mobile Gaming 📱' },
  { id: 'laptop', label: 'Laptop 💻' },
  { id: 'other', label: 'Anything else? 👀' },
];

const genres = [
  { id: 'action', label: 'Action' },
  { id: 'rpg', label: 'RPG' },
  { id: 'fps', label: 'FPS' },
  { id: 'moba', label: 'MOBA' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'sports', label: 'Sports' },
  { id: 'racing', label: 'Racing' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'puzzle', label: 'Puzzle' },
];

const spendingOptions = [
  { value: 'none', label: 'No spending' },
  { value: 'under_1000', label: 'Under ₹1,000' },
  { value: '1000_5000', label: '₹1,000 - ₹5,000' },
  { value: 'above_5000', label: 'Above ₹5,000' },
];



const popularGames2 = [
 {id:'bgmi',label:'BGMI'},
{id:'call_of_duty_mobile',label:'Call of Duty: Mobile'},
{id:'free_fire',label:'Free Fire'},
{id:'apex_legends_mobile',label:'Apex Legends Mobile'},
{id:'genshin_impact',label:'Genshin Impact'},
{id:'pubg_new_state',label:'PUBG: New State'},
{id:'pokemon_unite',label:'Pokemon Unite'},
{id:'clash_of_clans',label:'Clash of Clans'},
{id:'clash_royale',label:'Clash Royale'},
{id:'brawl_stars',label:'Brawl Stars'},
{id:'among_us',label:'Among Us'},
{id:'ludo_king',label:'Ludo King'},
{id:'asphalt_9',label:'Asphalt 9'},
{id:'fifa_mobile',label:'FIFA Mobile'},
{id:'subway_surfers',label:'Subway Surfers'},
{id:'candy_crush_saga',label:'Candy Crush Saga'},
{id:'hill_climb_racing',label:'Hill Climb Racing'},
{id:'roblox',label:'Roblox'},
{id:'minecraft',label:'Minecraft'},
{id:'mobile_legends_bang_bang',label:'Mobile Legends: Bang Bang'},
{id:'garena_speed_drifters',label:'Garena Speed Drifters'},
{id:'valorant',label:'Valorant'},
{id:'marvel_snap',label:'Marvel Snap'},
{id:'ninja_arashi_2',label:'Ninja Arashi 2'},
{id:'stumble_guys',label:'Stumble Guys'},
{id:'gods_of_boom',label:'Gods of Boom'},
{id:'world_cricket_championship_3',label:'World Cricket Championship 3'},
{id:'dead_cells',label:'Dead Cells'},
{id:'shadow_fight_4',label:'Shadow Fight 4'},
{id:'into_the_dead_2',label:'Into the Dead 2'},
{id:'mini_militia_-_doodle_army_2',label:'Mini Militia - Doodle Army 2'},
{id:'angry_birds_2',label:'Angry Birds 2'},
{id:'altos_adventure',label:'Alto\'s Adventure'},
{id:'altos_odyssey',label:'Alto\'s Odyssey'},
{id:'badland',label:'Badland'},
{id:'monument_valley',label:'Monument Valley'},
{id:'shadowgun_legends',label:'Shadowgun Legends'},
{id:'dream_league_soccer',label:'Dream League Soccer'},
{id:'efootball_2024',label:'eFootball 2024'},
{id:'the_battle_cats',label:'The Battle Cats'},
{id:'war_robots',label:'War Robots'},
{id:'cyber_hunter',label:'Cyber Hunter'},
{id:'t3_arena',label:'T3 Arena'},
{id:'archero',label:'Archero'},
{id:'sky_children_of_the_light',label:'Sky: Children of the Light'},
{id:'pascals_wager',label:'Pascal\'s Wager'},
{id:'dead_trigger_2',label:'Dead Trigger 2'},
{id:'vainglory',label:'Vainglory'},
{id:'lifeafter',label:'LifeAfter'},
{id:'dont_starve_pocket_edition',label:'Don\'t Starve: Pocket Edition'},
{id:'counter-strike_2_(cs2)',label:'Counter-Strike 2 (CS2)'},
{id:'dota_2',label:'Dota 2'},
{id:'league_of_legends',label:'League of Legends'},
{id:'apex_legends',label:'Apex Legends'},
{id:'pubg_pc',label:'PUBG PC'},
{id:'call_of_duty_warzone',label:'Call of Duty: Warzone'},
{id:'rocket_league',label:'Rocket League'},
{id:'rainbow_six_siege',label:'Rainbow Six Siege'},
{id:'elden_ring',label:'Elden Ring'},
{id:'gta_v',label:'GTA V'},
{id:'the_witcher_3_wild_hunt',label:'The Witcher 3: Wild Hunt'},
{id:'red_dead_redemption_2',label:'Red Dead Redemption 2'},
{id:'cyberpunk_2077',label:'Cyberpunk 2077'},
{id:'god_of_war',label:'God of War'},
{id:'resident_evil_village',label:'Resident Evil Village'},
{id:'hollow_knight',label:'Hollow Knight'},
{id:'celeste',label:'Celeste'},
{id:'doom_eternal',label:'Doom Eternal'},
{id:'monster_hunter_world',label:'Monster Hunter: World'},
{id:'no_mans_sky',label:'No Man\'s Sky'},
{id:'hitman_3',label:'Hitman 3'},
{id:'metro_exodus',label:'Metro Exodus'},
{id:'far_cry_6',label:'Far Cry 6'},
{id:'forza_horizon_5',label:'Forza Horizon 5'},
{id:'football_manager_2024',label:'Football Manager 2024'},
{id:'left_4_dead_2',label:'Left 4 Dead 2'},
{id:'team_fortress_2',label:'Team Fortress 2'},
{id:'terraria',label:'Terraria'},
{id:'stardew_valley',label:'Stardew Valley'},
{id:'hades',label:'Hades'},
{id:'phasmophobia',label:'Phasmophobia'},
{id:'the_forest',label:'The Forest'},
{id:'sons_of_the_forest',label:'Sons of the Forest'},
{id:'rimworld',label:'RimWorld'},
{id:'escape_from_tarkov',label:'Escape from Tarkov'},
{id:'slay_the_spire',label:'Slay the Spire'},
{id:'dead_by_daylight',label:'Dead by Daylight'},
{id:'project_zomboid',label:'Project Zomboid'},
{id:'warframe',label:'Warframe'},
{id:'destiny_2',label:'Destiny 2'},
{id:'path_of_exile',label:'Path of Exile'},
{id:'the_sims_4',label:'The Sims 4'},
{id:'age_of_empires_iv',label:'Age of Empires IV'},
{id:'cities_skylines',label:'Cities: Skylines'},
{id:'crysis_remastered',label:'Crysis Remastered'},
{id:'half-life_alyx',label:'Half-Life: Alyx'},
{id:'god_of_war_ragnarok',label:'God of War Ragnarok'},
{id:'marvels_spider_man_2',label:'Marvel\'s Spider-Man 2'},
{id:'horizon_forbidden_west',label:'Horizon Forbidden West'},
{id:'gran_turismo_7',label:'Gran Turismo 7'},
{id:'the_last_of_us_part_ii',label:'The Last of Us Part II'},
{id:'ghost_of_tsushima',label:'Ghost of Tsushima'},
{id:'final_fantasy_vii_remake',label:'Final Fantasy VII Remake'},
{id:'bloodborne',label:'Bloodborne'},
{id:'uncharted_4_a_thiefs_end',label:'Uncharted 4: A Thief\'s End'},
{id:'resident_evil_4_remake',label:'Resident Evil 4 Remake'},
{id:'ratchet_&_clank_rift_apart',label:'Ratchet & Clank: Rift Apart'},
{id:'demons_souls_remake',label:'Demon\'s Souls Remake'},
{id:'assassins_creed_mirage',label:'Assassin\'s Creed Mirage'},
{id:'mortal_kombat_1',label:'Mortal Kombat 1'},
{id:'street_fighter_6',label:'Street Fighter 6'},
{id:'tekken_7',label:'Tekken 7'},
{id:'hogwarts_legacy',label:'Hogwarts Legacy'},
{id:'star_wars_jedi_survivor',label:'Star Wars Jedi: Survivor'},
{id:'nioh_2',label:'Nioh 2'},
{id:'yakuza_like_a_dragon',label:'Yakuza: Like a Dragon'},
{id:'tales_of_arise',label:'Tales of Arise'},
{id:'death_stranding',label:'Death Stranding'},
{id:'the_quarry',label:'The Quarry'},
{id:'until_dawn',label:'Until Dawn'},
{id:'control_ultimate_edition',label:'Control Ultimate Edition'},
{id:'outriders',label:'Outriders'},
{id:'diablo_iv',label:'Diablo IV'},
{id:'it_takes_two',label:'It Takes Two'},
{id:'cuphead',label:'Cuphead'},
{id:'journey',label:'Journey'},
{id:'overcooked_2',label:'Overcooked 2'},
{id:'little_nightmares_ii',label:'Little Nightmares II'},
{id:'the_evil_within_2',label:'The Evil Within 2'},
{id:'dragon_ball_z_kakarot',label:'Dragon Ball Z: Kakarot'},
{id:'persona_5_royal',label:'Persona 5 Royal'},
{id:'the_elder_scrolls_v_skyrim',label:'The Elder Scrolls V: Skyrim'},
{id:'fallout_4',label:'Fallout 4'},
{id:'nba_2k24',label:'NBA 2K24'},
{id:'mlb_the_show_24',label:'MLB The Show 24'},
{id:'crash_bandicoot_4',label:'Crash Bandicoot 4'},
{id:'spyro_reignited_trilogy',label:'Spyro Reignited Trilogy'},
{id:'halo_infinite',label:'Halo Infinite'},
{id:'gears_5',label:'Gears 5'},
{id:'starfield',label:'Starfield'},
{id:'halo_the_master_chief_collection',label:'Halo: The Master Chief Collection'},
{id:'microsoft_flight_simulator',label:'Microsoft Flight Simulator'},
{id:'sea_of_thieves',label:'Sea of Thieves'},
{id:'fable',label:'Fable'},
{id:'hellblade_senuas_saga',label:'Hellblade: Senua\'s Saga'},
{id:'grounded',label:'Grounded'},
{id:'psychonauts_2',label:'Psychonauts 2'},
{id:'state_of_decay_2',label:'State of Decay 2'},
{id:'the_division_2',label:'The Division 2'},
{id:'hitman_trilogy',label:'Hitman Trilogy'},
{id:'mass_effect_legendary_edition',label:'Mass Effect Legendary Edition'},
{id:'outer_wilds',label:'Outer Wilds'},
{id:'ori_and_the_will_of_the_wisps',label:'Ori and the Will of the Wisps'},
{id:'hell_let_loose',label:'Hell Let Loose'},
{id:'the_ascent',label:'The Ascent'},
{id:'war_thunder',label:'War Thunder'},
{id:'the_medium',label:'The Medium'},
{id:'factorio',label:'Factorio'},
{id:'subnautica',label:'Subnautica'},
{id:'baldurs_gate_3',label:'Baldur\'s Gate 3'},
{id:'the_elder_scrolls_online',label:'The Elder Scrolls Online'},
{id:'world_of_warcraft',label:'World of Warcraft'},
{id:'rust',label:'Rust'},
{id:'kerbal_space_program',label:'Kerbal Space Program'},
{id:'black_mesa',label:'Black Mesa'},
{id:'darkest_dungeon',label:'Darkest Dungeon'},
{id:'star_citizen',label:'Star Citizen'},
{id:'planetside_2',label:'Planetside 2'},
{id:'deep_rock_galactic',label:'Deep Rock Galactic'},
{id:'granblue_fantasy_relink',label:'Granblue Fantasy: Relink'},
{id:'overwatch_2',label:'Overwatch 2'},
{id:'battlefield_2042',label:'Battlefield 2042'},
{id:'the_outer_worlds',label:'The Outer Worlds'},
{id:'lies_of_p',label:'Lies of P'},
{id:'lego_star_wars_the_skywalker_saga',label:'LEGO Star Wars: The Skywalker Saga'},
{id:'flight_control_simulator',label:'Flight Control Simulator'},
{id:'the_walking_dead_the_final_season',label:'The Walking Dead: The Final Season'},
{id:'the_wolf_among_us',label:'The Wolf Among Us'},
{id:'titanfall_2',label:'Titanfall 2'},
{id:'xcom_2',label:'XCOM 2'},
{id:'wasteland_3',label:'Wasteland 3'},
{id:'hollow_knight_silksong_(upcoming)',label:'Hollow Knight: Silksong (upcoming)'},
{id:'prince_of_persia_the_lost_crown',label:'Prince of Persia: The Lost Crown'},
{id:'alan_wake_ii',label:'Alan Wake II'},
{id:'super_smash_bros._ultimate',label:'Super Smash Bros. Ultimate'},
{id:'arms',label:'Arms'},
{id:'bayonetta_3',label:'Bayonetta 3'},
{id:'splatoon_3',label:'Splatoon 3'},
{id:'fire_emblem_engage',label:'Fire Emblem Engage'},
{id:'xenoblade_chronicles_3',label:'Xenoblade Chronicles 3'},
{id:'metroid_dread',label:'Metroid Dread'},
{id:'luigis_mansion_3',label:'Luigi\'s Mansion 3'},
{id:'paper_mario_the_origami_king',label:'Paper Mario: The Origami King'},
{id:'pikmin_4',label:'Pikmin 4'},
{id:'triangle_strategy',label:'Triangle Strategy'},
{id:'octopath_traveler_ii',label:'Octopath Traveler II'},
{id:'tunic',label:'Tunic'},
{id:'psychonauts',label:'Psychonauts'},
{id:'the_talos_principle_2',label:'The Talos Principle 2'},
{id:'the_legend_of_zelda_breath_of_the_wild',label:'The Legend of Zelda: Breath of the Wild'},
{id:'the_legend_of_zelda_tears_of_the_kingdom',label:'The Legend of Zelda: Tears of the Kingdom'},
{id:'saints_row_(2022)',label:'Saints Row (2022)'},
{id:'watch_dogs_2',label:'Watch Dogs 2'},
{id:'just_cause_4',label:'Just Cause 4'},
{id:'borderlands_3',label:'Borderlands 3'},
{id:'shadow_of_the_tomb_raider',label:'Shadow of the Tomb Raider'},
{id:'dead_space_remake',label:'Dead Space Remake'},
{id:'evil_west',label:'Evil West'},
{id:'vampyr',label:'Vampyr'},
{id:'metro_last_light_redux',label:'Metro Last Light Redux'},
{id:'south_park_the_stick_of_truth',label:'South Park: The Stick of Truth'},
{id:'dying_light_2',label:'Dying Light 2'},
{id:'assassins_creed_valhalla',label:'Assassin\'s Creed Valhalla'},
{id:'ghostrunner',label:'Ghostrunner'},
{id:'immortals_fenyx_rising',label:'Immortals Fenyx Rising'},
{id:'bioshock_infinite',label:'Bioshock Infinite'},
{id:'dragon_quest_xi',label:'Dragon Quest XI'},
{id:'kingdom_hearts_iii',label:'Kingdom Hearts III'},
{id:'shenmue_iii',label:'Shenmue III'},
{id:'dead_rising_4',label:'Dead Rising 4'},
{id:'saints_row_iv',label:'Saints Row IV'},
{id:'portal_2',label:'Portal 2'},
{id:'spec_ops_the_line',label:'Spec Ops: The Line'},
{id:'sleeping_dogs',label:'Sleeping Dogs'},
{id:'the_saboteur',label:'The Saboteur'},
{id:'sniper_elite_5',label:'Sniper Elite 5'},
{id:'alien_isolation',label:'Alien: Isolation'},
{id:'control',label:'Control'},
{id:'the_callisto_protocol',label:'The Callisto Protocol'},
{id:'amnesia_rebirth',label:'Amnesia: Rebirth'},
{id:'little_big_planet_3',label:'Little Big Planet 3'},
{id:'nier_automata',label:'Nier: Automata'},
{id:'f1_2023',label:'F1 2023'},
{id:'assetto_corsa_competizione',label:'Assetto Corsa Competizione'},
{id:'grid_legends',label:'GRID Legends'},
{id:'monster_hunter_rise',label:'Monster Hunter Rise'},
{id:'naraka_bladepoint',label:'Naraka: Bladepoint'},
{id:'the_crew_2',label:'The Crew 2'},
{id:'thief',label:'Thief'},
{id:'dishonored_2',label:'Dishonored 2'},
{id:'fallout_new_vegas',label:'Fallout: New Vegas'},
{id:'prey',label:'Prey'},
{id:'star_wars_battlefront_ii',label:'Star Wars: Battlefront II'},
{id:'dark_souls_iii',label:'Dark Souls III'},
{id:'eldest_souls',label:'Eldest Souls'},
{id:'bloodstained_ritual_of_the_night',label:'Bloodstained: Ritual of the Night'},
{id:'dredge',label:'Dredge'},
{id:'blasphemous',label:'Blasphemous'},
{id:'my_friend_pedro',label:'My Friend Pedro'},
{id:'katana_zero',label:'Katana ZERO'},
{id:'returnal',label:'Returnal'},
{id:'outer_wilds',label:'Outer Wilds'},
{id:'gunfire_reborn',label:'Gunfire Reborn'},
{id:'hyper_light_drifter',label:'Hyper Light Drifter'},
{id:'crossfire_x',label:'Crossfire X'},
{id:'remnant_2',label:'Remnant 2'},
{id:'high_on_life',label:'High on Life'},
{id:'sonic_frontiers',label:'Sonic Frontiers'},
{id:'stray',label:'Stray'},
{id:'road_96',label:'Road 96'},
{id:'bug_fables',label:'Bug Fables'},
{id:'disco_elysium',label:'Disco Elysium'},
{id:'neon_white',label:'Neon White'},
{id:'tunic',label:'Tunic'},
{id:'evil_genius_2',label:'Evil Genius 2'},
{id:'nier_replicant',label:'Nier Replicant'},
{id:'the_long_dark',label:'The Long Dark'},
{id:'spelunky_2',label:'Spelunky 2'},
{id:'pyre',label:'Pyre'},
{id:'greedfall',label:'Greedfall'},
{id:'fifa',label:'FIFA'},
];

const deviceOptions = [
  { id: 'gaming_pc', label: 'Gaming PC' },
  { id: 'laptop', label: 'Gaming Laptop' },
  { id: 'console', label: 'Console' },
  { id: 'smartphone', label: 'Smartphone' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'handheld_console', label: 'Handheld Console' },
];

const peripheralOptions = [
  { id: 'gaming_mouse', label: 'Gaming Mouse' },
  { id: 'mechanical_keyboard', label: 'Mechanical Keyboard' },
  { id: 'gaming_headset', label: 'Gaming Headset' },
  { id: 'controller', label: 'Controller' },
  { id: 'gaming_chair', label: 'Gaming Chair' },
  { id: 'vr_headset', label: 'VR Headset' },
  { id: 'gaming_monitor', label: 'Gaming Monitor' },
  { id: 'streaming_equipment', label: 'Streaming Equipment' },
];

const internetSpeedOptions = [
  { value: 'below_50mbps', label: 'Below 50 Mbps' },
  { value: '50_100mbps', label: '50-100 Mbps' },
  { value: '100_300mbps', label: '100-300 Mbps' },
  { value: 'above_300mbps', label: 'Above 300 Mbps' },
  { value: 'unsure', label: 'Not sure' },
];

const developerOptions = [
  { id: 'riot', label: 'Riot Games' },
  { id: 'valve', label: 'Valve' },
  { id: 'blizzard', label: 'Blizzard' },
  { id: 'ea', label: 'Electronic Arts' },
  { id: 'ubisoft', label: 'Ubisoft' },
  { id: 'rockstar', label: 'Rockstar Games' },
  { id: 'nintendo', label: 'Nintendo' },
  { id: 'epic', label: 'Epic Games' },
  { id: 'activision', label: 'Activision' },
  { id: 'cdpr', label: 'CD Projekt Red' },
];

const paymentMethodOptions = [
  { id: 'credit_card', label: 'Credit Card' },
  { id: 'debit_card', label: 'Debit Card' },
  { id: 'upi', label: 'UPI' },
  { id: 'netbanking', label: 'Net Banking' },
  { id: 'wallet', label: 'Digital Wallet' },
  { id: 'gift_cards', label: 'Gift Cards' },
  { id: 'cod', label: 'Cash on Delivery' },
];

export default function GamingPreferences() {
  const { updateResponses, goToNextSection, goToPreviousSection, responses } = useSurvey();
  
  const savedData = (responses.gaming_preferences || {}) as {
    platforms?: string[];
    favorite_games?: string[];
    preferred_genre?: string[];
    spending_monthly?: string;
    gaming_setup?: string;
    device_ownership?: string[];
    gaming_peripherals?: string[];
    internet_speed?: string;
    favorite_developers?: string[];
    payment_methods?: string[];
  };

  const form = useForm<z.infer<typeof gamingPreferencesSchema>>({
    resolver: zodResolver(gamingPreferencesSchema),
    defaultValues: {
      platforms: savedData.platforms || [],
      favorite_games: savedData.favorite_games || [],
      preferred_genre: savedData.preferred_genre || [],
      spending_monthly: savedData.spending_monthly || '',
      gaming_setup: savedData.gaming_setup || '',
      device_ownership: savedData.device_ownership || [],
      gaming_peripherals: savedData.gaming_peripherals || [],
      internet_speed: savedData.internet_speed || '',
      favorite_developers: savedData.favorite_developers || [],
      payment_methods: savedData.payment_methods || [],
    },
  });

  function onSubmit(values: z.infer<typeof gamingPreferencesSchema>) {
    console.log('Form submitted with values:', values);
    updateResponses('gaming_preferences', values);
    goToNextSection();
  }

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
            Level 2
          </h2>
          <p className="text-muted-foreground mt-2">
            Tell us about your gaming setup and preferences
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="platforms"
              render={() => (
                <FormItem>
                  <FormLabel>Which platform(s) do you play on? (Select all that apply)</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {platforms.map((platform) => (
                      <FormField
                        key={platform.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(platform.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, platform.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== platform.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {platform.label}
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

{/*             <FormField
              control={form.control}
              name="device_ownership"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Devices Owned</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {deviceOptions.map((device) => (
                      <FormField
                        key={device.id}
                        control={form.control}
                        name="device_ownership"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(device.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, device.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== device.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {device.label}
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
 */}
{/*             <FormField
              control={form.control}
              name="gaming_peripherals"
              render={() => (
                <FormItem>
                  <FormLabel>Gaming Peripherals You Own</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {peripheralOptions.map((peripheral) => (
                      <FormField
                        key={peripheral.id}
                        control={form.control}
                        name="gaming_peripherals"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(peripheral.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, peripheral.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== peripheral.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {peripheral.label}
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

            <FormField
              control={form.control}
              name="favorite_games"
              render={() => (
                <FormItem>
                  <FormLabel>What are your Favorite Games?</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {popularGames2.map((game) => (
                      <FormField
                        key={game.id}
                        control={form.control}
                        name="favorite_games"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(game.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, game.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== game.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {game.label}
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
              name="nextGame"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next game you are excited about?</FormLabel>
                  <FormControl>
                    <Input placeholder="!!!!" {...field} className="bg-background/50" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
{/*             <FormField
              control={form.control}
              name="favorite_developers"
              render={() => (
                <FormItem>
                  <FormLabel>Favorite Game Developers</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {developerOptions.map((developer) => (
                      <FormField
                        key={developer.id}
                        control={form.control}
                        name="favorite_developers"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(developer.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, developer.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== developer.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {developer.label}
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

{/*             <FormField
              control={form.control}
              name="preferred_genre"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Genres</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {genres.map((genre) => (
                      <FormField
                        key={genre.id}
                        control={form.control}
                        name="preferred_genre"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(genre.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, genre.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== genre.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {genre.label}
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

{/*             <FormField
              control={form.control}
              name="internet_speed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Internet Speed</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your internet speed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {internetSpeedOptions.map((option) => (
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
 */}
            <FormField
              control={form.control}
              name="spending_monthly"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Gaming Spending</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select your monthly spending" />
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
              name="payment_methods"
              render={() => (
                <FormItem>
                  <FormLabel>Preferred Payment Methods for Gaming</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {paymentMethodOptions.map((method) => (
                      <FormField
                        key={method.id}
                        control={form.control}
                        name="payment_methods"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  if (checked) {
                                    field.onChange([...value, method.id]);
                                  } else {
                                    field.onChange(value.filter((val) => val !== method.id));
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
              name="gaming_setup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe Your Gaming Setup</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your gaming setup, including hardware, peripherals, and environment..."
                      className="bg-background/50 min-h-[100px]"
                      {...field}
                    />
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
