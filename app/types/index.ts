export interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface GenerateRequest {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

export interface GenerateResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
}

export type StyleOption = 'editorial' | 'streetwear' | 'vintage';

export interface ImageUploadProps {
  selectedFile: File | null;
  imagePreview: string;
  onFileSelect: (file: File | null) => void;
  onImagePreview: (preview: string) => void;
}

export interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
}

export interface StyleSelectorProps {
  selectedStyle: StyleOption;
  onStyleChange: (style: StyleOption) => void;
}

export interface LiveSummaryProps {
  imagePreview: string;
  prompt: string;
  selectedStyle: StyleOption;
}

export interface GenerateButtonProps {
  isGenerating: boolean;
  onGenerate: () => void;
  onAbort: () => void;
  disabled: boolean;
}

export interface HistoryPanelProps {
  history: Generation[];
  onRestoreGeneration: (generation: Generation) => void;
  onClearHistory: () => void;
} 