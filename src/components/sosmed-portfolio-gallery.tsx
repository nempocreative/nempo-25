import { useState } from "react";
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { SOSMED_PORTFOLIO, SOSMED_PORTFOLIO_CATEGORIES, type SosmedPortfolioItem, type SosmedPortfolioCategory } from "@/data/sosmed-portfolio";

export function SosmedPortfolioGallery() {
  const [filter, setFilter] = useState<"Semua" | SosmedPortfolioCategory>("Semua");
  const [selected, setSelected] = useState<SosmedPortfolioItem | null>(null);
  const [toneIndex, setToneIndex] = useState(0);
  const [postIndex, setPostIndex] = useState<number | null>(null);
  const tone = selected?.tones[toneIndex];
  const items = filter === "Semua" ? SOSMED_PORTFOLIO : SOSMED_PORTFOLIO.filter((item) => item.category === filter);

  return (
    <section className="px-4 pt-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-sos-pink">Portofolio</p>
          <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-sos-ink">Satu tone, satu cerita brand.</h2>
        </div>
        <p className="text-xs text-muted-foreground">Konsep visual · Ilustrasi AI</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Kategori portofolio">
        {(["Semua", ...SOSMED_PORTFOLIO_CATEGORIES] as const).map((category) => (
          <Button key={category} variant="outline" size="sm" aria-pressed={filter === category} onClick={() => setFilter(category)} className={filter === category ? "border-sos-ink bg-sos-ink text-primary-foreground" : "bg-card text-foreground"}>{category}</Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item) => (
          <Button key={item.id} variant="ghost" onClick={() => { setSelected(item); setToneIndex(0); setPostIndex(null); }} aria-label={`Buka ${item.name}`} className="group h-auto min-w-0 flex-col items-stretch gap-0 overflow-hidden whitespace-normal rounded-lg border border-border bg-card p-0 text-left hover:border-sos-pink">
            <img src={item.image} alt={`Grid ${item.category} ${item.tones[0]?.name}`} width={960} height={1280} loading="lazy" className="aspect-[3/4] w-full object-cover transition-opacity group-hover:opacity-90" />
            <div className="w-full p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2"><span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.category}</span><ArrowUpRight className="text-sos-pink" /></div>
              <h3 className="mt-1 text-sm font-bold text-sos-ink">{item.name}</h3>
              <p className="mt-1 text-[11px] font-normal text-muted-foreground">2 tone · 18 desain</p>
            </div>
          </Button>
        ))}
      </div>
      <Dialog open={selected !== null} onOpenChange={(isOpen) => { if (!isOpen) { setSelected(null); setPostIndex(null); } }}>
        <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-3xl flex-col gap-0 overflow-hidden rounded-lg p-0">
          <div className="shrink-0 border-b border-border p-4 pr-12 sm:p-6">
            <DialogTitle className="text-lg text-foreground">{selected?.name}</DialogTitle>
            <DialogDescription className="mt-1 text-xs">{tone?.name} · 9 desain · Konsep visual AI</DialogDescription>
          </div>
          {postIndex === null ? (
            <>
              <div className="flex shrink-0 gap-2 border-b border-border p-3" aria-label="Pilihan tone">
                {selected?.tones.map((option, index) => (
                  <Button key={option.id} variant="outline" aria-pressed={toneIndex === index} onClick={() => setToneIndex(index)} className={`h-auto min-w-0 flex-1 justify-start whitespace-normal p-2 text-left text-xs ${toneIndex === index ? "border-sos-pink bg-sos-blush text-sos-ink" : "bg-card text-foreground"}`}>
                    <img src={option.posts[0]} alt="" width={32} height={40} className="h-10 w-8 shrink-0 rounded-sm object-cover" />{option.name}
                  </Button>
                ))}
              </div>
              <div className="overflow-y-auto p-3 sm:p-5">
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {tone?.posts.map((image, index) => (
                    <Button key={image} variant="ghost" aria-label={`Perbesar desain ${index + 1}`} onClick={() => setPostIndex(index)} className="h-auto min-w-0 overflow-hidden rounded-sm p-0">
                      <img src={image} alt={`${tone.name} desain ${index + 1}`} width={320} height={427} loading="lazy" className="aspect-[3/4] w-full object-cover" />
                    </Button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="min-h-0 overflow-y-auto p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Button variant="ghost" size="sm" onClick={() => setPostIndex(null)}><ArrowLeft />Grid</Button>
                <span className="text-xs text-muted-foreground">{postIndex + 1} / 9</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" aria-label="Desain sebelumnya" onClick={() => setPostIndex((postIndex + 8) % 9)}><ChevronLeft /></Button>
                  <Button variant="outline" size="icon" aria-label="Desain berikutnya" onClick={() => setPostIndex((postIndex + 1) % 9)}><ChevronRight /></Button>
                </div>
              </div>
              <img src={tone?.posts[postIndex]} alt={`${tone?.name} desain ${postIndex + 1}`} width={320} height={427} className="mx-auto max-h-[65dvh] w-auto max-w-full object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}