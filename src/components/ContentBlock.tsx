import React, { useRef } from 'react';
import { GripVertical, X, ImageIcon } from 'lucide-react';

interface ContentBlockProps {
  id: string;
  type: 'text' | 'image' | 'layout';
  content: string;
  onDelete: (id: string) => void;
  onContentChange: (id: string, content: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: string) => void;
  onImageInsert: (dataUrl: string, blockId: string) => void;
  className?: string;
}

export function ContentBlock({
  id,
  type,
  content,
  onDelete,
  onContentChange,
  onDragStart,
  onDragOver,
  onDrop,
  onImageInsert,
  className = ''
}: ContentBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentChange = () => {
    if (blockRef.current) {
      onContentChange(id, blockRef.current.innerHTML);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onImageInsert(dataUrl, id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (content.includes('Click to add image')) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`group relative border border-transparent hover:border-gray-200 rounded-lg ${className}`}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
    >
      <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move p-1">
        <GripVertical size={16} className="text-gray-400" />
      </div>
      <button
        onClick={() => onDelete(id)}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
      >
        <X size={16} className="text-gray-400" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
      <div
        ref={blockRef}
        contentEditable={type !== 'image'}
        className="p-4 min-h-[100px] focus:outline-none"
        dangerouslySetInnerHTML={{ __html: content }}
        onBlur={handleContentChange}
        onClick={handleImageClick}
        suppressContentEditableWarning
      />
    </div>
  );
}