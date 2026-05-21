import React, { useState, useEffect, useRef } from 'react';

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const MOCK_USER = {
  brandName: "Teman Kreativ",
  isVerified: true,
  industry: "Komunitas & Edukasi",
  location: "Jakarta, Indonesia",
  tagline: "Pusat jejaring kreator dan profesional muda Indonesia.",
  logo: "TK",
  stats: { connections: 128, views: 3420, ongoing: 3, done: 12 },
  founder: {
    name: "Budi Santoso",
    role: "Founder & Community Lead",
    bio: "Membangun ekosistem kreatif sejak 2018. Fokus pada kolaborasi lintas industri dan pemberdayaan talenta lokal.",
    social: { linkedin: "#", ig: "#", web: "https://budisantoso.id" }
  },
  currency: {
    audience: "5.000+ Member aktif, 6K IG Followers, Usia 25-35",
    credibility: "Aktif 2+ Tahun, 30+ Kolaborasi sukses, Rating 4.8/5",
    activation: "Track record 85% target peserta event tercapai",
    network: "Alumni tersebar di 50+ Tech & Creative Company"
  }
};

const MOCK_ANALYTICS = {
  proposalReceived: 8, proposalSent: 12, proposalPending: 3, proposalRejected: 2,
  proposalApproved: 7, accountViews30: 3420, totalConnections: 128, totalFeedPost: 6,
  totalLikes: 89, totalSaved: 31, totalAppointment: 14, totalMeetingDone: 11,
  totalDeal: 9, totalMouGenerated: 9, totalLpjGenerated: 7,
  totalSponsorshipFreshMoney: 45000000, totalSponsorshipBarter: 12
};

// ── 7 DUMMY PARTNER PROFILES (NEW in V8) ──
const DUMMY_PARTNERS = {
  1: {
    id: 1, brand: "TechNova Solutions", avatar: "TN", verified: true,
    author: "Andi Wijaya", authorRole: "CEO", industry: "Technology & SaaS",
    location: "Jakarta, Indonesia", accountType: "Perusahaan",
    tagline: "Solusi teknologi B2B terdepan untuk pertumbuhan bisnis Anda.",
    stats: { connections: 245, views: 8920, ongoing: 5, done: 28 },
    founder: {
      name: "Andi Wijaya", role: "CEO & Co-Founder",
      bio: "10+ tahun di industri teknologi B2B. Ex-CTO startup unicorn. Passionate tentang membangun produk yang scalable dan berdampak.",
    },
    currency: {
      audience: "15K+ User aktif, Newsletter 8K subscriber B2B",
      credibility: "Aktif 3+ Tahun, 50+ Enterprise Client, Rating 4.9/5",
      activation: "96% uptime produk, avg 3.2x ROI client",
      network: "Partner di 20+ co-working space & tech hub"
    },
    portfolio: [
      { title: "Tech Future Summit 2025", partner: "GoTo Group", status: "Verified Deal" },
      { title: "B2B SaaS Conference", partner: "Microsoft ID", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Sponsorship", scheme: "Fresh Money",
      title: "Tech Future Summit 2026 — Main Sponsor Slot",
      give: "Logo eksklusif, 1 keynote slot, 500+ C-Level leads database",
      expect: "Pendanaan Rp 15.000.000 via Escrow"
    }],
    rating: "4.9", dealCount: 28
  },
  2: {
    id: 2, brand: "Kopi Kenangan Senja", avatar: "KS", verified: false,
    author: "Nabila", authorRole: "Partnership SPV", industry: "F&B & Lifestyle",
    location: "Bandung, Indonesia", accountType: "Bisnis",
    tagline: "Menemani produktivitas dengan secangkir kopi yang hangat.",
    stats: { connections: 67, views: 1240, ongoing: 2, done: 5 },
    founder: {
      name: "Reza Fahmi", role: "Founder & Head Barista",
      bio: "Pecinta kopi sejati yang membangun brand dari satu gerobak menjadi 12 cabang dalam 2 tahun. Fokus pada community-driven marketing.",
    },
    currency: {
      audience: "12 Cabang aktif, 4K IG Followers, target: mahasiswa & profesional muda",
      credibility: "Baru 2 tahun, 5 kolaborasi, Rating 4.2/5",
      activation: "Rata-rata 150 cup/hari per outlet",
      network: "Komunitas coffee lovers di Bandung & Jakarta"
    },
    portfolio: [
      { title: "Media Partner Kampus Week 2025", partner: "Universitas Parahyangan", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Media Partner", scheme: "Barter Value",
      title: "Kolaborasi Publikasi Promo Akhir Tahun",
      give: "Voucher kopi Rp 2.000.000, logo di banner cabang utama",
      expect: "2x IG Feed Post + 1 Artikel Liputan"
    }],
    rating: "4.2", dealCount: 5
  },
  3: {
    id: 3, brand: "EduMaster Platform", avatar: "EM", verified: true,
    author: "Rizky Ramadhan", authorRole: "Growth Lead", industry: "EdTech & Training",
    location: "Surabaya, Indonesia", accountType: "Startup",
    tagline: "Akselerasi karir digital Indonesia lewat sertifikasi berkelas dunia.",
    stats: { connections: 312, views: 12800, ongoing: 8, done: 42 },
    founder: {
      name: "Rizky Ramadhan", role: "CEO & EdTech Evangelist",
      bio: "Mantan software engineer yang beralih ke dunia pendidikan. Percaya bahwa skill gap Indonesia bisa diatasi dengan akses belajar yang tepat.",
    },
    currency: {
      audience: "50K+ registered learner, newsletter 25K subscriber aktif",
      credibility: "4 tahun beroperasi, 1.200+ sertifikat diterbitkan, Rating 4.8/5",
      activation: "Avg completion rate 72%, Job placement rate 68%",
      network: "MoU dengan 80+ perusahaan untuk rekrutmen"
    },
    portfolio: [
      { title: "Kampanye Sertifikasi AWS 2025", partner: "Amazon Web Services", status: "Verified Deal" },
      { title: "Digital Bootcamp Partner", partner: "Kominfo RI", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Strategic Partner", scheme: "Referral",
      title: "Afiliasi Kelas Sertifikasi IT Nasional",
      give: "Komisi 20% per peserta, min Rp 150.000/konversi",
      expect: "Blast ke database komunitas min. 5.000 kontak aktif"
    }],
    rating: "4.8", dealCount: 42
  },
  4: {
    id: 4, brand: "Griya Lestari", avatar: "GL", verified: true,
    author: "Sarah Ayu", authorRole: "Marketing Manager", industry: "Properti & Gaya Hidup",
    location: "Tangerang Selatan, Indonesia", accountType: "Perusahaan",
    tagline: "Hunian impian di tengah kota, bersama komunitas yang inspiring.",
    stats: { connections: 189, views: 5600, ongoing: 4, done: 19 },
    founder: {
      name: "Hendra Gunawan", role: "President Director",
      bio: "Pengembang properti generasi ketiga. Percaya bahwa rumah bukan sekadar bangunan, tapi ekosistem komunitas yang hidup.",
    },
    currency: {
      audience: "5K prospek aktif, komunitas homeowner 2K member",
      credibility: "12 tahun berdiri, 19 proyek selesai, Rating 4.7/5",
      activation: "Booking rate event 78%, avg peserta 200+/event",
      network: "Mitra 30+ bank & lembaga keuangan nasional"
    },
    portfolio: [
      { title: "Fun Walk - Green Living 2025", partner: "Yayasan Hijau Nusantara", status: "Verified Deal" },
      { title: "Expo Properti BSD 2024", partner: "REI DKI Jakarta", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Community Partner", scheme: "Discount",
      title: "Fun Bike to Home — Community Support",
      give: "Diskon booking 50% untuk member, merchandise, konsumsi peserta",
      expect: "Mobilisasi min. 100 member komunitas di hari H"
    }],
    rating: "4.7", dealCount: 19
  },
  5: {
    id: 5, brand: "Local Sounds Festival", avatar: "LS", verified: false,
    author: "Dimas", authorRole: "Event Director", industry: "Event & Entertainment",
    location: "Yogyakarta, Indonesia", accountType: "Komunitas/Organisasi",
    tagline: "Panggung terbesar untuk musik indie lokal yang otentik.",
    stats: { connections: 43, views: 890, ongoing: 1, done: 3 },
    founder: {
      name: "Dimas Prayoga", role: "Founder & Event Director",
      bio: "Musisi indie yang frustrasi dengan sulitnya akses panggung. Membangun festival tahunan yang kini jadi landmark musik indie Jogja.",
    },
    currency: {
      audience: "8K ticket buyers history, 15K IG Followers, target: 18-30 tahun",
      credibility: "3 edisi festival sukses, Rating 4.5/5",
      activation: "Sold out 3x berturut-turut, 5.000 pax target 2026",
      network: "Jaringan 200+ musisi indie & label independen"
    },
    portfolio: [
      { title: "Local Sounds Fest Vol.3 - 2025", partner: "Tokopedia", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Lainnya", scheme: "To Be Discussed",
      title: "Pencarian Ticketing Partner untuk Festival Musik",
      give: "Eksklusivitas penjualan tiket 5.000 pax, branding di semua materi",
      expect: "Sistem e-ticket aman, fee flat/rendah, support gate hari H"
    }],
    rating: "4.5", dealCount: 3
  },
  6: {
    id: 6, brand: "Kreanova Agency", avatar: "KA", verified: true,
    author: "Maya Putri", authorRole: "Business Dev", industry: "Creative Agency & Branding",
    location: "Jakarta Selatan, Indonesia", accountType: "Agensi",
    tagline: "Kami tidak hanya membuat konten. Kami membangun cerita brand yang diingat.",
    stats: { connections: 276, views: 9100, ongoing: 6, done: 35 },
    founder: {
      name: "Maya Putri", role: "Creative Director & Co-Founder",
      bio: "Ex-art director multinational agency. 8 tahun mengasah sense of storytelling untuk brand lokal dan global.",
    },
    currency: {
      audience: "35K IG Followers, portfolio 80+ brand, target: brand mid-tier ke atas",
      credibility: "4 tahun, 35 project selesai, Rating 4.9/5, Cannes Lions nominee",
      activation: "Avg engagement rate klien naik 3.4x setelah campaign",
      network: "Jaringan kreator, fotografer, & KOL di 12 kota"
    },
    portfolio: [
      { title: "Rebranding Visual Tokopedia 2025", partner: "Tokopedia", status: "Verified Deal" },
      { title: "Campaign #GrowLocal", partner: "Bank BRI", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Strategic Partner", scheme: "Barter Value",
      title: "Co-Branding Campaign untuk Brand Lokal Naik Kelas",
      give: "Full branding package senilai Rp 25.000.000, exposure ke 35K audiens",
      expect: "Case study publik + testimonial + 3x monthly content collab"
    }],
    rating: "4.9", dealCount: 35
  },
  7: {
    id: 7, brand: "HealthFirst Indonesia", avatar: "HF", verified: true,
    author: "Dr. Fajar", authorRole: "Community Partnership", industry: "Healthcare & Wellness",
    location: "Surabaya, Indonesia", accountType: "Organisasi",
    tagline: "Kesehatan bukan privilege — kami pastikan semua orang bisa akses.",
    stats: { connections: 198, views: 6700, ongoing: 4, done: 24 },
    founder: {
      name: "dr. Fajar Nugroho", role: "Founder & Chief Medical Officer",
      bio: "Dokter spesialis yang turun gunung untuk membangun ekosistem wellness yang inklusif. Ex-WHO Indonesia advisor.",
    },
    currency: {
      audience: "20K member aplikasi, 10K IG Followers, target: 25-45 tahun profesional",
      credibility: "3 tahun, 24 program selesai, Rating 4.8/5, lisensi Kemenkes",
      activation: "Avg event peserta 300+, online reach 50K+/campaign",
      network: "Partner 150+ klinik & rumah sakit di Jawa-Bali"
    },
    portfolio: [
      { title: "Corporate Wellness Program 2025", partner: "Unilever Indonesia", status: "Verified Deal" },
      { title: "Health Fair Surabaya 2024", partner: "Pemkot Surabaya", status: "Verified Deal" }
    ],
    activeCollabs: [{
      type: "Community Partner", scheme: "Barter Value",
      title: "Wellness Wednesday — Corporate Health Partner",
      give: "Akses program health check gratis untuk 50 member komunitas",
      expect: "Promosi program ke database komunitas min. 3.000 profesional"
    }],
    rating: "4.8", dealCount: 24
  }
};

// ── 7 FEED ITEMS dengan partnerId (NEW in V8) ──
const MOCK_FEED = [
  { id: 1, partnerId: 1, brand: "TechNova Solutions", author: "Andi Wijaya", authorRole: "CEO", avatar: "TN", time: "2 jam lalu", narration: "Halo temen-temen ekosistem startup! 👋 Bulan depan TechNova mau ngadain 'Tech Future Summit 2026'. Kita lagi open slot buat Main Sponsor. Cocok banget buat temen-temen B2B yang mau dapetin qualified leads dan exposure premium. Let's connect! 🚀", type: "Sponsorship", scheme: "Fresh Money", title: "Sponsor Utama untuk 'Tech Future Summit 2026'", give: "Logo eksklusif di semua aset, 1 slot keynote speaker 15 menit, database 500+ peserta C-Level.", expect: "Pendanaan senilai Rp 15.000.000 untuk operasional event (Via Escrow).", verified: true, likes: 24, saves: 8, isLiked: false, isSaved: false, connectionPost: true },
  { id: 2, partnerId: 2, brand: "Kopi Kenangan Senja", author: "Nabila", authorRole: "Partnership SPV", avatar: "KS", time: "5 jam lalu", narration: "Sore semuanya! Tim Kenangan Senja lagi nyari media partner buat support campaign Promo Akhir Tahun. Kita open buat barter value yaa! ☕✨", type: "Media Partner", scheme: "Barter Value", title: "Kolaborasi Publikasi Promo Akhir Tahun", give: "Voucher kopi senilai Rp 2.000.000 untuk tim media, logo di banner cabang utama.", expect: "2x IG Feed Post, 1x Artikel Liputan di website media.", verified: false, likes: 11, saves: 3, isLiked: false, isSaved: false, connectionPost: false },
  { id: 3, partnerId: 3, brand: "EduMaster Platform", author: "Rizky Ramadhan", authorRole: "Growth Lead", avatar: "EM", time: "1 hari lalu", narration: "Hi leaders! EduMaster lagi ekspansi program Sertifikasi IT. Kita sediain skema komisi yang lumayan banget, tinggal share link unik aja. Ada yang tertarik jadi Strategic Partner? 🤝", type: "Strategic Partner", scheme: "Referral", title: "Afiliasi Kelas Sertifikasi IT Nasional", give: "Komisi 20% (mulai dari Rp 150.000) untuk setiap peserta yang berhasil mendaftar.", expect: "Blast promosi ke database email/WA komunitas partner (minimal 5.000 kontak aktif).", verified: true, likes: 37, saves: 14, isLiked: false, isSaved: false, connectionPost: true },
  { id: 4, partnerId: 4, brand: "Griya Lestari", author: "Sarah Ayu", authorRole: "Marketing Manager", avatar: "GL", time: "1 hari lalu", narration: "Halo! Griya Lestari lagi cari Community Partner, spesifiknya komunitas gowes atau lari di Jabodetabek. Kita mau bikin event 'Fun Bike to Home'. Gas gak? 🚴‍♀️🏡", type: "Community Partner", scheme: "Discount", title: "Fun Bike to Home - Community Support", give: "Diskon booking fee 50% untuk member komunitas, free merchandise event, dan konsumsi peserta.", expect: "Mobilisasi minimal 100 member komunitas untuk hadir di hari H.", verified: true, likes: 19, saves: 6, isLiked: false, isSaved: false, connectionPost: false },
  { id: 5, partnerId: 5, brand: "Local Sounds Festival", author: "Dimas", authorRole: "Event Director", avatar: "LS", time: "2 hari lalu", narration: "Urgent! 🚨 Festival musik indie kita bulan depan butuh Ticketing Partner yang reliable. Target 5.000 orang. Yuk platform ticketing lokal merapat! 🎸🎟️", type: "Lainnya", scheme: "To Be Discussed", title: "Pencarian Ticketing Partner untuk Festival Musik", give: "Eksklusivitas penjualan tiket (target 5.000 pax), logo di semua materi promosi festival.", expect: "Sistem e-ticket aman, fee transaksi flat/rendah, support tim gate di hari H.", verified: false, likes: 8, saves: 2, isLiked: false, isSaved: false, connectionPost: false },
  { id: 6, partnerId: 6, brand: "Kreanova Agency", author: "Maya Putri", authorRole: "Business Dev", avatar: "KA", time: "2 hari lalu", narration: "Hey brand owner! Kreanova lagi buka slot Co-Branding buat brand lokal yang siap naik kelas. Kita full handle dari strategi sampai eksekusi kreatif. Interested? 🎨✨", type: "Strategic Partner", scheme: "Barter Value", title: "Co-Branding Campaign untuk Brand Lokal Naik Kelas", give: "Full branding package Rp 25.000.000, exposure ke 35K audiens, case study publik.", expect: "Testimonial + 3x monthly content collab", verified: true, likes: 45, saves: 18, isLiked: false, isSaved: false, connectionPost: true },
  { id: 7, partnerId: 7, brand: "HealthFirst Indonesia", author: "Dr. Fajar", authorRole: "Community Partnership", avatar: "HF", time: "3 hari lalu", narration: "Hai komunitas profesional! HealthFirst lagi cari partner komunitas untuk program Wellness Wednesday. Cocok buat komunitas yang peduli work-life balance. 🏥💪", type: "Community Partner", scheme: "Barter Value", title: "Wellness Wednesday — Corporate Health Partner", give: "Akses health check gratis untuk 50 member komunitas", expect: "Promosi ke database komunitas min. 3.000 profesional", verified: true, likes: 31, saves: 9, isLiked: false, isSaved: false, connectionPost: false }
];

const MOCK_SENT_PROPOSALS = [
  { id: 'SP1', to: "TechNova Solutions", title: "Sponsor Utama – Tech Future Summit 2026", sentAt: "18 Mei 2026", status: "on_review", meetDate: null, meetLink: null },
  { id: 'SP2', to: "EduMaster Platform", title: "Afiliasi Kelas Sertifikasi IT", sentAt: "15 Mei 2026", status: "accepted", meetDate: "22 Mei 2026 • 10:00 WIB", meetLink: "meet.google.com/edu-syx-abc" },
  { id: 'SP3', to: "Kopi Kenangan Senja", title: "Media Partner Promo Akhir Tahun", sentAt: "12 Mei 2026", status: "rejected", meetDate: null, meetLink: null },
];

const MOCK_PORTFOLIO = [
  { id: 101, title: "Media Partner - Startup Fest 2025", partner: "TechIn Asia", status: "Verified Deal" },
  { id: 102, title: "Sponsorship - Webinar Series", partner: "Bank Jago", status: "Verified Deal" }
];

const MOCK_ACTIVE_COLLABS = [
  { id: 201, type: "Community Partner", scheme: "Barter Value", title: "Kolaborasi Komunitas: Ngabuburit Kreatif", give: "Slot booth gratis, logo on screen, mention MC.", expect: "Membawa minimal 20 member komunitas, 1x IG Post collab." }
];

const formatRp = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
const generateMeetLink = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const seg = () => Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `meet.google.com/${seg()}-${seg()}-${seg()}`;
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [feedItems, setFeedItems] = useState(MOCK_FEED);
  const [filterType, setFilterType] = useState('');
  const [filterScheme, setFilterScheme] = useState('');
  const [filterConn, setFilterConn] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const [rightPanel, setRightPanel] = useState(null);
  const [savedMou, setSavedMou] = useState(null);
  const [savedLpj, setSavedLpj] = useState(null);
  const [incomingDealStatus, setIncomingDealStatus] = useState('new');
  const [meetInfo, setMeetInfo] = useState(null);
  const [meetTranscript, setMeetTranscript] = useState(null);
  // ── CHANGED V8: viewingPartnerProfile sekarang menyimpan full partner object (bukan popup) ──
  const [viewingPartnerProfile, setViewingPartnerProfile] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [logoPreview, setLogoPreview] = useState(null);
  // ── NEW V8: isVerified state untuk simulasi notifikasi verifikasi ──
  const [isVerified] = useState(true); // set false untuk lihat warning banner

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cardo:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    setRightPanel(null);
    // ── CHANGED V8: Reset partner profile view saat navigasi ──
    setViewingPartnerProfile(null);
    window.scrollTo(0, 0);
  };

  const toggleLike = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isLiked: !x.isLiked, likes: x.isLiked ? x.likes - 1 : x.likes + 1 } : x));
  const toggleSave = (id) => setFeedItems(f => f.map(x => x.id === id ? { ...x, isSaved: !x.isSaved, saves: x.isSaved ? x.saves - 1 : x.saves + 1 } : x));

  const filteredFeed = feedItems.filter(x => {
    if (filterConn && !x.connectionPost) return false;
    if (filterType && x.type.toLowerCase() !== filterType.toLowerCase()) return false;
    if (filterScheme && !x.scheme.toLowerCase().includes(filterScheme.toLowerCase())) return false;
    if (searchQ && !x.brand.toLowerCase().includes(searchQ.toLowerCase()) && !x.title.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  // ── CHANGED V8: Dashboard ditambahkan ke isAppView ──
  const isAppView = ['feed', 'profile', 'create', 'proposals', 'chat', 'testimoni', 'dashboard'].includes(currentView);

  // ── SIDEBAR ──────────────────────────────────
  // CHANGED V8: Dashboard sekarang ada di sidebar dan bisa diklik
  const Sidebar = () => (
    <div className="hidden md:flex w-56 bg-[#0F1A2F] border-r border-[#C5A869]/20 h-screen sticky top-0 flex-col py-5 px-3 shadow-xl z-20 flex-shrink-0">
      <div className="flex items-center gap-2 cursor-pointer mb-7 px-2" onClick={() => navigateTo('feed')}>
        <svg className="w-7 h-7 flex-shrink-0" viewBox="0 0 100 100" fill="none">
          <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
          <path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#2D4066" opacity="0.9"/>
        </svg>
        <span className="text-lg font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
      </div>

      <div className="flex flex-col gap-1">
        {[
          { id: 'feed', icon: '🏠', label: 'Discovery Feed' },
          { id: 'dashboard', icon: '📊', label: 'Dashboard' }, // FIXED V8: sekarang aktif
          { id: 'profile', icon: '👤', label: 'Profil Bisnis' },
          { id: 'proposals', icon: '💬', label: 'Kelola Proposal' },
        ].map(item => (
          <button key={item.id} onClick={() => navigateTo(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentView === item.id ? 'bg-[#C5A869] text-[#0F1A2F] shadow-lg' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
            }`}>
            <span>{item.icon}</span> {item.label}
          </button>
        ))}

        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Interaksi Partner</p>

        <button onClick={() => navigateTo('chat')}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'chat' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <div className="flex items-center gap-3"><span>💬</span> Pesan / Chat</div>
          <div className="w-2 h-2 rounded-full bg-red-500"/>
        </button>

        <button onClick={() => navigateTo('testimoni')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentView === 'testimoni' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>⭐</span> Rating & Testimoni
        </button>

        <div className="my-2 border-t border-[#2D4066]/50"/>
        <p className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dokumen</p>

        <button onClick={() => { navigateTo('proposals'); setRightPanel('mou'); }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            rightPanel === 'mou' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>✏️</span> Input MoU
        </button>

        <button onClick={() => { navigateTo('proposals'); setRightPanel('lpj'); }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            rightPanel === 'lpj' ? 'bg-[#C5A869] text-[#0F1A2F]' : 'text-gray-300 hover:bg-[#2D4066]/50 hover:text-white'
          }`}>
          <span>📋</span> Input LPJ
        </button>
      </div>

      <div className="mt-auto pt-4">
        <button onClick={() => navigateTo('create')}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#0F1A2F] font-bold text-sm hover:scale-105 transition-transform shadow-lg">
          ＋ Buat Peluang
        </button>
      </div>
    </div>
  );

  // ── DASHBOARD VIEW ────────────────────────────
  // FIXED V8: Dashboard sekarang fully functional dengan semua 15 metrik
  const DashboardView = () => {
    const metrics = [
      { label: "Proposal Received",       value: MOCK_ANALYTICS.proposalReceived,                      icon: "⬇️", color: "text-blue-600",    bg: "bg-blue-50" },
      { label: "Proposal Sent",           value: MOCK_ANALYTICS.proposalSent,                          icon: "⬆️", color: "text-indigo-600",  bg: "bg-indigo-50" },
      { label: "Proposal Pending",        value: MOCK_ANALYTICS.proposalPending,                       icon: "⏳", color: "text-amber-600",   bg: "bg-amber-50" },
      { label: "Proposal Rejected",       value: MOCK_ANALYTICS.proposalRejected,                      icon: "❌", color: "text-red-600",     bg: "bg-red-50" },
      { label: "Proposal Approved",       value: MOCK_ANALYTICS.proposalApproved,                      icon: "✅", color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Account Views (30 Hari)", value: MOCK_ANALYTICS.accountViews30.toLocaleString(),       icon: "👁️", color: "text-purple-600",  bg: "bg-purple-50" },
      { label: "Total Koneksi",           value: MOCK_ANALYTICS.totalConnections,                      icon: "🤝", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total Feed Post",         value: MOCK_ANALYTICS.totalFeedPost,                         icon: "📝", color: "text-gray-600",    bg: "bg-gray-100" },
      { label: "Total Like Feed",         value: MOCK_ANALYTICS.totalLikes,                            icon: "❤️", color: "text-red-500",     bg: "bg-red-50" },
      { label: "Total Saved Feed",        value: MOCK_ANALYTICS.totalSaved,                            icon: "🔖", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total Appointment",       value: MOCK_ANALYTICS.totalAppointment,                      icon: "📅", color: "text-teal-600",    bg: "bg-teal-50" },
      { label: "Meeting & Notulensi",     value: MOCK_ANALYTICS.totalMeetingDone,                      icon: "🎥", color: "text-blue-500",    bg: "bg-blue-50" },
      { label: "Total Deal",              value: MOCK_ANALYTICS.totalDeal,                             icon: "🏆", color: "text-amber-700",   bg: "bg-amber-50" },
      { label: "Total MoU/PKS",           value: MOCK_ANALYTICS.totalMouGenerated,                     icon: "📋", color: "text-emerald-600", bg: "bg-emerald-50" },
      { label: "Total LPJ",               value: MOCK_ANALYTICS.totalLpjGenerated,                     icon: "📊", color: "text-emerald-600", bg: "bg-emerald-50" },
    ];
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Dashboard & Analitik</h2>
          <p className="text-gray-500 text-sm mt-1">Ringkasan performa akun dan aktivitas kolaborasi Anda.</p>
        </div>
        <div className="bg-[#0F1A2F] rounded-3xl p-6 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Total Sponsorship Fresh Money</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#FFE194]">{formatRp(MOCK_ANALYTICS.totalSponsorshipFreshMoney)}</p>
            <p className="text-xs text-gray-400 mt-1">via Escrow SynergyX</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Total Barter Deals</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#C5A869]">{MOCK_ANALYTICS.totalSponsorshipBarter} Deal</p>
            <p className="text-xs text-gray-400 mt-1">Barter Value Partnership</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/10">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Deal Rate</p>
            <p className="text-2xl md:text-3xl font-['Cardo'] font-bold text-emerald-400">
              {Math.round(MOCK_ANALYTICS.totalDeal / MOCK_ANALYTICS.proposalSent * 100)}%
            </p>
            <p className="text-xs text-gray-400 mt-1">Dari total proposal terkirim</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map(m => (
            <div key={m.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`w-8 h-8 rounded-xl ${m.bg} flex items-center justify-center mb-3 text-base`}>{m.icon}</div>
              <div className="text-xl font-['Cardo'] font-bold text-[#0F1A2F]">{m.value}</div>
              <div className="text-[11px] text-gray-500 font-medium mt-1 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── LANDING VIEW ──────────────────────────────
  const LandingView = () => (
    <div className="min-h-screen bg-[#0A1628] relative flex flex-col overflow-hidden">
      {/* ... sama seperti V7, tidak diubah ... */}
      <header className="relative z-10 flex justify-between items-center px-5 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
            <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
            <path d="M50 18L82 50L50 82L18 50L50 18Z" fill="#1A2744" opacity="0.9"/>
          </svg>
          <span className="text-2xl font-bold tracking-wider text-[#C5A869] font-['Cardo']">SynergyX</span>
        </div>
        <button onClick={() => navigateTo('login')}
          className="text-sm font-bold text-[#C5A869] border border-[#C5A869]/40 px-4 py-2 rounded-lg hover:bg-[#C5A869]/10 transition">
          Sign In
        </button>
      </header>
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/30 text-[#C5A869] text-xs font-bold uppercase mb-7">
          ✦ Ekosistem Kolaborasi B2B Terkurasi
        </div>
        <h1 className="text-4xl md:text-6xl font-['Cardo'] font-bold text-white leading-tight mb-5 max-w-4xl">
          Cari Mitra Kolaborasi?<br/><span className="text-[#C5A869]">Selesaikan dalam Hitungan Menit.</span>
        </h1>
        <p className="text-gray-400 text-base md:text-lg mb-8 max-w-2xl leading-relaxed">
          Platform satu pintu untuk mempertemukan agensi, brand, komunitas, dan pihak kemitraan strategis.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigateTo('register')}
            className="px-7 py-3.5 rounded-xl bg-[#C5A869] text-[#0F1A2F] font-bold shadow-xl hover:-translate-y-1 transition-all duration-300 text-base">
            Daftar ke SynergyX →
          </button>
          <button onClick={() => navigateTo('login')}
            className="px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition text-base">
            Lihat Demo
          </button>
        </div>
      </section>
    </div>
  );

  // ── LOGIN VIEW ────────────────────────────────
  // CHANGED V8: Langsung email + Google, tanpa pilihan tipe akun
  const LoginView = () => (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7] p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Masuk ke Akun</h3>
          <p className="text-sm text-gray-500">Lanjutkan ekspansi bisnis Anda hari ini.</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); navigateTo('feed'); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Alamat Email</label>
            <input type="email" placeholder="nama@perusahaan.com"
              className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Kata Sandi</label>
            <input type="password" placeholder="••••••••"
              className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
          </div>
          <button type="submit"
            className="w-full py-3.5 rounded-xl bg-[#0F1A2F] text-white font-bold hover:bg-[#1E2D4A] shadow-lg transition-all">
            Sign In
          </button>
        </form>
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
          <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs font-medium">ATAU</span></div>
        </div>
        <button onClick={() => navigateTo('feed')}
          className="mt-5 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors text-sm">
          Sign in with Google
        </button>
        <p className="text-center text-sm text-gray-500 mt-6">
          Belum punya akun? <button onClick={() => navigateTo('register')} className="text-[#C5A869] font-bold hover:underline">Daftar</button>
        </p>
      </div>
    </div>
  );

  // ── REGISTER VIEW ─────────────────────────────
  // CHANGED V8: Disederhanakan — hanya email/Google.
  // Verifikasi dokumen dipindahkan ke Edit Profil.
  // Ada peringatan 1 bulan batas verifikasi.
  const RegisterView = () => {
    const [done, setDone] = useState(false);
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 justify-center mb-8">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none">
              <path d="M50 5L95 50L50 95L5 50L50 5Z" stroke="#C5A869" strokeWidth="4" fill="none"/>
            </svg>
            <span className="text-xl font-bold text-[#C5A869] font-['Cardo']">SynergyX</span>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            {!done ? (
              <>
                <h3 className="text-2xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Buat Akun SynergyX</h3>
                <p className="text-sm text-gray-500 mb-4">Mulai perjalanan kolaborasi bisnis Anda.</p>

                {/* NEW V8: Warning 1 bulan verifikasi */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                  ⏰ <strong>Penting:</strong> Setelah mendaftar, Anda memiliki <strong>1 bulan</strong> untuk
                  melengkapi verifikasi dokumen di halaman <strong>Edit Profil</strong>. Akun yang belum
                  terverifikasi akan memiliki visibilitas lebih rendah di feed dan akan dinonaktifkan jika
                  melewati batas waktu.
                </div>

                <div className="space-y-4">
                  {[["Nama Brand / Entitas","text","Teman Kreativ"],["Email","email","hello@brand.id"],["Password","password","••••••••"]].map(([label,type,ph]) => (
                    <div key={label}>
                      <label className="text-xs font-bold text-gray-600 uppercase block mb-1.5">{label}</label>
                      <input type={type} placeholder={ph}
                        className="w-full bg-[#FDFBF7] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A869]"/>
                    </div>
                  ))}
                  <button onClick={() => setDone(true)}
                    className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">
                    Daftar Sekarang →
                  </button>
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
                    <div className="relative flex justify-center"><span className="px-2 bg-white text-gray-500 text-xs">ATAU</span></div>
                  </div>
                  <button onClick={() => setDone(true)}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 font-bold hover:bg-gray-50 text-sm">
                    Daftar dengan Google
                  </button>
                </div>
              </>
            ) : (
              /* Success state: arahkan ke Edit Profil untuk upload dokumen */
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center mb-4 text-3xl">✅</div>
                <h3 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-2">Akun Berhasil Dibuat!</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Selamat datang di SynergyX! Segera lengkapi verifikasi dokumen di <strong>Edit Profil</strong> dalam
                  1 bulan agar akun Anda mendapat visibilitas penuh di feed.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-left text-sm text-amber-800">
                  <p className="font-bold mb-2">📋 Dokumen yang dibutuhkan:</p>
                  <p>• <strong>Bisnis/Perusahaan:</strong> NIB atau link domain resmi</p>
                  <p>• <strong>Komunitas/Organisasi:</strong> Impact Report / bukti kegiatan</p>
                  <p>• <strong>Individu:</strong> Upload KTP</p>
                </div>
                <button onClick={() => navigateTo("feed")}
                  className="w-full py-3.5 bg-[#0F1A2F] text-white font-bold rounded-xl hover:bg-[#1E2D4A] transition">
                  Mulai Gunakan SynergyX →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ── PARTNER FULL PROFILE VIEW (NEW in V8) ──────
  // CHANGED V8: Klik profil di feed sekarang membuka full profile view
  // bukan hanya popup connect. Menampilkan data lengkap seperti profil sendiri.
  const PartnerProfileView = ({ partner }) => {
    const [connected, setConnected] = useState(connectedUsers.includes(partner.brand));
    return (
      <div className="flex-1 overflow-y-auto bg-[#FDFBF7]">
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-5">
          {/* Back button */}
          <button onClick={() => setViewingPartnerProfile(null)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#0F1A2F] transition">
            ← Kembali ke Feed
          </button>

          {/* Header */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <div className="h-28 bg-gradient-to-r from-[#0F1A2F] to-[#2D4066]"/>
            <div className="px-6 pb-6 relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-white shadow-xl text-[#0F1A2F] flex items-center justify-center text-2xl font-['Cardo'] font-bold absolute -top-8 md:-top-10">
                {partner.avatar}
              </div>
              <div className="mt-10 md:mt-14 flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{partner.brand}</h3>
                    {partner.verified
                      ? <span className="text-blue-500">✔</span>
                      : <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 font-bold">Belum Verified</span>
                    }
                  </div>
                  <p className="text-[#C5A869] font-bold text-xs uppercase mt-1">{partner.industry} • {partner.accountType}</p>
                  <p className="text-gray-600 mt-2 font-medium italic text-sm">"{partner.tagline}"</p>
                </div>
                <button onClick={() => { setConnected(true); setConnectedUsers(p => [...p, partner.brand]); }}
                  className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors flex-shrink-0 flex items-center gap-2 ${
                    connected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'border-2 border-[#0F1A2F] text-[#0F1A2F] hover:bg-[#0F1A2F] hover:text-white'
                  }`}>
                  {connected ? '✅ Terhubung' : '🤝 Connect'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ['👁️', partner.stats.views.toLocaleString(), 'Profile Views'],
              ['📊', partner.stats.ongoing, 'Partnership Aktif'],
              ['🏆', partner.stats.done, 'Deals Selesai'],
              ['⭐', partner.rating + '/5', 'Rating'],
            ].map(([icon, val, label]) => (
              <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-center">
                <div className="text-xl mb-2">{icon}</div>
                <div className="text-xl font-['Cardo'] font-bold text-[#0F1A2F]">{val}</div>
                <div className="text-[11px] text-gray-400 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* FOUNDER — di atas currency, sama dengan profil sendiri */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg flex gap-5 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center shrink-0">
              <span className="text-3xl">👤</span>
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F]">{partner.founder.name}</h4>
              <p className="text-sm font-bold text-[#C5A869] mb-3">{partner.founder.role}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{partner.founder.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['LinkedIn', 'Instagram', 'Website', 'Track Record'].map(s => (
                  <a key={s} href="#"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition">
                    🔗 {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Collaboration Currency */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
            <h4 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Collaboration Currency</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ['👥', 'Audience Asset', partner.currency.audience],
                ['⭐', 'Credibility Asset', partner.currency.credibility],
                ['📈', 'Activation Asset', partner.currency.activation],
                ['🔗', 'Network Asset', partner.currency.network],
              ].map(([icon, label, val]) => (
                <div key={label} className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-2 text-[#0F1A2F] mb-1"><span>{icon}</span><span className="font-bold text-sm">{label}</span></div>
                  <p className="text-sm text-gray-600">{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
            <h4 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Portofolio Kolaborasi</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {partner.portfolio.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-50 relative">
                  <span className="absolute top-4 right-4">✅</span>
                  <h5 className="text-sm font-bold text-[#0F1A2F] mb-1 pr-6">{item.title}</h5>
                  <p className="text-xs text-gray-500">Mitra: {item.partner}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-500/20 px-2.5 py-1 rounded-md uppercase">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Collabs */}
          <div className="bg-[#FDFBF7] rounded-3xl p-6 border border-dashed border-gray-300">
            <h4 className="text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Peluang Aktif yang Dibuka</h4>
            {partner.activeCollabs.map((c, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#0F1A2F] text-white">{c.type}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30">{c.scheme}</span>
                </div>
                <h5 className="font-['Cardo'] font-bold text-[#0F1A2F] text-base mb-3">{c.title}</h5>
                <div className="grid sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#FDFBF7] p-3 rounded-lg border border-gray-100">
                    <span className="text-xs text-[#C5A869] font-bold block mb-1">Benefit Mitra:</span>
                    <p className="text-xs text-gray-600">{c.give}</p>
                  </div>
                  <div className="bg-[#FDFBF7] p-3 rounded-lg border border-gray-100">
                    <span className="text-xs text-[#0F1A2F] font-bold block mb-1">Kewajiban Mitra:</span>
                    <p className="text-xs text-gray-600">{c.expect}</p>
                  </div>
                </div>
                <button onClick={() => {
                  setViewingPartnerProfile(null);
                  const feedItem = feedItems.find(f => f.partnerId === partner.id);
                  if (feedItem) { setSelectedCard(feedItem); setShowProposalModal(true); }
                }} className="flex items-center gap-2 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition">
                  ✉️ Ajukan Proposal
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ── COLLAB CARD ───────────────────────────────
  // CHANGED V8: Avatar & nama brand sekarang membuka full PartnerProfileView
  // Ditambahkan tombol "Lihat Profil" yang jelas
  // Akun belum verified dapat badge peringatan
  const CollabCard = ({ data, onApply }) => {
    const partner = DUMMY_PARTNERS[data.partnerId];
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-xl transition-all duration-300 mb-4">
        {data.connectionPost && (
          <div className="flex items-center gap-1.5 text-[10px] text-[#C5A869] font-bold uppercase mb-2">🔗 Dari Koneksi Anda</div>
        )}
        {/* NEW V8: Warning badge untuk akun belum verified */}
        {!data.verified && (
          <div className="flex items-center gap-1.5 text-[10px] text-amber-700 font-bold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit mb-2">
            ⚠️ Akun Belum Terverifikasi — Visibilitas Terbatas
          </div>
        )}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
            {/* CHANGED V8: onClick sekarang buka full profile, bukan popup */}
            <button onClick={() => partner && setViewingPartnerProfile(partner)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center font-bold text-[#C5A869] text-sm md:text-base flex-shrink-0 hover:ring-2 hover:ring-[#C5A869] transition-all cursor-pointer">
              {data.avatar}
            </button>
            <div>
              <div className="flex items-center gap-1.5">
                {/* CHANGED V8: nama brand juga buka full profile */}
                <button onClick={() => partner && setViewingPartnerProfile(partner)}
                  className="text-[#0F1A2F] font-bold text-sm hover:text-[#C5A869] transition-colors">
                  {data.brand}
                </button>
                {data.verified && <span className="text-blue-500 text-xs">✔</span>}
              </div>
              <p className="text-xs text-gray-400">{data.author} • {data.authorRole}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">{data.time}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{data.narration}</p>

        <div className="bg-[#FDFBF7] border border-[#C5A869]/30 rounded-xl p-4 mb-4 border-l-4 border-l-[#C5A869]">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#0F1A2F] text-white">{data.type}</span>
            <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-[#C5A869]/10 text-[#AA7C11] border border-[#C5A869]/30">{data.scheme}</span>
          </div>
          <h3 className="text-base md:text-lg font-['Cardo'] font-bold text-[#0F1A2F] mb-3">{data.title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-xs text-[#C5A869] font-bold block mb-1">Benefit Mitra:</span>
              <p className="text-xs text-gray-600 leading-relaxed">{data.give}</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
              <span className="text-xs text-[#0F1A2F] font-bold block mb-1">Kewajiban Mitra:</span>
              <p className="text-xs text-gray-600 leading-relaxed">{data.expect}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => toggleLike(data.id)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${data.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
              {data.isLiked ? '❤️' : '🤍'} {data.likes}
            </button>
            <button onClick={() => toggleSave(data.id)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${data.isSaved ? 'text-[#C5A869]' : 'text-gray-400 hover:text-[#C5A869]'}`}>
              {data.isSaved ? '🔖' : '📄'} {data.saves}
            </button>
            {/* NEW V8: Tombol Lihat Profil yang eksplisit di setiap card */}
            {partner && (
              <button onClick={() => setViewingPartnerProfile(partner)}
                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 border border-gray-200 px-2.5 py-1 rounded-lg hover:bg-gray-50 transition-colors">
                👁 Lihat Profil
              </button>
            )}
          </div>
          <button onClick={() => onApply(data)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F1A2F] text-white text-xs font-bold rounded-lg hover:bg-[#1E2D4A] transition-colors shadow-md">
            ✉️ Ajukan Proposal
          </button>
        </div>
      </div>
    );
  };

  // ── PROFILE VIEW ──────────────────────────────
  // CHANGED V8: Founder section dipindahkan ke atas (sebelum Collaboration Currency)
  // CHANGED V8: Jika akun belum verified, tampilkan banner peringatan
  const ProfileView = () => (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-5">
      <div>
        <h2 className="text-2xl md:text-3xl font-['Cardo'] font-bold text-[#0F1A2F]">Profil Etalase Bisnis</h2>
        <p className="text-gray-500 text-sm mt-1">Kredibilitas bisnis Anda di SynergyX.</p>
      </div>

      {/* NEW V8: Verification warning banner — tampil jika belum verified */}
      {!isVerified && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
          <span className="text-2xl">⚠️</span>
          <div className="flex-1">
            <p className="font-bold text-amber-800 text-sm">Akun Belum Terverifikasi — Sisa 24 Hari</p>
            <p className="text-amber-700 text-xs mt-1 leading-relaxed">
              Segera upload dokumen verifikasi. Akun yang tidak terverifikasi dalam 1 bulan akan dinonaktifkan,
              dan post Anda di feed mendapat visibilitas lebih rendah dari akun verified.
            </p>
            <button className="mt-3 px-4 py-2 bg-amber-800 text-white text-xs font-bold rounded-lg hover:bg-amber-900 transition">
              Upload Dokumen Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Header, Stats ... (sama seperti V7) */}
      {/* ... */}

      {/* CHANGED V8: FOUNDER sekarang di ATAS (sebelum Collaboration Currency) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg flex flex-col md:flex-row items-start gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0F1A2F] to-[#2D4066] flex items-center justify-center shrink-0">
          <span className="text-3xl">👤</span>
        </div>
        <div className="flex-1">
          <h4 className="text-xl md:text-2xl font-['Cardo'] font-bold text-[#0F1A2F]">{MOCK_USER.founder.name}</h4>
          <p className="text-sm font-bold text-[#C5A869] mb-3">{MOCK_USER.founder.role}</p>
          <p className="text-sm text-gray-600 leading-relaxed">{MOCK_USER.founder.bio}</p>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            {['LinkedIn', 'Instagram', 'Website', 'Track Record'].map(s => (
              <a key={s} href="#"
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0F1A2F]/5 text-[#0F1A2F] rounded-lg text-xs font-bold hover:bg-[#0F1A2F]/10 transition">
                🔗 {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Collaboration Currency — setelah Founder */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-lg">
        <h4 className="text-lg md:text-xl font-['Cardo'] font-bold text-[#0F1A2F] mb-4">Collaboration Currency</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ['👥', 'Audience Asset', MOCK_USER.currency.audience],
            ['⭐', 'Credibility Asset', MOCK_USER.currency.credibility],
            ['📈', 'Activation Asset', MOCK_USER.currency.activation],
            ['🔗', 'Network Asset', MOCK_USER.currency.network],
          ].map(([icon, label, val]) => (
            <div key={label} className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-[#0F1A2F] mb-1"><span>{icon}</span><span className="font-bold text-sm">{label}</span></div>
              <p className="text-sm text-gray-600">{val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── RENDER ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-['Inter'] text-slate-800">
      {currentView === 'landing' && <LandingView/>}
      {currentView === 'login' && <LoginView/>}
      {currentView === 'register' && <RegisterView/>}

      {isAppView && (
        <div className="flex max-w-screen-2xl mx-auto min-h-screen">
          <Sidebar/>
          <main className={`flex-1 min-w-0 overflow-y-auto ${currentView === 'chat' ? '' : 'pb-10'}`}>
            {/* CHANGED V8: Partner full profile tampil sebagai overlay di dalam main */}
            {viewingPartnerProfile ? (
              <PartnerProfileView partner={viewingPartnerProfile}/>
            ) : (
              <>
                {currentView === 'feed' && <FeedView/>}
                {/* FIXED V8: Dashboard sekarang bisa diakses */}
                {currentView === 'dashboard' && <DashboardView/>}
                {currentView === 'profile' && <ProfileView/>}
                {currentView === 'create' && <CreateCollabView/>}
                {currentView === 'proposals' && <ProposalsView/>}
                {currentView === 'chat' && <ChatView/>}
                {currentView === 'testimoni' && <TestimoniView/>}
              </>
            )}
          </main>
          {rightPanel === 'mou' && !viewingPartnerProfile && <MouPanel/>}
          {rightPanel === 'lpj' && !viewingPartnerProfile && <LpjPanel/>}
        </div>
      )}
    </div>
  );
}
