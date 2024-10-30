'use client';

import { useState } from 'react';

// Define allowed shape types
type ShapeType = 'circle' | 'square' | 'hexagon' | 'choose' | 'your' | 'probe';

// Define item interface
interface Item {
  id: number;
  name: string;
  href: string;
  shape: ShapeType;
  number: string;
  description: string;
}

const Home = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const items: Item[] = [
    { id: 1, name: "Bias within Algorithms", href: '/gender-analyzer', shape: 'circle', number: '001', description: "Explore the concept of bias within AI algorithms" },
    { id: 2, name: "Data Commons", href: '/data-commons', shape: 'square', number: '002', description: "Explore shared datasets" },
    { id: 3, name: "Gatekeeping Simulator", href: '/gate-keeping-simulator', shape: 'circle', number: '003', description: "Explore who controls content streams" },
    { id: 4, name: "Misinformation Spread", href: '/misinformation-simulator', shape: 'hexagon', number: '004', description: "Explore how information spreads from the source" },
    { id: 5, name: "Data Coalitions", href: '/geometric-data-game', shape: 'circle', number: '005', description: "Explore the conept of data coalitions" },
    { id: 6, name: "Component F", href: '/f', shape: 'square', number: '006', description: "View component details" },
  ];

  const getShapeClasses = (shape: ShapeType): string => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'choose':
        return '';
      case 'your':
        return 'rounded-lg';
      case 'probe':
        return 'rounded-xl';
      default:
        return '';
    }
  };


  return (
    <div className="p-8 bg-white">
      {/* Header */}
      <div className="flex items-center mb-8">
        <h1 className="font-mono text-2xl">Digital Probes Archive</h1>
        
      </div>

      <div className="flex gap-8 mb-16">
        <div className="relative max-w-2xl">
          <p className="font-mono text-xs text-gray-500 leading-relaxed">
            {`This Digital Probes Archive serves as an interactive collection of tools designed to illuminate the complex relationship between artificial intelligence and our digital commons. Each probe functions as a hands-on experiment, allowing citizens to directly engage with and understand how AI systems can impact our civic autonomy. From exploring algorithmic bias to examining data ownership, these probes reveal the often invisible ways AI shapes our digital landscape. By making these concepts tangible and explorable, the archive empowers visitors to think critically about AI's role in our society and the importance of protecting our collective digital rights.`}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="block relative cursor-pointer group"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="aspect-square relative">
              {/* Shape */}
              <div className={`
                w-full h-full bg-black
                ${getShapeClasses(item.shape)}
                transition-all duration-300
                group-hover:scale-105
                relative
                overflow-hidden
              `}>
                {/* Hover Content */}
                <div className={`
                  absolute inset-0 flex flex-col justify-center items-center text-white
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  p-6 text-center
                `}>
                  <div className="font-mono text-lg mb-2">{`${item.number} ${item.name}`}</div>
                  <div className="font-mono text-sm">{item.description}</div>
                </div>
              </div>
              
              {/* Labels */}
              <div className="absolute -bottom-8 left-0 right-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs text-gray-400">{item.number}</span>
                  <span className="font-mono text-sm text-gray-500 group-hover:text-black transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 flex justify-between items-center">
        <span className="font-mono text-xs text-gray-400">01</span>
        <span className="font-mono text-sm">Archive Index</span>
        <span className="font-mono text-xs text-gray-400">2024</span>
      </div>
    </div>
  );
};

export default Home;