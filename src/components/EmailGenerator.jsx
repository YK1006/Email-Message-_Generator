import React, { useState } from 'react';
import axios from 'axios';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import OutputBox from './OutputBox';

const MESSAGE_TYPES = [
  { id: 'Professional', label: 'Professional' },
  { id: 'Casual', label: 'Casual' },
  { id: 'Academic', label: 'Academic' },
  { id: 'Apology', label: 'Apology' },
  { id: 'Follow-up', label: 'Follow-up' },
  { id: 'Networking', label: 'Networking' },
];

export default function EmailGenerator() {
  const [context, setContext] = useState('');
  const [messageType, setMessageType] = useState('Professional');
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!context.trim()) {
      setError('Please provide some context for the email.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedEmail('');

    try {
      // Assuming Vercel API routes, or Vite proxy during dev
      // For local dev without Vercel CLI, this might need a full URL if running Express separately.
      // With Vercel, it routes to /api/generate
      const response = await axios.post('/api/generate', {
        context,
        messageType
      });
      
      setGeneratedEmail(response.data.generatedEmail);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to generate email. Please make sure the API key is configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full mt-6">
      
      {/* Input Section */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col gap-6">
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-300">
            Tone & Purpose
          </label>
          <div className="flex flex-wrap gap-2">
            {MESSAGE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setMessageType(type.id)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-200 border ${
                  messageType === type.id
                    ? 'bg-brand-500/20 border-brand-500/50 text-brand-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="context" className="block text-sm font-medium text-slate-300">
            What do you want to say?
          </label>
          <div className="relative">
            <textarea
              id="context"
              rows={6}
              className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none shadow-inner"
              placeholder="e.g. Asking my professor for an extension on the math assignment due to illness..."
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
                if (error) setError('');
              }}
            />
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
              <Sparkles size={18} className="text-brand-400" />
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle size={16} />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !context.trim()}
          className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl text-white font-medium bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all overflow-hidden"
        >
          {/* Subtle shine effect on hover */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Generate Email</span>
            </>
          )}
        </button>

      </div>

      {/* Output Section */}
      <OutputBox content={generatedEmail} loading={loading} />

    </div>
  );
}
