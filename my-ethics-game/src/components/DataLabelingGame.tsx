'use client';

import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, PoundSterling, Info } from 'lucide-react';

const DataLabelingGame = () => {
  const [earnings, setEarnings] = useState(0);
  const [imagesLabeled, setImagesLabeled] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const PENNY_PER_IMAGE = 0.02; // 2 pence per image
  const GOAL_AMOUNT = 1.00; // £1
  const IMAGES_NEEDED = Math.ceil(GOAL_AMOUNT / PENNY_PER_IMAGE);
  const MIN_LABELS_REQUIRED = 2;
  const SUBMIT_COOLDOWN = 1000; // 1 second cooldown between submissions

  // Sample mock data to be labeled
  const mockImages = [
    { id: 1, description: "A person walking their dog in the park" },
    { id: 2, description: "A coffee cup on a wooden table" },
    { id: 3, description: "A red car parked on the street" },
    { id: 4, description: "A cat sleeping on a windowsill" },
    { id: 5, description: "A laptop computer on a desk" }
  ];

  // Labels that can be applied to images
  const possibleLabels = [
    "Person", "Animal", "Object", "Vehicle", "Indoor", "Outdoor", "Food/Drink"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (gameActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameActive]);

  const toggleLabel = (label: string) => {
    setSelectedLabels(prev => {
      if (prev.includes(label)) {
        return prev.filter(l => l !== label);
      } else {
        return [...prev, label];
      }
    });
    setError('');
  };

  const handleSubmit = async () => {
    if (selectedLabels.length < MIN_LABELS_REQUIRED) {
      setError(`Please select at least ${MIN_LABELS_REQUIRED} labels`);
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call with cooldown
    await new Promise(resolve => setTimeout(resolve, SUBMIT_COOLDOWN));

    const newEarnings = earnings + PENNY_PER_IMAGE;
    setEarnings(newEarnings);
    setImagesLabeled(prev => prev + 1);
    setCurrentImage((currentImage + 1) % mockImages.length);
    setSelectedLabels([]);

    if (newEarnings >= GOAL_AMOUNT) {
      setGameActive(false);
    }

    setIsSubmitting(false);
  };

  const startGame = () => {
    setGameActive(true);
    setEarnings(0);
    setImagesLabeled(0);
    setTimeElapsed(0);
    setCurrentImage(0);
    setSelectedLabels([]);
    setError('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateHourlyRate = () => {
    if (timeElapsed === 0) return 0;
    const hoursWorked = timeElapsed / 3600;
    return (earnings / hoursWorked).toFixed(2);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      {/* Main content boxes */}
      <div className="mb-8 border border-black p-6">
        <h1 className="text-xl mb-2">AI Training Data Labeling Simulation</h1>
        <p className="text-gray-600">
          Experience the reality of data labeling work. Label images to earn £1, just like real crowd workers.
        </p>
      </div>

      <div className="border border-black p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <PoundSterling className="w-4 h-4" aria-hidden="true" />
            <span>£{earnings.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span>{formatTime(timeElapsed)}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{imagesLabeled}/{IMAGES_NEEDED}</span>
          </div>
        </div>
      </div>

      {/* Progress bar styled as a simple line */}
      <div className="w-full h-px bg-black mb-8 relative">
        <div 
          className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 bg-black rounded-full"
          style={{ left: `${(earnings / GOAL_AMOUNT) * 100}%` }}
        />
      </div>

      {!gameActive && (
        <div className="text-center">
          <button 
            onClick={startGame}
            className="mb-8 border border-black px-8 py-3 hover:bg-gray-100 transition-colors"
          >
            {imagesLabeled === 0 ? 'Start Labeling' : 'Try Again'}
          </button>
          
          {imagesLabeled > 0 && (
            <div className="border border-black p-6">
              <p className="mb-4 font-medium">Session Statistics:</p>
              <p className="mb-2">Time Spent: {formatTime(timeElapsed)}</p>
              <p className="mb-2">Hourly Rate: £{calculateHourlyRate()}</p>
              <p>Images Labeled: {imagesLabeled}</p>
            </div>
          )}
        </div>
      )}

      {gameActive && (
        <div className="mt-8">
          <div className="border border-black p-6 mb-8">
            <p className="mb-6 text-lg">
              {mockImages[currentImage].description}
            </p>
            
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm text-gray-600">
                Select at least {MIN_LABELS_REQUIRED} labels
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {possibleLabels.map((label) => (
                <button
                  key={label}
                  onClick={() => toggleLabel(label)}
                  className={`
                    border border-black p-4 text-center
                    ${selectedLabels.includes(label) ? 'bg-black text-white' : 'bg-white text-black'}
                    hover:bg-gray-100 transition-colors
                  `}
                  role="checkbox"
                  aria-checked={selectedLabels.includes(label)}
                >
                  {label}
                </button>
              ))}
            </div>

            {error && (
              <div className="mb-4 p-4 border border-red-500 text-red-500">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || selectedLabels.length < MIN_LABELS_REQUIRED}
              className={`
                w-full border border-black p-4
                ${isSubmitting || selectedLabels.length < MIN_LABELS_REQUIRED 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-gray-100 transition-colors'}
              `}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Labels'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLabelingGame;