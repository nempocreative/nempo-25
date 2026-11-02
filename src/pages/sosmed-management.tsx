import type React from "react";
import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  Lightbulb, PenLine, CalendarClock, BarChart3, Megaphone, Image as ImageIcon,
  MessageCircle, Check, Plus, Minus, ArrowRight, Heart, Play,
} from "lucide-react";
import { SOSMED_ADDONS, SOSMED_BUNDLES, SOSMED_MONTHLY_PACKAGES, SOSMED_UMKM_PROMO, bundleSaving, rupiah } from "@/data/sosmed-packages";
import { SosmedPortfolioGallery } from "@/components/sosmed-portfolio-gallery";

const hand = "font-[family-name:var(--font-wed-hand)]";

const services = [
  { icon: Lightbulb, title: "Strategi Konten", color: "var(--color-sos-pink)", desc: "Ide konten, pilar, dan kalender posting yang pas dengan target audiens." },
  { icon: ImageIcon, title: "Desain & Video", color: "var(--color-sos-lilac)", desc: "Materi feed, story, dan reels dibuat langsung oleh tim Nempo Organizer." },
  { icon: PenLine, title: "Caption & Hashtag", color: "var(--color-sos-ink)", desc: "Hashtag utama dan tag akun yang relevan biar konten gampang ditemukan." },
  { icon: CalendarClock, title: "Jadwal & Publikasi", color: "var(--color-sos-cherry)", desc: "Konten diposting rutin sesuai jadwal — kamu tinggal pantau." },
  { icon: Megaphone, title: "Iklan Instagram", color: "var(--color-sos-pink)", desc: "Iklan berbayar dengan tombol CTA langsung ke halaman event kamu." },
  { icon: BarChart3, title: "Pantau Hasil", color: "var(--color-sos-lilac)", desc: "Evaluasi performa konten untuk perbaikan di periode berikutnya." },
];

const steps = [
  { title: "Ngobrol dulu", desc: "Ceritakan brand atau event kamu, target, dan kanal yang mau dipakai." },
  { title: "Pilih paket", desc: "Ambil paket bulanan — Basic, Growth, atau Professional." },
  { title: "Kami produksi", desc: "Tim membuat materi, caption, dan menyusun jadwal posting." },
  { title: "Tayang & pantau", desc: "Konten tayang di Instagram/TikTok, hasilnya kita evaluasi bareng." },
];

const faqs = [
  { q: "Materi kontennya dari siapa?", a: "Materi dibuat oleh tim Nempo Organizer. Untuk Instagram Feed, caption disiapkan oleh event creator supaya pesannya sesuai." },
    { q: "Iklan Instagram dihitung bagaimana?", a: "Instagram Ads dihitung per minggu (Rp300.000/minggu) dengan tombol CTA langsung ke detail event." },
  { q: "Mau sekalian tampil di website Nempo?", a: "Pilih All Promotion: semua isi Paket Social Media plus banner dan rekomendasi event di website selama 2 minggu." },
  { q: "Boleh nambah konten satuan?", a: "Boleh. Tambahan 1 Reels Rp100.000, tambahan 1 desain Feed Rp50.000, foto produk mulai Rp300.000, video promosi bisnis mulai Rp500.000, Meta Ads management mulai Rp300.000, dan TikTok management mulai Rp500.000." },
  { q: "Ada kunjungan produksi konten?", a: "Ada. Paket Growth dapat 1x kunjungan produksi konten (maksimal 2 jam), Paket Professional 2x. Paket Basic belum termasuk." },
];

const marqueeItems = ["Instagram Feed", "Reels", "Story", "Highlight", "Instagram Ads", "TikTok"];


function StickerIcon({ icon: Icon, color, className = "" }: { icon: React.ElementType; color: string; className?: string }) {
  return (
    <span
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${className}`}
      style={{
        background: `linear-gradient(148deg, color-mix(in srgb, ${color} 55%, white) 0%, ${color} 58%, color-mix(in srgb, ${color} 72%, black) 100%)`,
        boxShadow: `0 4px 0 color-mix(in srgb, ${color} 82%, black), 0 8px 13px -9px color-mix(in srgb, ${color} 55%, transparent), inset 0 1px 0 rgba(255,255,255,.54)`,
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
      <Icon className="relative h-6 w-6 text-primary-foreground" strokeWidth={2.4} />
    </span>
  );
}

function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 20" fill="none" className={className} aria-hidden>
      <path d="M3 13 C 11 3, 19 19, 27 10 S 43 3, 51 12 S 57 15, 57 8" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

function Burst({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path d="M20 4v8M20 28v8M4 20h8M28 20h8M9 9l5.5 5.5M25.5 25.5L31 31M31 9l-5.5 5.5M14.5 25.5L9 31" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  );
}

/* Mini mockup HP berisi grid feed — pengganti ilustrasi stok */
function PhoneMockup() {
  const tiles = [
    "bg-sos-pink", "bg-sos-lilac", "bg-sos-ink",
    "bg-sos-cherry", "bg-sos-blush", "bg-sos-pink",
    "bg-sos-lilac", "bg-sos-cherry", "bg-sos-blush",
  ];
  return (
    <div className="relative mx-auto w-[190px] rotate-3 rounded-[28px] border-[3px] border-sos-ink bg-card p-2.5" style={{ boxShadow: "6px 6px 0 0 var(--color-sos-ink)" }}>
      <div className="mb-2 flex items-center gap-2 px-1">
        <span className="h-7 w-7 rounded-full border-2 border-sos-pink bg-sos-blush" />
        <div>
          <p className="text-[10px] font-extrabold text-sos-ink">nempo.id</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {tiles.map((c, i) => (
          <span key={i} className={`relative aspect-square rounded-md ${c}`}>
            {i === 1 && <Play className="absolute right-1 top-1 h-2.5 w-2.5 fill-primary-foreground text-primary-foreground" />}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between px-1">
        <span className="flex items-center gap-1 text-[9px] font-bold text-sos-pink"><Heart className="h-3 w-3 fill-sos-pink" /> 2.481</span>
        <span className="text-[9px] text-muted-foreground">+128 pengikut baru</span>
      </div>
      <span className={`${hand} wed-wiggle absolute -top-7 left-2 -rotate-6 rounded-full bg-sos-pink px-3 py-1 text-base text-primary-foreground`}>
        rame nih!
      </span>
    </div>
  );
}

export default function SosmedManagementPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Layout>
      <div className="bg-background pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden bg-sos-ink px-6 pb-20 pt-14 sm:pt-20 text-primary-foreground">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sos-pink/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-sos-lilac/40 blur-3xl" />
          <Burst className="wed-float pointer-events-none absolute right-[3%] top-[6%] h-8 w-8 text-sos-lilac/70" />

          <div className="relative mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <p className={`${hand} text-2xl text-sos-pink sm:text-3xl`}>feed kamu sepi?</p>
              <h1 className="mt-3 text-[32px] font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                Biar sosmed <span className="text-sos-pink">rame</span>,<br />
                kami yang <span className="relative inline-block">
                  urus
                  <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-sos-pink" />
                </span>.
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                Sosmed Management Nempo — konten, caption, jadwal posting, sampai iklan Instagram & TikTok untuk brand dan event kamu.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#paket" className="wed-sticker flex-1 rounded-full bg-sos-pink px-5 py-3.5 text-center text-sm font-bold text-primary-foreground sm:flex-none sm:px-8">
                  Lihat Paket
                </a>
                <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="flex-1 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-5 py-3.5 text-center text-sm font-bold backdrop-blur sm:flex-none sm:px-8">
                  Konsultasi Gratis
                </a>
              </div>
              <p className="mt-5 text-xs text-primary-foreground/70">
                Promo UMKM <b className="text-primary-foreground">{rupiah(SOSMED_UMKM_PROMO.price)}</b> per bulan
              </p>
            </div>
            <div className="py-4">
              <PhoneMockup />
            </div>
          </div>

          <svg className="absolute bottom-0 left-0 w-full text-sos-pink" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
            <path d="M0,32 C240,60 480,4 720,28 C960,52 1200,8 1440,32 L1440,60 L0,60 Z" fill="currentColor" />
          </svg>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden bg-sos-pink py-3 text-primary-foreground" aria-hidden>
          <div className="wed-marquee flex w-max items-center gap-8">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8 text-sm font-semibold tracking-wide">
                {item}
                <Burst className="h-3.5 w-3.5" />
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Services */}
          <section className="px-6 py-12">
            <SectionHead eyebrow="Yang kami kerjakan" title="Dari ide sampai tayang" note="kamu fokus jualan aja" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {services.map((s) => (
                <div key={s.title} className="wed-card-pop flex h-full flex-col items-center rounded-3xl border-2 border-dashed border-border bg-card p-4 text-center hover:border-sos-pink/40 sm:p-5">
                  <StickerIcon icon={s.icon} color={s.color} className="mb-3.5" />
                  <h3 className="text-[13px] font-bold leading-snug text-sos-ink sm:text-sm">{s.title}</h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Portofolio */}
          <SosmedPortfolioGallery />

          {/* Bundles */}
          <section id="paket" className="scroll-mt-24 px-6 py-12">
            <SectionHead eyebrow="Paket Bulanan" title="Pilih paket yang pas" note="bisa naik kapan aja" />
            <div className="grid gap-5 lg:grid-cols-3">
              {SOSMED_MONTHLY_PACKAGES.map((p) => (
                <div
                  key={p.id}
                  className={`wed-card-pop relative flex h-full flex-col overflow-hidden rounded-3xl p-6 ${
                    p.recommended ? "bg-sos-pink text-primary-foreground" : "border-2 border-dashed border-border bg-card text-sos-ink"
                  }`}
                  style={p.recommended ? { boxShadow: "6px 6px 0 0 var(--color-sos-ink)" } : undefined}
                >
                  <span
                    className={`wed-sticker wed-wiggle absolute right-4 top-4 rotate-3 rounded-full px-3 py-1 text-[9px] font-bold tracking-wide ${
                      p.recommended ? "bg-sos-ink text-primary-foreground" : "bg-sos-blush text-sos-pink"
                    }`}
                  >
                    {p.recommended ? "PROMO UMKM" : p.tier}
                  </span>
                  <p className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${p.recommended ? "text-primary-foreground/80" : "text-sos-lilac"}`}>
                    {p.tier}
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold">{p.name}</h3>
                  <p className="mt-3 text-3xl font-extrabold">
                    {rupiah(p.price)}
                    <span className={`text-sm font-bold ${p.recommended ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.unit}</span>
                  </p>
                  <div className={`my-4 border-t-2 border-dashed ${p.recommended ? "border-primary-foreground/25" : "border-border"}`} />
                  <ul className="flex-1 space-y-2">
                    {p.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13px] leading-snug">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${p.recommended ? "bg-sos-ink" : "bg-sos-blush"}`}>
                          <Check className={`h-2.5 w-2.5 ${p.recommended ? "text-primary-foreground" : "text-sos-pink"}`} strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-4 text-xs italic ${p.recommended ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{p.fit}</p>
                  <a
                    href={NEMPO_CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`wed-sticker mt-4 block rounded-full py-3 text-center text-sm font-bold ${
                      p.recommended ? "bg-sos-ink text-primary-foreground" : "bg-sos-pink text-primary-foreground"
                    }`}
                  >
                    Ambil {p.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Add-ons */}
            <div className="mt-6 rounded-3xl bg-sos-blush px-5 py-6 sm:px-8 sm:py-7">
              <h3 className="text-lg font-extrabold text-sos-ink">Layanan Tambahan</h3>
              <p className="mt-1 text-xs text-muted-foreground">Boleh diambil sendiri atau ditambah ke paket mana pun.</p>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {SOSMED_ADDONS.map((a) => (
                  <li key={a.label} className="flex items-center justify-between gap-3 border-b border-dashed border-sos-ink/20 py-2.5 text-sm text-sos-ink">
                    <span>{a.label}</span>
                    <span className="shrink-0 font-extrabold text-sos-pink">{a.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <SectionHead eyebrow="Paket Promosi Event" title="Butuh dorongan instan?" note="buat event yang mau rame cepat" />
              <div className="grid gap-5 sm:grid-cols-2">
              {SOSMED_BUNDLES.map((b) => (
                <div
                  key={b.id}
                  className={`wed-card-pop relative overflow-hidden rounded-3xl p-6 ${
                    b.popular ? "bg-sos-ink text-primary-foreground" : "border-2 border-dashed border-border bg-card text-foreground"
                  }`}
                  style={b.popular ? { boxShadow: "6px 6px 0 0 var(--color-sos-pink)" } : undefined}
                >
                  <span className="wed-sticker wed-wiggle absolute -right-1 top-5 rotate-3 rounded-full bg-sos-pink px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-primary-foreground">
                    HEMAT {rupiah(bundleSaving(b))}
                  </span>
                  <p className={`${hand} text-xl ${b.popular ? "text-sos-pink" : "text-sos-lilac"}`}>{b.popular ? "paling laris" : "paling lengkap"}</p>
                  <h3 className="-mt-1 text-xl font-extrabold">{b.name}</h3>
                  <p className={`text-xs ${b.popular ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{b.tagline}</p>
                  <p className={`mt-4 text-xs line-through ${b.popular ? "text-primary-foreground/50" : "text-muted-foreground"}`}>{rupiah(b.normalPrice)}</p>
                  <p className={`text-3xl font-extrabold ${b.popular ? "" : "text-sos-pink"}`}>{rupiah(b.price)}</p>
                  <div className={`my-4 border-t-2 border-dashed ${b.popular ? "border-primary-foreground/20" : "border-border"}`} />
                  <ul className="space-y-2">
                    {b.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13px]">
                        <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${b.popular ? "bg-sos-pink" : "bg-sos-blush"}`}>
                          <Check className={`h-2.5 w-2.5 ${b.popular ? "text-primary-foreground" : "text-sos-pink"}`} strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={NEMPO_CONSULT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`wed-sticker mt-6 block rounded-full py-3 text-center text-sm font-bold ${
                      b.popular ? "bg-sos-pink text-primary-foreground" : "bg-sos-ink text-primary-foreground"
                    }`}
                  >
                    Ambil {b.name}
                  </a>
                </div>
              ))}
            </div>
            </div>
          </section>

          {/* Steps */}
          <section className="mx-6 my-4 rounded-3xl bg-sos-blush px-5 py-10 sm:px-8">
            <SectionHead eyebrow="Cara Kerja" title="4 langkah, langsung jalan" note="gak pake ribet" />
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-3xl bg-card p-4 lg:flex-col lg:items-center lg:text-center">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border-[2.5px] border-sos-ink bg-sos-pink text-base font-extrabold text-primary-foreground" style={{ boxShadow: "3px 3px 0 0 var(--color-sos-ink)" }}>
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-sos-ink">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="px-6 py-12">
            <SectionHead eyebrow="Tanya Jawab" title="Pertanyaan umum" note="biar gak penasaran" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card transition-colors ${open === i ? "border-sos-pink/50" : "border-dashed border-border"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-sos-ink">
                    {f.q}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${open === i ? "bg-sos-pink text-primary-foreground" : "bg-sos-blush text-sos-pink"}`}>
                      {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="px-6 pt-4">
            <div className="relative overflow-hidden rounded-3xl bg-sos-pink px-6 py-12 text-center text-primary-foreground" style={{ boxShadow: "6px 6px 0 0 var(--color-sos-ink)" }}>
              <Burst className="wed-float pointer-events-none absolute left-[8%] top-8 h-7 w-7 text-primary-foreground/50" />
              <Squiggle className="wed-wiggle pointer-events-none absolute right-[10%] bottom-8 h-5 w-12 text-primary-foreground/40" />
              <MessageCircle className="relative mx-auto h-10 w-10" strokeWidth={2.2} />
              <p className={`${hand} relative mt-3 text-2xl`}>posting rutin itu capek, serahin aja</p>
              <h2 className="relative mt-1 text-3xl font-extrabold leading-snug sm:text-4xl">Siap bikin sosmed kamu hidup?</h2>
              <p className="relative mx-auto mt-2 max-w-sm text-sm text-primary-foreground/85">Konsultasi gratis lewat WhatsApp — kami bantu pilih paket yang paling pas.</p>
              <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-sos-ink px-7 py-3.5 text-sm font-bold text-primary-foreground">
                  Chat via Instagram <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/price-list#paket-promosi" className="inline-flex items-center rounded-full border-2 border-primary-foreground/50 px-6 py-3.5 text-sm font-bold">
                  Daftar Harga Lengkap
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-7 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-sos-pink">{eyebrow}</p>
      <h2 className="mt-2 text-[26px] font-extrabold leading-tight text-sos-ink sm:text-4xl">{title}</h2>
      {note && <p className={`${hand} mt-1 text-xl text-sos-lilac`}>{note}</p>}
    </div>
  );
}
