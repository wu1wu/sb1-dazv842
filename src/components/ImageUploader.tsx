import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageInsert: (dataUrl: string) => void;
}

export function ImageUploader({ onImageInsert }: ImageUploaderProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onImageInsert(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <button
        className="p-2 hover:bg-gray-100 rounded"
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </button>
    </div>
  );
}