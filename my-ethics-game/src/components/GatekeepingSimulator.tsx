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

const PROMPT_QUESTIONS = [
  "How does filter strength affect content diversity?",
  "What happens to niche content as bias increases?",
  "Is there a balance between filtering and diversity?",
  "How might this impact emerging voices?",
  "What patterns do you see in suppressed content?",
  "How does bias affect mainstream vs edge content?",
  "What are the long-term effects of high filtering?",
  "How might this shape public discourse?"
];

const GatekeepingSimulator = () => {
  // All state definitions explicitly included
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
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Rest of the component logic...
  const generateContent = useCallback((): ContentItem => {
    const biasMultiplier = Math.max(0.1, biasLevel / 50);
    const weights = CONTENT_TYPES.map((type, index) => {
      const baseWeight = type.baseFreq;
      return index === 0 ? baseWeight * biasMultiplier : baseWeight / biasMultiplier;
    });
    
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    const normalized = weights.map(w => w / totalWeight);
    
    let random = Math.random();
    let selectedType = CONTENT_TYPES[0];
    let cumulativeWeight = 0;
    
    for (let i = 0; i < normalized.length; i++) {
      cumulativeWeight += normalized[i];
      if (random <= cumulativeWeight) {
        selectedType = CONTENT_TYPES[i];
        break;
      }
    }

    const quality = Math.random() * 100;
    const visible = quality > filterStrength;

    return {
      id: Math.random().toString(36).substr(2, 9),
      type: selectedType.id,
      quality,
      timestamp: Date.now(),
      visible
    };
  }, [biasLevel, filterStrength]);

  const updateStats = useCallback((items: ContentItem[]) => {
    if (items.length === 0) return;

    const visible = items.filter(item => item.visible).length;
    const visibleItems = items.filter(item => item.visible);
    
    const typeDistribution = CONTENT_TYPES.map(type => 
      visibleItems.filter(item => item.type === type.id).length
    );
    
    const maxPossibleDiversity = Math.max(1, visibleItems.length / CONTENT_TYPES.length);
    const diversity = typeDistribution.some(count => count > 0)
      ? (Math.min(...typeDistribution.filter(count => count > 0)) / maxPossibleDiversity) * 100
      : 0;

    setStats({
      visibleContent: visible,
      suppressedContent: items.length - visible,
      diversity: Math.min(100, Math.max(0, diversity))
    });
  }, []);

  // Effect for running simulation
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      if (contentItems.length === 0) {
        const initialContent = Array.from({ length: 40 }, () => generateContent());
        setContentItems(initialContent);
        updateStats(initialContent);
      }

      intervalId = setInterval(() => {
        setContentItems(prev => {
          const newContent = generateContent();
          const updated = [...prev, newContent].slice(-40);
          updateStats(updated);
          return updated;
        });
      }, 500);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, generateContent, updateStats, contentItems.length]);

  // Effect for filtering content
  useEffect(() => {
    const updatedItems = contentItems.map(item => ({
      ...item,
      visible: item.quality > filterStrength
    }));
    setContentItems(updatedItems);
    updateStats(updatedItems);
  }, [filterStrength, updateStats]);

  // Effect for rotating questions
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuestionIndex(prev => (prev + 1) % PROMPT_QUESTIONS.length);
        setIsVisible(true);
      }, 500);
    }, 5000);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-4xl bg-white mx-auto p-8">
      <div className="max-w-6xl mx-auto relative h-full">
        {/* Floating Inspiration Box */}
        <div className="absolute top-4 right-4 w-64 z-50">
          <div
            className={`
              border border-black bg-white p-3 shadow-lg
              transform transition-all duration-500 ease-in-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}
          >
            <div className="text-xs uppercase tracking-wide mb-1">Reflection Point:</div>
            <div className="text-sm">
              {PROMPT_QUESTIONS[currentQuestionIndex]}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg font-mono">Gatekeeping in the Digital Commons</h2>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_250px] gap-4 h-[calc(100%-60px)]">
          {/* Left side - Content Stream */}
          <div className="space-y-4">
            <div className="border border-black p-4">
              <div className="text-sm uppercase tracking-wide mb-3">Content Stream</div>
              <div className="grid grid-cols-10 gap-1">
                {contentItems.map(item => (
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

            <div className="border border-black p-4">
              <div className="text-sm uppercase tracking-wide mb-3">Content Type Distribution</div>
              <div className="grid grid-cols-4 gap-4">
                {CONTENT_TYPES.map(type => {
                  const visibleItems = contentItems.filter(item => item.visible);
                  const count = visibleItems.filter(item => item.type === type.id).length;
                  const percentage = visibleItems.length > 0 
                    ? (count / visibleItems.length) * 100
                    : 0;
                  
                  return (
                    <div key={type.id}>
                      <div className="text-sm mb-1">{type.label}</div>
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

            <div className="grid grid-cols-3 gap-4">
              <div className="border border-black p-3">
                <div className="text-sm uppercase tracking-wide mb-1">Visible</div>
                <div className="text-xl">{stats.visibleContent}</div>
              </div>
              <div className="border border-black p-3">
                <div className="text-sm uppercase tracking-wide mb-1">Suppressed</div>
                <div className="text-xl">{stats.suppressedContent}</div>
              </div>
              <div className="border border-black p-3">
                <div className="text-sm uppercase tracking-wide mb-1">Diversity</div>
                <div className="text-xl">{stats.diversity.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="space-y-4">
            <div className="bg-white border border-black p-4">
              <div className="text-sm uppercase tracking-wide mb-2">Filter Strength</div>
              <input
                type="range"
                value={filterStrength}
                onChange={(e) => setFilterStrength(parseInt(e.target.value))}
                className="w-full appearance-none h-0.5 bg-black rounded-none cursor-pointer"
                min="0"
                max="100"
              />
              <div className="text-lg mt-1">{filterStrength}%</div>
            </div>

            <div className="bg-white border border-black p-4">
              <div className="text-sm uppercase tracking-wide mb-2">AI Bias Level</div>
              <input
                type="range"
                value={biasLevel}
                onChange={(e) => setBiasLevel(parseInt(e.target.value))}
                className="w-full appearance-none h-0.5 bg-black rounded-none cursor-pointer"
                min="0"
                max="100"
              />
              <div className="text-lg mt-1">{biasLevel}%</div>
            </div>

            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full border border-black p-4 text-sm uppercase tracking-wide hover:bg-black/5 transition-colors ${
                isRunning ? 'bg-black/5' : ''
              }`}
            >
              {isRunning ? 'Stop Simulation' : 'Start Simulation'}
            </button>
          </div>
        </div>

        <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>003 Gatekeeping Simulator</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-2">Overview</h3>
                <p className="text-sm text-gray-600">
                  This simulator demonstrates how filter strength and AI bias impact content visibility and diversity.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GatekeepingSimulator;