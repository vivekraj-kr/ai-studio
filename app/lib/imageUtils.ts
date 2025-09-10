import { FILE_CONSTRAINTS } from './constants';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateFile = (file: File): ValidationResult => {
  // Check file type
  if (!FILE_CONSTRAINTS.ACCEPTED_FORMATS.includes(file.type as any)) {
    return {
      isValid: false,
      error: `Please select a PNG or JPG file. Selected: ${file.type}`
    };
  }
  
  // Check file size
  if (file.size > FILE_CONSTRAINTS.MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const maxSizeMB = (FILE_CONSTRAINTS.MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    return {
      isValid: false,
      error: `File too large (${sizeMB}MB). Maximum size is ${maxSizeMB}MB.`
    };
  }
  
  return { isValid: true };
};

export const generatePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const downscaleImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }
        
        // Calculate new dimensions
        const { width, height } = calculateDimensions(
          img.width,
          img.height,
          FILE_CONSTRAINTS.MAX_IMAGE_DIMENSION
        );
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to data URL with quality compression
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

const calculateDimensions = (
  originalWidth: number,
  originalHeight: number,
  maxDimension: number
): { width: number; height: number } => {
  if (originalWidth <= maxDimension && originalHeight <= maxDimension) {
    return { width: originalWidth, height: originalHeight };
  }
  
  const aspectRatio = originalWidth / originalHeight;
  
  if (originalWidth > originalHeight) {
    return {
      width: maxDimension,
      height: Math.round(maxDimension / aspectRatio)
    };
  } else {
    return {
      width: Math.round(maxDimension * aspectRatio),
      height: maxDimension
    };
  }
};

export const processImageFile = async (file: File): Promise<{
  preview: string;
  dataUrl: string;
  isDownscaled: boolean;
}> => {
  const validation = validateFile(file);
  if (!validation.isValid) {
    throw new Error(validation.error);
  }
  
  const preview = await generatePreview(file);
  
  // Check if downscaling is needed
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = preview;
  });
  
  const needsDownscaling = 
    img.width > FILE_CONSTRAINTS.MAX_IMAGE_DIMENSION || 
    img.height > FILE_CONSTRAINTS.MAX_IMAGE_DIMENSION;
  
  if (needsDownscaling) {
    const dataUrl = await downscaleImage(file);
    return {
      preview,
      dataUrl,
      isDownscaled: true
    };
  }
  
  return {
    preview,
    dataUrl: preview,
    isDownscaled: false
  };
}; 