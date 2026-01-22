
export enum Industry {
  SAAS = 'SaaS',
  ECOMMERCE = 'E-commerce / D2C',
  FINTECH = 'Fintech',
  HEALTHCARE = 'Healthcare / Biotech',
  DEEPTECH = 'Deep Tech / AI',
  MARKETPLACE = 'Marketplace / Platform',
  EDTECH = 'EdTech',
  PROPTECH = 'PropTech',
  CLEANTECH = 'CleanTech / Sustainability',
  CYBERSECURITY = 'Cybersecurity',
  LOGISTICS = 'Logistics / Supply Chain',
  GAMING = 'Gaming / Entertainment',
  CONSUMER = 'Consumer Tech / Apps',
  SERVICES = 'Professional Services / Agency',
  OTHER = 'Other'
}

export enum TeamStrength {
  INEXPERIENCED = 'Inexperienced / First-time',
  EXPERIENCED = 'Experienced / Domain Experts',
  SENIOR = 'Senior / Successful Ex-Founders'
}

export enum IPStatus {
  NONE = 'None',
  PARTIAL = 'Partially Owned / Trade Secrets',
  OWNED = 'Fully Owned / Patented'
}

export enum MarketSize {
  NICHE = 'Niche (£10M - £100M)',
  LARGE = 'Large (£100M - £1B)',
  HUGE = 'Huge / Global (£1B+)'
}

export interface StartupData {
  name: string;
  industry: Industry;
  annualRevenue: number;
  growthRate: number;
  teamStrength: TeamStrength;
  ipStatus: IPStatus;
  marketSize: MarketSize;
  description: string;
}

export interface ValuationResult {
  analysis: string;
  timestamp: string;
}
