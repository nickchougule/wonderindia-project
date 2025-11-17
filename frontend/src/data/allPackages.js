// src/data/allPackages.js

// Import package images
import goaImg from '../assets/images/goabeach.jpg';
import ladakhImg from '../assets/images/ladakhAdventure.webp';
import keralaImg from '../assets/images/keralaBackwaters.webp';
import rajasthanImg from '../assets/images/rajsthanHeritage.webp';
import himachalImg from '../assets/images/himachalMountains.webp';
import varanasiImg from '../assets/images/varanasiSpiritual.webp';
import andamanImg from '../assets/images/AndamanIslands.webp';
import agraImg from '../assets/images/4ktajmahal.jpg';
import meghalayaImg from '../assets/images/meghalay.webp';

// We export the array of all package data
export const allPackages = [
  {
    id: 1,
    title: 'Goa Beach Paradise',
    image: goaImg,
    location: 'Goa',
    duration: '5 Days / 4 Nights',
    features: ['Beach Resort Stay', 'Water Sports'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'beach',
    itinerary: [
      'Day 1: Arrival in Goa, check-in to beach resort.',
      'Day 2: North Goa sightseeing (Baga, Calangute).',
      'Day 3: South Goa tour (Palolem Beach, Margoa).',
      'Day 4: Watersports and leisure day.',
      'Day 5: Departure from Goa.'
    ],
    inclusions: ['Hotel Stay', 'Breakfast', 'Airport Transfers', 'Guided Tours']
  },
  {
    id: 2,
    title: 'Ladakh Adventure',
    image: ladakhImg,
    location: 'Ladakh',
    duration: '7 Days',
    features: ['High Altitude Lakes', 'Monastery Visits'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'adventure',
    itinerary: [
      'Day 1: Arrive in Leh, acclimatization.',
      'Day 2: Leh local sightseeing (Shanti Stupa, Leh Palace).',
      'Day 3: Leh to Nubra Valley via Khardung La.',
      'Day 4: Nubra Valley to Pangong Tso.',
      'Day 5: Pangong Tso back to Leh.',
      'Day 6: Monastery tour (Thiksey, Hemis).',
      'Day 7: Departure from Leh.'
    ],
    inclusions: ['Hotel/Camp Stay', 'All Meals', 'Inner Line Permits', 'Local Transfers']
  },
  {
    id: 3,
    title: 'Kerala Backwaters',
    image: keralaImg,
    location: 'Kerala',
    duration: '6 Days',
    features: ['Houseboat Stay', 'Ayurvedic Spa'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'beach',
    itinerary: [
      'Day 1: Arrive in Kochi, transfer to Munnar.',
      'Day 2: Munnar sightseeing (Tea Gardens).',
      'Day 3: Munnar to Thekkady (Spice Plantation).',
      'Day 4: Thekkady to Alleppey (Houseboat check-in).',
      'Day 5: Alleppey to Kochi.',
      'Day 6: Departure from Kochi.'
    ],
    inclusions: ['Hotel & Houseboat Stay', 'Breakfast', 'Private Car Transfers', 'Ayurvedic Massage']
  },
  {
    id: 4,
    title: 'Rajasthan Heritage Tour',
    image: rajasthanImg,
    location: 'Rajasthan',
    duration: '6 Days',
    features: ['Palace Visits', 'Desert Safari'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'heritage',
    itinerary: [
      'Day 1: Arrive in Jaipur, check-in.',
      'Day 2: Jaipur sightseeing (Amber Fort, Hawa Mahal).',
      'Day 3: Jaipur to Jodhpur.',
      'Day 4: Jodhpur sightseeing (Mehrangarh Fort).',
      'Day 5: Jodhpur to Jaisalmer (Desert Safari).',
      'Day 6: Departure from Jaisalmer.'
    ],
    inclusions: ['Hotel & Desert Camp Stay', 'Breakfast & Dinner', 'Desert Safari', 'Local Guides']
  },
  // Added placeholder packages for 5, 6, 7 as seen in your Home.js
  {
    id: 5,
    title: 'Himachal Mountains',
    image: himachalImg,
    location: 'Himachal',
    duration: '6 Days',
    features: ['Mountain Stay', 'Trekking'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'mountains',
    itinerary: [
      'Day 1: Arrive in Shimla.',
      'Day 2: Shimla sightseeing.',
      'Day 3: Shimla to Manali.',
      'Day 4: Manali sightseeing.',
      'Day 5: Solang Valley.',
      'Day 6: Departure.'
    ],
    inclusions: ['Hotel Stay', 'Breakfast', 'Transfers']
  },
  {
    id: 6,
    title: 'Varanasi Spiritual',
    image: varanasiImg,
    location: 'Varanasi',
    duration: '4 Days',
    features: ['Ganga Aarti', 'Temple Visits'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'spiritual',
    itinerary: [
      'Day 1: Arrive in Varanasi.',
      'Day 2: Temples tour.',
      'Day 3: Sarnath excursion.',
      'Day 4: Departure.'
    ],
    inclusions: ['Hotel Stay', 'Breakfast', 'Guided Tours']
  },
  {
    id: 7,
    title: 'Andaman Island Bliss',
    image: andamanImg,
    location: 'Andaman',
    duration: '7 Days',
    features: ['Scuba Diving', 'Beach Stay'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'beach',
    itinerary: [
      'Day 1: Arrive in Port Blair.',
      'Day 2: Havelock Island.',
      'Day 3: Scuba Diving.',
      'Day 4: Neil Island.',
      'Day 5: Cellular Jail.',
      'Day 6: Leisure day.',
      'Day 7: Departure.'
    ],
    inclusions: ['Hotel Stay', 'Breakfast', 'Ferries', 'Permits']
  },
  {
    id: 8,
    title: 'Agra Taj Mahal Special',
    image: agraImg,
    location: 'Agra',
    duration: '3 Days',
    features: ['Taj Mahal Visit', 'Agra Fort'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'heritage',
    itinerary: [
      'Day 1: Arrive in Agra, check-in.',
      'Day 2: Sunrise visit to Taj Mahal, Agra Fort.',
      'Day 3: Visit Fatehpur Sikri, departure.'
    ],
    inclusions: ['Hotel Stay', 'Breakfast', 'Guided Tours', 'Monuments Entry Fee']
  },
  {
    id: 9,
    title: 'Meghalaya Nature Escape',
    image: meghalayaImg,
    location: 'Meghalaya',
    duration: '5 Days / 4 Nights',
    features: ['Living Root Bridges', 'Waterfalls'],
    originalPrice: 10, // ★ TEST PRICE
    price: 1, // ★ TEST PRICE
    discount: '90% OFF',
    category: 'mountains',
    itinerary: [
      'Day 1: Arrival at Shillong, local sightseeing & Umiam Lake',
      'Day 2: Excursion to Cherrapunji – Nohkalikai Falls, Mawsmai Caves',
      'Day 3: Dawki River boating & Mawlynnong – Cleanest Village',
      'Day 4: Living Root Bridges trek & waterfalls exploration',
      'Day 5: Shillong Peak, Elephant Falls, Departure'
    ],
    inclusions: ['Hotel Stay', 'Breakfast & Dinner', 'Guided Tours', 'Local Transfers']
  },
];