import { Generation } from '../types';
import { STORAGE_KEYS, UI_CONSTANTS } from './constants';

export const loadHistory = (): Generation[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.GENERATION_HISTORY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    
    // Validate the structure of stored data
    return parsed.filter(isValidGeneration).slice(0, UI_CONSTANTS.HISTORY_LIMIT);
  } catch (error) {
    console.warn('Failed to load generation history:', error);
    return [];
  }
};

export const saveHistory = (history: Generation[]): void => {
  try {
    const limitedHistory = history.slice(0, UI_CONSTANTS.HISTORY_LIMIT);
    localStorage.setItem(
      STORAGE_KEYS.GENERATION_HISTORY,
      JSON.stringify(limitedHistory)
    );
  } catch (error) {
    console.warn('Failed to save generation history:', error);
  }
};

export const addToHistory = (generation: Generation): Generation[] => {
  const currentHistory = loadHistory();
  const newHistory = [generation, ...currentHistory].slice(0, UI_CONSTANTS.HISTORY_LIMIT);
  saveHistory(newHistory);
  return newHistory;
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.GENERATION_HISTORY);
  } catch (error) {
    console.warn('Failed to clear generation history:', error);
  }
};

const isValidGeneration = (item: any): item is Generation => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.imageUrl === 'string' &&
    typeof item.prompt === 'string' &&
    typeof item.style === 'string' &&
    typeof item.createdAt === 'string'
  );
}; 