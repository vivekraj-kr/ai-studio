import { GenerateRequest, GenerateResponse } from '../types';
import { API_ENDPOINTS } from './constants';

export async function generateImage(request: GenerateRequest): Promise<GenerateResponse> {
  const response = await fetch(API_ENDPOINTS.GENERATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Generation failed');
  }

  return response.json();
} 