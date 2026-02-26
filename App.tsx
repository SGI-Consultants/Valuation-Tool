
import React, { useState } from 'react';
import ValuationForm from './components/ValuationForm';
import ValuationResult from './components/ValuationResult';
import { StartupData } from './types';
import { getValuationAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeStartupName, setActiveStartupName] = useState<string>('');
  const [error, setError] = useState<{ message: string; type: 'api_key' | 'network' | 'model' | 'general' } | null>(null);
  const [submittedData, setSubmittedData] = useState<StartupData | null>(null);

  const handleValuationSubmit = async (data: StartupData) => {
    setSubmittedData(data);
    await performValuation(data);
  };

  const performValuation = async (data: StartupData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStartupName(data.name);
    
    try {
      const analysis = await getValuationAnalysis(data);
      setResult(analysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      const lowerMsg = errorMessage.toLowerCase();
      
      let type: 'api_key' | 'network' | 'model' | 'general' = 'general';
      let userFriendlyMessage = errorMessage;

      if (lowerMsg.includes('api key') || lowerMsg.includes('unauthorized') || lowerMsg.includes('401') || lowerMsg.includes('403')) {
        type = 'api_key';
        userFriendlyMessage = 'Authentication failed. Please check your API key configuration.';
      } else if (lowerMsg.includes('network') || lowerMsg.includes('fetch') || lowerMsg.includes('failed to fetch')) {
        type = 'network';
        userFriendlyMessage = 'Network error. Please check your internet connection and try again.';
      } else if (lowerMsg.includes('model') || lowerMsg.includes('quota') || lowerMsg.includes('rate limit') || lowerMsg.includes('429') || lowerMsg.includes('503')) {
        type = 'model';
        userFriendlyMessage = 'The AI model is currently unavailable or rate limited. Please try again in a moment.';
      } else {
        userFriendlyMessage = `An error occurred: ${errorMessage}`;
      }

      setError({ message: userFriendlyMessage, type });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (submittedData) {
      performValuation(submittedData);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50/30">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-12 mb-12">
        <div className="max-w-4xl mx-auto px-4 text-center md:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">SGI Startup Valuation Tool</h1>
          <p className="text-slate-500 max-w-2xl text-lg">
            Professional-grade pre-money valuation estimates for early-stage UK startups. 
            Utilising industry-standard logic and proprietary weighting for team, IP, and market size.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
          <section>
            <ValuationForm onSubmit={handleValuationSubmit} isLoading={loading} />
          </section>

          {error && (
            <div className={`border px-6 py-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              error.type === 'api_key' ? 'bg-amber-50 border-amber-200 text-amber-800' :
              error.type === 'network' ? 'bg-blue-50 border-blue-200 text-blue-800' :
              error.type === 'model' ? 'bg-orange-50 border-orange-200 text-orange-800' :
              'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center gap-3">
                <i className={`fas ${
                  error.type === 'api_key' ? 'fa-key' :
                  error.type === 'network' ? 'fa-wifi' :
                  error.type === 'model' ? 'fa-robot' :
                  'fa-exclamation-triangle'
                } text-lg`}></i>
                <span>{error.message}</span>
              </div>
              {submittedData && (
                <button
                  onClick={handleRetry}
                  disabled={loading}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    error.type === 'api_key' ? 'bg-amber-100 hover:bg-amber-200 text-amber-900' :
                    error.type === 'network' ? 'bg-blue-100 hover:bg-blue-200 text-blue-900' :
                    error.type === 'model' ? 'bg-orange-100 hover:bg-orange-200 text-orange-900' :
                    'bg-red-100 hover:bg-red-200 text-red-900'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-redo'} mr-2`}></i>
                  {loading ? 'Retrying...' : 'Retry Analysis'}
                </button>
              )}
            </div>
          )}

          {result && (
            <section id="results-section">
              <ValuationResult result={result} startupName={activeStartupName} />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-8 text-slate-400">
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-emerald-500"></i>
              <span className="text-xs font-semibold uppercase tracking-widest">Industry Standard Logic</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-emerald-500"></i>
              <span className="text-xs font-semibold uppercase tracking-widest">Market Adjusted</span>
            </div>
          </div>
          
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <p className="text-slate-600 font-medium">© 2026 SGI Consultants. All Rights Reserved.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-sm text-slate-500">
              <a href="mailto:hello@startgrowimprove.com" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <i className="fas fa-envelope text-slate-400"></i>
                hello@startgrowimprove.com
              </a>
              <span className="hidden md:block text-slate-300">|</span>
              <a href="tel:+442033988685" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
                <i className="fas fa-phone text-slate-400"></i>
                +44 20 3398 8685
              </a>
              <span className="hidden md:block text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-slate-400"></i>
                20 Dawes Rd, London SW6 7EN
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
