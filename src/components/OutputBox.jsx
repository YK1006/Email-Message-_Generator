import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function OutputBox({ content, loading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!content) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="h-full glass-panel rounded-2xl flex flex-col overflow-hidden transition-all relative">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 bg-slate-900/40">
        <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          Generated Message
        </h2>
        <button
          onClick={handleCopy}
          disabled={!content || loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Copy entire email"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 min-h-[300px] relative flex flex-col">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md bg-brand-500/20 animate-pulse"></div>
              <Sparkles className="animate-bounce text-brand-400 relative z-10" size={32} />
            </div>
            <p className="text-sm font-medium animate-pulse">Crafting your message...</p>
          </div>
        ) : content ? (
          <div className="prose prose-invert prose-sm md:prose-base max-w-none text-slate-300 whitespace-pre-wrap leading-relaxed overflow-y-auto">
            {content}
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-2">
              <Sparkles size={24} className="text-slate-600" />
            </div>
            <p className="text-sm">Your generated email will appear here.</p>
            <p className="text-xs text-slate-600 max-w-xs">
              Fill out the details on the left and hit generate to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
