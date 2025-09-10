'use client';

import { HistoryPanelProps } from '../types';
import { STYLE_OPTIONS } from '../lib/constants';
import Button from './ui/Button';

const HistoryPanel = ({ history, onRestoreGeneration, onClearHistory }: HistoryPanelProps) => {
  if (history.length === 0) {
    return (
      <div className="border border-foreground/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Generation History
        </h3>
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 text-foreground/20 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-foreground/60 mb-2">No generations yet</p>
          <p className="text-sm text-foreground/40">
            Your last 5 generations will appear here
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const getStyleLabel = (styleValue: string) => {
    const style = STYLE_OPTIONS.find(option => option.value === styleValue);
    return style?.label || styleValue;
  };

  const handleClearHistory = () => {
    if (confirm('Clear all generation history? This cannot be undone.')) {
      onClearHistory();
    }
  };

  return (
    <div className="border border-foreground/20 rounded-xl overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-foreground/5 to-foreground/10 border-b border-foreground/10">
        <h3 className="text-lg font-semibold text-foreground">
          Generation History
        </h3>
        <p className="text-sm text-foreground/60">
          Click any generation to restore its settings
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="space-y-1 p-2">
          {history.map((generation, index) => (
            <div
              key={generation.id}
              className="group relative p-3 rounded-lg border border-transparent hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-200 cursor-pointer"
              onClick={() => onRestoreGeneration(generation)}
            >
              <div className="flex space-x-3">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  <img
                    src={generation.imageUrl}
                    alt="Generation thumbnail"
                    className="w-16 h-16 object-cover rounded-lg border border-foreground/10"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {generation.prompt.length > 50 
                          ? `${generation.prompt.substring(0, 50)}...` 
                          : generation.prompt
                        }
                      </p>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
                          {getStyleLabel(generation.style)}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {formatDate(generation.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    {/* New indicator for recent generations */}
                    {index === 0 && (
                      <div className="flex-shrink-0 ml-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-200 pointer-events-none"></div>
              
              {/* Restore button on hover */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-xs px-2 py-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRestoreGeneration(generation);
                  }}
                >
                  Restore
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clear history option */}
      {history.length > 0 && (
        <div className="p-3 border-t border-foreground/10 bg-foreground/5">
          <Button
            variant="secondary"
            size="sm"
            className="w-full text-xs"
            onClick={handleClearHistory}
          >
            Clear History
          </Button>
        </div>
      )}
    </div>
  );
};

export default HistoryPanel; 