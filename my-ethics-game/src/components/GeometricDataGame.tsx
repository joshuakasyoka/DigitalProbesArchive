'use client';

import React, { useState } from 'react';

// Moved scenes and related functions to separate constant declarations
const INITIAL_STATS = {
  privacy: 50,
  trust: 50,
  influence: 50,
  members: 1000,
  understanding: 0
};

const scenes = [
  {
    id: 0,
    title: "The Digital Awakening",
    description: "You're scrolling through your social media feed when you notice an eerily accurate advertisement. It seems to know exactly what you were discussing with your friends yesterday. As you dig deeper, you realize this isn't just about ads - your data is being used to predict your behavior, influence your decisions, and train algorithms.",
    choices: [
      {
        text: "This is concerning. I want to learn more about how my data is being used",
        effect: { privacy: 10, trust: 5, understanding: 5 },
        next: 1
      },
      {
        text: "This is convenient! I like personalized recommendations",
        effect: { privacy: -5, trust: -5, understanding: 5 },
        next: 1
      }
    ]
  },
  {
    id: 1,
    title: "The Data Revelation",
    description: "You discover that your 'data exhaust' - information generated as you move through the world - is being collected by companies in an almost completely unrestricted manner. This includes your location, browsing habits, shopping patterns, and even foot traffic past stores.",
    choices: [
      {
        text: "Research ways to protect my data individually",
        effect: { privacy: 5, understanding: 10, influence: -5 },
        next: 2
      },
      {
        text: "Look into collective solutions",
        effect: { privacy: 10, understanding: 15, influence: 10 },
        next: 3
      }
    ]
  },
  {
    id: 2,
    title: "The Individual Approach",
    description: "You learn that individual data protection is like 'owning different threads in the same blanket.' Your address is your father's son's address, your genes are your cousins' genes, and your interests are shaped by your friends. Individual control isn't enough.",
    choices: [
      {
        text: "Accept this limitation and explore alternatives",
        effect: { understanding: 15, influence: 5 },
        next: 3
      },
      {
        text: "Try harder to protect my individual data",
        effect: { privacy: 5, influence: -10, understanding: 5 },
        next: 4
      }
    ]
  },
  {
    id: 3,
    title: "The Coalition Discovery",
    description: "You learn about 'data coalitions' - democratic organizations where people collectively manage their data. These coalitions act as bargaining agents, negotiating with companies about how member data can be used. Some focus on privacy, others on research, and some on preventing harmful uses of social media.",
    choices: [
      {
        text: "Join a privacy-focused coalition",
        effect: { privacy: 15, trust: 10, members: 500, understanding: 10 },
        next: 5
      },
      {
        text: "Join a research-oriented coalition",
        effect: { influence: 15, members: 1000, understanding: 10 },
        next: 5
      },
      {
        text: "Join a democracy-focused coalition",
        effect: { influence: 20, trust: 15, members: 750, understanding: 10 },
        next: 5
      }
    ]
  },
  {
    id: 4,
    title: "The Race to the Bottom",
    description: "You find yourself caught in a 'race to the bottom.' A new app offers significant advantages, forcing others to adopt it too. Soon, everyone's privacy is compromised because individual resistance becomes futile - like trying to keep your email private when everyone uses Gmail.",
    choices: [
      {
        text: "Recognize the need for collective action",
        effect: { understanding: 20, influence: 10 },
        next: 3
      },
      {
        text: "Give up on privacy entirely",
        effect: { privacy: -20, trust: -15, understanding: 5 },
        next: "bad_end"
      }
    ]
  },
  {
    id: 5,
    title: "The Coalition Experience",
    description: "As a coalition member, you participate in democratic decisions about data use. When a new service wants to use member data, the coalition negotiates terms. Companies must meet the coalition's standards for privacy, ethics, and user benefits.",
    choices: [
      {
        text: "Actively participate in coalition decisions",
        effect: { influence: 20, understanding: 15, trust: 10 },
        next: 6
      },
      {
        text: "Take a passive role",
        effect: { influence: 5, understanding: 5, trust: 5 },
        next: 6
      }
    ]
  },
  {
    id: 6,
    title: "The Power Shift",
    description: "You witness how data coalitions are changing the digital landscape. Big Tech companies must now negotiate with coalitions, leading to better privacy policies and terms of service. New competitors emerge, focusing on interoperability rather than lock-in.",
    choices: [
      {
        text: "Help recruit more members to strengthen the coalition",
        effect: { influence: 25, members: 1000, understanding: 10 },
        next: "good_end"
      },
      {
        text: "Focus on improving coalition policies",
        effect: { influence: 20, trust: 20, understanding: 15 },
        next: "good_end"
      }
    ]
  },
  {
    id: "good_end",
    title: "A New Digital Dawn",
    description: "Through data coalitions, you and millions of others have regained control over the digital world. Companies now compete by serving user interests rather than exploiting data. The internet is becoming more diverse, ethical, and user-focused.",
    choices: []
  },
  {
    id: "bad_end",
    title: "Digital Resignation",
    description: "Without collective action, individual privacy becomes impossible. Big Tech companies continue to concentrate power, using data to predict and influence behavior with little oversight or restraint.",
    choices: []
  }
];

const calculateEnding = (stats) => {
  const total = stats.privacy + stats.trust + stats.influence + stats.understanding;
  if (total > 300) return "You've become a leading voice in the data coalition movement!";
  if (total > 200) return "You're making a positive impact on digital rights!";
  if (total > 100) return "You're learning to navigate the digital world more consciously.";
  return "There's still much to learn about digital rights and data governance.";
};

const HeaderShapes = () => (
  <div className="flex justify-center gap-4 mb-12">
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className={`w-4 h-4 ${
          i % 3 === 0 ? 'rounded-full' : 
          i % 3 === 1 ? 'rotate-45' : 'rounded-lg'
        } bg-black`}
      />
    ))}
  </div>
);

const getImpactColor = (value) => {
  if (value >= 75) return "text-black";
  if (value >= 50) return "text-black";
  return "text-black";
};

const GeometricDataGame = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [showSummary, setShowSummary] = useState(false);

  const handleChoice = (choice) => {
    setStats(prev => {
      const newStats = { ...prev };
      Object.entries(choice.effect).forEach(([key, value]) => {
        if (key === 'members') {
          newStats[key] = Math.max(0, prev[key] + value);
        } else {
          newStats[key] = Math.max(0, Math.min(100, prev[key] + value));
        }
      });
      return newStats;
    });

    if (typeof choice.next === 'string' && (choice.next === 'good_end' || choice.next === 'bad_end')) {
      setShowSummary(true);
    } else {
      setCurrentScene(choice.next);
    }
  };

  const handleReset = () => {
    setCurrentScene(0);
    setStats(INITIAL_STATS);
    setShowSummary(false);
  };

  if (showSummary) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-white">
        <div className="mb-12 border border-black p-8">
          <h2 className="text-2xl font-bold mb-6">Your Data Coalition Journey Complete!</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="p-4 border border-black">
                  <div className="flex justify-between items-center">
                    <span className="capitalize">{key}:</span>
                    <span className={`font-bold ${key !== 'members' ? getImpactColor(value) : ''}`}>
                      {key === 'members' ? value.toLocaleString() : `${value}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border border-black mt-6">
              <h3 className="font-bold mb-2">Your Leadership Style</h3>
              <p>{calculateEnding(stats)}</p>
            </div>

            <button 
              className="w-full p-4 border border-black hover:bg-black hover:text-white transition-colors"
              onClick={handleReset}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSceneData = scenes.find(scene => scene.id === currentScene);
  if (!currentSceneData) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white">
    
      <div className="mb-12 border border-black p-8">
        <h2 className="text-2xl font-bold mb-6">{currentSceneData.title}</h2>
        <p className="text-lg mb-8">{currentSceneData.description}</p>
        
        <div className="space-y-4">
          {currentSceneData.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(choice)}
              className="w-full p-4 border border-black hover:bg-black hover:text-white transition-colors text-left"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="p-4 border border-black">
            <div className="text-sm capitalize">{key}</div>
            <div className={`text-lg font-bold ${key !== 'members' ? getImpactColor(value) : ''}`}>
              {key === 'members' ? value.toLocaleString() : `${value}%`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeometricDataGame;