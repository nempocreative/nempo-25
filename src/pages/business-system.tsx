import { useState } from "react";
import { Layout } from "@/components/layout";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  Activity, ArrowRight, BedDouble, Boxes, Building2, CalendarCheck, Check, ChevronDown,
  Code2, Coffee, MessageCircle, Minus, NotebookPen, PackageX, Plus, ShieldCheck, Store, UserMinus, Wrench,
} from "lucide-react";
import {
  BIZ_BUNDLES, BIZ_CUSTOM, BIZ_INDUSTRY, BIZ_INDUSTRY_NOTE, BIZ_MAINTENANCE, BIZ_MAINTENANCE_EXCLUSION,
  BIZ_MAINTENANCE_SCOPE, BIZ_MANAGEMENT, BIZ_OPERATIONAL, BIZ_TAGLINE, BIZ_TERMS, bizConsultUrl, bizRupiah,
  type BizSystem,
} from "@/data/business-system";

const hand = "font-[family-name:var(--font-wed-hand)]";
const mono = "font-mono";

type Tab = "operational" | "management" | "industry" | "custom";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "operational", label: "Operasional", icon: Activity },
  { id: "management", label: "Manajemen", icon: Boxes },
  { id: "industry", label: "Industri", icon: Building2 },
  { id: "custom", label: "Custom", icon: Code2 },
];

const pains = [
  { icon: NotebookPen, pain: "Catatan penjualan masih di buku", fix: "POS dan Finance mencatat otomatis" },
  { icon: PackageX, pain: "Stok sering selisih atau tiba-tiba habis", fix: "Inventory dengan notifikasi stok menipis" },
  { icon: UserMinus, pain: "Pelanggan datang sekali lalu hilang", fix: "CRM dan Membership supaya mereka kembali" },
];

const fits = [
  { icon: Coffee, title: "Cafe & Resto", mods: "QR Menu · POS · Inventory · Finance" },
  { icon: Store, title: "Toko & Retail", mods: "POS · Inventory · Purchasing · CRM" },
  { icon: BedDouble, title: "Hotel & Villa", mods: "Reservasi & Booking · CRM · Voucher" },
  { icon: CalendarCheck, title: "Kantor & Jasa", mods: "HR & Payroll · Attendance · CMS · Finance" },
];

const steps = [
  { title: "Analisis kebutuhan", desc: "Ceritakan alur kerja, jumlah pengguna, dan masalah yang paling mengganggu." },
  { title: "Penawaran & DP", desc: "Rincian fitur dan biaya disusun, lalu DP 50% untuk memulai pengerjaan." },
  { title: "Pengerjaan & testing", desc: "Sistem dibangun, kamu ikut mencoba sampai sesuai kesepakatan." },
  { title: "Serah terima", desc: "Pelatihan 1 sesi, garansi bug 30 hari, lalu maintenance kalau mau lanjut." },
];

const faqs = [
  { q: "Harga di halaman ini sudah final?", a: "Harga yang tertera adalah harga mulai untuk lingkup fitur dasar. Sebelum penawaran final dibuat, tim Nempo menganalisis kebutuhan, jumlah pengguna, dan alur kerja usahamu dulu." },
  { q: "Bagaimana sistem pembayarannya?", a: "DP 50% di awal, lalu 50% setelah testing dan sebelum serah terima." },
  { q: "Apakah ada garansi?", a: "Ada, garansi bug 30 hari setelah serah terima. Perbaikan bug pada fitur yang sudah disepakati juga masuk cakupan maintenance." },
  { q: "Bisa tambah fitur setelah sistem jadi?", a: "Bisa. Fitur tambahan dihitung berdasarkan estimasi, begitu juga modul khusus dan kebutuhan regulasi industri." },
  { q: "Harga sudah termasuk domain dan hosting?", a: "Belum. Domain dan hosting terpisah jika belum termasuk paket, dan biaya hosting menyesuaikan spesifikasi yang dipakai." },
  { q: "Apa saja cakupan maintenance?", a: "Monitoring website dan sistem, perbaikan bug pada fitur yang disepakati, backup database berkala, pemeriksaan keamanan dasar, dan bantuan teknis penggunaan." },
];

/* Dashboard contoh di hero */
function DashboardMockup() {
  const side = ["Dashboard", "Kasir", "Stok", "Pelanggan", "Laporan"];
  return (
    <div className="relative">
      <span className={`${hand} wed-wiggle absolute -top-7 right-4 z-10 rotate-3 rounded-full bg-biz-amber px-3 py-0.5 text-lg text-biz-ink`}>semua nyambung!</span>
      <div className="overflow-hidden rounded-2xl border-[3px] border-biz-ink bg-card text-biz-ink" style={{ boxShadow: "8px 8px 0 0 var(--color-biz-amber)" }}>
        <div className="flex">
          <aside className="hidden w-28 shrink-0 space-y-1 bg-biz-ink p-3 text-[10px] text-primary-foreground sm:block">
            <p className="mb-3 font-extrabold">Nempo System</p>
            {side.map((s, i) => (
              <p key={s} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-biz-teal font-bold" : "opacity-70"}`}>{s}</p>
            ))}
          </aside>
          <div className="flex-1 space-y-3 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold">Hari ini</p>
              <span className={`${mono} rounded-full bg-biz-mint px-2 py-0.5 text-[9px] font-bold text-biz-teal`}>contoh data</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[["Penjualan", "Rp2,4jt"], ["Transaksi", "86"], ["Pelanggan kembali", "31%"]].map(([l, v]) => (
                <div key={l} className="rounded-xl bg-biz-paper p-2.5">
                  <p className="text-[9px] text-biz-ink/60">{l}</p>
                  <p className="text-sm font-extrabold">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex h-20 items-end gap-1.5 rounded-xl bg-biz-paper p-2.5">
              {[40, 65, 50, 80, 60, 95, 75].map((h, i) => (
                <span key={i} className={`flex-1 rounded-t ${i === 5 ? "bg-biz-amber" : "bg-biz-teal/70"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-biz-amber/60 p-2 text-[10px]">
              <PackageX className="h-3.5 w-3.5 text-biz-amber" /> Stok susu tinggal 3 liter — waktunya belanja
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessSystemPage() {
  const [tab, setTab] = useState<Tab>("operational");
  const [open, setOpen] = useState<number | null>(0);

  const shown: BizSystem[] = tab === "management" ? BIZ_MANAGEMENT : BIZ_OPERATIONAL;
  const cheapest = Math.min(...BIZ_OPERATIONAL.map((s) => s.price));

  return (
    <Layout>
      <div className="bg-biz-paper pb-14 text-biz-ink">
        {/* Hero */}
        <section className="relative overflow-hidden bg-biz-teal px-5 pb-16 pt-12 text-primary-foreground">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-biz-ink/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-5xl items-center gap-12 sm:grid-cols-[1.05fr_1fr]">
            <div>
              <p className={`${hand} text-2xl text-biz-amber sm:text-3xl`}>usaha makin besar, makin ribet?</p>
              <h1 className="mt-2 text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                Business System<br />& <span className="text-biz-amber">Digital Solutions</span>
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
                Solusi teknologi untuk membantu bisnis bekerja lebih mudah, cepat, terorganisir, dan efisien — dari kasir, stok, dan keuangan sampai sistem khusus per industri.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#katalog" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-biz-amber px-7 py-3.5 text-sm font-bold text-biz-ink">
                  Lihat Katalog Sistem <ArrowRight className="h-4 w-4" />
                </a>
                <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 bg-primary-foreground/10 px-7 py-3.5 text-sm font-bold">
                  <MessageCircle className="h-4 w-4" /> Konsultasi
                </a>
              </div>
              <p className={`${mono} mt-5 text-[11px] text-primary-foreground/70`}>
                {BIZ_OPERATIONAL.length + BIZ_MANAGEMENT.length + BIZ_INDUSTRY.length} sistem · mulai {bizRupiah(cheapest)} · {BIZ_TAGLINE}
              </p>
            </div>
            <div className="py-6">
              <DashboardMockup />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-5">
          {/* Pains */}
          <section className="pt-14">
            <SectionHead eyebrow="Kenal masalahnya?" title="Dari repot jadi rapi" note="ini yang biasanya kejadian" />
            <div className="grid gap-3 sm:grid-cols-3">
              {pains.map((p) => (
                <div key={p.pain} className="wed-card-pop rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5">
                  <p.icon className="h-7 w-7 text-biz-amber" strokeWidth={2.2} />
                  <p className="mt-3 text-sm font-bold text-biz-ink/50 line-through decoration-biz-amber decoration-2">{p.pain}</p>
                  <p className="mt-2 flex items-start gap-2 text-sm font-extrabold">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-biz-teal" strokeWidth={3} /> {p.fix}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Katalog sistem */}
          <section id="katalog" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Katalog Sistem" title="Pilih sesuai kebutuhan usaha" note="harga mulai, fitur tercantum" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Kategori sistem">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={tab === t.id}
                  onClick={() => setTab(t.id)}
                  className={`wed-sticker flex items-center justify-center gap-2 rounded-2xl border-2 px-3 py-3 text-xs font-bold transition-colors sm:text-sm ${
                    tab === t.id ? "border-biz-ink bg-biz-ink text-primary-foreground" : "border-dashed border-biz-ink/25 bg-card hover:border-biz-ink/60"
                  }`}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {(tab === "operational" || tab === "management") && shown.map((s) => <SystemRow key={s.id} s={s} />)}

              {tab === "industry" && (
                <>
                  <div className="rounded-2xl border-2 border-dashed border-biz-amber/60 bg-biz-mint/60 p-5">
                    <p className="text-xs leading-relaxed text-biz-ink/80">{BIZ_INDUSTRY_NOTE}</p>
                  </div>
                  <div className="divide-y divide-dashed divide-biz-ink/15 overflow-hidden rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card">
                    {BIZ_INDUSTRY.map((s) => (
                      <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                        <div className="min-w-0">
                          <h3 className="text-sm font-extrabold">{s.name}</h3>
                          <p className="mt-0.5 text-xs leading-relaxed text-biz-ink/65">{s.fungsi}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm font-extrabold text-biz-teal"><span className="text-[11px] font-medium text-biz-ink/50">Mulai </span>{bizRupiah(s.price)}</p>
                          <a
                            href={bizConsultUrl(s.name, s.price, true)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-biz-ink px-4 py-2 text-[11px] font-bold text-primary-foreground"
                          >
                            Tanya <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {tab === "custom" && (
                <article className="rounded-3xl border-[3px] border-biz-ink bg-card p-6 sm:p-8" style={{ boxShadow: "6px 6px 0 0 var(--color-biz-amber)" }}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-biz-teal text-primary-foreground"><Code2 className="h-5 w-5" /></span>
                    <div>
                      <h3 className="text-xl font-extrabold">{BIZ_CUSTOM.name}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-biz-ink/70">{BIZ_CUSTOM.desc}</p>
                    </div>
                  </div>
                  <ul className="mt-5 grid gap-2 border-t border-dashed pt-5 sm:grid-cols-2">
                    {BIZ_CUSTOM.items.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-biz-teal" strokeWidth={3} /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={bizConsultUrl(BIZ_CUSTOM.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wed-sticker mt-6 inline-flex items-center gap-2 rounded-full bg-biz-ink px-7 py-3.5 text-sm font-bold text-primary-foreground"
                  >
                    Diskusikan Sistem Custom <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              )}
            </div>
          </section>

          {/* Bundles */}
          <section className="pt-16">
            <SectionHead eyebrow="Paket Bundling" title="Sistem dalam satu paket" note="lebih hemat, langsung nyambung" />
            <div className="grid gap-4 md:grid-cols-3">
              {BIZ_BUNDLES.map((b) => (
                <article
                  key={b.id}
                  data-bundle={b.id}
                  className={`relative flex h-full flex-col rounded-3xl border-2 p-6 ${b.recommended ? "border-biz-ink bg-biz-ink text-primary-foreground" : "border-dashed border-biz-ink/25 bg-card"}`}
                >
                  {b.recommended && (
                    <span className="wed-sticker wed-wiggle absolute -top-3.5 right-5 rounded-full bg-biz-amber px-3.5 py-1 text-xs font-bold text-biz-ink">Rekomendasi</span>
                  )}
                  <p className={`text-[11px] font-bold uppercase tracking-wider ${b.recommended ? "text-biz-amber" : "text-biz-teal"}`}>{b.forWho}</p>
                  <h3 className="mt-1.5 text-lg font-extrabold">{b.name}</h3>
                  <p className="mt-3 text-2xl font-extrabold">
                    {b.startingFrom && <span className="text-xs font-medium opacity-70">Mulai </span>}{bizRupiah(b.price)}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-dashed pt-5 opacity-90">
                    {b.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3} /> {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={bizConsultUrl(b.name, b.price, b.startingFrom)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${b.recommended ? "bg-biz-amber text-biz-ink" : "bg-biz-ink text-primary-foreground"}`}
                  >
                    Ambil Paket Ini <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              ))}
            </div>
          </section>

          {/* Cocok untuk */}
          <section className="pt-16">
            <SectionHead eyebrow="Cocok Untuk" title="Sistem per jenis usaha" note="tinggal bilang usahamu apa" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fits.map((f) => (
                <div key={f.title} className="rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5">
                  <f.icon className="h-6 w-6 text-biz-teal" strokeWidth={2.2} />
                  <h3 className="mt-3 text-sm font-extrabold">{f.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-biz-ink/65">{f.mods}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Maintenance */}
          <section className="pt-16">
            <SectionHead eyebrow="Maintenance & Subscription" title="Setelah sistem jadi" note="biar tetap sehat" />
            <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
              <dl className="divide-y divide-dashed divide-biz-ink/15 rounded-3xl border-2 border-dashed border-biz-ink/20 bg-card p-5 sm:p-6">
                {BIZ_MAINTENANCE.map((m) => (
                  <div key={m.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                    <dt className="font-semibold">{m.name}</dt>
                    <dd className="shrink-0 font-extrabold text-biz-teal">
                      {m.price == null
                        ? <span className="text-xs font-semibold text-biz-ink/60">{m.quoteNote}</span>
                        : <>{m.startingFrom && <span className="text-[11px] font-medium text-biz-ink/50">Mulai </span>}{bizRupiah(m.price)}<span className="text-[11px] font-medium text-biz-ink/50">{m.unit}</span></>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="rounded-3xl bg-biz-mint p-5 sm:p-6">
                <p className="flex items-center gap-2 text-sm font-extrabold text-biz-ink">
                  <Wrench className="h-4 w-4 text-biz-teal" /> Cakupan maintenance
                </p>
                <ul className="mt-3 space-y-2">
                  {BIZ_MAINTENANCE_SCOPE.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-xs leading-relaxed text-biz-ink/80">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-biz-teal" strokeWidth={3} /> {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-dashed border-biz-ink/20 pt-3 text-[11px] leading-relaxed text-biz-ink/65">
                  {BIZ_MAINTENANCE_EXCLUSION}
                </p>
              </div>
            </div>
          </section>

          {/* Ketentuan */}
          <section className="pt-16">
            <SectionHead eyebrow="Ketentuan" title="Aturan mainnya" note="biar sama-sama jelas" />
            <dl className="divide-y divide-dashed divide-biz-ink/15 rounded-3xl border-2 border-dashed border-biz-ink/20 bg-card px-5 sm:px-6">
              {BIZ_TERMS.map((t) => (
                <div key={t.label} className="flex flex-wrap items-center justify-between gap-2 py-3.5 text-sm">
                  <dt className="font-semibold text-biz-ink/80">{t.label}</dt>
                  <dd className="text-right font-bold text-biz-ink">{t.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Cara kerja */}
          <section className="pt-16">
            <SectionHead eyebrow="Cara Kerja" title="4 langkah sampai sistem dipakai" note="jelas dari awal" />
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5">
                  <span className={`${mono} text-xs font-bold text-biz-amber`}>0{i + 1}</span>
                  <h3 className="mt-1 text-sm font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-biz-ink/65">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead eyebrow="Tanya Jawab" title="Pertanyaan umum" note="biar gak ragu" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-biz-ink" : "border-dashed border-biz-ink/20"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${open === i ? "bg-biz-ink text-primary-foreground" : "bg-biz-mint text-biz-teal"}`}>
                      {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-biz-ink/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pt-16">
            <div className="relative overflow-hidden rounded-3xl bg-biz-ink p-7 text-primary-foreground sm:p-9">
              <ShieldCheck className="wed-float absolute right-8 top-6 h-10 w-10 text-biz-amber/70" aria-hidden />
              <p className={`${hand} text-2xl text-biz-amber`}>jual bukan aplikasi,</p>
              <h2 className="mt-1 max-w-lg text-3xl font-extrabold leading-tight">tapi solusi atas masalah usahamu</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/75">
                Ceritakan alur kerja dan jumlah pengguna yang butuh akses. Tim Nempo bantu susun sistem mana yang paling tepat, lengkap dengan estimasi biayanya.
              </p>
              <a
                href={NEMPO_CONSULT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="wed-sticker mt-6 inline-flex items-center gap-2 rounded-full bg-biz-amber px-7 py-3.5 text-sm font-bold text-biz-ink"
              >
                <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SystemRow({ s }: { s: BizSystem }) {
  return (
    <article data-system={s.id} className="rounded-2xl border-2 border-dashed border-biz-ink/20 bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-extrabold">{s.name}</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-biz-ink/65">{s.desc}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xl font-extrabold text-biz-teal">
            {s.startingFrom && <span className="text-[11px] font-medium text-biz-ink/50">Mulai </span>}{bizRupiah(s.price)}
          </p>
          <p className={`${mono} text-[10px] text-biz-ink/50`}>sekali bayar</p>
        </div>
      </div>
      <ul className="mt-4 grid gap-x-5 gap-y-1.5 border-t border-dashed border-biz-ink/15 pt-4 sm:grid-cols-2">
        {s.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs leading-relaxed">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-biz-teal" strokeWidth={3} /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-biz-ink/15 pt-4">
        <p className="text-[11px] text-biz-ink/60">Cocok untuk: {s.target}</p>
        <a
          href={bizConsultUrl(s.name, s.price, s.startingFrom)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-biz-ink px-4 py-2 text-[11px] font-bold text-primary-foreground"
        >
          Tanya sistem ini <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </article>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-6 text-center">
      <p className={`${mono} text-[10px] font-bold uppercase tracking-[0.2em] text-biz-teal`}>{eyebrow}</p>
      <h2 className="mt-1.5 text-[26px] font-extrabold leading-tight tracking-tight sm:text-4xl">{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-biz-amber`}>{note}</p>}
    </div>
  );
}
