'use client';

import { useState } from 'react';
import { StyleOption } from './types';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import LiveSummary from './components/LiveSummary';
import GenerateButton from './components/GenerateButton';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>('editorial');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleImagePreview = (preview: string) => {
    setImagePreview(preview);
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const handleStyleChange = (style: StyleOption) => {
    setSelectedStyle(style);
  };

  const handleGenerate = () => {
    if (!imagePreview || !prompt.trim()) {
      return;
    }
    
    setIsGenerating(true);
    // TODO: Implement API call logic
    console.log('Starting generation with:', {
      imagePreview,
      prompt,
      style: selectedStyle
    });
    
    // Temporary simulation - will be replaced with actual API call
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Generation completed (simulated)');
    }, 3000);
  };

  const handleAbort = () => {
    setIsGenerating(false);
    console.log('Generation aborted');
  };

  const canGenerate = Boolean(imagePreview && prompt.trim());

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            AI Studio
          </h1>
          <p className="text-foreground/60">
            Transform your images with AI-powered style generation
          </p>
        </header>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <ImageUpload
                selectedFile={selectedFile}
                imagePreview={imagePreview}
                onFileSelect={handleFileSelect}
                onImagePreview={handleImagePreview}
              />
              
              <PromptInput
                prompt={prompt}
                onPromptChange={handlePromptChange}
              />
              
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleChange={handleStyleChange}
              />
            </div>

            {/* Preview/Output Section */}
            <div className="space-y-6">
              <LiveSummary
                imagePreview={imagePreview}
                prompt={prompt}
                selectedStyle={selectedStyle}
              />
              
              <GenerateButton
                isGenerating={isGenerating}
                onGenerate={handleGenerate}
                onAbort={handleAbort}
                disabled={!canGenerate}
              />
              
              <div className="p-4 border border-foreground/20 rounded-lg">
                <p className="text-foreground/60">History Panel component coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
