'use client';

import { LiveSummaryProps } from '../types';
import { STYLE_OPTIONS } from '../lib/constants';

const LiveSummary = ({ imagePreview, prompt, selectedStyle }: LiveSummaryProps) => {
  const selectedStyleOption = STYLE_OPTIONS.find(option => option.value === selectedStyle);
  const hasContent = imagePreview || prompt || selectedStyle;

  if (!hasContent) {
    return (
      <div className="border border-foreground/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Live Preview
        </h3>
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 text-foreground/20 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <p className="text-foreground/60">
            Upload an image and add a prompt to see your generation preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-foreground/20 rounded-lg overflow-hidden">
      <div className="p-4 bg-foreground/5 border-b border-foreground/10">
        <h3 className="text-lg font-semibold text-foreground">
          Live Preview
        </h3>
        <p className="text-sm text-foreground/60">
          This is what will be sent for generation
        </p>
      </div>

      <div className="p-4 space-y-4">
        {/* Image Preview */}
        {imagePreview ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Source Image</h4>
            <div className="relative rounded-lg overflow-hidden border border-foreground/10">
              <img
                src={imagePreview}
                alt="Source image preview"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground/40">Source Image</h4>
            <div className="w-full h-40 bg-foreground/5 rounded-lg border border-dashed border-foreground/20 flex items-center justify-center">
              <p className="text-sm text-foreground/40">No image uploaded</p>
            </div>
          </div>
        )}

        {/* Prompt Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">
            Prompt {prompt ? `(${prompt.length} characters)` : ''}
          </h4>
          {prompt ? (
            <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="text-sm text-foreground leading-relaxed">
                "{prompt}"
              </p>
            </div>
          ) : (
            <div className="p-3 bg-foreground/5 rounded-lg border border-dashed border-foreground/20">
              <p className="text-sm text-foreground/40 italic">
                No prompt entered
              </p>
            </div>
          )}
        </div>

        {/* Style Preview */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Selected Style</h4>
          {selectedStyleOption ? (
            <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="text-sm font-medium text-foreground mb-1">
                {selectedStyleOption.label}
              </p>
              <p className="text-xs text-foreground/70">
                {selectedStyleOption.description}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-foreground/5 rounded-lg border border-dashed border-foreground/20">
              <p className="text-sm text-foreground/40 italic">
                No style selected
              </p>
            </div>
          )}
        </div>

        {/* Generation Readiness Indicator */}
        <div className="pt-2 border-t border-foreground/10">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              imagePreview && prompt ? 'bg-green-500' : 'bg-foreground/20'
            }`} />
            <p className="text-xs text-foreground/60">
              {imagePreview && prompt 
                ? 'Ready to generate' 
                : 'Image and prompt required to generate'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSummary; 