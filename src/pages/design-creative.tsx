import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import { ArrowRight, Check, Plus, Minus, PenTool, Layers, Image, FileCheck2 } from "lucide-react";
import { DESIGN_PRICES, DESIGN_MONTHLY_PACKAGES, DESIGN_TERMS, designRupiah, designConsultUrl } from "@/data/design-creative";

const steps = [
  { title: "Ceritakan kebutuhan", desc: "Kirim brief, jenis desain, dan referensi yang kamu sukai.", icon: PenTool },
  { title: "Tentukan arah visual", desc: "Sepakati gaya, warna, dan kebutuhan materi sebelum mulai.", icon: Layers },
  { title: "Desain & revisi", desc: "Desain dikerjakan dan disesuaikan berdasarkan masukanmu.", icon: Image },
  { title: "File siap pakai", desc: "Hasil desain diserahkan dalam format sesuai kesepakatan.", icon: FileCheck2 },
];
const faqs = [
  { q: "Apa yang termasuk paket desain bulanan?", a: "Basic: 10 desain Feed / Story. Business: 20 desain Feed / Story dan 2 Carousel. Professional: 30 desain Feed / Story, 4 Carousel, dan prioritas pengerjaan. Semua paket termasuk 2x revisi per desain dan file JPG / PNG." },
  { q: "Apakah sudah termasuk posting ke Instagram?", a: "Paket ini untuk pembuatan desain. Pengelolaan akun dan penjadwalan posting tersedia melalui layanan Sosmed Management." },
  { q: "Bagaimana jika membutuhkan revisi tambahan?", a: "Paket bulanan mencakup 2x revisi per desain. Revisi tambahan dikenakan biaya, dibahas sesuai kebutuhan." },
  { q: "Apakah file editable dan biaya cetak termasuk?", a: "Harga belum termasuk cetak. File editable/source file dikenakan biaya tambahan. Desain kompleks menyesuaikan brief." },
];

export default function DesignCreativePage() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Layout>
      <div className="design-creative bg-background text-foreground">
        <section className="relative isolate overflow-hidden px-6 pb-12 pt-14 sm:pt-20">
          <img src="/images/nempo-about-creative.webp" alt="Tim kreatif Nempo merancang ide bersama" className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-background/90" />
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-bold uppercase text-primary">GRAPHIC DESIGN & IDENTITAS BRAND</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-6xl">Nempo <span className="text-primary">Design Creative</span></h1>
            <p className="mt-3 font-[family-name:var(--font-wed-hand)] text-2xl sm:text-3xl">Visual yang rapi, karakter yang kuat.</p>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Dari konten harian hingga identitas brand. Desain untuk usaha, produk, dan acara dengan harga yang jelas.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button asChild className="min-h-12 px-6 font-bold"><a href="#harga-desain">Lihat Harga Desain <ArrowRight /></a></Button>
              <Button asChild variant="outline" className="min-h-12 bg-card px-6 font-bold"><a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Konsultasi Dulu</a></Button>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">Per desain / project · paket bulanan mulai <b className="text-foreground">{designRupiah(DESIGN_MONTHLY_PACKAGES[0].price)}</b></p>
          </div>
        </section>

        <section id="paket-desain" className="scroll-mt-24 px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <SectionHead label="PAKET DESAIN BULANAN" title="Konten konsisten, setiap bulan" note="Pilih jumlah desain yang sesuai ritme usahamu." />
            <div className="grid gap-5 md:grid-cols-3">{DESIGN_MONTHLY_PACKAGES.map((p) => <article key={p.id} className={`flex h-full flex-col rounded-lg border p-6 ${p.id === "business" ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              <p className="text-xs font-semibold uppercase opacity-70">Paket bulanan</p><h3 className="mt-2 text-xl font-extrabold">{p.name}</h3>
              <p className="mt-4 text-3xl font-extrabold">{designRupiah(p.price)}</p><p className="mt-1 text-xs opacity-70">Per bulan</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-current/20 pt-5">
                {[`${p.designs} desain Feed / Story`, ...(p.carousels ? [`${p.carousels} desain Carousel`] : []), ...(p.priority ? ["Prioritas pengerjaan"] : []), `${p.revisions}x revisi per desain`, `File ${p.formats.join(" / ")}`].map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-relaxed"><Check className="mt-0.5 size-4 shrink-0" /><span>{item}</span></li>)}
              </ul>
              <Button asChild variant={p.id === "business" ? "secondary" : "default"} className="mt-6 min-h-12 w-full font-bold"><a href={designConsultUrl(NEMPO_CONSULT_URL, p.id)} target="_blank" rel="noopener noreferrer">Pilih {p.name} <ArrowRight /></a></Button>
            </article>)}</div>
          </div>
        </section>

        <section id="harga-desain" className="scroll-mt-24 border-y border-border bg-muted/40 px-6 py-12">
          <div className="mx-auto max-w-5xl">
            <SectionHead label="PRICELIST GRAPHIC DESIGN" title="Satu kebutuhan, satu desain" note="Harga per desain / project. Pilih layanan untuk konsultasi." />
            <div className="grid gap-x-10 lg:grid-cols-2">{[DESIGN_PRICES.slice(0, 8), DESIGN_PRICES.slice(8)].map((group, i) => <div key={i} className="divide-y divide-border">{group.map((p) => <div key={p.id} data-design-price={p.id} className="flex items-center justify-between gap-3 py-4"><div className="min-w-0"><h3 className="text-sm font-semibold leading-relaxed">{p.name}</h3><p className="mt-1 text-sm"><span className="text-xs text-muted-foreground">{p.startingFrom ? "Mulai " : ""}</span><b>{designRupiah(p.price)}</b></p></div><Button asChild variant="ghost" size="icon" className="shrink-0 text-primary"><a href={designConsultUrl(NEMPO_CONSULT_URL, p.id)} target="_blank" rel="noopener noreferrer" aria-label={`Konsultasi ${p.name}`} title={`Konsultasi ${p.name}`}><ArrowRight /></a></Button></div>)}</div>)}</div>
            <div className="mt-8 border-t border-border pt-6"><h3 className="text-sm font-bold">Ketentuan</h3><ul className="mt-3 grid gap-3 sm:grid-cols-2">{DESIGN_TERMS.map((term) => <li key={term.id} className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />{term.text}</li>)}</ul></div>
          </div>
        </section>

        <section className="px-6 py-12"><div className="mx-auto max-w-5xl">
          <SectionHead label="CARA KERJA" title="Dari ide menjadi visual" note="Arah yang jelas, proses yang teratur." />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map((s, i) => <li key={s.title} className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 lg:flex-col lg:items-center lg:text-center"><s.icon className="size-6 shrink-0 text-primary" /><div><p className="text-xs text-muted-foreground">0{i + 1}</p><h3 className="mt-2 text-sm font-bold">{s.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.desc}</p></div></li>)}</ol>
        </div></section>

        <section className="px-6 py-12"><div className="mx-auto max-w-3xl">
          <SectionHead label="TANYA JAWAB" title="Sebelum desain dimulai" />
          <div className="space-y-3">{faqs.map((f, i) => <div key={f.q} className={`overflow-hidden rounded-lg border bg-card ${open === i ? "border-primary" : "border-border"}`}><Button variant="ghost" aria-expanded={open === i} aria-controls={`design-faq-${i}`} onClick={() => setOpen(open === i ? null : i)} className="min-h-16 w-full justify-between gap-4 whitespace-normal rounded-none p-5 text-left text-sm font-bold"><span>{f.q}</span>{open === i ? <Minus className="text-primary" /> : <Plus className="text-primary" />}</Button>{open === i && <p id={`design-faq-${i}`} className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}</div>)}</div>
        </div></section>

        <section className="bg-primary px-6 py-14 text-center text-primary-foreground"><div className="mx-auto max-w-3xl"><p className="text-xs font-semibold uppercase opacity-70">CERITAKAN IDEMU</p><h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Yuk, bikin visual untuk brand-mu.</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed opacity-80">Kirim kebutuhan dan referensimu. Tim Nempo bantu menyusun arah desain yang sesuai.</p><Button asChild variant="secondary" className="mt-6 min-h-12 px-6 font-bold"><a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer">Chat via WhatsApp <ArrowRight /></a></Button></div></section>
      </div>
    </Layout>
  );
}
function SectionHead({ label, title, note }: { label: string; title: string; note?: string }) {
  return <div className="mb-7 text-center"><p className="text-[11px] font-bold uppercase text-primary">{label}</p><h2 className="mt-2 text-[26px] font-extrabold leading-tight sm:text-4xl">{title}</h2>{note && <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{note}</p>}</div>;
}
