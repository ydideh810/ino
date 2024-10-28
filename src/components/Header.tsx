import React from 'react';
import { Atom, Image } from 'lucide-react';
import { HeaderProps, TabType } from '../types';

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const tabs: { id: TabType; icon: React.ReactNode; label: string }[] = [
    { id: 'chat', icon: <Atom className="w-5 h-5" />, label: 'AI Assistant' },
    {
      id: 'image',
      icon: <Image className="w-5 h-5" />,
      label: 'Image Generation',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 glass-panel z-50">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold glow-text bg-gradient-to-r from-red-400 via-grey-500 to-red-600 bg-clip-text text-transparent">
              NIDAM
            </h1>
            <div className="flex space-x-4">
              {tabs.map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => onTabChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-red-500/20 to-grey-500/20 text-red-400 glow'
                      : 'text-white/60 hover:text-red-400 hover:bg-white/5'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
