import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toolbar } from './Toolbar';
import { ContentBlock } from './ContentBlock';
import { LayoutControls } from './LayoutControls';

interface Block {
  id: string;
  type: 'text' | 'image' | 'layout';
  content: string;
  layout?: string;
}

interface EditorProps {
  initialContent: string;
  filename: string;
}

export function Editor({ initialContent, filename }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(() => {
    try {
      return JSON.parse(initialContent);
    } catch {
      return [{
        id: uuidv4(),
        type: 'text',
        content: initialContent
      }];
    }
  });

  const handleAddBlock = (type: string, layout?: string) => {
    const newBlock: Block = {
      id: uuidv4(),
      type: type as 'text' | 'image' | 'layout',
      content: '',
      layout
    };

    if (type === 'layout') {
      // Create a pre-configured layout with both image and text placeholders
      const imageContent = '<div class="w-1/2"><p class="text-center text-gray-400">Click to add image</p></div>';
      const textContent = '<div class="w-1/2"><p>Start typing...</p></div>';
      newBlock.content = layout === 'image-text' 
        ? `${imageContent}${textContent}`
        : `${textContent}${imageContent}`;
    } else if (type === 'text') {
      newBlock.content = '<p>Start typing...</p>';
    }

    setBlocks([...blocks, newBlock]);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const handleContentChange = (id: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const handleImageInsert = (dataUrl: string, blockId?: string) => {
    if (blockId) {
      // Update existing block with new image
      setBlocks(blocks.map(block => {
        if (block.id === blockId) {
          const imgHtml = `<img src="${dataUrl}" alt="Uploaded image" class="max-w-full h-auto" />`;
          if (block.type === 'layout') {
            // Replace the placeholder with the actual image while preserving the layout
            return {
              ...block,
              content: block.content.replace(
                /<div class="w-1\/2"><p class="text-center text-gray-400">Click to add image<\/p><\/div>/,
                `<div class="w-1/2">${imgHtml}</div>`
              )
            };
          }
          return { ...block, content: imgHtml };
        }
        return block;
      }));
    } else {
      // Create new image block
      const newBlock: Block = {
        id: uuidv4(),
        type: 'image',
        content: `<img src="${dataUrl}" alt="Uploaded image" class="max-w-full h-auto" />`
      };
      setBlocks([...blocks, newBlock]);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    
    if (draggedId === targetId) return;

    const draggedIndex = blocks.findIndex(block => block.id === draggedId);
    const targetIndex = blocks.findIndex(block => block.id === targetId);
    
    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetIndex, 0, draggedBlock);
    
    setBlocks(newBlocks);
  };

  const handleSave = () => {
    console.log('Saving content for:', filename);
    console.log(JSON.stringify(blocks, null, 2));
  };

  const handleExport = () => {
    const htmlContent = blocks.map(block => {
      if (block.type === 'layout') {
        return `<div class="flex ${block.layout === 'image-text' ? '' : 'flex-row-reverse'} gap-4 my-4">
          ${block.content}
        </div>`;
      }
      return block.content;
    }).join('\n');

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-white">
      <Toolbar
        filename={filename}
        onSave={handleSave}
        onExport={handleExport}
        onImageInsert={handleImageInsert}
      />
      <LayoutControls onAddBlock={handleAddBlock} />
      <div className="flex-grow p-4 space-y-4">
        {blocks.map((block) => (
          <ContentBlock
            key={block.id}
            id={block.id}
            type={block.type}
            content={block.content}
            onDelete={handleDeleteBlock}
            onContentChange={handleContentChange}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onImageInsert={handleImageInsert}
            className={block.type === 'layout' ? 'flex gap-4' : ''}
          />
        ))}
      </div>
    </div>
  );
}