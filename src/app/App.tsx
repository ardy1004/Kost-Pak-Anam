import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  MapPin, BedDouble, Building2, TrendingUp, CheckCircle, Phone,
  Calendar, DollarSign, Shield, X, ArrowRight,
  ChevronLeft, ChevronRight, Zap, Clock, Key, Banknote,
  Star, Coffee, Users, Home, Award, Maximize2, Video
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";

// New Cloudinary image URLs
const IMG_URLS = [
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051226/image_7_dlqhex.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051226/image_8_dqmlkn.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051226/image_9_qr554y.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051226/image_6_z6myhz.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_1_foyi1x.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_4_cajunr.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_3_rs8znc.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_5_wtjen4.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_2_xszvb9.webp",
  "https://res.cloudinary.com/dhb8b7nrd/image/upload/v1778051225/image_10_ano6bc.webp",
];

const GALLERY = [
  { src: IMG_URLS[0], label: "Tampak Depan Properti" },
  { src: IMG_URLS[1], label: "Interior Kamar Premium" },
  { src: IMG_URLS[2], label: "Kamar Furnished AC + TV" },
  { src: IMG_URLS[3], label: "Fasilitas Lengkap" },
  { src: IMG_URLS[4], label: "Ruang Usaha / Resto" },
  { src: IMG_URLS[5], label: "Area Parkir Luas" },
  { src: IMG_URLS[6], label: "Kamar Mandi Dalam" },
  { src: IMG_URLS[7], label: "Area Bersama" },
  { src: IMG_URLS[8], label: "Tampak Keseluruhan" },
  { src: IMG_URLS[9], label: "Exterior Tambahan" },
];

const WA = "6281391278889";
const WA_DEFAULT = `https://wa.me/${WA}?text=${encodeURIComponent("Halo Salam Bumi Property, saya tertarik dengan Kost Eksklusif 16 Kamar dekat Ambarukmo Plaza. Mohon info lebih lanjut.")}`;

const INCOME_DATA = [
  { name: "Sewa Min", value: 20.8, color: "#16A34A" },
  { name: "Sewa Max", value: 24, color: "#22C55E" },
  { name: "Est. Harian", value: 27, color: "#F59E0B" },
  { name: "+ Usaha", value: 32, color: "#DC2626" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-accent border border-accent/30 bg-accent/10 px-3 py-1 rounded-full mb-4"
    >
      {children}
    </span>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 md:w-20 md:h-20 bg-black/60 border border-red-500/40 rounded-xl flex items-center justify-center mb-2 backdrop-blur-sm"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <span className="text-2xl md:text-3xl font-bold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">{label}</span>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1C1C1C] border border-white/10 rounded-lg px-4 py-2 text-sm shadow-xl">
        <p className="text-white/60 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">Rp{payload[0].value} Jt/bln</p>
      </div>
    );
  }
  return null;
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [galIdx, setGalIdx] = useState(0);
  const [countdown, setCountdown] = useState({ days: 7, hours: 0, minutes: 0, seconds: 0 });
  const [form, setForm] = useState({
    nama: "", asal_daerah: "", no_telepon: "",
    rencana_pembayaran: "", rencana_survey: "", pesan_tambahan: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const end = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const tick = () => {
      const d = Math.max(0, end - Date.now());
      setCountdown({
        days: Math.floor(d / 86400000),
        hours: Math.floor((d % 86400000) / 3600000),
        minutes: Math.floor((d % 3600000) / 60000),
        seconds: Math.floor((d % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.nama.trim().length < 2) e.nama = "Nama minimal 2 karakter";
    if (!form.asal_daerah.trim()) e.asal_daerah = "Wajib diisi";
    if (!/^[0-9]{10,13}$/.test(form.no_telepon.trim()))
      e.no_telepon = "Nomor tidak valid (10–13 digit angka)";
    if (!form.rencana_pembayaran) e.rencana_pembayaran = "Pilih rencana pembayaran";
    if (!form.rencana_survey) e.rencana_survey = "Pilih tanggal survey";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const msg = `Halo Salam Bumi Property,

Saya tertarik dengan properti Kost Eksklusif 16 Kamar dekat Ambarukmo Plaza.

Data Saya:
Nama: ${form.nama}
Asal: ${form.asal_daerah}
No. HP: ${form.no_telepon}
Pembayaran: ${form.rencana_pembayaran}
Rencana Survey: ${form.rencana_survey}

Pesan: ${form.pesan_tambahan || "-"}

Mohon informasi lebih lanjut. Terima kasih.`;
    setTimeout(() => {
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
      setSubmitting(false);
    }, 700);
  };

  const today = new Date().toISOString().split("T")[0];

  const inp =
    "w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-yellow-500/60 transition-colors text-sm";
  const lbl =
    "block text-[11px] font-bold uppercase tracking-[0.15em] text-white/45 mb-1.5";
  const errClass = "text-red-400 text-xs mt-1";

  const prevGal = () => setGalIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length);
  const nextGal = () => setGalIdx((i) => (i + 1) % GALLERY.length);
  const prevLight = () =>
    setLightbox((i) => (i != null ? (i - 1 + GALLERY.length) % GALLERY.length : null));
  const nextLight = () =>
    setLightbox((i) => (i != null ? (i + 1) % GALLERY.length : null));

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ─── STICKY HEADER ─── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={scrolled ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/8"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <Home className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-white tracking-tight hidden sm:block">
              Salam Bumi Property
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/50 text-xs hidden md:block">
              Kost 16 Kamar · Rp6,5M · Ambarukmo Yogyakarta
            </span>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white text-xs font-bold px-4 py-2 rounded-full transition-all active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              0813-9127-8889
            </a>
          </div>
        </div>
      </motion.header>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src={IMG_URLS[0]}
            alt="Kost Eksklusif 16 Kamar Yogyakarta"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        {/* Mesh glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-28 lg:py-32 w-full">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-lg shadow-red-600/30">
                <Zap className="w-3.5 h-3.5" />
                 EDISI OWNER BU — HARGA TURUN 3x!
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-5 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Investasi Kost Eksklusif
              <span className="text-accent italic"> 16 Kamar</span>
              <br />+ Ruang Usaha Aktif
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-2xl"
            >
              Lokasi premium tepi jalan lebar, <strong className="text-white">5 menit Plaza Ambarrukmo</strong>.
              Mesin cashflow ganda siap operasi — 16 kamar full furnished + ruang usaha komersial berjalan.
            </motion.p>

            {/* Price */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              <div className="bg-black/60 backdrop-blur border border-accent/30 rounded-2xl px-6 py-3">
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-0.5">Harga Investasi</p>
                <p
                  className="text-3xl md:text-4xl font-black text-accent"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Rp6,5 Miliar
                </p>
                <p className="text-xs text-white/40 mt-0.5">
                  <s className="text-white/25">Rp8,5 Miliar</s>
                  <span className="text-green-400 ml-2 font-bold">NEGO SAMPAI DEAL</span>
                </p>
              </div>
              <div className="text-sm text-white/50 max-w-[200px] leading-relaxed">
                Sudah diturunkan 3× oleh owner.<br />
                <span className="text-red-400 font-semibold">Kesempatan langka — terbatas!</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold text-sm px-7 py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-[1.03] active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Hubungi via WhatsApp
              </a>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm px-7 py-4 rounded-xl backdrop-blur transition-all hover:scale-[1.03] active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Jadwalkan Survey Gratis
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {["✓ Lokasi Strategis", "✓ Siap Operasi", "✓ Dual Income", "✓ Legalitas Lengkap"].map((t) => (
                <span
                  key={t}
                  className="text-xs font-semibold text-white/70 bg-white/8 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronLeft className="w-4 h-4 -rotate-90" />
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="bg-[#0F0F0F] border-y border-white/6">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Building2 className="w-5 h-5 text-accent" />, value: "512 m²", label: "Luas Tanah" },
              { icon: <BedDouble className="w-5 h-5 text-accent" />, value: "16 Kamar", label: "Full Furnished" },
              { icon: <Banknote className="w-5 h-5 text-accent" />, value: "Rp24 Jt+", label: "Est. Pendapatan/Bln" },
              { icon: <TrendingUp className="w-5 h-5 text-accent" />, value: "3.5–4.5%", label: "Gross Yield / Tahun" },
            ].map(({ icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p
                    className="text-lg font-black text-white leading-none"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5 font-medium">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES / KEUNGGULAN ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Mengapa Investasi Cerdas?</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              4 Alasan Properti Ini Berbeda
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                color: "text-red-400",
                bg: "bg-red-500/10 border-red-500/20",
                title: "Lokasi Gold Spot",
                desc: "Tepi jalan aspal lebar, dikelilingi café, hotel, dan pusat bisnis. Hanya beberapa menit dari Plaza Ambarrukmo.",
              },
              {
                icon: <DollarSign className="w-6 h-6" />,
                color: "text-yellow-400",
                bg: "bg-yellow-500/10 border-yellow-500/20",
                title: "Dual Income Stream",
                desc: "Pendapatan dari 16 kamar kost premium + cashflow usaha komersial/resto yang sedang aktif berjalan.",
              },
              {
                icon: <Key className="w-6 h-6" />,
                color: "text-green-400",
                bg: "bg-green-500/10 border-green-500/20",
                title: "Siap Operasi Penuh",
                desc: "16 kamar full furnished dengan AC, TV LED, water heater. Tidak perlu investasi tambahan, langsung hasilkan.",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                color: "text-blue-400",
                bg: "bg-blue-500/10 border-blue-500/20",
                title: "Apresiasi Tinggi",
                desc: "Kawasan Sorowajan Baru berkembang pesat. Estimasi kenaikan nilai properti 8–12% per tahun.",
              },
            ].map(({ icon, color, bg, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-card border border-white/6 rounded-2xl p-6 hover:border-white/12 transition-all hover:-translate-y-1 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${bg} ${color} group-hover:scale-110 transition-transform`}
                >
                  {icon}
                </div>
                <h3 className="font-bold text-white text-base mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Foto Properti</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lihat Kondisi Nyata Properti
            </motion.h2>
          </motion.div>

          {/* Main image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden mb-4 bg-[#1A1A1A] cursor-pointer group"
            onClick={() => setLightbox(galIdx)}
          >
            <img
              src={GALLERY[galIdx].src}
              alt={GALLERY[galIdx].label}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                {GALLERY[galIdx].label}
              </span>
              <span className="text-xs text-white/60 bg-black/50 backdrop-blur px-3 py-2 rounded-full border border-white/10 flex items-center gap-1.5">
                <Maximize2 className="w-3 h-3" /> Perbesar
              </span>
            </div>
            {/* Arrows */}
            <button
              onClick={(ev) => { ev.stopPropagation(); prevGal(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(ev) => { ev.stopPropagation(); nextGal(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/10 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {GALLERY.map(({ src, label }, i) => (
              <button
                key={i}
                onClick={() => setGalIdx(i)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all bg-[#1A1A1A] ${
                  i === galIdx ? "border-accent shadow-lg shadow-accent/20" : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <img src={src} alt={label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO SECTION ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Video Properti</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lihat Tour Virtual Properti
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[9/16] md:aspect-[9/16] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-accent/10"
          >
            <video
              controls
              autoPlay={false}
              className="w-full h-full object-cover"
              poster={IMG_URLS[0]}
            >
              <source src="https://res.cloudinary.com/dhb8b7nrd/video/upload/v1778051293/Kost_Exclusive_Pak_Anam_1_ibxkss.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </div>
      </section>

      {/* ─── SPECIFICATIONS ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: spec cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Spesifikasi Properti</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Data Teknis
                <br />
                <span className="text-accent italic">Lengkap & Terverifikasi</span>
              </motion.h2>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Building2 className="w-5 h-5 text-accent" />, label: "Luas Tanah", value: "512 m²" },
                  { icon: <Home className="w-5 h-5 text-accent" />, label: "Luas Bangunan", value: "±500 m²" },
                  { icon: <BedDouble className="w-5 h-5 text-accent" />, label: "Jumlah Kamar", value: "16 Kamar" },
                  { icon: <Coffee className="w-5 h-5 text-accent" />, label: "Ruang Usaha", value: "Aktif Berjalan" },
                ].map(({ icon, label, value }) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className="bg-card border border-white/6 rounded-xl p-5 hover:border-accent/30 transition-colors"
                  >
                    <div className="mb-3">{icon}</div>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">{label}</p>
                    <p
                      className="text-xl font-black text-white"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.a
                variants={fadeUp}
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-4 transition-all"
              >
                Tanya spesifikasi lebih lanjut <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Right: facilities */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card border border-white/6 rounded-2xl p-8">
                <p className="text-xs uppercase tracking-widest font-bold text-accent mb-6">
                  Fasilitas Per Kamar & Properti
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "AC di Setiap Kamar",
                    "TV LED",
                    "Water Heater",
                    "Kamar Mandi Dalam",
                    "Furnitur Berkualitas",
                    "Listrik Token / Kamar",
                    "Area Parkir Luas",
                    "Ruang Usaha / Resto",
                    "Keamanan 24 Jam",
                    "Akses Jalan Lebar",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/6">
                  <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-4">
                    Harga Sewa Kamar
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-xs text-green-400 font-semibold mb-1">Sewa Bulanan</p>
                      <p className="text-lg font-black text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Rp1,3–1,5 Jt
                      </p>
                      <p className="text-xs text-white/40">/ kamar / bulan</p>
                    </div>
                    <div className="flex-1 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-center">
                      <p className="text-xs text-yellow-400 font-semibold mb-1">Sewa Harian</p>
                      <p className="text-lg font-black text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                        Rp150 Rb+
                      </p>
                      <p className="text-xs text-white/40">/ kamar / malam</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── INCOME POTENTIAL ─── */}
      <section className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Potensi ROI</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-white mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kalkulasi Pendapatan & Return
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-sm max-w-xl mx-auto">
              Estimasi Gross Yield: <strong className="text-accent">3.5%–4.5% per tahun</strong> — belum termasuk capital gain dari apresiasi aset
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-card border border-white/6 rounded-2xl p-6 md:p-8"
            >
              <p className="text-sm font-bold text-white/60 uppercase tracking-widest mb-6">
                Estimasi Pendapatan Bulanan (Juta Rupiah)
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={INCOME_DATA} barSize={40} barCategoryGap="25%">
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "'Plus Jakarta Sans'" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "'DM Mono'" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}Jt`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {INCOME_DATA.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-white/6">
                {INCOME_DATA.map(({ name, color, value }) => (
                  <div key={name} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    {name}: <strong className="text-white" style={{ fontFamily: "'DM Mono'" }}>Rp{value}Jt</strong>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col gap-4"
            >
              {[
                {
                  label: "Estimasi Pendapatan / Bulan",
                  value: "Rp24–32 Juta",
                  sub: "Dari sewa + usaha komersial",
                  color: "border-green-500/30 bg-green-500/5",
                  vcolor: "text-green-400",
                },
                {
                  label: "Estimasi Pendapatan / Tahun",
                  value: "Rp288–384 Juta",
                  sub: "Gross income sebelum operasional",
                  color: "border-yellow-500/30 bg-yellow-500/5",
                  vcolor: "text-yellow-400",
                },
                {
                  label: "Gross Yield per Tahun",
                  value: "3.5% – 4.5%",
                  sub: "Belum termasuk capital gain 8–12%/thn",
                  color: "border-blue-500/30 bg-blue-500/5",
                  vcolor: "text-blue-400",
                },
                {
                  label: "Demand Penyewa",
                  value: "Sangat Tinggi",
                  sub: "Mahasiswa · Pekerja · Wisatawan",
                  color: "border-red-500/30 bg-red-500/5",
                  vcolor: "text-red-400",
                },
              ].map(({ label, value, sub, color, vcolor }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className={`rounded-xl p-5 border ${color}`}
                >
                  <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-1">{label}</p>
                  <p
                    className={`text-xl font-black ${vcolor}`}
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs text-white/35 mt-1">{sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Benefits list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8"
          >
            {[
              "Demand tinggi dari mahasiswa, pekerja, & wisatawan",
              "Manajemen mudah dengan sistem token per kamar",
              "Aset produktif yang 'membayar dirinya sendiri'",
              "Kawasan koridor Sorowajan–Umbulharjo terus berkembang",
            ].map((b) => (
              <motion.div
                key={b}
                variants={fadeUp}
                className="flex items-start gap-2.5 text-sm text-white/60 bg-card border border-white/6 rounded-xl p-4"
              >
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                {b}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── LOCATION ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Map visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] aspect-[4/3]"
            >
              <img
                src="https://images.unsplash.com/photo-1576233513951-77bc9ad0ebab?w=800&h=600&fit=crop&auto=format"
                alt="Kawasan Sorowajan Baru Yogyakarta"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/60 ring-4 ring-red-600/30 animate-pulse">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="mt-3 bg-black/80 backdrop-blur border border-white/15 rounded-xl px-4 py-2 text-center">
                  <p className="text-white text-xs font-bold">Sorowajan Baru</p>
                  <p className="text-white/50 text-[10px]">Dekat Plaza Ambarrukmo</p>
                </div>
              </div>
              {/* Distance badge */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur border border-accent/20 rounded-xl px-5 py-3">
                <p className="text-xs text-accent font-bold uppercase tracking-widest">Jarak ke Landmark</p>
                <p className="text-white text-sm font-semibold mt-1">5 menit ke Plaza Ambarrukmo</p>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>Lokasi Strategis</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Jantung Komersial
                <br />
                <span className="text-accent italic">Yogyakarta Timur</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-white/55 text-sm leading-relaxed mb-8">
                Sorowajan Baru adalah kawasan berkembang pesat dengan ekosistem bisnis lengkap.
                Properti ini berada di tepi jalan aspal lebar, mudah diakses dari semua arah.
              </motion.p>

              <motion.div variants={stagger} className="space-y-3">
                {[
                  { icon: <Star className="w-4 h-4 text-yellow-400" />, text: "Plaza Ambarrukmo — 5 menit" },
                  { icon: <Users className="w-4 h-4 text-blue-400" />, text: "Kawasan Bisnis, Hotel & Perkantoran" },
                  { icon: <Coffee className="w-4 h-4 text-orange-400" />, text: "Ratusan Café & Restoran di sekitar lokasi" },
                  { icon: <Building2 className="w-4 h-4 text-purple-400" />, text: "Kampus & pusat pendidikan terdekat" },
                  { icon: <MapPin className="w-4 h-4 text-red-400" />, text: "Akses jalan lebar 2 jalur — sangat lancar" },
                  { icon: <Award className="w-4 h-4 text-green-400" />, text: "Koridor Sorowajan–Umbulharjo: zona premium tumbuh" },
                ].map(({ icon, text }) => (
                  <motion.div
                    key={text}
                    variants={fadeUp}
                    className="flex items-center gap-3 text-sm text-white/65 bg-card border border-white/6 rounded-xl px-5 py-3 hover:border-white/12 transition-colors"
                  >
                    {icon}
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── URGENCY BANNER ─── */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[#0E0202]">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/80 via-black to-[#0E0202]" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/25 px-4 py-2 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" />
                PENAWARAN TERBATAS — OWNER SANGAT SERIOUS
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Kesempatan Emas untuk
              <br />
              <span className="text-red-400">Investor Decisive</span>
            </motion.h2>

            {/* Price history */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm"
            >
              <div className="flex flex-col items-center">
                <span className="text-white/35 text-[10px] uppercase tracking-wider mb-1">Harga Awal</span>
                <span className="line-through text-white/25 font-mono">Rp8,5 Miliar</span>
              </div>
              <ArrowRight className="w-3 h-3 text-white/30 self-center" />
              <div className="flex flex-col items-center">
                <span className="text-yellow-400 text-[10px] uppercase tracking-wider mb-1">Turun 1×</span>
                <span className="line-through text-white/35 font-mono">Rp7,5 Miliar</span>
              </div>
              <ArrowRight className="w-3 h-3 text-white/30 self-center" />
              <div className="flex flex-col items-center">
                <span className="text-red-400 text-[10px] uppercase tracking-wider mb-1">Turun 3× <span className="text-red-300">HARGA SAAT INI</span></span>
                <span className="text-red-400 font-black text-xl font-mono">Rp6,5 Miliar ✓</span>
                <span className="text-red-300/70 text-[10px]">(NEGO SAMPAI DEAL)</span>
              </div>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-white/50 text-sm max-w-lg mx-auto mb-10"
            >
              Harga telah disesuaikan 3× karena owner butuh dana cepat.
              Ini kesempatan mendapatkan properti di bawah nilai pasar!
            </motion.p>

            {/* Countdown */}
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-xs uppercase tracking-widest text-white/35 font-bold mb-5 flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Penawaran eksklusif berakhir dalam
              </p>
              <div className="flex items-start justify-center gap-4">
                <CountdownBox value={countdown.days} label="Hari" />
                <div className="text-2xl font-bold text-white/30 mt-4">:</div>
                <CountdownBox value={countdown.hours} label="Jam" />
                <div className="text-2xl font-bold text-white/30 mt-4">:</div>
                <CountdownBox value={countdown.minutes} label="Menit" />
                <div className="text-2xl font-bold text-white/30 mt-4">:</div>
                <CountdownBox value={countdown.seconds} label="Detik" />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.03] active:scale-95"
              >
                <Phone className="w-4 h-4" />
                Hubungi Sekarang
              </a>
              <button
                onClick={scrollToForm}
                className="flex items-center gap-2 border border-white/20 text-white font-bold text-sm px-8 py-4 rounded-xl hover:bg-white/5 transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                Jadwalkan Survey
              </button>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-xs text-white/30 mt-6"
            >
              Hanya untuk buyer serius yang siap deal cepat. Survey bisa online atau langsung.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ─── LEAD FORM ─── */}
      <section ref={formRef} className="py-20 md:py-28 bg-[#0C0C0C]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left info */}
            <div className="lg:col-span-2">
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>Konsultasi Gratis</SectionLabel>
                </motion.div>
                <motion.h2
                  variants={fadeUp}
                  className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Jadwalkan Survey &
                  <br />
                  <span className="text-accent italic">Analisis ROI Gratis</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-white/50 text-sm leading-relaxed mb-8">
                  Tim kami siap membantu Anda memahami potensi investasi ini secara detail.
                  Isi form dan kami hubungi dalam &lt;1 jam kerja.
                </motion.p>

                <motion.div variants={stagger} className="space-y-4">
                  {[
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Survey lokasi gratis (datang langsung)" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Analisis ROI & cashflow lengkap" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Konsultasi investasi tanpa tekanan" },
                    { icon: <CheckCircle className="w-4 h-4 text-green-400" />, text: "Legalitas & dokumen transparan" },
                    { icon: <Shield className="w-4 h-4 text-blue-400" />, text: "Data Anda 100% aman & rahasia" },
                  ].map(({ icon, text }) => (
                    <motion.div
                      key={text}
                      variants={fadeUp}
                      className="flex items-center gap-3 text-sm text-white/65"
                    >
                      {icon}
                      {text}
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="mt-8 p-5 bg-card border border-white/6 rounded-2xl"
                >
                  <p className="text-xs text-accent font-bold uppercase tracking-widest mb-3">
                    Langsung WhatsApp
                  </p>
                  <a
                    href={WA_DEFAULT}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white hover:text-accent transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-[#25D366] flex-shrink-0">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div>
                      <p className="font-bold text-base">0813-9127-8889</p>
                      <p className="text-xs text-white/40">Salam Bumi Property</p>
                    </div>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 bg-card border border-white/8 rounded-2xl p-7 md:p-10"
            >
              <h3
                className="text-xl font-black text-white mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Form Jadwal Survey & Info Investasi
              </h3>
              <p className="text-white/40 text-xs mb-7">
                Semua field bertanda <span className="text-red-400">*</span> wajib diisi
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={lbl}>
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap Anda"
                      className={inp}
                      value={form.nama}
                      onChange={(e) => setForm({ ...form, nama: e.target.value })}
                    />
                    {errors.nama && <p className={errClass}>{errors.nama}</p>}
                  </div>
                  <div>
                    <label className={lbl}>
                      Asal Daerah / Kota <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Jakarta, Surabaya"
                      className={inp}
                      value={form.asal_daerah}
                      onChange={(e) => setForm({ ...form, asal_daerah: e.target.value })}
                    />
                    {errors.asal_daerah && <p className={errClass}>{errors.asal_daerah}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className={lbl}>
                      No. WhatsApp Aktif <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      className={inp}
                      value={form.no_telepon}
                      onChange={(e) => setForm({ ...form, no_telepon: e.target.value.replace(/\D/g, "") })}
                    />
                    {errors.no_telepon && <p className={errClass}>{errors.no_telepon}</p>}
                  </div>
                  <div>
                    <label className={lbl}>
                      Rencana Pembayaran <span className="text-red-400">*</span>
                    </label>
                    <select
                      className={`${inp} cursor-pointer`}
                      value={form.rencana_pembayaran}
                      onChange={(e) => setForm({ ...form, rencana_pembayaran: e.target.value })}
                    >
                      <option value="" disabled>-- Pilih Rencana --</option>
                      <option value="Cash Keras">Cash Keras (Lunas)</option>
                      <option value="Cash Tempo/Bertahap">Cash Tempo / Bertahap</option>
                      <option value="KPR Bank">KPR Bank</option>
                    </select>
                    {errors.rencana_pembayaran && (
                      <p className={errClass}>{errors.rencana_pembayaran}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className={lbl}>
                    Rencana Tanggal Survey <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    min={today}
                    className={inp}
                    value={form.rencana_survey}
                    onChange={(e) => setForm({ ...form, rencana_survey: e.target.value })}
                  />
                  {errors.rencana_survey && <p className={errClass}>{errors.rencana_survey}</p>}
                </div>

                <div>
                  <label className={lbl}>Pesan / Pertanyaan (Opsional)</label>
                  <textarea
                    rows={3}
                    placeholder="Ada pertanyaan khusus? Tulis di sini..."
                    className={`${inp} resize-none`}
                    value={form.pesan_tambahan}
                    onChange={(e) => setForm({ ...form, pesan_tambahan: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20BD5C] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-sm py-4 rounded-xl transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-green-500/20"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengarahkan ke WhatsApp...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Kirim & Lanjutkan via WhatsApp
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-white/25">
                  Dengan mengirim form ini, Anda akan diarahkan ke WhatsApp kami.
                  Data Anda 100% aman.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-16 md:py-20 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Company info */}
            <motion.div variants={fadeUp} className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-white text-base">Salam Bumi Property</p>
                  <p className="text-xs text-white/40">Yogyakarta, Indonesia</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-4">
                Spesialis investasi properti & manajemen aset Yogyakarta. Kami hadir untuk memastikan
                setiap transaksi berjalan transparan, aman, dan menguntungkan.
              </p>
              <a
                href="mailto:info@salambumiproperty.com"
                className="text-accent text-xs hover:underline"
              >
                info@salambumiproperty.com
              </a>
            </motion.div>

            {/* Services */}
            <motion.div variants={fadeUp}>
              <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-4">
                Layanan Kami
              </p>
              <div className="space-y-2.5">
                {[
                  "Jual / Beli / Titip Jual Properti",
                  "Tanah, Rumah, Kost, Hotel, Komersial",
                  "Jasa Bangun & Desain Interior",
                  "Manajemen Aset Properti Profesional",
                ].map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-sm text-white/55">
                    <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trust */}
            <motion.div variants={fadeUp}>
              <p className="text-xs uppercase tracking-widest font-bold text-white/30 mb-4">
                Komitmen Kami
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Shield className="w-4 h-4 text-blue-400" />, label: "Legalitas Terjamin" },
                  { icon: <Award className="w-4 h-4 text-yellow-400" />, label: "Data Pasar Akurat" },
                  { icon: <DollarSign className="w-4 h-4 text-green-400" />, label: "Nego Sampai Deal" },
                  { icon: <Star className="w-4 h-4 text-purple-400" />, label: "After Sales Service" },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-card border border-white/6 rounded-xl p-3 text-xs text-white/60"
                  >
                    {icon}
                    {label}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 bg-[#060606] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © 2024 Salam Bumi Property. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/25">
            <span>Yogyakarta, Indonesia</span>
            <a href={WA_DEFAULT} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#20BD5C] transition-colors font-semibold">
              WhatsApp: 0813-9127-8889
            </a>
          </div>
        </div>
      </footer>

      {/* ─── LIGHTBOX ─── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].label}
              className="w-full max-h-[80vh] object-contain rounded-xl"
            />
            <p className="text-center text-sm text-white/50 mt-3">{GALLERY[lightbox].label}</p>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-4 -right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <button
              onClick={prevLight}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextLight}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex justify-center gap-1.5 mt-3">
              {GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightbox ? "bg-accent w-4" : "bg-white/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING WHATSAPP ─── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold text-sm pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-green-500/40 transition-all hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="hidden sm:block">Chat WhatsApp</span>
        </a>
        {/* Ping animation */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full" />
      </motion.div>
    </div>
  );
}
