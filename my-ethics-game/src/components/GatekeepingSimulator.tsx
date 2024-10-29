'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ContentItem {
  id: string;
  type: string;
  quality: number;
  timestamp: number;
  visible: boolean;
}

interface Stats {
  visibleContent: number;
  suppressedContent: number;
  diversity: number;
}

const CONTENT_TYPES = [
  { id: 'A', label: 'Mainstream', baseFreq: 0.4 },
  { id: 'B', label: 'Alternative', baseFreq: 0.3 },
  { id: 'C', label: 'Niche', baseFreq: 0.2 },
  { id: 'D', label: 'Edge', baseFreq: 0.1 }
];

const GatekeepingSimulator = () => {
  // Original states
  const [filterStrength, setFilterStrength] = useState(50);
  const [biasLevel, setBiasLevel] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [stats, setStats] = useState<Stats>({
    visibleContent: 0,
    suppressedContent: 0,
    diversity: 100
  });

  // New states for floating prompt box
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const promptQuestions = [
    "How does filter strength affect content diversity?",
    "What happens to niche content as bias increases?",
    "Is there a balance between filtering and diversity?",
    "How might this impact emerging voices?",
    "What patterns do you see in suppressed content?",
    "How does bias affect mainstream vs edge content?",
    "What are the long-term effects of high filtering?",
    "How might this shape public discourse?"
  ];

  // Simulation functionality
  const generateContent = useCallback((): ContentItem => {
    const biasMultiplier = biasLevel / 50;
    const weights = CONTENT_TYPES.map((type, index) => 
      type.baseFreq * (index === 0 ? biasMultiplier : (1/biasMultiplier))
    );
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const normalized = weights.map(w => w / totalWeight);
    
    let random = Math.random();
    let selectedType = CONTENT_TYPES[0];
    for (let i = 0; i < normalized.length; i++) {
      random -= normalized[i];
      if (random <= 0) {
        selectedType = CONTENT_TYPES[i];
        break;
      }
    }

    const quality = Math.random() * 100;
    return {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType.id,
      quality,
      timestamp: Date.now(),
      visible: quality > filterStrength
    };
  }, [biasLevel, filterStrength]);

  const updateStats = useCallback((items: ContentItem[]) => {
    const visible = items.filter(item => item.visible).length;
    const typeDistribution = CONTENT_TYPES.map(type => 
      items.filter(item => item.type === type.id && item.visible).length
    );
    const maxPossibleDiversity = Math.max(1, items.length / CONTENT_TYPES.length);
    const diversity = Math.max(0, Math.min(100, (Math.min(...typeDistribution) / maxPossibleDiversity) * 100));

    setStats({
      visibleContent: visible,
      suppressedContent: items.length - visible,
      diversity: diversity
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) =>
          prevIndex === promptQuestions.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500);
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, [promptQuestions.length]); // Added promptQuestions.length

  // Effect for content filtering
  useEffect(() => {
    const updatedItems = contentItems.map(item => ({
      ...item,
      visible: item.quality > filterStrength
    }));
    setContentItems(updatedItems);
    updateStats(updatedItems);
  }, [filterStrength, contentItems, updateStats]);

  // Effect for simulation running
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setContentItems(prev => {
          const newContent = generateContent();
          const updated = [...prev, newContent].slice(-50);
          updateStats(updated);
          return updated;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning, generateContent, updateStats]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto relative">
        {/* Floating Inspiration Box */}
        <div className="fixed top-8 right-8 w-64 z-50">
          <div
            className={`
              border border-black bg-white p-4 shadow-lg
              transform transition-all duration-500 ease-in-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}
          >
            <div className="text-xs uppercase tracking-wide mb-2">Reflection Point:</div>
            <div className="text-sm">
              {promptQuestions[currentQuestionIndex]}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-xl text-sm font-mono">Gatekeeping in the Digital Commons</h2>
          </div>
        </div>

        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>003 Gatekeeping Simulator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Overview</h3>
                <p className="text-black">
                  This simulator demonstrates how filter strength and AI bias impact content visibility and diversity.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-[300px_1fr] gap-6">
          <div className="space-y-6">
            <div className="bg-white border border-black p-6">
              <div className="text-sm uppercase tracking-wide mb-4">Filter Strength</div>
              <style jsx>{`
                input[type='range'] {
                  -webkit-appearance: none;
                  width: 100%;
                  height: 2px;
                  background: black;
                  border-radius: 0;
                  outline: none;
                }
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  width: 16px;
                  height: 16px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                }
                input[type='range']::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                  border: none;
                }
              `}</style>
              <input
                type="range"
                value={filterStrength}
                onChange={(e) => setFilterStrength(parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="100"
              />
              <div className="text-xl mt-2">{filterStrength}%</div>
            </div>

            <div className="bg-white border border-black p-6">
              <div className="text-sm uppercase tracking-wide mb-4">AI Bias Level</div>
              <style jsx>{`
                input[type='range'] {
                  -webkit-appearance: none;
                  width: 100%;
                  height: 2px;
                  background: black;
                  border-radius: 0;
                  outline: none;
                }
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  width: 16px;
                  height: 16px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                }
                input[type='range']::-moz-range-thumb {
                  width: 16px;
                  height: 16px;
                  background: black;
                  border-radius: 50%;
                  cursor: pointer;
                  border: none;
                }
              `}</style>
              <input
                type="range"
                value={biasLevel}
                onChange={(e) => setBiasLevel(parseInt(e.target.value))}
                className="w-full"
                min="0"
                max="100"
              />
              <div className="text-xl mt-2">{biasLevel}%</div>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full border border-black p-6 text-sm uppercase tracking-wide hover:bg-black/5 transition-colors ${
                isRunning ? 'bg-black/5' : ''
              }`}
            >
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>

          <div className="space-y-6">
            <div className="border border-black p-6">
              <div className="text-sm uppercase tracking-wide mb-6">Content Stream</div>
              <div className="grid grid-cols-10 gap-2">
                {contentItems.slice(-40).map(item => (
                  <div
                    key={item.id}
                    className={`aspect-square ${
                      item.visible ? 'bg-black' : 'bg-black/20'
                    } transition-all duration-300`}
                    title={`Type: ${item.type}, Quality: ${item.quality.toFixed(1)}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="border border-black p-6">
                <div className="text-sm uppercase tracking-wide mb-2">Visible</div>
                <div className="text-2xl">{stats.visibleContent}</div>
              </div>
              <div className="border border-black p-6">
                <div className="text-sm uppercase tracking-wide mb-2">Suppressed</div>
                <div className="text-2xl">{stats.suppressedContent}</div>
              </div>
              <div className="border border-black p-6">
                <div className="text-sm uppercase tracking-wide mb-2">Diversity</div>
                <div className="text-2xl">{stats.diversity.toFixed(1)}%</div>
              </div>
            </div>

            <div className="border border-black p-6">
              <div className="text-sm uppercase tracking-wide mb-6">Content Type Distribution</div>
              <div className="grid grid-cols-4 gap-6">
                {CONTENT_TYPES.map(type => {
                  const count = contentItems.filter(item => 
                    item.type === type.id && item.visible
                  ).length;
                  const percentage = (count / Math.max(1, contentItems.length)) * 100;
                  return (
                    <div key={type.id}>
                      <div className="text-sm mb-2">{type.label}</div>
                      <div className="h-1 bg-black/20">
                        <div 
                          className="h-full bg-black transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="text-xs mt-1">{percentage.toFixed(1)}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GatekeepingSimulator;