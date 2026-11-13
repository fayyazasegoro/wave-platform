export type SubscriptionTier = 'free' | 'premium' | 'pro';

export type TrendCategory =
  | 'Beauty & Skincare'
  | 'Food & Beverages'
  | 'Fashion & Apparel'
  | 'Health & Wellness'
  | 'Sports & Activities'
  | 'Lifestyle & Hobbies'
  | 'Technology & Digital Products'
  | 'Home & Living'
  | 'Personal Care'
  | 'Education & Services'
  | 'Entertainment & Experiences'
  | 'Emerging Business Models';

export type TrendLifecycle =
  | 'emerging'
  | 'rising'
  | 'peak'
  | 'saturated'
  | 'declining'
  | 'evergreen';

export type DataLabel =
  | 'VERIFIED DATA'
  | 'ESTIMATED DATA'
  | 'AI-GENERATED INSIGHT'
  | 'HYPOTHESIS';

export type EntryRecommendation =
  | 'ENTER NOW'
  | 'ENTER WITH CAUTION'
  | 'WAIT AND OBSERVE'
  | 'FIND ANOTHER OPPORTUNITY';

export type CapitalScale =
  | 'Mikro (< Rp 5 Jt)'
  | 'Kecil (Rp 5 - 25 Jt)'
  | 'Menengah (Rp 25 - 100 Jt)'
  | 'Besar (> Rp 100 Jt)';

export interface HistoricalDataPoint {
  month: string;
  interest: number; // 0-100 search / social interest
  competition: number; // 0-100 density
}

export interface ForecastPoint {
  month: string;
  base: number;
  optimistic: number;
  pessimistic: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface SecondaryOpportunity {
  id: string;
  parentTrendId: string;
  parentTrendName: string;
  category: TrendCategory;
  businessConcept: string;
  productIdea: string;
  targetCustomer: string;
  customerNeeds: string[];
  demandSignals: string;
  competitionLevel: 'Low' | 'Medium' | 'High';
  entryBarriers: 'Low' | 'Medium' | 'High';
  capitalScale: CapitalScale;
  opportunityScore: number;
  lifecycleStage: TrendLifecycle;
  risks: string[];
  whyItExists: string;
  dataLabel: DataLabel;
}

export interface CompetitorInsight {
  brandName: string;
  category: string;
  targetCustomer: string;
  positioning: string;
  priceRange: string;
  strengths: string[];
  weaknesses: string[];
  customerFeedbackThemes: string[];
  differentiationOpportunities: string[];
  isVerified: boolean;
}

export interface MarketGap {
  id: string;
  title: string;
  type:
    | 'unmet_need'
    | 'product_flaw'
    | 'missing_feature'
    | 'underserved_segment'
    | 'pricing_gap'
    | 'packaging_gap'
    | 'convenience_gap';
  description: string;
  evidenceLabel: DataLabel;
  impactScore: number; // 1-100
}

export interface InnovationSuggestion {
  id: string;
  title: string;
  dimension:
    | 'Product Innovation'
    | 'Format Innovation'
    | 'Packaging Innovation'
    | 'Business Model Innovation'
    | 'Pricing Innovation'
    | 'Customer Experience Innovation'
    | 'Market Positioning Innovation';
  description: string;
  whyItMatters: string;
  howItWorks: string;
  usp: {
    valueProposition: string;
    uniqueSellingPoint: string;
    mainDifferentiator: string;
    targetCustomer: string;
    problemSolved: string;
    whyChooseUs: string;
    competitiveAdvantage: string;
    defensibility: string;
  };
  classification: 'Quick Win' | 'Strategic Innovation' | 'Breakthrough Opportunity';
  feasibilityScore: number;
  costCategory: CapitalScale;
  risks: string[];
  validationSteps: string[];
  regulatoryNotes?: string;
}

export interface Trend {
  id: string;
  name: string;
  category: TrendCategory;
  shortDescription: string;
  fullAnalysis: string;
  lifecycle: TrendLifecycle;
  demandMomentum: number; // 1-100
  growthPotential: number; // 1-100
  competitionLevel: 'Low' | 'Medium' | 'High' | 'Intense';
  competitionScore: number; // 1-100
  profitabilityPotential: number; // 1-100
  entryFeasibility: number; // 1-100
  opportunityScore: number; // Weighted composite
  dataConfidence: number; // percentage e.g. 88%
  lastUpdated: string;
  whyThisTrendMatters: string;
  entryRecommendation: EntryRecommendation;
  recommendationRationale: string;
  dataSources: string[];
  dataLabel: DataLabel;
  limitations: string;
  historicalData: HistoricalDataPoint[];
  forecastScenarios: {
    '1_3_months': ForecastPoint[];
    '3_6_months': ForecastPoint[];
    '6_12_months': ForecastPoint[];
  };
  forecastHorizons?: {
    '1_3_months': ForecastPoint[];
    '3_6_months': ForecastPoint[];
    '6_12_months': ForecastPoint[];
  };
  secondaryOpportunities: SecondaryOpportunity[];
  competitors: CompetitorInsight[];
  marketGaps: MarketGap[];
  innovations: InnovationSuggestion[];
  regulatoryConsiderations?: {
    agency: string; // e.g. BPOM, Halal BPJPH, Kemenkes, PIRT
    requirements: string[];
    advisoryNotice: string;
  };
}

export interface RoadmapTask {
  id: string;
  stageIndex: number;
  stageName: string;
  taskName: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedTimeframe: string;
  dependencies: string[];
  status: 'todo' | 'in_progress' | 'done';
  completionDate?: string;
  notes: string;
}

export interface CanvasFinancials {
  sellingPrice: number;
  cogs: number;
  grossMarginPercent: number;
  monthlyTargetUnits: number;
  fixedMonthlyCosts: number;
  marketingBudget: number;
  initialInvestment: number;
  workingCapital: number;
  breakEvenUnits: number;
  breakEvenMonths: number;
  projectedMonthlyRevenue: number;
  projectedMonthlyProfit: number;
  assumptions: string[];
}

export interface BusinessCanvasProject {
  id: string;
  userId: string;
  name: string;
  category: TrendCategory;
  description: string;
  coverGradient?: string;
  stage: 'draft' | 'in_progress' | 'completed' | 'needs_revision';
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
  linkedTrendId?: string;
  linkedTrendName?: string;
  linkedOpportunityId?: string;
  linkedOpportunityName?: string;
  linkedInnovationId?: string;
  
  // The 15 Structured Sections
  sections: {
    businessIdea: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    marketResearch: { content: string; status: 'draft' | 'in_progress' | 'completed'; attachedData?: any };
    targetCustomer: { content: string; personaDetails?: any; status: 'draft' | 'in_progress' | 'completed' };
    customerProblem: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    valueProposition: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    productServiceConcept: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    productInnovation: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    competitorAnalysis: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    uspDifferentiation: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    businessModel: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    pricingStrategy: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    financialPlanning: {
      content: string;
      data: CanvasFinancials;
      status: 'draft' | 'in_progress' | 'completed';
    };
    marketingStrategy: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    operationalPlanning: { content: string; status: 'draft' | 'in_progress' | 'completed' };
    launchRoadmap: {
      content: string;
      tasks: RoadmapTask[];
      status: 'draft' | 'in_progress' | 'completed';
    };
  };
}

export interface UserSubscription {
  plan: SubscriptionTier;
  status: 'active' | 'trial' | 'expired';
  billingCycle: 'monthly' | 'yearly';
  startedAt: string;
  expiresAt: string;
  aiQueriesUsedThisMonth: number;
  aiQueriesLimit: number;
  projectsCount: number;
  projectsLimit: number;
  features: {
    radarBasic: boolean;
    forecastBasic: boolean;
    forecastAdvanced: boolean;
    beyondTheWave: boolean;
    waveInnovate: boolean;
    competitorIntelligence: boolean;
    marketGapFinder: boolean;
    waveOpportunityAdvanced: boolean;
    waveBuilder: boolean;
    businessLaunchRoadmap: boolean;
    financialModeling: boolean;
    exportReports: boolean;
    advancedAiConsultant: boolean;
  };
}
