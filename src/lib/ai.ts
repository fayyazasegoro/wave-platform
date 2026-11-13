export interface AiGenerationRequest {
  action:
    | 'trend_interpretation'
    | 'business_idea_generation'
    | 'market_gap_analysis'
    | 'competitor_synthesis'
    | 'innovation_generation'
    | 'usp_creation'
    | 'business_model_generation'
    | 'financial_planning'
    | 'roadmap_recommendation';
  contextData: {
    trendName?: string;
    category?: string;
    userPrompt?: string;
    existingSections?: any;
    targetAudience?: string;
    capitalCategory?: string;
  };
}

export interface AiGenerationResponse {
  success: boolean;
  action: string;
  result: any;
  isAiLive: boolean;
  dataLabel: 'AI-GENERATED INSIGHT' | 'HYPOTHESIS';
  timestamp: string;
  notice?: string;
}

export async function generateBusinessIntelligence(
  req: AiGenerationRequest
): Promise<AiGenerationResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      // Direct call to Gemini 1.5 Flash / Pro API server-side
      const promptText = `Anda adalah Senior Product Architect & Business Strategist terkemuka di Indonesia untuk platform WAVE.
Tugas Anda: Membantu pengusaha Indonesia dengan analisis bisnis yang tajam, realistis, dan berorientasi eksekusi.
Gunakan Bahasa Indonesia profesional, jelas, tanpa jargon kosong. Hindari janji keuntungan palsu. Berikan asumsi realistis.

Aksi yang diminta: ${req.action}
Konteks Data: ${JSON.stringify(req.contextData, null, 2)}

Format respon HARUS berupa JSON murni tanpa markdown triple-backtick yang membungkus, dengan struktur yang relevan untuk aksi tersebut.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return {
            success: true,
            action: req.action,
            result: parsed,
            isAiLive: true,
            dataLabel: 'AI-GENERATED INSIGHT',
            timestamp: new Date().toISOString(),
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to built-in intelligence engine:', err);
    }
  }

  // Built-in calibrated Indonesian Business Intelligence Generator
  const result = generateSimulatedIntelligence(req);
  return {
    success: true,
    action: req.action,
    result,
    isAiLive: false,
    dataLabel: 'HYPOTHESIS',
    timestamp: new Date().toISOString(),
    notice: 'Dihasilkan oleh Mesin Inferensi Intelijen WAVE (Mode Kalibrasi Indonesia). Hubungkan GEMINI_API_KEY di environment untuk mode live LLM.',
  };
}

function generateSimulatedIntelligence(req: AiGenerationRequest) {
  const name = req.contextData.trendName || 'Inovasi Bisnis Baru';
  const category = req.contextData.category || 'Food & Beverages';

  switch (req.action) {
    case 'business_idea_generation':
      return {
        conceptName: `${name} Artisan Lab`,
        tagline: 'Solusi Terkurasi untuk Konsumen Urban Modern',
        overview: `Menciptakan brand spesialis dalam kategori ${category} dengan fokus pada kualitas premium, transparansi bahan baku, dan kemudahan akses digital (omnichannel).`,
        targetAudience: 'Konsumen usia 22-38 tahun di wilayah urban (Jabodetabek, Surabaya, Bandung) dengan daya beli menengah ke atas.',
        valueProp: 'Kombinasi kualitas standar internasional dengan kearifan rasa & kebutuhan spesifik gaya hidup tropis Indonesia.',
        initialCapital: 'Rp 15.000.000 - Rp 35.000.000',
        keyDifferentiator: 'Bukan produk massal biasa; fokus pada efikasi teruji dan desain kemasan ramah lingkungan yang estetik.',
        validationSteps: [
          'Uji minat pre-order via Instagram Reels & TikTok organik',
          'Sampling 20 paket kepada komunitas target',
          'Kalkulasi unit economics presisi sebelum peluncuran'
        ]
      };

    case 'usp_creation':
      return {
        valueProposition: `Pilihan paling cerdas untuk ${name} tanpa kompromi pada kualitas bahan atau kenyamanan penggunaan harian.`,
        uniqueSellingPoint: `Formula & Desain Khusus Iklim Tropis dengan 100% Bahan Alami Teruji Lab.`,
        mainDifferentiator: 'Transparansi rantai pasok dan layanan konsultasi purna jual ramah via WhatsApp.',
        targetCustomer: 'Pelanggan kritis yang lelah dengan janji palsu produk murah marketplace.',
        problemSolved: 'Kekecewaan terhadap produk tiruan yang cepat rusak atau tidak berizin BPOM/SNI.',
        whyChooseUs: 'Dibuat oleh praktisi lokal yang memahami permasalahan riil di lapangan.',
        competitiveAdvantage: 'Siklus formulasi cepat dan biaya operasional yang lean.',
        defensibility: 'Komunitas pelanggan loyal dan resep/desain terdaftar HAKI.'
      };

    case 'financial_planning':
      const price = 45000;
      const cogs = 16000;
      const targetUnits = 2500;
      const fixedCost = 15000000;
      const marketing = 8000000;
      const margin = Math.round(((price - cogs) / price) * 100);
      const bep = Math.ceil((fixedCost + marketing) / (price - cogs));

      return {
        sellingPrice: price,
        cogs,
        grossMarginPercent: margin,
        monthlyTargetUnits: targetUnits,
        fixedMonthlyCosts: fixedCost,
        marketingBudget: marketing,
        initialInvestment: 50000000,
        workingCapital: 20000000,
        breakEvenUnits: bep,
        breakEvenMonths: 3.2,
        projectedMonthlyRevenue: price * targetUnits,
        projectedMonthlyProfit: (price - cogs) * targetUnits - (fixedCost + marketing),
        assumptions: [
          'Estimasi harga pokok penjualan (COGS) mencakup kemasan, bahan baku, dan ongkos tenaga kerja maklon/produksi.',
          'Biaya pemasaran dialokasikan untuk konten kreator TikTok/Instagram dan iklan Meta berbayar terukur.',
          'Pajak UMKM 0,5% PP 55/2022 belum diperhitungkan dalam laba kotor.',
          'Perhitungan ini adalah simulasi awal dan wajib diverifikasi dengan penawaran riil vendor.'
        ]
      };

    case 'roadmap_recommendation':
      return [
        {
          stageIndex: 1,
          stageName: 'Business Validation',
          taskName: 'Riset Wawancara 15 Calon Pembeli Ideal',
          description: 'Validasi pain-point dan kesediaan membayar (willingness to pay).',
          priority: 'High',
          estimatedTimeframe: 'Minggu 1-2',
          status: 'todo',
          notes: 'Fokus pada apa yang saat ini mereka gunakan dan mengapa mereka kecewa.'
        },
        {
          stageIndex: 2,
          stageName: 'Market Validation',
          taskName: 'Smoke Test / Pre-Order Campaign',
          description: 'Uji konversi landing page sederhana sebelum produksi massal.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 3',
          status: 'todo',
          notes: 'Target minimal 50 pre-order deposit tanda minat.'
        },
        {
          stageIndex: 3,
          stageName: 'Product Development & Regulatory',
          taskName: 'Kurasi Vendor Maklon & Review Persyaratan BPOM/Halal',
          description: 'Kunjungi 2 pabrik bersertifikasi CPKB/CPPOB untuk meminta sampel resmi.',
          priority: 'High',
          estimatedTimeframe: 'Minggu 4-6',
          status: 'todo',
          notes: 'Periksa kelengkapan CoA (Certificate of Analysis) bahan aktif.'
        },
        {
          stageIndex: 4,
          stageName: 'Branding & Go-To-Market',
          taskName: 'Produksi Konten Seeding & Peluncuran Resmi',
          description: 'Distribusi produk ke 20 micro-influencer kredibel.',
          priority: 'Medium',
          estimatedTimeframe: 'Minggu 7-8',
          status: 'todo',
          notes: 'Pastikan ketersediaan stok cadangan 20% untuk lonjakan pesanan awal.'
        }
      ];

    default:
      return {
        summary: `Rekomendasi strategis WAVE untuk kategori ${category} terkait ${name}.`,
        highlights: [
          'Pertumbuhan tren didorong oleh perubahan preferensi konsumen urban',
          'Fokus diferensiasi pada transparansi dan kenyamanan penggunaan',
          'Struktur biaya operasional ramping untuk menjaga modal kerja aman'
        ]
      };
  }
}
