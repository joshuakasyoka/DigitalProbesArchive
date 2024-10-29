'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, ArrowRight, Database, Brain, Clock, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DigitalCommonsGame = () => {
  const [publicData, setPublicData] = useState(1000);
  const [aiValue, setAiValue] = useState(0);
  const [userValue, setUserValue] = useState(0);
  const [round, setRound] = useState(1);
  const [isHoarding, setIsHoarding] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [extractionAmount, setExtractionAmount] = useState(50);
  const [lastAiExtraction, setLastAiExtraction] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const promptQuestions = [
    "How does AI&apos;s behavior affect society?",
    "What are the risks of rapid data extraction?",
    "When should protective measures be enabled?",
    "How does economic concentration impact innovation?",
    "What makes a digital commons sustainable?",
    "How do you balance growth vs protection?",
    "What patterns do you notice in AI&apos;s behavior?",
    "How does your strategy affect long-term outcomes?"
  ];

  // Then fix the addMessage callback with proper typing
  const addMessage = useCallback((text: string) => {
    setMessages(prev => [...prev.slice(-3), text]);
  }, []);

  const calculateAiAdvantage = useCallback(() => {
    return Math.floor(extractionAmount * (1 + (aiValue / 1000)));
  }, [extractionAmount, aiValue]);

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
  }, [promptQuestions.length]);

  const extractValue = useCallback(() => {
    if (publicData <= 0 || gameOver) return;
    
    const userExtraction = Math.min(publicData, extractionAmount);
    const userGenerated = Math.floor(userExtraction * 1.2);
    
    const aiExtraction = Math.min(publicData - userExtraction, calculateAiAdvantage());
    const aiGenerated = Math.floor(aiExtraction * (1.5 + (aiValue / 2000)));
    
    setPublicData(prev => prev - (userExtraction + aiExtraction));
    setUserValue(prev => prev + userGenerated);
    setAiValue(prev => prev + aiGenerated);
    setLastAiExtraction(aiGenerated);
    
    addMessage(`You: ${userExtraction} → ${userGenerated} | AI: ${aiExtraction} → ${aiGenerated}`);
    
    if (publicData - (userExtraction + aiExtraction) <= 200) {
      setGameOver(true);
      addMessage("COMMONS DEPLETED - Economic Concentration Complete");
    }
  }, [publicData, gameOver, extractionAmount, aiValue, addMessage, calculateAiAdvantage]);

  const toggleHoarding = useCallback(() => {
    setIsHoarding(prev => !prev);
    if (!isHoarding) {
      addMessage("PROTECTIVE MEASURES ENABLED: Slower but sustainable growth");
    } else {
      addMessage("PROTECTIVE MEASURES DISABLED: Rapid extraction resumed");
    }
  }, [isHoarding, addMessage]);

  useEffect(() => {
    if (!gameOver && !showTutorial) {
      const timer = setInterval(() => {
        setPublicData(prev => prev + (isHoarding ? 20 : 50));
        setRound(prev => prev + 1);
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [isHoarding, gameOver, showTutorial]);

  const getConcentrationLevel = useCallback(() => {
    const total = aiValue + userValue;
    if (total === 0) return "None";
    const aiPercentage = (aiValue / total) * 100;
    if (aiPercentage > 80) return "Extreme";
    if (aiPercentage > 60) return "High";
    if (aiPercentage > 40) return "Moderate";
    return "Low";
  }, [aiValue, userValue]);

  return (
    <div className="max-w-4xl bg-white mx-auto p-8">
      {/* Floating Inspiration Box */}
      <div className="fixed top-6 right-6 w-64 z-50">
        <div
          className={`
            border border-black bg-white p-4 shadow-lg
            transform transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          <div className="text-xs font-mono mb-2">Reflection Point:</div>
          <div className="font-mono text-sm">
            {promptQuestions[currentQuestionIndex]}
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white space-y-8">
        <div className="space-y-8">
          {/* Title and Stats */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-mono">Extraction in the Digital Commons</h2>
            <div className="text-sm font-mono">Economic Concentration Level: {getConcentrationLevel()}</div>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Database, label: "PUBLIC DATA", value: publicData },
              { icon: Brain, label: "AI VALUE", value: aiValue },
              { icon: Info, label: "YOUR VALUE", value: userValue },
              { icon: Clock, label: "CYCLE", value: round }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border border-black p-6 flex flex-col items-center">
                <Icon className="w-6 h-6 mb-2" />
                <div className="text-2xl font-mono mb-1">{value}</div>
                <div className="text-xs font-mono tracking-widest">{label}</div>
              </div>
            ))}
          </div>

          {/* Extraction Controls */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
            <style jsx>{`
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: black;
  border-radius: 0;
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: black;
  border-radius: 50%;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
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
                min="50"
                max="200"
                value={extractionAmount}
                onChange={(e) => setExtractionAmount(parseInt(e.target.value))}
                className="flex-1 h-2 bg-black rounded-none appearance-none cursor-pointer"
              />
              <span className="font-mono text-sm w-20">Extract: {extractionAmount}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={extractValue}
                disabled={gameOver || publicData <= 0}
                className={`border border-black p-6 flex items-center justify-center space-x-2
                  ${gameOver ? 'opacity-50' : 'hover:bg-gray-50'}`}
              >
                <ArrowRight className="w-4 h-4" />
                <span className="font-mono text-sm">EXTRACT VALUE</span>
              </button>
              
              <button 
                onClick={toggleHoarding}
                disabled={gameOver}
                className={`border border-black p-6 flex items-center justify-center space-x-2
                  ${isHoarding ? 'bg-gray-50' : ''} ${gameOver ? 'opacity-50' : 'hover:bg-gray-50'}`}
              >
                <Database className="w-4 h-4" />
                <span className="font-mono text-sm">
                  {isHoarding ? 'DISABLE PROTECTION' : 'ENABLE PROTECTION'}
                </span>
              </button>
            </div>
          </div>

          {/* Message Log */}
          <div className="border border-black p-6">
            <div className="font-mono text-xs tracking-widest mb-4">SYSTEM LOG</div>
            <div className="space-y-2 font-mono text-sm">
              {messages.map((message, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-black" />
                  <span>{message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game Over Alert */}
          {gameOver && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Simulation Complete: AI accumulated {aiValue} value vs Your {userValue} value. 
                The concentration ratio is {((aiValue / (aiValue + userValue)) * 100).toFixed(1)}%.
              </AlertDescription>
            </Alert>
          )}
{/* Instructions */}
<div className="text-center text-xs font-mono tracking-widest space-y-1 opacity-75">
  <div>ADJUST EXTRACTION AMOUNT AND OBSERVE AI&apos;S INCREASING EFFICIENCY</div>
  <div>ENABLE PROTECTION TO SLOW BUT SUSTAIN GROWTH</div>
  <div>WATCH HOW VALUE CONCENTRATES OVER TIME</div>
</div>
        </div>
      </div>
    </div>
  );
};

export default DigitalCommonsGame;