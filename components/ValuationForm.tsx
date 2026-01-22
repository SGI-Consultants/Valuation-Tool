
import React, { useState } from 'react';
import { Industry, TeamStrength, IPStatus, MarketSize, StartupData } from '../types';

interface Props {
  onSubmit: (data: StartupData) => void;
  isLoading: boolean;
}

const ValuationForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<StartupData>({
    name: '',
    industry: Industry.SAAS,
    annualRevenue: 0,
    growthRate: 0,
    teamStrength: TeamStrength.EXPERIENCED,
    ipStatus: IPStatus.PARTIAL,
    marketSize: MarketSize.LARGE,
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'annualRevenue' || name === 'growthRate' ? Number(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h2 className="text-xl font-bold mb-6 text-slate-800 flex items-center gap-2">
          <i className="fas fa-file-invoice-dollar text-indigo-600"></i>
          Startup Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Company Name</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Acme Tech Ltd"
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Industry Sector</label>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(Industry).map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Annual Revenue (GBP £)</label>
            <input
              type="number"
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Year-on-Year Growth (%)</label>
            <input
              type="number"
              name="growthRate"
              value={formData.growthRate}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Founding Team Strength</label>
            <select
              name="teamStrength"
              value={formData.teamStrength}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(TeamStrength).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">IP Portfolio Status</label>
            <select
              name="ipStatus"
              value={formData.ipStatus}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(IPStatus).map(ip => <option key={ip} value={ip}>{ip}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-600">Target Market Size (TAM)</label>
            <select
              name="marketSize"
              value={formData.marketSize}
              onChange={handleChange}
              className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              {Object.values(MarketSize).map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-600">Short Business Description</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the product, problem solved, and target audience..."
              className="w-full p-2 border border-slate-300 rounded-md h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch animate-spin"></i>
              Analysing Data...
            </>
          ) : (
            <>
              <i className="fas fa-calculator"></i>
              Generate Valuation Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ValuationForm;
