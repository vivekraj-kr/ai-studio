'use client';

import { useState, useEffect } from 'react';
import { StyleOption, Generation } from './types';
import { loadHistory, clearHistory } from './lib/storage';
import { useGeneration } from './hooks/useGeneration';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import LiveSummary from './components/LiveSummary';
import GenerateButton from './components/GenerateButton';
import HistoryPanel from './components/HistoryPanel';

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<StyleOption>('editorial');
  const [history, setHistory] = useState<Generation[]>([]);

  // Use custom hook for generation
  const { 
    isGenerating, 
    error, 
    generate 
  } = useGeneration((newGeneration) => {
    // Success callback - update history
    const updatedHistory = [newGeneration, ...history].slice(0, 5);
    setHistory(updatedHistory);
  });

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = loadHistory();
    setHistory(savedHistory);
  }, []);

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
    if (!selectedFile || !prompt.trim()) {
      return;
    }
    
    generate(selectedFile, prompt, selectedStyle);
  };

  const handleRestoreGeneration = (generation: Generation) => {
    setImagePreview(generation.imageUrl);
    setPrompt(generation.prompt);
    setSelectedStyle(generation.style as StyleOption);
    setSelectedFile(null);
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  const canGenerate = Boolean(selectedFile && imagePreview && prompt.trim() && !isGenerating);
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
                onAbort={() => {}}
                disabled={!canGenerate}
                error={error}
              />
              
              <HistoryPanel
                history={history}
                onRestoreGeneration={handleRestoreGeneration}
                onClearHistory={handleClearHistory}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
