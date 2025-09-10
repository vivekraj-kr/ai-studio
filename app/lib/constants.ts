import { StyleOption } from '../types';

export const STYLE_OPTIONS: { value: StyleOption; label: string; description: string }[] = [
  {
    value: 'editorial',
    label: 'Editorial',
    description: 'Clean, professional, magazine-style aesthetic'
  },
  {
    value: 'streetwear',
    label: 'Streetwear',
    description: 'Urban, bold, contemporary street fashion'
  },
  {
    value: 'vintage',
    label: 'Vintage',
    description: 'Classic, retro, timeless appeal'
  }
];

export const FILE_CONSTRAINTS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  MAX_IMAGE_DIMENSION: 1920, // Max width/height for downscaling
  ACCEPTED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg'],
  ACCEPTED_EXTENSIONS: ['.png', '.jpg', '.jpeg']
} as const;

export const API_ENDPOINTS = {
  GENERATE: '/api/generate'
} as const;

export const UI_CONSTANTS = {
  MAX_PROMPT_LENGTH: 500,
  HISTORY_LIMIT: 5,
  RETRY_ATTEMPTS: 3,
  INITIAL_RETRY_DELAY: 1000, // 1 second
  ERROR_SIMULATION_RATE: 0.2, // 20% chance of error
  GENERATION_DELAY: 1500 // 1.5 seconds simulation delay
} as const;

export const STORAGE_KEYS = {
  GENERATION_HISTORY: 'ai-studio-history'
} as const; 