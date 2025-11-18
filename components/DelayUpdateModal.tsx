import React, { useState } from 'react';

interface DelayUpdateModalProps {
  initialDelay: string;
  onClose: () => void;
  onSubmit: (newDelay: string) => void;
}

const DelayUpdateModal: React.FC<DelayUpdateModalProps> = ({ initialDelay, onClose, onSubmit }) => {
  const [delay, setDelay] = useState(initialDelay);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(delay);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Update Arrival Delay</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-600 mb-2">
            Enter the estimated delay (e.g., "15 minutes", "1 hour"). Leave blank to clear.
          </p>
          <input
            type="text"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="e.g., 15 minutes"
          />
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
            >
              Save Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DelayUpdateModal;