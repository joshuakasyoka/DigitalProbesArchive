'use client';

import React, { useState, useEffect } from 'react';

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  label: string;
  stage: number;
  info: string;
}

interface NetworkNodeProps {
  x: number;
  y: number;
  size: number;
  opacity: number;
  label: string;
  active: boolean;
  pulsing: boolean;
  locked: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  active: boolean;
}

const NetworkNode: React.FC<NetworkNodeProps> = ({ x, y, size, opacity, label, active, locked, onClick }) => (
  <div 
    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
    style={{ 
      left: `${x}%`, 
      top: `${y}%`, 
      opacity: opacity
    }}
    onClick={onClick}
  >
    <div 
      className={`border border-black transition-all duration-300 flex items-center justify-center
        ${active ? 'bg-black' : 'bg-white'}
        ${locked ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-100'}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
      }}
    >
      {locked && (
        <div className="text-xs">□</div>
      )}
    </div>
    <div className="absolute top-full mt-1 text-xs text-center font-mono">
      {label}
    </div>
  </div>
);

const ConnectionLine: React.FC<ConnectionLineProps> = ({ x1, y1, x2, y2, opacity }) => (
  <svg 
    className="absolute top-0 left-0 w-full h-full pointer-events-none"
    style={{ opacity }}
  >
    <line 
      x1={`${x1}%`} 
      y1={`${y1}%`} 
      x2={`${x2}%`} 
      y2={`${y2}%`} 
      stroke="black"
      strokeWidth="1"
    />
  </svg>
);

const MisinformationSimulator = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(['source']);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [metrics, setMetrics] = useState({
    reach: 0,
    engagement: 0,
    credibility: 0
  });

  // New states for floating reflection points
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const reflectionPoints = [
    "How do echo chambers amplify misinformation?",
    "What role do influencers play in lending credibility?",
    "How does cross-platform spread create perceived legitimacy?",
    "Why might traditional media cover viral misinformation?",
    "What makes some narratives more 'sticky' than others?",
    "How do emotional responses accelerate spread?",
    "What responsibility do platforms have in prevention?",
    "How can individual users help stop misinformation?"
  ];

  // Add useEffect for floating reflection points
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) =>
          prevIndex === reflectionPoints.length - 1 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 500);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [reflectionPoints.length]);

  const nodes: Node[] = [
    { id: 'source', x: 50, y: 20, size: 24, label: 'Original Source', stage: 0,
      info: "A misleading story is crafted, often mixing truth with falsehood for credibility" },
    { id: 'forum', x: 30, y: 35, size: 24, label: 'Fringe Forums', stage: 1,
      info: "Initial spread through niche communities that are receptive to the narrative" },
    { id: 'telegram', x: 70, y: 35, size: 24, label: 'Private Groups', stage: 1,
      info: "Closed messaging groups where content can spread without fact-checking" },
    { id: 'influencer1', x: 20, y: 50, size: 24, label: 'Key Influencer', stage: 2,
      info: "Influential figures amplify the content, adding perceived legitimacy" },
    { id: 'influencer2', x: 80, y: 50, size: 24, label: 'Content Creator', stage: 2,
      info: "Creates engaging content around the story, increasing its reach" },
    { id: 'twitter', x: 40, y: 65, size: 24, label: 'Social Platform A', stage: 3,
      info: "Rapid viral spread across major social media platforms" },
    { id: 'facebook', x: 60, y: 65, size: 24, label: 'Social Platform B', stage: 3,
      info: "Cross-platform amplification creates an illusion of widespread belief" },
    { id: 'media', x: 30, y: 80, size: 24, label: 'News Media', stage: 4,
      info: "Traditional media coverage, often in the context of 'people are saying'" },
    { id: 'politics', x: 70, y: 80, size: 24, label: 'Political Groups', stage: 4,
      info: "Integration into political narratives and policy discussions" }
  ];

  const stageInfo = [
    {
      title: "Creation & Seeding",
      description: "Click on the source node to see how misinformation begins its journey",
      tip: "Misinformation often starts with a kernel of truth, twisted to serve a specific agenda"
    },
    {
      title: "Initial Distribution",
      description: "Explore how content spreads through early communities",
      tip: "Early spreading often happens in echo chambers where the content isn't challenged"
    },
    {
      title: "Influencer Amplification",
      description: "Watch how influential figures boost the signal",
      tip: "Key amplifiers often add their own spin, making the content more engaging"
    },
    {
      title: "Platform Virality",
      description: "See how major platforms accelerate the spread",
      tip: "Cross-platform posting creates an illusion of independent verification"
    },
    {
      title: "Institutional Impact",
      description: "Observe how the story achieves mainstream acceptance",
      tip: "By this stage, the original context is often lost or distorted"
    }
  ];

  interface Connection {
    from: string;
    to: string;
    stage: number;
  }

  const connections: Connection[] = [
    { from: 'source', to: 'forum', stage: 1 },
    { from: 'source', to: 'telegram', stage: 1 },
    { from: 'forum', to: 'influencer1', stage: 2 },
    { from: 'telegram', to: 'influencer2', stage: 2 },
    { from: 'influencer1', to: 'twitter', stage: 3 },
    { from: 'influencer2', to: 'facebook', stage: 3 },
    { from: 'twitter', to: 'media', stage: 4 },
    { from: 'facebook', to: 'politics', stage: 4 }
  ];

  const handleNodeClick = (node: Node) => {
    if (!unlockedNodes.includes(node.id)) return;
    
    setSelectedNode(node);
    updateMetrics(node);
    
    const newConnections = connections
      .filter(conn => conn.from === node.id && !activeConnections.includes(`${conn.from}-${conn.to}`));
    
    if (newConnections.length > 0) {
      setActiveConnections(prev => [...prev, ...newConnections.map(conn => `${conn.from}-${conn.to}`)]);
      setUnlockedNodes(prev => [
        ...prev,
        ...newConnections.map(conn => conn.to)
      ]);
      setActiveStage(node.stage + 1);
    }
  };

  const updateMetrics = (node: Node) => {
    setMetrics(prev => ({
      reach: prev.reach + (node.size * 1000),
      engagement: prev.engagement + Math.floor(Math.random() * 20) + 10,
      credibility: Math.max(0, Math.min(100, prev.credibility + (node.stage === 4 ? 20 : -5)))
    }));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start bg-white">
      <div className="w-full max-w-4xl p-8 font-mono flex flex-col items-center relative">
        {/* Floating Reflection Points Box */}
        <div className="fixed top-8 right-8 w-64 z-50">
          <div
            className={`
              border border-black bg-white p-4 shadow-lg font-mono
              transform transition-all duration-500 ease-in-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}
          >
            <div className="text-xs uppercase tracking-wide mb-2">Reflection Points:</div>
            <div className="text-sm">
              {reflectionPoints[currentQuestionIndex]}
            </div>
          </div>
        </div>

        <h2 className="text-xl mb-8 text-xl text-sm font-mono">How Information Spreads</h2>

        <div className="w-full border border-black p-4 mb-8">
          <div className="font-mono text-center">
            {selectedNode ? selectedNode.info : stageInfo[activeStage].description}
          </div>
        </div>

        <div className="relative h-96 w-full border border-black mb-8">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            const isActive = activeConnections.includes(`${conn.from}-${conn.to}`);
            return (
              <ConnectionLine 
                key={idx}
                x1={fromNode!.x}
                y1={fromNode!.y}
                x2={toNode!.x}
                y2={toNode!.y}
                opacity={isActive ? 1 : 0.2}
                active={isActive}
              />
            );
          })}
          
          {nodes.map((node) => (
            <NetworkNode 
              key={node.id}
              {...node}
              active={selectedNode?.id === node.id}
              pulsing={unlockedNodes.includes(node.id) && !activeConnections.some(conn => conn.startsWith(node.id))}
              locked={!unlockedNodes.includes(node.id)}
              opacity={unlockedNodes.includes(node.id) ? 1 : 0.3}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        <div className="w-full border border-black p-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xs">⬤</span>
            <span>Stage: {stageInfo[activeStage].title}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-4">
            <div className="flex items-center space-x-2">
              <span>⬤</span>
              <span>Reach: {metrics.reach.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>◐</span>
              <span>Engagement: {metrics.engagement}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>○</span>
              <span>Credibility: {metrics.credibility}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisinformationSimulator;