import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Editor } from './components/Editor';

export function App() {
  const [file, setFile] = useState<{ name: string; content: string } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files?.[0];
    if (fileObj) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile({
          name: fileObj.name,
          content: e.target?.result as string
        });
      };
      reader.readAsText(fileObj);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!file ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">HTML Editor</h1>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">HTML files only</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".html,.htm"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      ) : (
        <Editor initialContent={file.content} filename={file.name} />
      )}
    </div>
  );
}