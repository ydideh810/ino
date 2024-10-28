import React from 'react';
import { Send } from 'lucide-react';
import { InputFormProps } from '../types';

export function InputForm({
  input,
  activeTab,
  onInputChange,
  onSubmit,
}: InputFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed bottom-0 left-0 right-0 glass-panel"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={
              activeTab === 'chat'
                ? 'Ask about research, engineering, or innovations...'
                : 'Describe the image you want to generate...'
            }
            className="flex-1 bg-white/5 border border-red-500/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 glow"
          >
            <Send className="w-5 h-5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </form>
  );
}
