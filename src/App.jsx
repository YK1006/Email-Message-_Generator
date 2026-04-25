import React from 'react';
import EmailGenerator from './components/EmailGenerator';
import { Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-brand-600/10 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[128px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none"></div>

      <header className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 mt-4">
        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="p-2.5 bg-brand-500/20 text-brand-400 rounded-xl ring-1 ring-brand-500/30">
            <Mail size={24} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            AI Email <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Generator</span>
          </h1>
        </div>
        <p className="text-center text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Instantly craft professional, ready-to-send emails based on a short description of what you want to say.
        </p>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 pb-16">
        <EmailGenerator />
      </main>

      <footer className="relative z-10 py-6 text-center text-slate-500 text-sm border-t border-slate-800/60 bg-slate-950/40 backdrop-blur-sm">
        <p>Built with React, Tailwind, and Gemini API. Ready for Vercel.</p>
      </footer>
    </div>
  );
}

export default App;
