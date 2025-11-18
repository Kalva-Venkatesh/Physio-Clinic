import React, { useState, useEffect } from 'react';
import { galleryData, MediaItem } from '../data/galleryData';

// A simple play icon for video thumbnails
const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);


const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'equipment' | 'clinic' | 'patients'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'equipment', label: 'Equipments' },
    { key: 'clinic', label: 'Clinic Photos' },
    { key: 'patients', label: 'Treating Patients' },
  ];

  const filteredMedia = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const FilterButton: React.FC<{ filterKey: string; label: string }> = ({ filterKey, label }) => (
    <button
      onClick={() => setFilter(filterKey as any)}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
        filter === filterKey
          ? 'bg-teal-600 text-white shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );
  
  const handleMediaClick = (media: MediaItem) => {
    setSelectedMedia(media);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };
  
  // Close modal on escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-4">Our Gallery</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        A glimpse into our clinic, the equipment we use, and our patients' recovery journeys.
      </p>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {filters.map(({ key, label }) => (
          <FilterButton key={key} filterKey={key} label={label} />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMedia.map(item => (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => handleMediaClick(item)}
          >
            <img 
                src={item.type === 'image' ? item.src : `https://picsum.photos/seed/${item.id}/800/600`} // Use placeholder for video thumbnail
                alt={item.title} 
                className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-110" 
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <PlayIcon className="w-12 h-12 text-white opacity-80" />
              </div>
            )}
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                 <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
        >
          <div 
            className="relative bg-white rounded-lg overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 text-gray-700 hover:bg-gray-200"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.src} alt={selectedMedia.title} className="w-full h-auto max-h-[90vh] object-contain" />
            ) : (
              <video src={selectedMedia.src} controls autoPlay className="w-full h-auto max-h-[90vh] object-contain" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
