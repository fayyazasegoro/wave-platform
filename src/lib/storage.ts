import { BusinessCanvasProject, UserSubscription, SubscriptionTier, Trend, SecondaryOpportunity, InnovationSuggestion } from '@/types';
import { INITIAL_TRENDS } from '@/data/marketIntelligence';

const STORAGE_KEYS = {
  SUBSCRIPTION: 'wave_user_subscription_v1',
  PROJECTS: 'wave_business_projects_v1',
  ACTIVE_PROJECT_ID: 'wave_active_project_id_v1',
  SAVED_TRENDS: 'wave_saved_trends_v1',
  SAVED_OPPORTUNITIES: 'wave_saved_opportunities_v1',
  SAVED_INNOVATIONS: 'wave_saved_innovations_v1',
  WATCHLIST: 'wave_watchlist_v1',
  ONBOARDING_COMPLETED: 'wave_onboarding_completed_v1',
};

export const DEFAULT_SUBSCRIPTION: UserSubscription = {
  plan: 'free',
  status: 'active',
  billingCycle: 'monthly',
  startedAt: new Date().toISOString(),
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  aiQueriesUsedThisMonth: 3,
  aiQueriesLimit: 10,
  projectsCount: 1,
  projectsLimit: 3,
  features: {
    radarBasic: true,
    forecastBasic: true,
    forecastAdvanced: false,
    beyondTheWave: false,
    waveInnovate: false,
    competitorIntelligence: false,
    marketGapFinder: false,
    waveOpportunityAdvanced: false,
    waveBuilder: false,
    businessLaunchRoadmap: false,
    financialModeling: false,
    exportReports: false,
    advancedAiConsultant: false,
  },
};

export const SUBSCRIPTION_TIERS_CONFIG: Record<SubscriptionTier, {
  name: string;
  tagline: string;
  priceFormatted: string;
  priceMonthly: number;
  features: UserSubscription['features'];
  aiQueriesLimit: number;
  projectsLimit: number;
}> = {
  free: {
    name: 'WAVE FREE',
    tagline: 'Discover the Market',
    priceFormatted: 'Rp 0',
    priceMonthly: 0,
    aiQueriesLimit: 10,
    projectsLimit: 3,
    features: {
      radarBasic: true,
      forecastBasic: true,
      forecastAdvanced: false,
      beyondTheWave: false,
      waveInnovate: false,
      competitorIntelligence: false,
      marketGapFinder: false,
      waveOpportunityAdvanced: false,
      waveBuilder: false,
      businessLaunchRoadmap: false,
      financialModeling: false,
      exportReports: false,
      advancedAiConsultant: false,
    },
  },
  premium: {
    name: 'WAVE PREMIUM',
    tagline: 'Explore & Innovate',
    priceFormatted: 'Rp 79.000 / bln',
    priceMonthly: 79000,
    aiQueriesLimit: 60,
    projectsLimit: 10,
    features: {
      radarBasic: true,
      forecastBasic: true,
      forecastAdvanced: true,
      beyondTheWave: true,
      waveInnovate: true,
      competitorIntelligence: true,
      marketGapFinder: true,
      waveOpportunityAdvanced: true,
      waveBuilder: false,
      businessLaunchRoadmap: false,
      financialModeling: false,
      exportReports: true,
      advancedAiConsultant: false,
    },
  },
  pro: {
    name: 'WAVE PRO',
    tagline: 'Build & Launch',
    priceFormatted: 'Rp 199.000 / bln',
    priceMonthly: 199000,
    aiQueriesLimit: 250,
    projectsLimit: 50,
    features: {
      radarBasic: true,
      forecastBasic: true,
      forecastAdvanced: true,
      beyondTheWave: true,
      waveInnovate: true,
      competitorIntelligence: true,
      marketGapFinder: true,
      waveOpportunityAdvanced: true,
      waveBuilder: true,
      businessLaunchRoadmap: true,
      financialModeling: true,
      exportReports: true,
      advancedAiConsultant: true,
    },
  },
};

export const INITIAL_PROJECT: BusinessCanvasProject = {
  id: 'proj-matcha-nitro',
  userId: 'user-default',
  name: 'KuroMatcha Cold Brew Nitro',
  category: 'Food & Beverages',
  description: 'Minuman matcha murni zero sugar bertekanan nitrogen mikro dalam kemasan kaleng ramping untuk pekerja urban Indonesia.',
  coverGradient: 'from-emerald-950 via-teal-900 to-navy-950',
  stage: 'in_progress',
  progressPercentage: 65,
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
  linkedTrendId: 'trend-matcha-functional',
  linkedTrendName: 'Ceremonial Grade Matcha',
  linkedOpportunityId: 'opp-matcha-whisk-kit',
  linkedOpportunityName: 'Modern Bamboo Chasen Starter Kit',
  sections: {
    businessIdea: {
      content: 'Membawa ritual matcha seremonial Jepang berkualitas tinggi ke dalam kaleng siap minum bertekanan gas nitrogen mikro yang creamy tanpa susu dan gula.',
      status: 'completed',
    },
    marketResearch: {
      content: 'Konsumsi matcha tumbuh 140% YoY di Indonesia didorong oleh pekerja kantoran yang mencari energi bersih tanpa kembung kopi asam. 90% produk komersial sarat gula, meninggalkan ceruk besar untuk produk pure wellness.',
      status: 'completed',
    },
    targetCustomer: {
      content: 'Profesional muda, entrepreneur, dan tech worker usia 24-38 tahun di Jabodetabek & Surabaya yang peduli kesehatan, rutin berolahraga, dan intoleran laktosa.',
      status: 'completed',
    },
    customerProblem: {
      content: 'Menyeduh matcha sendiri di kantor merepotkan dan sering menggumpal pahit; sedangkan membeli matcha di cafe mall memakan waktu dan kalorinya tinggi.',
      status: 'completed',
    },
    valueProposition: {
      content: 'Sensasi creamy matcha latte autentik Jepang seketika dalam kaleng dingin bertekanan nitrogen tanpa tambahan sebutir pun gula atau susu.',
      status: 'completed',
    },
    productServiceConcept: {
      content: 'Cold-Brew Nitrogen Matcha Can 250ml dalam kaleng aluminium matte hitam minimalis. Menggunakan 100% Tencha Uji Jepang first harvest.',
      status: 'completed',
    },
    productInnovation: {
      content: 'Ekstraksi dingin 12 jam pada 4°C untuk meminimalisir rasa pahit tannin, dipadukan mikro-nitrogen yang membentuk buih busa velvety saat kaleng dibuka.',
      status: 'completed',
    },
    competitorAnalysis: {
      content: 'Kompetitor utama seperti cafe matcha menyajikan minuman manis tinggi kalori. RTD supermarket didominasi teh hijau aroma melati biasa dengan kadar gula >18g.',
      status: 'in_progress',
    },
    uspDifferentiation: {
      content: 'Satu-satunya matcha nitrogen kaleng zero kalori di Indonesia dengan transparansi sertifikat asal kebun teh Kyoto dan Halal resmi.',
      status: 'completed',
    },
    businessModel: {
      content: 'Direct-to-Consumer (D2C) via Tokopedia/Shopee Mall dengan model paket bundling mingguan (6 kaleng), serta konsinyasi di gym boutique & specialty coffee shops.',
      status: 'in_progress',
    },
    pricingStrategy: {
      content: 'Harga retail Rp 35.000 / kaleng (250ml). Paket mingguan (6 kaleng) Rp 195.000. Harga kompetitif dibandingkan matcha cafe (Rp 45.000+).',
      status: 'in_progress',
    },
    financialPlanning: {
      content: 'COGS per kaleng Rp 12.500 menghasilkan Gross Margin 64,3%. Titik impas (BEP) tercapai pada penjualan 1.850 kaleng/bulan.',
      status: 'in_progress',
      data: {
        sellingPrice: 35000,
        cogs: 12500,
        grossMarginPercent: 64.3,
        monthlyTargetUnits: 4000,
        fixedMonthlyCosts: 18000000,
        marketingBudget: 12000000,
        initialInvestment: 75000000,
        workingCapital: 25000000,
        breakEvenUnits: 1333,
        breakEvenMonths: 3.5,
        projectedMonthlyRevenue: 140000000,
        projectedMonthlyProfit: 60000000,
        assumptions: [
          'Biaya bahan baku matcha impor Jepang Rp 6.200 per porsi kaleng',
          'Biaya kaleng aluminium printing & nitrogen filling maklon Rp 4.800',
          'Biaya packaging kardus & label seal Rp 1.500',
          'Biaya sewa ruang operasional & chiller komersial Rp 10.000.000/bln',
          'Gaji 2 staf operasional dan fulfillment Rp 8.000.000/bln'
        ]
      }
    },
    marketingStrategy: {
      content: 'Strategi seeding ke 50 wellness micro-influencer, endorsement dokter gizi/spesialis lambung, booth sampling di lapangan padel dan studio pilates Jakarta Selatan.',
      status: 'in_progress',
    },
    operationalPlanning: {
      content: 'Kerjasama toll-manufacturing (maklon) minuman kaleng bersertifikat CPPOB & BPOM di Cikarang. Pengadaan bubuk matcha langsung dari supplier importir resmi Kyoto.',
      status: 'in_progress',
    },
    launchRoadmap: {
      content: 'Rencana peluncuran 12 minggu dari formulasi resep hingga grand launch di festival kopi Jakarta.',
      status: 'in_progress',
      tasks: [
        {
          id: 'task-1',
          stageIndex: 1,
          stageName: 'Business Validation',
          taskName: 'Riset uji rasa organoleptik dengan 50 pecinta matcha',
          description: 'Lakukan blind taste test untuk membandingkan 3 varietas bubuk tencha.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 1-2',
          dependencies: [],
          status: 'done',
          completionDate: '02 Nov 2026',
          notes: 'Varietas Tencha A (Uji single cultivar) dipilih 88% responden karena aftertaste manis alami.',
        },
        {
          id: 'task-2',
          stageIndex: 2,
          stageName: 'Market Validation',
          taskName: 'Landing page pre-order test untuk mengukur minat pembeli',
          description: 'Bangun halaman penawaran produk awal untuk melihat conversion rate pemesanan.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 2-3',
          dependencies: ['task-1'],
          status: 'done',
          completionDate: '08 Nov 2026',
          notes: 'Mendapat 320 pendaftar waiting-list dalam tempo 5 hari kampanye Instagram organik.',
        },
        {
          id: 'task-3',
          stageIndex: 3,
          stageName: 'Product Development',
          taskName: 'Finalisasi uji stabilitas nitrogen can seaming',
          description: 'Pastikan tekanan gas nitrogen mikro stabil selama 60 hari penyimpanan suhu 4-8°C.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 3-4',
          dependencies: ['task-2'],
          status: 'in_progress',
          notes: 'Pengujian batch laboratorium ke-2 sedang berlangsung di fasilitas maklon.',
        },
        {
          id: 'task-4',
          stageIndex: 4,
          stageName: 'Supplier Research',
          taskName: 'Negosiasi kontrak MOQ bubuk matcha dengan importir Shizuoka',
          description: 'Kunci harga bahan baku untuk 6 bulan ke depan agar terhindar dari lonjakan kurs.',
          priority: 'Medium',
          estimatedTimeframe: 'Minggu 4-5',
          dependencies: ['task-1'],
          status: 'in_progress',
          notes: 'Supplier bersedia memberikan MOQ 25kg dengan diskon 12%.',
        },
        {
          id: 'task-5',
          stageIndex: 5,
          stageName: 'Cost Calculation',
          taskName: 'Finalisasi kalkulasi COGS & struktur harga distributor',
          description: 'Hitung margin margin retailer 25% dan distributor 35%.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 5',
          dependencies: ['task-4'],
          status: 'done',
          completionDate: '11 Nov 2026',
          notes: 'Simulasi harga aman dengan gross margin 64% pada HET Rp 35.000.',
        },
        {
          id: 'task-6',
          stageIndex: 6,
          stageName: 'Branding',
          taskName: 'Desain identitas visual kaleng aluminium matte & unboxing box',
          description: 'Kembangkan visual bergaya minimalis Jepang kontemporer.',
          priority: 'Medium',
          estimatedTimeframe: 'Minggu 6',
          dependencies: ['task-2'],
          status: 'in_progress',
          notes: 'Desain 3D mockup kaleng sudah disetujui.',
        },
        {
          id: 'task-7',
          stageIndex: 7,
          stageName: 'Packaging & BPOM',
          taskName: 'Pengajuan izin edar BPOM MD & sertifikasi Halal maklon',
          description: 'Kelengkapan dokumen lab nutrisi dan uji mikroba.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 7-9',
          dependencies: ['task-3'],
          status: 'todo',
          notes: 'Pabrik maklon sudah memiliki izin fasilitas CPPOB A sehingga proses notifikasi relatif cepat.',
        },
        {
          id: 'task-8',
          stageIndex: 8,
          stageName: 'Marketing Preparation',
          taskName: 'Pengiriman seeding kit eksklusif ke 30 influencer & athlete',
          description: 'Paket kaleng dingin khusus dengan es batu kristal dan kartu pesan personal.',
          priority: 'Medium',
          estimatedTimeframe: 'Minggu 10',
          dependencies: ['task-6', 'task-7'],
          status: 'todo',
          notes: 'Daftar nama KOL sudah dikurasi.',
        },
        {
          id: 'task-9',
          stageIndex: 9,
          stageName: 'Launch Preparation',
          taskName: 'Setup toko online resmi Shopee Mall & TikTok Shop',
          description: 'Konfigurasi inventori gudang fulfillment dan promo pembukaan.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 11',
          dependencies: ['task-7'],
          status: 'todo',
          notes: 'Persiapan bundle pre-launch diskon 15%.',
        },
        {
          id: 'task-10',
          stageIndex: 10,
          stageName: 'Business Launch',
          taskName: 'Peluncuran perdana dan aktivasi booth di Turnamen Padel',
          description: 'Distribusi 1.000 kaleng perdana.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 12',
          dependencies: ['task-8', 'task-9'],
          status: 'todo',
          notes: 'Target 1.000 kaleng terjual habis dalam 7 hari pertama.',
        },
      ]
    }
  }
};

export const Storage = {
  // Subscription
  getSubscription(): UserSubscription {
    if (typeof window === 'undefined') return DEFAULT_SUBSCRIPTION;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(DEFAULT_SUBSCRIPTION));
        return DEFAULT_SUBSCRIPTION;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_SUBSCRIPTION;
    }
  },

  setSubscriptionTier(tier: SubscriptionTier): UserSubscription {
    const config = SUBSCRIPTION_TIERS_CONFIG[tier];
    const current = this.getSubscription();
    const updated: UserSubscription = {
      ...current,
      plan: tier,
      status: 'active',
      aiQueriesLimit: config.aiQueriesLimit,
      projectsLimit: config.projectsLimit,
      features: { ...config.features },
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(updated));
    }
    return updated;
  },

  decrementAiQuota(): boolean {
    const sub = this.getSubscription();
    if (sub.aiQueriesUsedThisMonth >= sub.aiQueriesLimit) {
      return false;
    }
    sub.aiQueriesUsedThisMonth += 1;
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(sub));
    }
    return true;
  },

  // Projects
  getProjects(): BusinessCanvasProject[] {
    if (typeof window === 'undefined') return [INITIAL_PROJECT];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (!data) {
        const initial = [INITIAL_PROJECT];
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [INITIAL_PROJECT];
    }
  },

  getProjectById(id: string): BusinessCanvasProject | undefined {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id);
  },

  saveProject(project: BusinessCanvasProject): BusinessCanvasProject {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === project.id);
    
    // Calculate progress
    const sectionKeys = Object.keys(project.sections) as (keyof typeof project.sections)[];
    const completedCount = sectionKeys.filter(
      (k) => project.sections[k].status === 'completed'
    ).length;
    const progressPercentage = Math.round((completedCount / sectionKeys.length) * 100);

    const updatedProject: BusinessCanvasProject = {
      ...project,
      progressPercentage,
      updatedAt: new Date().toISOString(),
    };

    if (index >= 0) {
      projects[index] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT_ID, updatedProject.id);
    }
    return updatedProject;
  },

  createProject(name: string, category: BusinessCanvasProject['category'], description: string): BusinessCanvasProject {
    const newProject: BusinessCanvasProject = {
      id: `proj-${Date.now()}`,
      userId: 'user-default',
      name,
      category,
      description,
      coverGradient: 'from-navy-900 via-navy-850 to-slate-900',
      stage: 'draft',
      progressPercentage: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sections: {
        businessIdea: { content: description || 'Konsep ide bisnis baru...', status: 'draft' },
        marketResearch: { content: '', status: 'draft' },
        targetCustomer: { content: '', status: 'draft' },
        customerProblem: { content: '', status: 'draft' },
        valueProposition: { content: '', status: 'draft' },
        productServiceConcept: { content: '', status: 'draft' },
        productInnovation: { content: '', status: 'draft' },
        competitorAnalysis: { content: '', status: 'draft' },
        uspDifferentiation: { content: '', status: 'draft' },
        businessModel: { content: '', status: 'draft' },
        pricingStrategy: { content: '', status: 'draft' },
        financialPlanning: {
          content: '',
          status: 'draft',
          data: {
            sellingPrice: 50000,
            cogs: 20000,
            grossMarginPercent: 60,
            monthlyTargetUnits: 1000,
            fixedMonthlyCosts: 10000000,
            marketingBudget: 5000000,
            initialInvestment: 25000000,
            workingCapital: 10000000,
            breakEvenUnits: 334,
            breakEvenMonths: 2.5,
            projectedMonthlyRevenue: 50000000,
            projectedMonthlyProfit: 15000000,
            assumptions: ['Estimasi biaya awal berdasarkan riset pasar standar UMKM'],
          },
        },
        marketingStrategy: { content: '', status: 'draft' },
        operationalPlanning: { content: '', status: 'draft' },
        launchRoadmap: {
          content: '',
          status: 'draft',
          tasks: [
            {
              id: `task-${Date.now()}-1`,
              stageIndex: 1,
              stageName: 'Business Validation',
              taskName: 'Riset kebutuhan target konsumen',
              description: 'Wawancara 10 calon pelanggan potensial.',
              priority: 'High',
              estimatedTimeframe: 'Minggu 1',
              dependencies: [],
              status: 'todo',
              notes: '',
            },
          ],
        },
      },
    };

    return this.saveProject(newProject);
  },

  deleteProject(id: string): void {
    const projects = this.getProjects().filter((p) => p.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  },

  // Attach insights into active project
  attachTrendToProject(projectId: string, trend: Trend): BusinessCanvasProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    project.linkedTrendId = trend.id;
    project.linkedTrendName = trend.name;
    project.sections.marketResearch.content = `[Attached Trend: ${trend.name}]\n${trend.shortDescription}\n\nAnalisis Pasar:\n${trend.fullAnalysis}\n\nLifecycle: ${trend.lifecycle.toUpperCase()} | Opportunity Score: ${trend.opportunityScore}/100\nRekomendasi Masuk: ${trend.entryRecommendation} (${trend.recommendationRationale})`;
    project.sections.marketResearch.status = 'completed';

    return this.saveProject(project);
  },

  attachOpportunityToProject(projectId: string, opp: SecondaryOpportunity): BusinessCanvasProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    project.linkedOpportunityId = opp.id;
    project.linkedOpportunityName = opp.productIdea;
    project.sections.businessIdea.content = `${opp.businessConcept} — ${opp.productIdea}`;
    project.sections.businessIdea.status = 'completed';
    project.sections.targetCustomer.content = opp.targetCustomer;
    project.sections.targetCustomer.status = 'completed';
    project.sections.customerProblem.content = opp.customerNeeds.join('\n- ');
    project.sections.customerProblem.status = 'completed';

    return this.saveProject(project);
  },

  attachInnovationToProject(projectId: string, inno: InnovationSuggestion): BusinessCanvasProject | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    project.linkedInnovationId = inno.id;
    project.sections.productInnovation.content = `[${inno.dimension}: ${inno.title}]\n${inno.description}\n\nCara Kerja:\n${inno.howItWorks}`;
    project.sections.productInnovation.status = 'completed';
    
    project.sections.uspDifferentiation.content = `Value Proposition: ${inno.usp.valueProposition}\nUSP: ${inno.usp.uniqueSellingPoint}\nDiferensiasi Utama: ${inno.usp.mainDifferentiator}\nKeunggulan Bersaing: ${inno.usp.competitiveAdvantage}`;
    project.sections.uspDifferentiation.status = 'completed';

    return this.saveProject(project);
  },

  // Saved items & watchlists
  getWatchlist(): string[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return data ? JSON.parse(data) : ['trend-padel-lifestyle', 'trend-matcha-functional'];
    } catch {
      return [];
    }
  },

  toggleWatchlist(trendId: string): string[] {
    const list = this.getWatchlist();
    const idx = list.indexOf(trendId);
    let updated: string[];
    if (idx >= 0) {
      updated = list.filter((id) => id !== trendId);
    } else {
      updated = [...list, trendId];
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(updated));
    }
    return updated;
  },

  isOnboardingCompleted(): boolean {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED) === 'true';
  },

  setOnboardingCompleted(val: boolean): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, val ? 'true' : 'false');
    }
  },
};
