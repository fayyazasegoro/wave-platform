'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSubscription } from '@/context/SubscriptionContext';
import {
  TrendingUp,
  Compass,
  LineChart,
  Network,
  Lightbulb,
  Target,
  Hammer,
  Rocket,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { DataLabelBadge } from '@/components/common/DataLabelBadge';

export default function LandingPage() {
  const { subscription, changeTier, tierConfig } = useSubscription();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apa perbedaan utama WAVE dengan website pelacak tren biasa?',
      a: 'Website tren biasa hanya menampilkan grafik kata kunci populer tanpa konteks bisnis. WAVE membedah lifecycle tren, menghitung skor peluang 5-faktor, memetakan ekosistem peluang sekunder (Beyond the Wave), menghasilkan 7 dimensi inovasi produk, hingga menyusun rencana finansial dan roadmap peluncuran 12 tahap yang realistis untuk pasar Indonesia.',
    },
    {
      q: 'Apakah My Business Canvas benar-benar gratis selamanya?',
      a: 'Ya. Seluruh pengguna tier FREE dapat membuat proyek bisnis, mencatat canvas, menyimpan tren, dan memantau progres tanpa biaya. Kami tidak pernah menghapus data canvas Anda meskipun langganan Premium atau Pro berakhir.',
    },
    {
      q: 'Dari mana WAVE mendapatkan data intelijen pasar?',
      a: 'WAVE mengagregasi sinyal pencarian Google Trends Indonesia, data transaksi marketplace lokal (Shopee/Tokopedia), volume tren sosial TikTok FYP, serta statistik resmi BPS. Setiap hasil analisis dilabeli secara transparan sebagai VERIFIED DATA, ESTIMATED DATA, AI-GENERATED INSIGHT, atau HYPOTHESIS.',
    },
    {
      q: 'Apakah kalkulasi finansial di WAVE Builder menjamin profit bisnis?',
      a: 'Tidak ada bisnis yang tanpa risiko. Proyeksi finansial di WAVE Builder adalah alat simulasi berbasis asumsi harga pasar dan struktur COGS riil di Indonesia. Kami memberikan transparansi formula dan selalu mengarahkan pengguna memverifikasi penawaran riil dari pemasok/maklon sebelum produksi massal.',
    },
    {
      q: 'Bagaimana cara meningkatkan paket langganan?',
      a: 'Di fase saat ini, WAVE menyediakan lingkungan uji coba interaktif di mana Anda dapat beralih antara Free, Premium, dan Pro secara instan untuk menguji seluruh fungsionalitas sebelum gateway pembayaran resmi (Midtrans/Xendit) diaktifkan.',
    },
  ];

  return (
    <div className="min-h-screen bg-warm-ivory text-deep-sage selection:bg-soft-pistachio selection:text-deep-sage">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-warm-ivory/85 backdrop-blur-md border-b border-soft-pistachio/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-soft-pistachio to-soft-apricot flex items-center justify-center font-black text-deep-sage text-xl shadow-lg">
              W
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider text-white">WAVE</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-soft-pistachio uppercase tracking-widest">
                Business Intelligence
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-deep-sage">
            <a href="#how-it-works" className="hover:text-soft-pistachio transition-colors">Cara Kerja</a>
            <a href="#features" className="hover:text-soft-pistachio transition-colors">Fitur Unggulan</a>
            <a href="#canvas-preview" className="hover:text-soft-pistachio transition-colors">My Business Canvas</a>
            <a href="#pricing" className="hover:text-soft-pistachio transition-colors">Paket & Harga</a>
            <a href="#faq" className="hover:text-soft-pistachio transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-soft-pistachio to-soft-apricot text-deep-sage font-bold text-sm shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-ocean-400 transition-all"
            >
              Buka Aplikasi WAVE
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 overflow-hidden">
        {/* Subtle background ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-soft-pistachio/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-soft-apricot/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-pistachio/10 border border-teal-500/20 text-soft-pistachio text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-soft-pistachio" />
            Platform Intelijen Tren & Inovasi Bisnis Berbasis AI
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Find Your Next <br />
            <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-ocean-400 bg-clip-text text-transparent">
              Business Opportunity.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-deep-sage max-w-2xl mx-auto leading-relaxed mb-10">
            Temukan tren yang sedang naik, kenali celah pasar yang dilewatkan kompetitor, dan bangun bisnis yang memiliki pembeda nyata sebelum pasar menjadi jenuh.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-soft-pistachio to-soft-apricot text-deep-sage font-extrabold text-base shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              Eksplorasi WAVE Sekarang <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-warm-ivory border border-soft-pistachio/80 text-deep-sage hover:text-white hover:border-soft-pistachio font-bold text-base transition-all text-center"
            >
              Lihat Cara Kerja
            </a>
          </div>

          {/* Tagline Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-soft-pistachio">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-soft-pistachio" />
              "Ride the Wave. Build at the Right Time."
            </span>
            <span className="hidden sm:inline text-deep-sage">•</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-soft-apricot" />
              "See the trend. Find the gap. Build the future."
            </span>
          </div>
        </div>

        {/* Live Interface Preview Mockup */}
        <div className="max-w-6xl mx-auto mt-16 rounded-2xl border border-soft-pistachio bg-warm-ivory/70 backdrop-blur-xl shadow-2xl p-4 sm:p-6 relative">
          <div className="flex items-center justify-between pb-4 border-b border-soft-pistachio mb-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-soft-apricot/80" />
              <div className="w-3 h-3 rounded-full bg-soft-apricot/80" />
              <div className="w-3 h-3 rounded-full bg-soft-pistachio/80" />
              <span className="ml-2 text-xs font-mono text-soft-pistachio">wave.intel/radar/indonesia-market</span>
            </div>
            <DataLabelBadge label="VERIFIED DATA" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio">
              <div className="text-[11px] font-bold uppercase text-soft-pistachio mb-1">Health & Wellness</div>
              <div className="font-bold text-white text-base mb-1">Ceremonial Grade Matcha & Functional Drinks</div>
              <p className="text-xs text-soft-pistachio mb-3">Peralihan urban worker dari kafein asam ke l-theanine wellness.</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-soft-pistachio">
                <span className="text-soft-pistachio">Opportunity Score:</span>
                <span className="font-extrabold text-soft-pistachio">84/100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio">
              <div className="text-[11px] font-bold uppercase text-soft-apricot mb-1">Sports & Activities</div>
              <div className="font-bold text-white text-base mb-1">Padel Community & Court Athleisure</div>
              <p className="text-xs text-soft-pistachio mb-3">Ekosistem raket sosial dan fashion resortwear tropis.</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-soft-pistachio">
                <span className="text-soft-pistachio">Opportunity Score:</span>
                <span className="font-extrabold text-soft-apricot">90/100</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-soft-pistachio border border-soft-pistachio">
              <div className="text-[11px] font-bold uppercase text-muted-pistachio mb-1">Tech & Digital</div>
              <div className="font-bold text-white text-base mb-1">AI Localized WhatsApp CRM for UMKM</div>
              <p className="text-xs text-soft-pistachio mb-3">Automasi closing order dengan bahasa gaul sehari-hari.</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-soft-pistachio">
                <span className="text-soft-pistachio">Opportunity Score:</span>
                <span className="font-extrabold text-muted-pistachio">92/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: How WAVE Works */}
      <section id="how-it-works" className="py-24 px-6 bg-warm-ivory/40 border-y border-soft-pistachio/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-soft-pistachio mb-2">Filosofi Produk</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Mengetahui apa yang sedang tren saja tidak cukup.
            </p>
            <p className="text-deep-sage text-sm sm:text-base">
              WAVE mendampingi wirausaha melalui alur perjalanan utuh dari menemukan peluang hingga meluncurkan bisnis nyata.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Discover', desc: 'Identifikasi tren yang sedang naik via WAVE Radar' },
              { step: '02', title: 'Understand', desc: 'Pahami fase siklus hidup & momentum lewat Forecast' },
              { step: '03', title: 'Evaluate', desc: 'Ukur skor kelayakan pasar & celah persaingan' },
              { step: '04', title: 'Innovate', desc: 'Ciptakan 7 dimensi pembeda di WAVE Innovate' },
              { step: '05', title: 'Build', desc: 'Strukturkan model bisnis, COGS & persona di WAVE Builder' },
              { step: '06', title: 'Launch', desc: 'Eksekusi rencana aksi 12 tahap terarah hingga rilis' },
            ].map((st) => (
              <div key={st.step} className="p-4 rounded-xl bg-warm-ivory border border-soft-pistachio/80 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-soft-pistachio">{st.step}</span>
                  <div className="font-bold text-white text-base mt-1 mb-1">{st.title}</div>
                  <p className="text-xs text-soft-pistachio leading-snug">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Modules Preview */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Beyond the Wave */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold mb-4">
                <Network className="w-3.5 h-3.5" />
                Fitur Unggulan Premium
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">
                Beyond the Wave: <br />
                Temukan Peluang di Balik Tren Utama
              </h3>
              <p className="text-deep-sage text-sm leading-relaxed mb-6">
                Jangan hanya bertarung di tren utama yang padat modal. Contohnya tren <strong>Padel</strong>: alih-alih membangun lapangan miliaran rupiah, ciptakan pakaian atletik berpendingin iklim tropis, tas raket bergaya resortwear, atau agensi liga korporasi akhir pekan.
              </p>
              <ul className="space-y-3 text-xs text-deep-sage mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-pistachio" />
                  <span>Peta Relasi: Tren Utama → Pasar Sekunder → Peluang Produk → Konsep Bisnis</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-pistachio" />
                  <span>Kategori Skala Modal Mikro (&lt;5 Jt) hingga Menengah (25-100 Jt)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-pistachio" />
                  <span>Evaluasi risiko mandiri tanpa asumsi palsu</span>
                </li>
              </ul>
              <Link
                href="/beyond-the-wave"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-soft-pistachio/15 border border-teal-500/30 text-soft-pistachio font-bold text-xs hover:bg-soft-pistachio/25 transition-all"
              >
                Jelajahi Beyond the Wave <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio shadow-xl">
              <div className="text-xs font-bold uppercase text-soft-pistachio mb-3 flex items-center justify-between">
                <span>Ekosistem Peluang Sekunder: Padel</span>
                <span className="text-soft-pistachio font-mono">3 Peluang Teridentifikasi</span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-soft-pistachio border border-soft-pistachio hover:border-teal-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">Tropical Court Athleisure</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-soft-pistachio/10 text-soft-pistachio">Modal 5-25 Jt</span>
                  </div>
                  <p className="text-xs text-soft-pistachio">Pakaian olahraga berbahan serat bambu anti-bau keringat dengan saku bola raket ergonomis.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-soft-pistachio border border-soft-pistachio hover:border-teal-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">Thermal-Insulated Racquet Tote</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-soft-apricot/10 text-soft-apricot">Modal 5-25 Jt</span>
                  </div>
                  <p className="text-xs text-soft-pistachio">Tas kanvas mewah berinsulasi termal pelindung karet EVA raket dari terik bagasi mobil.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-soft-pistachio border border-soft-pistachio hover:border-teal-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-white">Corporate Padel Networking League</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-muted-pistachio/10 text-muted-pistachio">Modal &lt;5 Jt</span>
                  </div>
                  <p className="text-xs text-soft-pistachio">Agensi turnamen dan klinik coaching b2b untuk tech company & bank.</p>
                </div>
              </div>
            </div>
          </div>

          {/* WAVE Innovate */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio shadow-xl">
              <div className="text-xs font-bold uppercase text-soft-pistachio mb-4">7 Dimensi Inovasi WAVE</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  '1. Inovasi Produk',
                  '2. Inovasi Format',
                  '3. Inovasi Kemasan',
                  '4. Model Bisnis',
                  '5. Inovasi Harga',
                  '6. Pengalaman Pelanggan',
                  '7. Positioning Pasar',
                ].map((dim) => (
                  <div key={dim} className="p-2.5 rounded-lg bg-soft-pistachio border border-soft-pistachio text-deep-sage font-medium">
                    {dim}
                  </div>
                ))}
                <div className="p-2.5 rounded-lg bg-soft-pistachio/10 border border-teal-500/30 text-soft-pistachio font-bold flex items-center justify-center">
                  Generator USP AI
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-pistachio/10 text-muted-pistachio text-xs font-semibold mb-4">
                <Lightbulb className="w-3.5 h-3.5" />
                Diferensiasi Bermakna
              </div>
              <h3 className="text-3xl font-extrabold text-white mb-4">
                WAVE Innovate: <br />
                Jangan Sekadar Meniru. Ciptakan Pembeda.
              </h3>
              <p className="text-deep-sage text-sm leading-relaxed mb-6">
                Hindari saran klise seperti "kualitas lebih bagus" atau "harga lebih murah". WAVE menganalisis keluhan riil konsumen dari kompetitor yang sudah ada, menemukan celah pasar (market gap), dan merumuskan Unique Selling Proposition (USP) yang dapat dipertahankan.
              </p>
              <Link
                href="/innovate"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted-pistachio/15 border border-indigo-500/30 text-muted-pistachio font-bold text-xs hover:bg-muted-pistachio/25 transition-all"
              >
                Coba WAVE Innovate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* My Business Canvas Section */}
      <section id="canvas-preview" className="py-24 px-6 bg-warm-ivory/30 border-t border-soft-pistachio">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-soft-pistachio/10 text-soft-pistachio text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            Tersedia di Seluruh Paket (FREE, PREMIUM, PRO)
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            My Business Canvas — Pusat Komando Wirausaha Anda
          </h2>
          <p className="text-deep-sage text-sm sm:text-base max-w-2xl mx-auto">
            Setiap tren yang Anda temukan, peluang yang Anda simpan, dan inovasi yang Anda racik terhubung otomatis ke dalam 15 bagian kanvas bisnis Anda.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio">
            <div className="w-10 h-10 rounded-xl bg-soft-pistachio/10 flex items-center justify-center text-soft-pistachio font-bold mb-4">
              01
            </div>
            <h4 className="font-bold text-white text-base mb-2">Simpan & Hubungkan Wawasan</h4>
            <p className="text-xs text-soft-pistachio leading-relaxed">
              Satu klik tombol "Simpan ke Canvas" dari Radar, Forecast, Beyond the Wave, maupun Innovate langsung mengisi bagian riset proyek Anda.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio">
            <div className="w-10 h-10 rounded-xl bg-soft-apricot/10 flex items-center justify-center text-ocean-400 font-bold mb-4">
              02
            </div>
            <h4 className="font-bold text-white text-base mb-2">15 Bagian Kanvas Terstruktur</h4>
            <p className="text-xs text-soft-pistachio leading-relaxed">
              Mulai dari Validasi Masalah, Solusi Produk, Riset Kompetitor, Strategi Harga, Analisis Finansial COGS & BEP, hingga Rencana Operasional.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio">
            <div className="w-10 h-10 rounded-xl bg-muted-pistachio/10 flex items-center justify-center text-muted-pistachio font-bold mb-4">
              03
            </div>
            <h4 className="font-bold text-white text-base mb-2">Pelacak Progres & Roadmap 12 Tahap</h4>
            <p className="text-xs text-soft-pistachio leading-relaxed">
              Beralih dari perencanaan ke eksekusi dengan checklist tugas, indikator persentase, dan milestone peluncuran produk Anda.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/canvas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-soft-pistachio to-soft-apricot text-deep-sage font-bold text-sm shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-ocean-400 transition-all"
          >
            Buka My Business Canvas Anda <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section id="pricing" className="py-24 px-6 border-t border-soft-pistachio">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-soft-pistachio mb-2">Model Tiga Tingkat</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Pilih Paket Sesuai Tahapan Perjalanan Anda
            </p>
            <p className="text-deep-sage text-sm">
              Mulai dari eksplorasi gratis hingga paket pembangun bisnis profesional. Tanpa ikatan kontrak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="p-6 rounded-2xl bg-warm-ivory border border-soft-pistachio flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-white mb-1">{tierConfig.free.name}</h3>
                <p className="text-xs text-soft-pistachio mb-6">{tierConfig.free.tagline}</p>
                <div className="text-3xl font-black text-white mb-6 pb-6 border-b border-soft-pistachio">
                  {tierConfig.free.priceFormatted}
                </div>
                <ul className="space-y-3 text-xs text-deep-sage mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>WAVE Radar — Eksplorasi Tren Dasar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>WAVE Forecast — Prediksi Dasar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>My Business Canvas Workspace</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>Simpan & Edit Proyek Bisnis Pribadi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>10 Kuota Analisis AI / bulan</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => changeTier('free')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-soft-pistachio text-deep-sage hover:bg-soft-pistachio transition-colors"
              >
                Mulai Gratis
              </button>
            </div>

            {/* Premium */}
            <div className="p-6 rounded-2xl bg-warm-ivory border border-teal-500/60 ring-1 ring-teal-500/40 flex flex-col justify-between relative shadow-xl shadow-teal-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-soft-pistachio text-deep-sage">
                Peluang & Diferensiasi
              </span>
              <div>
                <h3 className="font-bold text-lg text-white mb-1">{tierConfig.premium.name}</h3>
                <p className="text-xs text-soft-pistachio mb-6">{tierConfig.premium.tagline}</p>
                <div className="text-3xl font-black text-white mb-6 pb-6 border-b border-soft-pistachio">
                  {tierConfig.premium.priceFormatted}
                </div>
                <ul className="space-y-3 text-xs text-deep-sage mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>Semua fitur paket Free</span>
                  </li>
                  <li className="flex items-center gap-2 text-soft-pistachio font-semibold">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>Beyond the Wave (Peluang Sekunder)</span>
                  </li>
                  <li className="flex items-center gap-2 text-soft-pistachio font-semibold">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>Market Gap Finder & Intelijen Kompetitor</span>
                  </li>
                  <li className="flex items-center gap-2 text-soft-pistachio font-semibold">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>WAVE Innovate (7 Dimensi Inovasi & USP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-soft-pistachio" />
                    <span>60 Kuota Analisis AI / bulan</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => changeTier('premium')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-soft-pistachio text-deep-sage hover:bg-soft-pistachio transition-colors shadow-md shadow-teal-500/20"
              >
                Pilih Premium
              </button>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-navy-900 border border-indigo-500/50 flex flex-col justify-between relative shadow-xl shadow-indigo-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-teal-400 text-white">
                Venture Builder
              </span>
              <div>
                <h3 className="font-bold text-lg text-white mb-1">{tierConfig.pro.name}</h3>
                <p className="text-xs text-soft-pistachio mb-6">{tierConfig.pro.tagline}</p>
                <div className="text-3xl font-black text-white mb-6 pb-6 border-b border-soft-pistachio">
                  {tierConfig.pro.priceFormatted}
                </div>
                <ul className="space-y-3 text-xs text-deep-sage mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>Semua fitur Free & Premium</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>WAVE Builder (Perencana Bisnis Utuh)</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>Kalkulator Finansial COGS, Margin & BEP</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>Roadmap Peluncuran Bisnis 12 Tahap</span>
                  </li>
                  <li className="flex items-center gap-2 text-muted-pistachio font-semibold">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>Panduan Regulasi RI (BPOM/Halal/PIRT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-muted-pistachio" />
                    <span>250 Kuota Analisis AI / bulan</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => changeTier('pro')}
                className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-teal-500 text-white hover:from-indigo-600 hover:to-teal-600 transition-all shadow-lg shadow-indigo-500/25"
              >
                Pilih Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-warm-ivory/30 border-t border-soft-pistachio">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-soft-pistachio mb-2">Pertanyaan Umum</h2>
            <p className="text-3xl font-extrabold text-white">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-soft-pistachio bg-warm-ivory/80 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-soft-pistachio transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-soft-pistachio' : 'text-soft-pistachio'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-deep-sage leading-relaxed border-t border-soft-pistachio/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-soft-pistachio/80 text-soft-pistachio text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-soft-pistachio flex items-center justify-center font-black text-deep-sage text-sm">
              W
            </div>
            <span className="font-bold text-white">WAVE Platform</span>
            <span>— AI-Powered Trend Intelligence & Venture Building</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link href="/radar" className="hover:text-white">WAVE Radar</Link>
            <Link href="/canvas" className="hover:text-white">My Business Canvas</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>

          <div className="text-soft-pistachio">
            © {new Date().getFullYear()} WAVE Intelligence. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
