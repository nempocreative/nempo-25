import { useState } from "react";
import { Layout } from "@/components/layout";
import { NEMPO_CONSULT_URL } from "@/lib/contact";
import {
  Mic2, Guitar, Footprints, Music2, Sparkles, Drum, Clapperboard, Camera,
  Plus, Check, ArrowRight, ChevronDown, Copy, Star, MessageCircle,
} from "lucide-react";
import stageImg from "@/assets/talent-stage.jpg";
import { EVENT_TYPES, TALENT_CATEGORIES, buildTalentRequestUrl, canSendTalentRequest } from "@/data/talent-management";

const hand = "font-[family-name:var(--font-wed-hand)]";
const serif = "font-[family-name:var(--font-wed-serif)]";

const icons: Record<string, React.ElementType> = {
  mc: Mic2, band: Guitar, penari: Footprints, vokalis: Music2, model: Sparkles, budaya: Drum, creator: Clapperboard, "foto-video": Camera,
};
const tones = ["bg-stage-gold", "bg-stage-red", "bg-stage-violet", "bg-stage-gold", "bg-stage-red", "bg-stage-violet", "bg-stage-gold", "bg-stage-red"];

const steps = [
  { title: "Ceritakan acaranya", desc: "Jenis acara, tanggal, lokasi, dan talent yang dibutuhkan." },
  { title: "Kami carikan talent", desc: "Tim Nempo mencocokkan talent yang pas dengan konsep dan budget." },
  { title: "Deal & jadwal", desc: "Rundown, durasi tampil, dan kebutuhan teknis disepakati bersama." },
  { title: "Tampil di hari-H", desc: "Talent hadir sesuai jadwal, tim kami ikut memantau." },
];

const faqs = [
  { q: "Berapa harga sewa talent?", a: "Tarif talent berbeda-beda tergantung jenis talent, durasi tampil, lokasi, dan tanggal acara. Kirim kebutuhanmu, nanti tim Nempo kirim penawarannya." },
  { q: "Bisa pesan beberapa talent sekaligus?", a: "Bisa. Misalnya MC + band + penari untuk satu acara — tinggal pilih di bagian racik line-up." },
  { q: "Ada talent untuk acara adat Sunda?", a: "Ada. Lengser, Ambu, kecapi suling, dan sinden disediakan melalui vendor rekanan Nempo." },
  { q: "Saya talent, bisa gabung?", a: "Bisa banget. Kirim portofolio lewat WhatsApp Nempo, tim kami akan menghubungi untuk proses seleksi." },
];

const marqueeItems = ["MC & Host", "Band", "Penari Jaipong", "Penyanyi", "Model", "Lengser & Ambu", "Content Creator", "Fotografer", "Garut • Jawa Barat"];

export default function TalentManagementPage() {
  const [eventType, setEventType] = useState<string>("");
  const [picked, setPicked] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const request = { eventType, talentIds: picked, date, location, note };
  const ready = canSendTalentRequest(request);
  const waHref = ready ? buildTalentRequestUrl(request) : NEMPO_CONSULT_URL;

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Layout>
      <div className="bg-stage-cream pb-14 text-stage-night">
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-stage-night text-stage-cream">
          <img src={stageImg} alt="Penari, band, dan MC tampil di panggung acara" width={1600} height={1008} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stage-night via-stage-night/80 to-stage-night/20" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-stage-night to-transparent" />
          <div className="mx-auto max-w-5xl px-5 pb-20 pt-16 sm:pt-24">
            <p className={`${hand} text-2xl text-stage-gold sm:text-3xl`}>acaramu butuh siapa?</p>
            <h1 className={`${serif} mt-2 max-w-xl text-5xl font-bold leading-[1.02] sm:text-6xl`}>
              Panggungmu,<br /><span className="text-stage-gold">talent-nya</span> dari kami.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-stage-cream/80 sm:text-base">
              Talent Management Nempo — MC, band, penari, penyanyi, model, sampai seniman Sunda untuk acara di Garut dan Jawa Barat.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#lineup" className="wed-sticker inline-flex items-center gap-2 rounded-full bg-stage-gold px-7 py-3.5 text-sm font-bold text-stage-night">
                Racik Line-up <ArrowRight className="h-4 w-4" />
              </a>
              <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-stage-cream/40 bg-stage-cream/10 px-7 py-3.5 text-sm font-bold backdrop-blur">
                <MessageCircle className="h-4 w-4" /> Chat WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["MC", "Band", "Penari", "Model"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-stage-gold/40 bg-stage-night/50 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                  <Star className="h-3 w-3 fill-stage-gold text-stage-gold" /> {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden bg-stage-red py-3 text-stage-cream" aria-hidden>
          <div className="wed-marquee flex w-max items-center gap-8 text-sm font-bold uppercase tracking-wide">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8">{item}<Star className="h-3 w-3 fill-stage-gold text-stage-gold" /></span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-5">
          {/* Penjelasan — tanpa kartu orang */}
          <section id="talent" className="scroll-mt-20 pt-14">
            <SectionHead eyebrow="Talent" title="Siapa yang bisa kami carikan?" note="tulis kebutuhanmu, kami yang cari" />
            <p className="max-w-2xl text-sm leading-relaxed text-stage-night/70">
              Nempo bekerja sama dengan pengisi acara di Garut dan Jawa Barat, termasuk vendor rekanan untuk kebutuhan adat Sunda.
              Tarif tidak dipajang tetap karena tergantung jenis talent, durasi tampil, lokasi, dan tanggal — jadi cukup kirim kebutuhanmu,
              lalu tim kami kirim penawarannya.
            </p>
            <dl className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {TALENT_CATEGORIES.map((c, i) => {
                const Icon = icons[c.id] ?? Star;
                return (
                  <div key={c.id} className="flex gap-3 border-b border-dashed border-stage-night/15 pb-5">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${tones[i]} text-stage-cream`}>
                      <Icon className="h-4 w-4" strokeWidth={2.3} />
                    </span>
                    <div>
                      <dt className="text-sm font-extrabold">{c.name}</dt>
                      <dd className="mt-0.5 text-xs leading-relaxed text-stage-night/65">{c.desc}</dd>
                      <p className="mt-1.5 text-[11px] font-semibold text-stage-violet">{c.examples.join(" · ")}</p>
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>

          {/* Racik line-up — ringkas, langsung ke WhatsApp */}
          <section id="lineup" className="scroll-mt-20 pt-16">
            <SectionHead eyebrow="Racik Line-up" title="Tulis kebutuhan acaramu" note="pesannya otomatis terisi di WhatsApp" />
            <div className="rounded-3xl border-[3px] border-stage-night bg-card p-5 sm:p-7" style={{ boxShadow: "6px 6px 0 0 var(--color-stage-gold)" }}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stage-red">Jenis acara</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {EVENT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setEventType(t)}
                        aria-pressed={eventType === t}
                        className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${eventType === t ? "border-stage-night bg-stage-night text-stage-cream" : "border-dashed border-stage-night/25 hover:border-stage-night/60"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-stage-red">Talent yang dibutuhkan</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TALENT_CATEGORIES.map((c) => {
                      const on = picked.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => toggle(c.id)}
                          aria-pressed={on}
                          className={`inline-flex items-center gap-1 rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${on ? "border-stage-gold bg-stage-gold text-stage-night" : "border-dashed border-stage-night/25 hover:border-stage-night/60"}`}
                        >
                          {on ? <Check className="h-3 w-3" strokeWidth={3} /> : <Plus className="h-3 w-3" strokeWidth={3} />} {c.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stage-red">
                  Tanggal
                  <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="cth. 14 Februari" maxLength={60} className="mt-1.5 w-full rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-stage-red">
                  Lokasi
                  <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="cth. Garut Kota" maxLength={80} className="mt-1.5 w-full rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
                </label>
              </div>
              <label className="mt-3 block text-xs font-bold uppercase tracking-wider text-stage-red">
                Catatan (opsional)
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="cth. butuh band akustik 2 jam, MC bilingual" maxLength={300} className="mt-1.5 w-full rounded-xl border-2 border-stage-night/15 bg-stage-cream px-3 py-2 text-sm font-medium normal-case tracking-normal text-stage-night outline-none focus:border-stage-night" />
              </label>

              <div className="mt-6 flex flex-col gap-3 border-t-2 border-dashed border-stage-night/15 pt-6 sm:flex-row sm:items-center">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wed-sticker inline-flex items-center justify-center gap-2 rounded-full bg-stage-gold px-7 py-3.5 text-sm font-bold text-stage-night"
                >
                  <Copy className="h-4 w-4" /> Kirim ke WhatsApp
                </a>
                <p className="text-[11px] leading-relaxed text-stage-night/60">
                  {ready
                    ? "Jenis acara dan talent sudah terisi — tinggal tekan kirim di chat."
                    : "Pilih jenis acara dan minimal satu talent supaya pesannya lengkap."}
                </p>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="pt-16">
            <SectionHead eyebrow="Cara Booking" title="4 langkah sampai tampil" note="santai, kami yang koordinasi" />
            <ol className="grid gap-3 sm:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border-2 border-dashed border-stage-night/20 bg-card p-5">
                  <span className={`${serif} text-4xl font-bold text-stage-red/30`}>0{i + 1}</span>
                  <h3 className="mt-1 text-sm font-extrabold">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-stage-night/65">{s.desc}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Join */}
          <section className="pt-16">
            <div className="relative overflow-hidden rounded-3xl bg-stage-violet p-7 text-stage-cream sm:p-9">
              <Star className="wed-float absolute right-8 top-6 h-10 w-10 fill-stage-gold/70 text-stage-gold/70" aria-hidden />
              <Star className="wed-float-slow absolute bottom-6 right-24 h-6 w-6 fill-stage-cream/40 text-stage-cream/40" aria-hidden />
              <p className={`${hand} text-2xl text-stage-gold`}>kamu yang di atas panggung?</p>
              <h2 className={`${serif} mt-1 max-w-md text-3xl font-bold leading-tight`}>Gabung jadi talent Nempo</h2>
              <p className="mt-2 max-w-md text-sm text-stage-cream/80">MC, musisi, penari, model, atau creator — kirim portofolio dan dapatkan kesempatan tampil di acara yang dikelola Nempo.</p>
              <a href={NEMPO_CONSULT_URL} target="_blank" rel="noopener noreferrer" className="wed-sticker mt-6 inline-flex items-center gap-2 rounded-full bg-stage-cream px-6 py-3 text-sm font-bold text-stage-violet">
                Kirim Portofolio <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section className="pt-16">
            <SectionHead eyebrow="FAQ" title="Pertanyaan umum" note="biar gak ragu" />
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className={`rounded-2xl border-2 bg-card ${open === i ? "border-stage-night" : "border-dashed border-stage-night/20"}`}>
                  <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[13px] font-bold">
                    {f.q}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-stage-red transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-xs leading-relaxed text-stage-night/70">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-stage-red">{eyebrow}</p>
      <h2 className={`${serif} mt-1 text-3xl font-bold leading-tight`}>{title}</h2>
      {note && <p className={`${hand} mt-0.5 text-xl text-stage-violet`}>{note}</p>}
    </div>
  );
}
