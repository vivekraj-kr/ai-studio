'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { ImageUploadProps } from '../types';
import { processImageFile } from '../lib/imageUtils';
import Button from './ui/Button';

const ImageUpload = ({ 
  selectedFile, 
  imagePreview, 
  onFileSelect, 
  onImagePreview 
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await processImageFile(file);
      onFileSelect(file);
      onImagePreview(result.preview);
      
      if (result.isDownscaled) {
        console.log('Image was downscaled for optimal processing');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
      onFileSelect(null);
      onImagePreview('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onFileSelect(null);
    onImagePreview('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleButtonClick();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Upload Image
        </label>
        <p className="text-sm text-foreground/60">
          PNG or JPG, max 10MB. Images larger than 1920px will be automatically resized.
        </p>
      </div>

      {!imagePreview ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragOver 
              ? 'border-foreground bg-foreground/5' 
              : 'border-foreground/30 hover:border-foreground/50 hover:bg-foreground/5'
            }
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={!isProcessing ? handleButtonClick : undefined}
          onKeyDown={!isProcessing ? handleKeyDown : undefined}
          tabIndex={isProcessing ? -1 : 0}
          role="button"
          aria-label="Upload image file"
          aria-describedby="upload-description"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,image/png,image/jpeg"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isProcessing}
            aria-describedby="upload-description"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-foreground/40">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            
            {isProcessing ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                </div>
                <p className="text-sm text-foreground/60">Processing image...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  {isDragOver ? 'Drop your image here' : 'Drop an image here or click to browse'}
                </p>
                <p className="text-sm text-foreground/60" id="upload-description">
                  Supports PNG and JPG files up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden border border-foreground/20">
            <img
              src={imagePreview}
              alt="Upload preview"
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="danger"
                size="sm"
                onClick={handleRemove}
                aria-label="Remove uploaded image"
              >
                Remove
              </Button>
            </div>
          </div>
          
          {selectedFile && (
            <div className="text-sm text-foreground/60">
              <p><strong>File:</strong> {selectedFile.name}</p>
              <p><strong>Size:</strong> {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 