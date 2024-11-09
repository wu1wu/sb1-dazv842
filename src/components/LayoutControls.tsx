import React from 'react';
import { LayoutTemplate, Type, Image as ImageIcon } from 'lucide-react';

interface LayoutControlsProps {
  onAddBlock: (type: string, layout?: string) => void;
}

export function LayoutControls({ onAddBlock }: LayoutControlsProps) {
  return (
    <div className="flex gap-2 p-4 border-b border-gray-200">
      <button
        onClick={() => onAddBlock('text')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
      >
        <Type size={18} />
        Add Text
      </button>
      <button
        onClick={() => onAddBlock('image')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
      >
        <ImageIcon size={18} />
        Add Image
      </button>
      <button
        onClick={() => onAddBlock('layout', 'image-text')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
      >
        <LayoutTemplate size={18} />
        Image + Text
      </button>
      <button
        onClick={() => onAddBlock('layout', 'text-image')}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
      >
        <LayoutTemplate size={18} />
        Text + Image
      </button>
    </div>
  );
}