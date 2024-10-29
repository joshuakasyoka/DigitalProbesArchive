import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ReturnHome = () => {
  return (
    <div className="fixed top-8 left-8">
      <Link 
        href="/" 
        className="flex items-center gap-2 group hover:opacity-70 transition-opacity duration-300"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-mono text-sm">Return to Archive</span>
      </Link>
    </div>
  );
};

export default ReturnHome;