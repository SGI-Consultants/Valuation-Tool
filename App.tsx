
import React, { useState } from 'react';
import ValuationForm from './components/ValuationForm';
import ValuationResult from './components/ValuationResult';
import { StartupData } from './types';
import { getValuationAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [activeStartupName, setActiveStartupName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleValuationSubmit = async (data: StartupData) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStartupName(data.name);
    
    try {
      const analysis = await getValuationAnalysis(data);
      setResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
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
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg flex items-center gap-3">
              <i className="fas fa-exclamation-triangle"></i>
              <span>{error}</span>
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
