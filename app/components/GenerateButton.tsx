'use client';

import { GenerateButtonProps } from '../types';
import Button from './ui/Button';

interface ExtendedGenerateButtonProps extends GenerateButtonProps {
  error?: string | null;
}

const GenerateButton = ({ 
  isGenerating, 
  onGenerate, 
  onAbort, 
  disabled,
  error
}: ExtendedGenerateButtonProps) => {
  return (
    <div className="space-y-4">
      <Button
        onClick={onGenerate}
        disabled={disabled || isGenerating}
        loading={isGenerating}
        variant="gradient"
        size="lg"
        className="w-full"
      >
        {isGenerating ? 'Generating...' : 'Generate Image'}
      </Button>

      {/* Generation Status */}
      <div className="text-center">
        {isGenerating ? (
          <div className="space-y-2">
            <p className="text-sm text-foreground/60">
              Processing your request...
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">
            {error}
          </p>
        ) : disabled ? (
          <p className="text-sm text-foreground/40">
            Upload an image and enter a prompt to generate
          </p>
        ) : (
          <p className="text-sm text-foreground/60">
            Click to transform your image with AI
          </p>
        )}
      </div>

      {/* Error Information */}
      {error && !isGenerating && (
        <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 text-red-600">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path 
                  fillRule="evenodd" 
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-red-800">
                Generation Failed
              </p>
              <p className="text-sm text-red-700">
                {error}. Try again.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateButton; 