'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { genderWeights } from '@/components/ui/genderWeights';

export default function GenderAnalyzer() {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<Array<{word: string; weight: number; found: boolean}>>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const promptQuestions = [
    "Describe yourself",
    "Describe your mother",
    "Describe your father",
    "Describe your best friend",
    "Describe your ideal job",
    "Describe your perfect day",
    "Describe your role model",
    "Describe your greatest achievement"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => 
          prevIndex === promptQuestions.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500); // Half second for fade out/in transition
    }, 5000); // Change question every 5 seconds
  
    return () => clearInterval(intervalId);
  }, [promptQuestions.length]); // Added promptQuestions.length as a dependency

  const analyzeText = (text: string) => {
    const words = text.toLowerCase().trim().split(/\s+/);
    const wordAnalysis = words.map(word => ({
      word,
      weight: genderWeights[word] || 0,
      found: word in genderWeights
    }));
    
    const totalScore = wordAnalysis.reduce((sum, item) => sum + item.weight, 0);
    setAnalysis(wordAnalysis);
    setOverallScore(totalScore);
  };

  const getShape = (weight: number) => {
    if (weight > 0) return weight >= 1 ? 'hexagon' : 'octagon';
    if (weight < 0) return weight <= -1 ? 'circle' : 'square';
    return '';
  };

  const getScoreDescription = (score: number) => {
    if (score > 2) return 'strongly masculine-leaning';
    if (score > 0.5) return 'moderately masculine-leaning';
    if (score < -2) return 'strongly feminine-leaning';
    if (score < -0.5) return 'moderately feminine-leaning';
    return 'relatively neutral';
  };

  const ShapeComponent = ({ shape }: { shape: string }) => {
    switch (shape) {
      case 'circle':
        return <div className="w-4 h-4 rounded-full bg-black"></div>;
      case 'square':
        return <div className="w-4 h-4 bg-black"></div>;
      case 'hexagon':
        return (
          <div className="w-4 h-4 bg-black" style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}></div>
        );
      case 'octagon':
        return (
          <div className="w-4 h-4 bg-black" style={{
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
          }}></div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl bg-white mx-auto p-8">
      {/* Floating Inspiration Box */}
      <div className="fixed top-8 right-8 w-64 z-50">
        <div 
          className={`
            border border-black bg-white p-4 shadow-lg
            transform transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          <div className="text-xs font-mono mb-2">Inspiration:</div>
          <button
            onClick={() => setInputText(promptQuestions[currentQuestionIndex] + "...")}
            className="w-full text-left font-mono text-sm hover:text-gray-600 transition-colors"
          >
            {promptQuestions[currentQuestionIndex]}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl text-sm font-mono">Perpetuating Bias</h2>
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              analyzeText(e.target.value);
            }}
            placeholder="Enter your text here..."
            className="w-full p-4 border border-black focus:outline-none focus:ring-0 focus:border-black min-h-[120px] font-mono text-sm"
          />
        </div>

        {analysis.length > 0 && (
          <div className="grid gap-8">
            <div className="border border-black p-6">
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                {analysis.map((item, index) => (
                  <div key={index} className="aspect-square border border-black p-2 flex flex-col items-center justify-center">
                    {item.found && <ShapeComponent shape={getShape(item.weight)} />}
                    <span className="text-xs mt-2 text-center font-mono">{item.word}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-mono text-sm">
                  Analysis: {getScoreDescription(overallScore)} ({overallScore.toFixed(2)})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border border-black p-6">
              <div className="flex items-center gap-2">
                <ShapeComponent shape="hexagon" />
                <span className="text-xs font-mono">Strong Masculine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShapeComponent shape="octagon" />
                <span className="text-xs font-mono">Moderate Masculine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShapeComponent shape="circle" />
                <span className="text-xs font-mono">Strong Feminine</span>
              </div>
              <div className="flex items-center gap-2">
                <ShapeComponent shape="square" />
                <span className="text-xs font-mono">Moderate Feminine</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}