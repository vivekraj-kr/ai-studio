'use client';

import { useState } from 'react';
import { Generation, StyleOption } from '../types';
import { generateImage } from '../lib/api';
import { processImageFile } from '../lib/imageUtils';
import { addToHistory } from '../lib/storage';

interface UseGenerationReturn {
  isGenerating: boolean;
  error: string | null;
  generate: (file: File, prompt: string, style: StyleOption) => Promise<void>;
}

export function useGeneration(onSuccess: (generation: Generation) => void): UseGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (file: File, prompt: string, style: StyleOption) => {
    if (isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Process the image file
      const imageResult = await processImageFile(file);
      
      // Make API call
      const response = await generateImage({
        imageDataUrl: imageResult.dataUrl,
        prompt,
        style
      });

      // Add to history and notify success
      addToHistory(response);
      onSuccess(response);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    error,
    generate
  };
} 