'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

interface FileStructure {
  folder: string;
  files: string[];
}

export default function ImageUploader() {
  const [files, setFiles] = useState<FileStructure[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    try {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', selectedFolder || 'uncategorized');
        
        await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
      }
      // Refresh the file list after upload
      fetchFiles();
    } catch (error) {
      console.error('Upload error:', error);
    }
    setUploading(false);
  }, [selectedFolder]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  const fetchFiles = async () => {
    try {
      const response = await fetch('/get-aircraft');
      const blobs = await response.json();
      
      // Group files by folder
      const groupedFiles: { [key: string]: string[] } = {};
      blobs.forEach((blob: { url: string, pathname: string }) => {
        const pathParts = blob.pathname.split('/');
        const folder = pathParts[0];
        if (!groupedFiles[folder]) {
          groupedFiles[folder] = [];
        }
        groupedFiles[folder].push(blob.url);
      });

      // Convert to array structure
      const fileStructure: FileStructure[] = Object.entries(groupedFiles).map(([folder, files]) => ({
        folder,
        files
      }));

      setFiles(fileStructure);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (url: string) => {
    try {
      await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      // Refresh the file list after deletion
      fetchFiles();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Aircraft Image Uploader</h1>
      
      {/* Folder Selection */}
      <div className="mb-6">
        <label htmlFor="folder" className="block text-sm font-medium text-gray-700 mb-2">
          Select Aircraft Type
        </label>
        <select
          id="folder"
          value={selectedFolder}
          onChange={(e) => setSelectedFolder(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a folder...</option>
          {files.map((folder) => (
            <option key={folder.folder} value={folder.folder}>
              {folder.folder}
            </option>
          ))}
          <option value="new">Create New Folder...</option>
        </select>
      </div>

      {selectedFolder === 'new' && (
        <div className="mb-6">
          <label htmlFor="newFolder" className="block text-sm font-medium text-gray-700 mb-2">
            New Folder Name
          </label>
          <input
            type="text"
            id="newFolder"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter new folder name"
            onChange={(e) => setSelectedFolder(e.target.value)}
          />
        </div>
      )}
      
      {/* Drag & Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 mb-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p className="text-gray-600">Uploading...</p>
        ) : isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <div>
            <p className="text-gray-600">Drag and drop aircraft images here</p>
            <p className="text-gray-400 text-sm mt-2">or click to select files</p>
          </div>
        )}
      </div>

      {/* File List */}
      <div className="space-y-6">
        {files.map((folder) => (
          <div key={folder.folder} className="border rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{folder.folder}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folder.files.map((url) => (
                <div key={url} className="relative group">
                  <img
                    src={url}
                    alt={url.split('/').pop()}
                    className="w-full h-48 object-cover rounded shadow-sm"
                  />
                  <button
                    onClick={() => handleDelete(url)}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Delete image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
