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

const referrerOptions = [
  { value: 'Sahil Kushwaha', label: 'Sahil Kushwaha' },
  { value: 'Arnav Kedia', label: 'Arnav Kedia' },
  { value: 'Bhavya Desai', label: 'Bhavya Desai' },
  { value: 'Naitik Chouksey', label: 'Naitik Chouksey' },
  { value: 'Md Adil Parwez', label: 'Md Adil Parwez' },
  { value: 'Yashika Sahdev', label: 'Yashika Sahdev' },
  { value: 'Elizabeth Naser', label: 'Elizabeth Naser' },
  { value: 'Sushant Paul', label: 'Sushant Paul' },
  { value: 'Melanie Fernandes', label: 'Melanie Fernandes' },
  { value: 'Stanley Rodrigues', label: 'Stanley Rodrigues' },
  { value: 'Mudit Sengar', label: 'Mudit Sengar' },
  { value: 'Devit Rattan', label: 'Devit Rattan' },
  { value: 'Shreyash Raut', label: 'Shreyash Raut' },
  { value: 'Subhojit Chakraborty', label: 'Subhojit Chakraborty' },
  { value: 'Shrestha Sharma', label: 'Shrestha Sharma' },
  { value: 'Shivam Upadhyay', label: 'Shivam Upadhyay' },
  { value: 'Maehek Gangwani', label: 'Maehek Gangwani' },
  { value: 'Adidev Verma', label: 'Adidev Verma' },
  { value: 'Aditya Anil', label: 'Aditya Anil' },
  { value: 'Aditya Sharma', label: 'Aditya Sharma' },
  { value: 'Aditya Sinha', label: 'Aditya Sinha' },
  { value: 'Advaith Gujarathi', label: 'Advaith Gujarathi' },
  { value: 'Ali Patel', label: 'Ali Patel' },
  { value: 'Aman Goswami', label: 'Aman Goswami' },
  { value: 'Anurag Das', label: 'Anurag Das' },
  { value: 'Arindam Roy', label: 'Arindam Roy' },
  { value: 'Avika Negi', label: 'Avika Negi' },
  { value: 'Chakshu Tyagi', label: 'Chakshu Tyagi' },
  { value: 'Danica Sachdeva', label: 'Danica Sachdeva' },
  { value: 'Harzith Chendur Raja', label: 'Harzith Chendur Raja' },
  { value: 'Jatin Sharma', label: 'Jatin Sharma' },
  { value: 'Manilal Sonkar', label: 'Manilal Sonkar' },
  { value: 'Mihir Nayak', label: 'Mihir Nayak' },
  { value: 'Prabhav Jain', label: 'Prabhav Jain' },
  { value: 'Pratham Kashyap', label: 'Pratham Kashyap' },
  { value: 'Pratham Pawar', label: 'Pratham Pawar' },
  { value: 'Rohan Divakar', label: 'Rohan Divakar' },
  { value: 'Salil Hiremath', label: 'Salil Hiremath' },
  { value: 'Sarthak Badola', label: 'Sarthak Badola' },
  { value: 'Satvik Khurana', label: 'Satvik Khurana' },
  { value: 'Shivansh Sehgal', label: 'Shivansh Sehgal' },
  { value: 'Vedanta Barman', label: 'Vedanta Barman' },
  { value: 'Vikranth Udandarao', label: 'Vikranth Udandarao' },
  { value: 'Vipul Suthar', label: 'Vipul Suthar' },
  { value: 'Yash Sethi', label: 'Yash Sethi' },
  { value: 'Yashmeet Baid', label: 'Yashmeet Baid' },
  { value: 'Rohan Reddy', label: 'Rohan Reddy' },
  { value: 'Chetanya Khorwal', label: 'Chetanya Khorwal' },
  { value: 'Sarvasv Trivedi', label: 'Sarvasv Trivedi' },
  { value: 'Mayank Aggarwal', label: 'Mayank Aggarwal' },
  { value: 'Sai Sathvik Katam', label: 'Sai Sathvik Katam' },
  { value: 'Anoop K', label: 'Anoop K' },
  { value: 'Krishna Jha', label: 'Krishna Jha' },
  { value: 'Kritish Dhman', label: 'Kritish Dhman' },
  { value: 'Mohammed Ashif Naseer', label: 'Mohammed Ashif Naseer' },
  { value: 'Abhigyan Sahay', label: 'Abhigyan Sahay' },
  { value: 'Kshitij Angurala', label: 'Kshitij Angurala' },
  { value: 'Swayam Vaibhav Bongirwar', label: 'Swayam Vaibhav Bongirwar' },
  { value: 'Harsh Jain', label: 'Harsh Jain' },
  { value: 'Khushveer Malviya', label: 'Khushveer Malviya' },
  { value: 'Prakket Dholekar', label: 'Prakket Dholekar' },
  { value: 'Yogesh Joshi', label: 'Yogesh Joshi' },
  { value: 'Aryan Raj', label: 'Aryan Raj' },
  { value: 'Guneet Chawla', label: 'Guneet Chawla' },
  { value: 'Sumit Singh', label: 'Sumit Singh' },
  { value: 'Hilal Ahmad', label: 'Hilal Ahmad' },
  { value: 'Kartikansh Upadhyay', label: 'Kartikansh Upadhyay' },
  { value: 'Atharv Sanjay Jain', label: 'Atharv Sanjay Jain' },
  { value: 'Anubhav Maitra', label: 'Anubhav Maitra' },
  { value: 'Akshay Chandrakanth', label: 'Akshay Chandrakanth' },
  { value: 'Gaurav Kumar', label: 'Gaurav Kumar' },
  { value: 'Dhrupad Rajpurohit', label: 'Dhrupad Rajpurohit' },
  { value: 'Manish Stalon Dsouza', label: 'Manish Stalon Dsouza' },
  { value: 'Ayush Gautam', label: 'Ayush Gautam' },
  { value: 'Hitansh Gupta', label: 'Hitansh Gupta' },
  { value: 'Utkarsh Gupta', label: 'Utkarsh Gupta' },
  { value: 'Darshpreet Singh', label: 'Darshpreet Singh' },
  { value: 'Mihul Rathore', label: 'Mihul Rathore' },
  { value: 'Amitoj Singh', label: 'Amitoj Singh' },
  { value: 'Ansh Arya', label: 'Ansh Arya' },
  { value: 'Ayaskant Parija', label: 'Ayaskant Parija' },
  { value: 'Debanjan Ghosh', label: 'Debanjan Ghosh' },
  { value: 'Harshit Harsh', label: 'Harshit Harsh' },
  { value: 'Nitesh Kumawat', label: 'Nitesh Kumawat' },
  { value: 'Priyanshu Walia', label: 'Priyanshu Walia' },
  { value: 'Sanket Nijhawan', label: 'Sanket Nijhawan' },
  { value: 'Sathvik Nagesh', label: 'Sathvik Nagesh' },
  { value: 'Soujannya Maiti', label: 'Soujannya Maiti' },
  { value: 'Sowrabh Shetty', label: 'Sowrabh Shetty' },
  { value: 'Suhaib Bilal', label: 'Suhaib Bilal' },
  { value: 'Abhivyakt Bhati', label: 'Abhivyakt Bhati' },
  { value: 'Anunjay Gupta', label: 'Anunjay Gupta' },
  { value: 'Anurag Wankhede', label: 'Anurag Wankhede' },
  { value: 'Mohammed Aamirulla', label: 'Mohammed Aamirulla' },
  { value: 'Pranav R Nair', label: 'Pranav R Nair' },
  { value: 'Rudhradeep Das', label: 'Rudhradeep Das' },
  { value: 'Sujay Patil', label: 'Sujay Patil' },
  { value: 'Vikas Nath Jhq', label: 'Vikas Nath Jhq' },
  { value: 'Vivansh Gandhi', label: 'Vivansh Gandhi' },
  { value: 'Yashika Kad', label: 'Yashika Kad' },
  { value: 'Shreyas Rai', label: 'Shreyas Rai' },
  { value: 'Anshul Barua', label: 'Anshul Barua' },
  { value: 'Agam Jyot Singh', label: 'Agam Jyot Singh' },
  { value: 'Umesh Kataria', label: 'Umesh Kataria' },
  { value: 'Aayush Kumar', label: 'Aayush Kumar' },
  { value: 'Prince Kumar Yadav', label: 'Prince Kumar Yadav' },
  { value: 'Sarash Sahu', label: 'Sarash Sahu' },
  { value: 'Rachit Sarda', label: 'Rachit Sarda' },
  { value: 'Parv Aggarwal', label: 'Parv Aggarwal' },
  { value: 'Pratham R', label: 'Pratham R' },
  { value: 'Preshit Vartak', label: 'Preshit Vartak' },
  { value: 'Chiranjeevi Rishabh Prasad', label: 'Chiranjeevi Rishabh Prasad' },
  { value: 'Parth Bhanushali', label: 'Parth Bhanushali' },
  { value: 'Chinmay Mareguddi', label: 'Chinmay Mareguddi' },
  { value: 'Aarush Gupta', label: 'Aarush Gupta' },
  { value: 'Subham Jain', label: 'Subham Jain' },
  { value: 'Abhishek Mahapatra', label: 'Abhishek Mahapatra' },
  { value: 'Farzan Ahmad', label: 'Farzan Ahmad' },
  { value: 'Pranjal Mishra', label: 'Pranjal Mishra' },
  { value: 'Rishabh Gupta', label: 'Rishabh Gupta' },
  { value: 'Aagam Gandhi', label: 'Aagam Gandhi' },
  { value: 'Faizan Showkat', label: 'Faizan Showkat' },
  { value: 'Harshith Ravikumar', label: 'Harshith Ravikumar' },
  { value: 'Poorav Sharma', label: 'Poorav Sharma' },
  { value: 'Utkarsh Arjariya', label: 'Utkarsh Arjariya' },
  { value: 'Shourya Rawat', label: 'Shourya Rawat' },
  { value: 'Ojasvi Rana', label: 'Ojasvi Rana' },
  { value: 'Ayaan Sharma', label: 'Ayaan Sharma' },
  { value: 'Dhruv Aggarwal', label: 'Dhruv Aggarwal' },
  { value: 'A Abhinav', label: 'A Abhinav' },
  { value: 'Abel J Kolapran', label: 'Abel J Kolapran' },
  { value: 'Abhinav Malik', label: 'Abhinav Malik' },
  { value: 'Abhinav Verma', label: 'Abhinav Verma' },
  { value: 'Aditey Mehra', label: 'Aditey Mehra' },
  { value: 'Aditya Behera', label: 'Aditya Behera' },
  { value: 'Aditya Naulakha', label: 'Aditya Naulakha' },
  { value: 'Akshaya Shubh Agarwal', label: 'Akshaya Shubh Agarwal' },
  { value: 'Arham Aqeel', label: 'Arham Aqeel' },
  { value: 'G.L.Karthikeya Reddy', label: 'G.L.Karthikeya Reddy' },
  { value: 'Himnish Shah', label: 'Himnish Shah' },
  { value: 'Jainam Vikram Mehta', label: 'Jainam Vikram Mehta' },
  { value: 'Kaivalya Vats', label: 'Kaivalya Vats' },
  { value: 'Kushagra Agrawal', label: 'Kushagra Agrawal' },
  { value: 'Manik Zutshi', label: 'Manik Zutshi' },
  { value: 'Nagmani Parbat', label: 'Nagmani Parbat' },
  { value: 'Nishant Sharma', label: 'Nishant Sharma' },
  { value: 'Parth Arora', label: 'Parth Arora' },
  { value: 'Ronit Singh', label: 'Ronit Singh' },
  { value: 'Rudra Sandeep Joshi', label: 'Rudra Sandeep Joshi' },
  { value: 'Sahil Bhomia', label: 'Sahil Bhomia' },
  { value: 'Sambhav Thakur', label: 'Sambhav Thakur' },
  { value: 'Sarthak Vishnu Jadhav', label: 'Sarthak Vishnu Jadhav' },
  { value: 'Sarthak Wage', label: 'Sarthak Wage' },
  { value: 'Shourya Jain', label: 'Shourya Jain' },
  { value: 'Soumya Ranjan Panda', label: 'Soumya Ranjan Panda' },
  { value: 'Swetank Pritamm', label: 'Swetank Pritamm' },
  { value: 'Vaishnavi Mishra', label: 'Vaishnavi Mishra' },
  { value: 'Vansh Agarwal', label: 'Vansh Agarwal' },
  { value: 'Yaseen Dhakam', label: 'Yaseen Dhakam' },
  { value: 'Aayushman Sehdev', label: 'Aayushman Sehdev' },
  { value: 'Abdul Hadi', label: 'Abdul Hadi' },
  { value: 'Abhishek Kumar', label: 'Abhishek Kumar' },
  { value: 'Ansh Bhardwaj', label: 'Ansh Bhardwaj' },
  { value: 'Anshul Pratap Lakra', label: 'Anshul Pratap Lakra' },
  { value: 'Ayan Khan', label: 'Ayan Khan' },
  { value: 'Ayush Prabhakar', label: 'Ayush Prabhakar' },
  { value: 'Dhyan Gowda', label: 'Dhyan Gowda' },
  { value: 'Parashar Jayant', label: 'Parashar Jayant' },
  { value: 'Gemini Sharma', label: 'Gemini Sharma' },
  { value: 'Harshvardhan Gupta', label: 'Harshvardhan Gupta' },
  { value: 'Jacob Daniel', label: 'Jacob Daniel' },
  { value: 'Kabeer Kapdi', label: 'Kabeer Kapdi' },
  { value: 'Krish Agarwal', label: 'Krish Agarwal' },
  { value: 'Krish Mahajan', label: 'Krish Mahajan' },
  { value: 'Maulik Rawat', label: 'Maulik Rawat' },
  { value: 'Mehul Thapar', label: 'Mehul Thapar' },
  { value: 'Mohammad Zeyan Sayeed', label: 'Mohammad Zeyan Sayeed' },
  { value: 'Naitik Singhal', label: 'Naitik Singhal' },
  { value: 'Nehal Bhole', label: 'Nehal Bhole' },
  { value: 'Prajwal L K Urs', label: 'Prajwal L K Urs' },
  { value: 'Pratik Sanjay Tayadepatil', label: 'Pratik Sanjay Tayadepatil' },
  { value: 'Rohan Sirsewad', label: 'Rohan Sirsewad' },
  { value: 'Rohit Gele', label: 'Rohit Gele' },
  { value: 'Shrishail Mahanteshwar Patil', label: 'Shrishail Mahanteshwar Patil' },
  { value: 'Sobhit Singh', label: 'Sobhit Singh' },
  { value: 'Suryaansh Guleria', label: 'Suryaansh Guleria' },
  { value: 'Swayam Kothari', label: 'Swayam Kothari' },
  { value: 'Tanishk Rana', label: 'Tanishk Rana' },
  { value: 'Tejas Singh Nagpal', label: 'Tejas Singh Nagpal' },
  { value: 'Utkarsh Anand', label: 'Utkarsh Anand' },
  { value: 'Vishal Bharti', label: 'Vishal Bharti' },
  { value: 'Aaditya Chugh', label: 'Aaditya Chugh' },
  { value: 'Aditya Raj', label: 'Aditya Raj' },
  { value: 'Amit Kumar Mahto', label: 'Amit Kumar Mahto' },
  { value: 'Ankur Singh', label: 'Ankur Singh' },
  { value: 'Anusha Singhal', label: 'Anusha Singhal' },
  { value: 'Arya Parag Vithalani', label: 'Arya Parag Vithalani' },
  { value: 'Aryan Bhargava', label: 'Aryan Bhargava' },
  { value: 'Deepanshu Gupta', label: 'Deepanshu Gupta' },
  { value: 'Guhanathan S', label: 'Guhanathan S' },
  { value: 'Kabeer Narang', label: 'Kabeer Narang' },
  { value: 'Ketan Narula', label: 'Ketan Narula' },
  { value: 'Nandish Gupta', label: 'Nandish Gupta' },
  { value: 'Omkar Sunil Kokane', label: 'Omkar Sunil Kokane' },
  { value: 'Pranav M. Jani', label: 'Pranav M. Jani' },
  { value: 'Pratap Kumar Singh', label: 'Pratap Kumar Singh' },
  { value: 'Rachit Kakani', label: 'Rachit Kakani' },
  { value: 'Shravya Singh Negi', label: 'Shravya Singh Negi' },
  { value: 'Shreyas B', label: 'Shreyas B' },
  { value: 'Shriram Pramod Nimbalkar', label: 'Shriram Pramod Nimbalkar' },
  { value: 'Smit Shinde', label: 'Smit Shinde' },
  { value: 'Swayam Satwik Patnaik', label: 'Swayam Satwik Patnaik' },
  { value: 'Tathaagat Pandey', label: 'Tathaagat Pandey' },
  { value: 'Yatin Sharma', label: 'Yatin Sharma' },
  { value: 'Abhishek Prasad', label: 'Abhishek Prasad' },
  { value: 'Aditya Akshat Singh', label: 'Aditya Akshat Singh' },
  { value: 'Akshit Wadhwa', label: 'Akshit Wadhwa' },
  { value: 'Aman Rana', label: 'Aman Rana' },
  { value: 'Ayan Ahmed', label: 'Ayan Ahmed' },
  { value: 'Gaurik Gupta', label: 'Gaurik Gupta' },
  { value: 'Hardik Singh', label: 'Hardik Singh' },
  { value: 'Harshita Joshi', label: 'Harshita Joshi' },
  { value: 'Hitkarsh Ramwani', label: 'Hitkarsh Ramwani' },
  { value: 'Lokeeshwar Sridhar', label: 'Lokeeshwar Sridhar' },
  { value: 'Pranjay Rathore', label: 'Pranjay Rathore' },
  { value: 'Sajal Kumar', label: 'Sajal Kumar' },
  { value: 'Shrey Bhatnagar', label: 'Shrey Bhatnagar' },
  { value: 'Sujal Pachpande', label: 'Sujal Pachpande' },
  { value: 'Sumit Kaira', label: 'Sumit Kaira' },
  { value: 'Vansh Sharma', label: 'Vansh Sharma' },
  { value: 'Vihaan Chaturvedi', label: 'Vihaan Chaturvedi' },
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
                render={() => (
                  <FormItem>
                    <FormLabel>Name of the person who referred you</FormLabel>
                    <FormControl>
                      <Controller
                        name="referrer_name"
                        control={form.control}
                        render={({ field }) => (
                          <ReactSelect
                            inputId="referrer_name"
                            options={referrerOptions}
                            value={referrerOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option ? option.value : '')}
                            placeholder="Search for a name..."
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
