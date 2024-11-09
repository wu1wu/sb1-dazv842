import React from 'react';
import { 
  Bold, Italic, List, AlignLeft, AlignCenter, 
  AlignRight, Link, Save, FileDown 
} from 'lucide-react';
import { ImageUploader } from './ImageUploader';

interface ToolbarProps {
  filename: string;
  onSave: () => void;
  onExport: () => void;
  onCommand: (command: string, value?: string | boolean) => void;
  onImageInsert: (dataUrl: string) => void;
}

export function Toolbar({ 
  filename, 
  onSave, 
  onExport, 
  onCommand,
  onImageInsert 
}: ToolbarProps) {
  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      onCommand('createLink', url);
    }
  };

  return (
    <div className="border-b border-gray-200 p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Editing: {filename}</h2>
        <div className="flex gap-2">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            <Save size={18} />
            Save
          </button>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            <FileDown size={18} />
            Export HTML
          </button>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onCommand('bold')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => onCommand('italic')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => onCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => onCommand('justifyLeft')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => onCommand('justifyCenter')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => onCommand('justifyRight')}
          className="p-2 hover:bg-gray-100 rounded"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={handleLink}
          className="p-2 hover:bg-gray-100 rounded"
          title="Insert Link"
        >
          <Link size={18} />
        </button>
        <ImageUploader onImageInsert={onImageInsert} />
      </div>
    </div>
  );
}