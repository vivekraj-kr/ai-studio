import { NextRequest, NextResponse } from 'next/server';
import { GenerateRequest, GenerateResponse, ApiError } from '../../types';
import { UI_CONSTANTS } from '../../lib/constants';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: GenerateRequest = await request.json();
    const { imageDataUrl, prompt, style } = body;

    // Validate required fields
    if (!imageDataUrl || !prompt || !style) {
      return NextResponse.json(
        { message: 'Missing required fields: imageDataUrl, prompt, and style are required' } as ApiError,
        { status: 400 }
      );
    }

    // Validate prompt length
    if (prompt.length > UI_CONSTANTS.MAX_PROMPT_LENGTH) {
      return NextResponse.json(
        { message: `Prompt too long. Maximum ${UI_CONSTANTS.MAX_PROMPT_LENGTH} characters allowed.` } as ApiError,
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, UI_CONSTANTS.GENERATION_DELAY));

    // Simulate 20% error rate
    if (Math.random() < UI_CONSTANTS.ERROR_SIMULATION_RATE) {
      return NextResponse.json(
        { message: 'Model overloaded' } as ApiError,
        { status: 503 }
      );
    }

    // Generate mock response
    const response: GenerateResponse = {
      id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      imageUrl: imageDataUrl, // In real implementation, this would be the AI-generated image
      prompt,
      style,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' } as ApiError,
      { status: 500 }
    );
  }
} 