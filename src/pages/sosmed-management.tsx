import { useState } from "react";
import { Layout } from "@/components/layout";
import { Link } from "@/lib/wouter";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import {
  Lightbulb, PenLine, CalendarClock, BarChart3, Megaphone, Image as ImageIcon,
  Check, Plus, Minus, ArrowRight, MessageCircle, Instagram, Video, LayoutTemplate,
} from "lucide-react";
import { SOSMED_ADDONS, SOSMED_BUNDLES, SOSMED_MONTHLY_PACKAGES, SOSMED_UMKM_PROMO, bundleSaving, rupiah } from "@/data/sosmed-packages";
import { SosmedPortfolioGallery } from "@/components/sosmed-portfolio-gallery";
import { Reveal, SectionHead, ServiceHero, ServiceMarquee, StickerIcon, Squiggle, Burst, hand, heroOutlineBtn, heroPrimaryBtn, serviceKitCss } from "@/components/service-page-kit";

const services = [
  { icon: Lightbulb, title: "Strategi Konten", color: "#EC4899", desc: "Ide konten, pilar, dan kalender posting yang pas dengan target audiens." },
  { icon: ImageIcon, title: "Desain & Video", color: "#8B5CF6", desc: "Materi feed, story, dan reels dibuat langsung oleh tim Nempo Organizer." },
  { icon: PenLine, title: "Caption & Hashtag", color: "#14B8A6", desc: "Hashtag utama dan tag akun yang relevan biar konten gampang ditemukan." },
  { icon: CalendarClock, title: "Jadwal & Publikasi", color: "#F59E0B", desc: "Konten diposting rutin sesuai jadwal — kamu tinggal pantau." },
  { icon: Megaphone, title: "Iklan Instagram", color: "#EF4444", desc: "Iklan berbayar dengan tombol CTA langsung ke halaman event kamu." },
  { icon: BarChart3, title: "Pantau Hasil", color: "#0EA5E9", desc: "Evaluasi performa konten untuk perbaikan di periode berikutnya." },
];

const steps = [
  { title: "Ngobrol dulu", desc: "Ceritakan brand atau event kamu, target, dan kanal yang mau dipakai.", icon: MessageCircle, color: "#EC4899" },
  { title: "Pilih paket", desc: "Ambil paket bulanan — Basic, Growth, atau Professional.", icon: LayoutTemplate, color: "#8B5CF6" },
  { title: "Kami produksi", desc: "Tim membuat materi, caption, dan menyusun jadwal posting.", icon: Video, color: "#F59E0B" },
  { title: "Tayang & pantau", desc: "Konten tayang di Instagram/TikTok, hasilnya kita evaluasi bareng.", icon: Instagram, color: "#0EA5E9" },
];

const faqs = [
  { q: "Materi kontennya dari siapa?", a: "Materi dibuat oleh tim Nempo Organizer. Untuk Instagram Feed, caption disiapkan oleh event creator supaya pesannya sesuai." },
  { q: "Iklan Instagram dihitung bagaimana?", a: "Instagram Ads dihitung per minggu (Rp300.000/minggu) dengan tombol CTA langsung ke detail event." },
  { q: "Mau sekalian tampil di website Nempo?", a: "Pilih All Promotion: semua isi Paket Social Media plus banner dan rekomendasi event di website selama 2 minggu." },
  { q: "Boleh nambah konten satuan?", a: "Boleh. Tambahan 1 Reels Rp100.000, tambahan 1 desain Feed Rp50.000, foto produk mulai Rp300.000, video promosi bisnis mulai Rp500.000, Meta Ads management mulai Rp300.000, dan TikTok management mulai Rp500.000." },
  { q: "Ada kunjungan produksi konten?", a: "Ada. Paket Growth dapat 1x kunjungan produksi konten (maksimal 2 jam), Paket Professional 2x. Paket Basic belum termasuk." },
];

const marqueeItems = ["Instagram Feed", "Reels", "Story", "Highlight", "Instagram Ads", "TikTok"];

export default function SosmedManagementPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [pkg, setPkg] = useState(1);
  const sel = SOSMED_MONTHLY_PACKAGES[pkg] ?? SOSMED_MONTHLY_PACKAGES[0];

  return (
    <Layout>
      <div className="bg-background pb-14 text-foreground">
        <style>{serviceKitCss}</style>
        <ServiceHero
          kicker="feed kamu sepi?"
          title="Nempo"
          accent="Sosmed Management"
          desc="Konten, caption, jadwal posting, sampai iklan Instagram & TikTok — biar sosmed rame, kamu tinggal fokus jualan."
          chips={[...SOSMED_MONTHLY_PACKAGES.map((p) => p.name), "Promo UMKM"]}
          actions={<>
            <Button asChild size="lg" className={heroPrimaryBtn}><a href="#paket">Lihat Paket <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="outline" className={heroOutlineBtn}><a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Konsultasi Dulu</a></Button>
          </>}
        />
        <ServiceMarquee items={marqueeItems} />

        <div className="mx-auto max-w-5xl">
          {/* Services */}
          <section className="px-6 py-12">
            <Reveal><SectionHead eyebrow="Yang kami kerjakan" title="Dari ide sampai tayang" note="kamu fokus jualan aja" /></Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} className="h-full">
                  <div className="wed-card-pop flex h-full flex-col items-center rounded-3xl border-2 border-dashed border-brand/25 bg-card p-4 text-center hover:border-brand/40 sm:p-5">
                    <StickerIcon icon={s.icon} color={s.color} className="mb-3.5" />
                    <h3 className="text-[13px] font-bold leading-snug text-brand-navy sm:text-sm">{s.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Portofolio */}
          <SosmedPortfolioGallery />

          {/* Monthly packages */}
          <section id="paket" className="scroll-mt-24 px-6 py-12">
            <Reveal><SectionHead eyebrow="Paket Bulanan" title="Pilih paket yang pas" note="bisa naik kapan aja" /></Reveal>
            <div className="grid grid-cols-3 gap-2 sm:gap-3" role="group" aria-label="Pilihan paket sosmed">
              {SOSMED_MONTHLY_PACKAGES.map((p, i) => (
                <Button key={p.id} variant="outline" aria-pressed={pkg === i} onClick={() => setPkg(i)}
                  className={`wed-sticker h-auto rounded-2xl px-1 py-3 text-xs sm:text-sm ${pkg === i ? "border-brand bg-brand text-primary-foreground hover:bg-brand hover:text-primary-foreground" : "border-dashed border-brand/30 bg-card text-brand-navy hover:border-brand/60"}`}>
                  {p.name}
                </Button>
              ))}
            </div>
            <article className="wed-card-pop relative mt-6 rounded-3xl border-2 border-dashed border-brand/30 bg-card p-6 sm:p-8" aria-label={`Paket ${sel.name}`}>
              {sel.recommended && (
                <span className="wed-sticker wed-wiggle absolute -top-4 right-6 rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-primary-foreground">Promo UMKM</span>
              )}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={`${hand} text-xl text-brand`}>{sel.tier.toLowerCase()}</p>
                  <h3 className="-mt-1 text-3xl font-extrabold text-brand-navy">{sel.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{sel.fit}</p>
                </div>
                <div className="rounded-2xl bg-brand-sky px-5 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand sm:text-3xl">{rupiah(sel.price)}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{sel.unit}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 border-t border-dashed border-brand/25 pt-6 sm:grid-cols-2">
                {sel.includes.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-sky"><Check className="h-3 w-3 text-brand" strokeWidth={3} /></span>{it}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="wed-sticker eo-btn-shine mt-6 rounded-full bg-brand-navy px-7 text-primary-foreground hover:bg-brand-navy/90">
                <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Ambil {sel.name} <ArrowRight /></a>
              </Button>
            </article>

            {/* Add-ons */}
            <div className="mt-6 rounded-3xl border-2 border-dashed border-brand/30 bg-brand-sky/40 px-5 py-6 sm:px-8 sm:py-7">
              <h3 className="text-lg font-extrabold text-brand-navy">Layanan Tambahan</h3>
              <p className="mt-1 text-xs text-muted-foreground">Boleh diambil sendiri atau ditambah ke paket mana pun.</p>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {SOSMED_ADDONS.map((a) => (
                  <li key={a.label} className="flex items-center justify-between gap-3 border-b border-dashed border-brand/25 py-2.5 text-sm text-brand-navy">
                    <span>{a.label}</span>
                    <span className="shrink-0 font-extrabold text-brand">{a.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Bundles */}
          <section className="px-6 py-12">
            <Reveal><SectionHead eyebrow="Paket Promosi Event" title="Butuh dorongan instan?" note="buat event yang mau rame cepat" /></Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {SOSMED_BUNDLES.map((b) => (
                <div key={b.id} className="wed-card-pop relative overflow-hidden rounded-3xl border-2 border-dashed border-brand/25 bg-card p-6">
                  <span className="wed-sticker wed-wiggle absolute -right-1 top-5 rotate-3 rounded-full bg-brand px-3.5 py-1.5 text-[10px] font-bold tracking-wide text-primary-foreground">
                    HEMAT {rupiah(bundleSaving(b))}
                  </span>
                  <p className={`${hand} text-xl text-brand`}>{b.popular ? "paling laris" : "paling lengkap"}</p>
                  <h3 className="-mt-1 text-xl font-extrabold text-brand-navy">{b.name}</h3>
                  <p className="text-xs text-muted-foreground">{b.tagline}</p>
                  <p className="mt-4 text-xs line-through text-muted-foreground">{rupiah(b.normalPrice)}</p>
                  <p className="text-3xl font-extrabold text-brand">{rupiah(b.price)}</p>
                  <div className="my-4 border-t-2 border-dashed border-brand/25" />
                  <ul className="space-y-2">
                    {b.includes.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[13px]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-sky">
                          <Check className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="wed-sticker eo-btn-shine mt-6 w-full rounded-full bg-brand-navy text-primary-foreground hover:bg-brand-navy/90">
                    <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Ambil {b.name}</a>
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="px-6 py-12">
            <Reveal><SectionHead eyebrow="Cara Kerja" title="4 langkah, langsung jalan" note="gak pake ribet" /></Reveal>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 60} className="h-full">
                  <div className="wed-card-pop flex h-full gap-4 rounded-3xl border-2 border-dashed border-brand/25 bg-card p-4 hover:border-brand/40 lg:flex-col lg:items-center lg:text-center">
                    <StickerIcon icon={s.icon} color={s.color} size="sm" className="self-start lg:self-center" />
                    <div>
                      <p className="text-[11px] font-extrabold text-brand">LANGKAH {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-0.5 text-sm font-bold text-brand-navy">{s.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="px-6 py-12">
            <SectionHead eyebrow="Tanya Jawab" title="Pertanyaan umum" note="biar gak penasaran" />
            <FaqList faqs={faqs} open={open} setOpen={setOpen} prefix="sosmed" />
          </section>

          {/* CTA */}
          <section className="px-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-10 text-center text-primary-foreground">
              <Burst className="wed-float pointer-events-none absolute left-[8%] top-8 h-7 w-7 text-brand-sky/60" />
              <Squiggle className="wed-wiggle pointer-events-none absolute right-[10%] bottom-8 h-5 w-12 text-brand-sky/50" />
              <MessageCircle className="relative mx-auto h-10 w-10" strokeWidth={2.2} />
              <p className={`${hand} relative mt-3 text-2xl text-brand-sky`}>posting rutin itu capek, serahin aja</p>
              <h2 className="relative mt-1 text-3xl font-extrabold leading-snug">Siap bikin sosmed kamu hidup?</h2>
              <p className="relative mx-auto mt-2 max-w-sm text-sm text-primary-foreground/80">Promo UMKM {rupiah(SOSMED_UMKM_PROMO.price)}{SOSMED_UMKM_PROMO.unit} — konsultasi gratis lewat WhatsApp.</p>
              <div className="relative mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className={heroPrimaryBtn}><a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Chat via WhatsApp <ArrowRight /></a></Button>
                <Button asChild size="lg" variant="outline" className={heroOutlineBtn}>
                  <Link href="/price-list#paket-promosi">Daftar Harga Lengkap</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export function FaqList({ faqs, open, setOpen, prefix }: { faqs: { q: string; a: string }[]; open: number | null; setOpen: (i: number | null) => void; prefix: string }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className={`rounded-2xl border-2 transition-colors ${open === i ? "border-brand/40 bg-card" : "border-dashed border-brand/25 bg-card/60"}`}>
          <Button variant="ghost" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`${prefix}-faq-${i}`}
            className="h-auto w-full justify-between gap-3 whitespace-normal rounded-2xl px-5 py-4 text-left text-sm font-semibold text-brand-navy hover:bg-transparent">
            {f.q}
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${open === i ? "bg-brand text-primary-foreground" : "bg-brand-sky text-brand"}`}>
              {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </Button>
          {open === i && <p id={`${prefix}-faq-${i}`} className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
