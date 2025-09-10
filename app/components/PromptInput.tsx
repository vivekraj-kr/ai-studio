'use client';

import { PromptInputProps } from '../types';
import { UI_CONSTANTS } from '../lib/constants';

const PromptInput = ({ prompt, onPromptChange }: PromptInputProps) => {
  const remainingChars = UI_CONSTANTS.MAX_PROMPT_LENGTH - prompt.length;
  const isOverLimit = remainingChars < 0;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">
        Prompt
      </label>
      <p className="text-sm text-foreground/60">
        Describe what you want to achieve with your image transformation
      </p>
      
      <div className="space-y-1">
        <textarea
          value={prompt}
          onChange={handleChange}
          placeholder="e.g., Transform this into a professional headshot with soft lighting and clean background..."
          className={`w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 resize-y min-h-[100px] max-h-[200px]
            ${isOverLimit 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
              : 'border-foreground/20 focus:border-foreground focus:ring-foreground/50'
            }`}
          rows={4}
          aria-describedby="prompt-help prompt-count"
        />
        
        <div className="flex justify-between items-center">
          <p id="prompt-help" className="text-xs text-foreground/60">
            Be specific about the style and mood you want
          </p>
          <p 
            id="prompt-count" 
            className={`text-xs ${isOverLimit ? 'text-red-600' : 'text-foreground/60'}`}
          >
            {remainingChars} characters remaining
          </p>
        </div>
        
        {isOverLimit && (
          <p className="text-sm text-red-600">
            Prompt is too long. Please shorten by {Math.abs(remainingChars)} characters.
          </p>
        )}
      </div>
    </div>
  );
};

export default PromptInput; 