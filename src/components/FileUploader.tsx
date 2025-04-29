import { useState } from 'react';
import {FileUp} from "lucide-react";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader = (
  {onFileUpload}: FileUploaderProps
) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      console.error('Invalid file format');
      return;
    }
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
     <div
       onDragEnter={handleDrag}
       onDragLeave={handleDrag}
       onDragOver={handleDrag}
       onDrop={handleDrop}
       className={`flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 border-2 ${
         dragActive ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'
       } rounded-lg cursor-pointer transition-all duration-200`}
     >
       <input
         type="file"
         accept=".fit"
         onChange={handleChange}
         className="hidden"
         id="file-upload"
       />
       <label htmlFor="file-upload" className="flex flex-col gap-2 items-center justify-center w-full h-full">
         <FileUp className={'text-gray-500'} />
         <p className="text-gray-500 text-center">
           <span className="font-semibold">Click to upload</span> or drag and drop
         </p>
         <p className="text-xs text-gray-400">Only .fit files are accepted</p>
       </label>
     </div>
   );
};

export default FileUploader;