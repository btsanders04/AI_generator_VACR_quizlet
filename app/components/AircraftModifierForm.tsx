'use client';

import { useState, useEffect } from 'react';
import { Aircraft } from "../types/aircraft";
import UploadModal from './UploadModal';
import { useRouter } from 'next/navigation'; // Note: use 'next/navigation', not 'next/router'
import Image from 'next/image';
import { X } from 'lucide-react'; // Import the X icon

interface AircraftModifierFormProps {
  aircraftParams: Aircraft[];
}

export default function AircraftModifierForm({ aircraftParams }: AircraftModifierFormProps) {
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [editedAircraft, setEditedAircraft] = useState<Aircraft | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAircraft(aircraftParams);
  }, [aircraftParams]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedAircraft(aircraft.find(ac => ac.key.toString() === event.target.value))
  };

  const handleDeleteImage = async(url: string) => {
    const response = await fetch(`/api/aircraft/${editedAircraft?.key}/images`, {
      method: 'PUT',
      body: JSON.stringify({
        imageUrl: url
      })
    });
  }

  const handleUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch(`/api/aircraft/${editedAircraft?.key}/images`, {
        method: 'PUT',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      router.refresh();
      // Handle successful upload (update UI, show success message, etc.)
    } catch (error) {
      // Handle error
      throw error; // Re-throw to let modal handle error state
    }
  };

  const handleAltNamesChange = (index: number, value: string) => {
    if (!editedAircraft) return;
    const newAltNames = [...editedAircraft.altNames];
    newAltNames[index] = value;
    setEditedAircraft({ ...editedAircraft, altNames: newAltNames });
  };

  const handleGeneralDataChange = (index: number, key: string, value: string) => {
    if (!editedAircraft) return;
    const newGeneralData = [...editedAircraft.generalData];
    newGeneralData[index] = { ...newGeneralData[index], key, value };
    setEditedAircraft({ ...editedAircraft, generalData: newGeneralData });
  };

  const handleWeftDescriptionChange = (index: number, value: string) => {
    if (!editedAircraft) return;
    const newWeftDescription = [...editedAircraft.weftDescription];
    newWeftDescription[index] = { ...newWeftDescription[index], value };
    setEditedAircraft({ ...editedAircraft, weftDescription: newWeftDescription });
  };

  const handleImageUrlChange = (index: number, value: string) => {
    if (!editedAircraft) return;
    const newImageUrls = [...editedAircraft.imageUrls];
    newImageUrls[index] = value;
    setEditedAircraft({ ...editedAircraft, imageUrls: newImageUrls });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Aircraft Selection</h1>
      <div className="max-w-2xl">
        <select
          value={editedAircraft?.key}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white text-black mb-6"
        >
          <option value="" className="text-black bg-white">Select an aircraft</option>
          {aircraft.map((a) => (
            <option key={a.key} value={a.key} className="text-black bg-white">
              {a.key}
            </option>
          ))}
        </select>

        {editedAircraft && (
          <div className="space-y-6">
            {/* Key */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Key</h2>
              <input
                type="text"
                value={editedAircraft.key}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black"
              />
            </div>

            {/* Alt Names */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">Alternative Names</h2>
              {editedAircraft.altNames.map((name, index) => (
                <div key={index} className="mb-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleAltNamesChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
              ))}
            </div>

            {/* General Data */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">General Data</h2>
              {editedAircraft.generalData.map((data, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <label className="w-1/3 p-2 text-black font-medium">
                    {data.key}
                  </label>
                  <input
                    type="text"
                    value={data.value}
                    onChange={(e) => handleGeneralDataChange(index, data.key, e.target.value)}
                    className="w-2/3 p-2 border border-gray-300 rounded-md text-black"
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>

            {/* WEFT Description */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-2 text-black">WEFT Description</h2>
              {editedAircraft.weftDescription.map((desc, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <label className="w-1/3 p-2 text-black font-medium">
                    {desc.key}
                  </label>
                  <input
                    type="text"
                    value={desc.value}
                    onChange={(e) => handleWeftDescriptionChange(index, e.target.value)}
                    className="w-2/3 p-2 border border-gray-300 rounded-md text-black"
                    placeholder="Value"
                  />
                </div>
              ))}
            </div>

            {/* Image URLs */}
            <div className="bg-white p-4 rounded-md shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-black">Image URLs</h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Upload Image
                </button>
              </div>
              {editedAircraft.imageUrls?.map((url, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    />
                   <button
                      onClick={() => handleDeleteImage(url)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                       <X size={20} />
                    </button>
                    <div className="relative h-64 w-full">
                      <Image
                        src={url}
                        alt='oops'
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
       <UploadModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onUpload={handleUpload}
      />
    </div>
  );
}
