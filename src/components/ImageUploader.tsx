import { useState, useRef } from 'react';
import { Upload, Camera } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  isProcessing: boolean;
}

export const ImageUploader = ({ onImageSelect, isProcessing }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Compress image to max 800px width for faster API response
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        // Resize if too large
        const maxWidth = 800;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with 0.85 quality
        const compressedData = canvas.toDataURL('image/jpeg', 0.85);
        
        console.log('Original size:', (e.target?.result as string).length, 'bytes');
        console.log('Compressed size:', compressedData.length, 'bytes');
        
        setPreview(compressedData);
        onImageSelect(compressedData);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center
          transition-all duration-200 cursor-pointer
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:border-emerald-500 hover:bg-emerald-50'}
          ${preview ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50'}
        `}
      >
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg shadow-lg"
            />
            {!isProcessing && (
              <p className="text-sm text-slate-600">
                Click or drop another image to replace
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-emerald-100 rounded-full">
                <Camera className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-slate-700">
                Upload Cattle or Buffalo Image
              </p>
              <p className="text-sm text-slate-500">
                Click to browse or drag and drop an image here
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium">Select Image</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
