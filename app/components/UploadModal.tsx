'use client';

import { useState } from 'react';

interface UploadModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  onUpload: (file: File) => Promise<void>;
}

export default function UploadModal({ isModalOpen, setIsModalOpen, onUpload }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      await onUpload(selectedFile);
      setIsModalOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show toast, error message, etc.)
    } finally {
      setIsUploading(false);
    }
  };

  return isModalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4 text-black">Upload Image</h3>
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="w-full text-black"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            disabled={isUploading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}