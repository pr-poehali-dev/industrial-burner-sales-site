import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/f3d07043-9a46-4c66-8100-2be86ce83116/files/51fb3b12-fdcb-4ad0-b026-f65cb6a4ba37.jpg';

interface Burner {
  id: number;
  name: string;
  series: string;
  power: number; // кВт
  variants: string[];
}

const BURNERS: Burner[] = [
  { id: 1,  name: 'BLU 700.1',   series: 'Ecoflam BLU', power: 700,   variants: ['PAB', 'LN', 'PR', 'LN PR', 'LN PR TL', 'LN PAB TL', 'LN PAB TC'] },
  { id: 2,  name: 'BLU 1000.1',  series: 'Ecoflam BLU', power: 1000,  variants: ['PAB', 'LN', 'PR', 'LN PR', 'LN PR TL', 'PAB TL', 'PAB TC'] },
  { id: 3,  name: 'BLU 1200.1',  series: 'Ecoflam BLU', power: 1200,  variants: ['PAB', 'PR', 'PAB TL', 'PR TL'] },
  { id: 4,  name: 'BLU 1500.1',  series: 'Ecoflam BLU', power: 1500,  variants: ['PAB', 'LN', 'LN PR', 'LN PR TL', 'PAB TL'] },
  { id: 5,  name: 'BLU 1700.1',  series: 'Ecoflam BLU', power: 1700,  variants: ['PAB', 'PAB TC', 'PAB TL'] },
  { id: 6,  name: 'BLU 1700.2',  series: 'Ecoflam BLU', power: 1700,  variants: ['PAB', 'PAB TC', 'PAB TL'] },
  { id: 7,  name: 'BLU 2000.1',  series: 'Ecoflam BLU', power: 2000,  variants: ['PAB', 'PAB TC', 'PAB TC LPG'] },
  { id: 8,  name: 'BLU 2500.2',  series: 'Ecoflam BLU', power: 2500,  variants: ['PRE', 'PRE TL'] },
  { id: 9,  name: 'BLU 3000.1',  series: 'Ecoflam BLU', power: 3000,  variants: ['PRE', 'PRE TL'] },
  { id: 10, name: 'BLU 4000.1',  series: 'Ecoflam BLU', power: 4000,  variants: ['PRE'] },
  { id: 11, name: 'BLU 5000.1',  series: 'Ecoflam BLU', power: 5000,  variants: ['PRE'] },
  { id: 12, name: 'BLU 6000.1',  series: 'Ecoflam BLU', power: 6000,  variants: ['PRE'] },
  { id: 13, name: 'BLU 7000.1',  series: 'Ecoflam BLU', power: 7000,  variants: ['PRE'] },
  { id: 14, name: 'BLU 8000.1',  series: 'Ecoflam BLU', power: 8000,  variants: ['PRE'] },
  { id: 15, name: 'BLU 10000.1', series: 'Ecoflam BLU', power: 10000, variants: ['PRE'] },
  { id: 16, name: 'BLU 12000.1', series: 'Ecoflam BLU', power: 12000, variants: ['PRE'] },
  { id: 17, name: 'BLU 15000.1', series: 'Ecoflam BLU', power: 15000, variants: ['PRE'] },
  { id: 18, name: 'BLU 18000.1', series: 'Ecoflam BLU', power: 18000, variants: ['PRE'] },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [minPower, setMinPower] = useState(0);
  const [maxPower, setMaxPower] = useState(18000);

  const ALL_VARIANTS = ['PAB', 'LN', 'PR', 'LN PR', 'LN PR TL', 'LN PAB TL', 'LN PAB TC', 'PAB TL', 'PAB TC', 'PAB TC LPG', 'PRE', 'PRE TL'];

  const toggleVariant = (v: string) =>
    setSelectedVariants((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));

  const filtered = useMemo(
    () =>
      BURNERS.filter(
        (b) =>
          b.power >= minPower &&
          b.power <= maxPower &&
          (selectedVariants.length === 0 || selectedVariants.some((v) => b.variants.includes(v))),
      ),
    [selectedVariants, minPower, maxPower],
  );

  const resetFilters = () => {
    setSelectedVariants([]);
    setMinPower(0);
    setMaxPower(18000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center bg-accent">
              <Icon name="Flame" size={20} className="text-accent-foreground animate-flame" />
            </span>
            <span className="font-display text-xl font-700 tracking-wide">ТЕПЛО<span className="text-accent">ЭНЕРГО</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {[
              ['Каталог', '#catalog'],
              ['О компании', '#about'],
              ['Контакты', '#contacts'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="font-display text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
              >
                {label}
              </a>
            ))}
          </nav>
          <Button onClick={() => { setModalOpen(true); setSubmitted(false); }} className="hidden bg-accent font-display uppercase tracking-wider hover:bg-accent/90 md:inline-flex">
            Заказать КП
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[hsl(220,26%,12%)] text-white">
        <div className="absolute inset-0 steel-grid opacity-[0.08]" />
        <div className="container relative grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-in">
            <div className="mb-5 inline-flex items-center gap-2 border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/70">
              <span className="h-1.5 w-1.5 bg-accent" /> Поставщик с 2011 года
            </div>
            <h1 className="font-display text-4xl font-700 uppercase leading-[1.05] tracking-tight md:text-6xl">
              Промышленные<br />горелки для<br /><span className="text-accent">котлов и печей</span>
            </h1>
            <p className="mt-6 max-w-md text-white/65">
              Газовые, дизельные, мазутные и комбинированные горелки мощностью от 17,6 до 17 000 кВт.
              Подбор под технические требования вашего производства.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent font-display uppercase tracking-wider hover:bg-accent/90">
                <a href="#catalog">Открыть каталог</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent font-display uppercase tracking-wider text-white hover:bg-white/10 hover:text-white">
                <a href="#contacts">Получить расчёт</a>
              </Button>
            </div>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                ['17 000', 'кВт макс. мощность'],
                ['15 лет', 'на рынке'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-2xl font-700 text-accent">{n}</div>
                  <div className="text-xs text-white/55">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -inset-4 bg-accent/10 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Промышленная горелка"
              className="relative w-full border border-white/10 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="container py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-accent">Каталог</span>
            <h2 className="mt-1 font-display text-3xl font-700 uppercase md:text-4xl">
              Подбор по характеристикам
            </h2>
          </div>
          <span className="hidden font-display text-sm text-muted-foreground sm:block">
            Найдено: {filtered.length} из {BURNERS.length}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Filters */}
          <aside className="h-fit border border-border bg-secondary/40 p-6 lg:sticky lg:top-24">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg font-600 uppercase tracking-wide">Фильтры</h3>
              <button onClick={resetFilters} className="text-xs text-accent hover:underline">
                Сбросить
              </button>
            </div>

            <div className="mb-6">
              <label className="mb-2 flex items-center justify-between font-display text-sm uppercase tracking-wide text-muted-foreground">
                Мощность от <span className="text-accent">{minPower.toLocaleString()} кВт</span>
              </label>
              <input
                type="range"
                min={0}
                max={18000}
                step={500}
                value={minPower}
                onChange={(e) => setMinPower(Number(e.target.value))}
                className="w-full accent-[hsl(18,95%,54%)]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 flex items-center justify-between font-display text-sm uppercase tracking-wide text-muted-foreground">
                Мощность до <span className="text-accent">{maxPower.toLocaleString()} кВт</span>
              </label>
              <input
                type="range"
                min={0}
                max={18000}
                step={500}
                value={maxPower}
                onChange={(e) => setMaxPower(Number(e.target.value))}
                className="w-full accent-[hsl(18,95%,54%)]"
              />
            </div>

            <div>
              <label className="mb-3 block font-display text-sm uppercase tracking-wide text-muted-foreground">
                Исполнение
              </label>
              <div className="flex flex-wrap gap-2">
                {ALL_VARIANTS.map((v) => (
                  <button
                    key={v}
                    onClick={() => toggleVariant(v)}
                    className={`border px-2 py-1 text-xs font-display uppercase tracking-wide transition-colors ${
                      selectedVariants.includes(v)
                        ? 'border-accent bg-accent/10 text-foreground'
                        : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center border border-dashed border-border text-center text-muted-foreground">
                <Icon name="SearchX" size={40} className="mb-3" />
                Под выбранные параметры ничего не найдено
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((b) => (
                  <article
                    key={b.id}
                    className="group flex flex-col border border-border bg-card transition-all hover:border-accent hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
                      <span className="font-display text-xs uppercase tracking-widest text-muted-foreground">
                        {b.series}
                      </span>
                      <Icon name="Flame" size={18} className="text-accent" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-2xl font-700 uppercase">{b.name}</h3>
                      <dl className="mb-4 mt-2 space-y-2 text-sm">
                        <div className="flex items-center justify-between border-b border-dashed border-border pb-1">
                          <dt className="text-muted-foreground">Мощность</dt>
                          <dd className="font-display font-600">{b.power.toLocaleString()} кВт</dd>
                        </div>
                        <div className="flex items-center justify-between border-b border-dashed border-border pb-1">
                          <dt className="text-muted-foreground">Исполнений</dt>
                          <dd className="font-display font-600">{b.variants.length}</dd>
                        </div>
                      </dl>
                      <div className="mb-4 flex flex-wrap gap-1">
                        {b.variants.map((v) => (
                          <span key={v} className="border border-border bg-secondary/50 px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-muted-foreground">
                            {v}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto">
                        <Button asChild size="sm" className="w-full bg-accent font-display uppercase tracking-wider hover:bg-accent/90">
                          <a href="#contacts">Запросить цену</a>
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-y border-border bg-secondary/40 py-20">
        <div className="container grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-accent">О компании</span>
            <h2 className="mt-1 font-display text-3xl font-700 uppercase md:text-4xl">
              Инженерный подход к теплу
            </h2>
            <p className="mt-5 text-muted-foreground">
              «ТеплоЭнерго» — поставщик горелочного оборудования для промышленных
              котлов, печей и сушильных камер. Мы поставляем горелки под конкретные задачи заказчика — от пищевых производств до металлургии.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ['ShieldCheck', 'Гарантия 1 год', 'на всё оборудование'],
                ['Wrench', 'Сервис под ключ', 'монтаж и пусконаладка'],
                ['Factory', 'Собственное производство', 'полный цикл в России'],
                ['FileCheck', 'Сертификаты', 'ТР ТС и ISO 9001'],
              ].map(([icon, t, d]) => (
                <div key={t} className="flex gap-3 border border-border bg-background p-4">
                  <Icon name={icon} size={22} className="shrink-0 text-accent" />
                  <div>
                    <div className="font-display text-sm font-600 uppercase">{t}</div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['500+', 'проектов'],
              ['80', 'регионов РФ'],
              ['24/7', 'поддержка'],
              ['12', 'инженеров'],

              ['5 дн.', 'срок отгрузки'],
            ].map(([n, l]) => (
              <div
                key={l}
                className="flex flex-col items-center justify-center border border-border bg-background p-5 text-center"
              >
                <span className="font-display text-2xl font-700 text-accent md:text-3xl">{n}</span>
                <span className="mt-1 text-xs text-muted-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <span className="font-display text-sm uppercase tracking-widest text-accent">Контакты</span>
            <h2 className="mt-1 font-display text-3xl font-700 uppercase md:text-4xl">
              Получить коммерческое предложение
            </h2>
            <p className="mt-5 text-muted-foreground">
              Оставьте контакты — инженер подберёт горелку под ваши параметры и пришлёт расчёт
              в течение рабочего дня.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ['Phone', '+7 (863) 226-13-69', 'Пн–Пт, 9:00–18:00'],
                ['Mail', 'rtbn@inbox.ru', 'отдел продаж'],
                ['MapPin', 'Ростовская обл., п. Целина, 12-я линия д. 39', 'производство и офис'],
              ].map(([icon, t, d]) => (
                <div key={t} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-border bg-secondary/40">
                    <Icon name={icon} size={20} className="text-accent" />
                  </span>
                  <div>
                    <div className="font-display font-600">{t}</div>
                    <div className="text-xs text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4 border border-border bg-secondary/30 p-6 md:p-8"
          >
            {[
              ['Ваше имя', 'text', 'Иван Петров'],
              ['Компания', 'text', 'ООО «Завод»'],
              ['Телефон', 'tel', '+7 (___) ___-__-__'],
            ].map(([label, type, ph]) => (
              <div key={label}>
                <label className="mb-1.5 block font-display text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={ph}
                  className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                />
              </div>
            ))}
            <div>
              <label className="mb-1.5 block font-display text-xs uppercase tracking-wide text-muted-foreground">
                Задача
              </label>
              <textarea
                rows={3}
                placeholder="Опишите оборудование и требования к горелке"
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <Button type="submit" size="lg" className="w-full bg-accent font-display uppercase tracking-wider hover:bg-accent/90">
              Отправить заявку
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-[hsl(220,26%,12%)] py-10 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center bg-accent">
              <Icon name="Flame" size={18} className="text-accent-foreground" />
            </span>
            <span className="font-display font-700 tracking-wide">ТЕПЛО<span className="text-accent">ЭНЕРГО</span></span>
          </div>
          <p className="text-sm text-white/50">© 2026 ТеплоЭнерго. Промышленное горелочное оборудование</p>
        </div>
      </footer>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md border border-border bg-background shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-6 py-4">
              <h2 className="font-display text-lg font-700 uppercase tracking-wide">Заказать коммерческое предложение</h2>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={20} />
              </button>
            </div>
            {submitted ? (
              <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center bg-accent/10">
                  <Icon name="CheckCircle" size={36} className="text-accent" />
                </span>
                <h3 className="font-display text-xl font-700 uppercase">Заявка отправлена!</h3>
                <p className="text-sm text-muted-foreground">Наш менеджер свяжется с вами в течение рабочего дня.</p>
                <Button onClick={() => setModalOpen(false)} className="mt-2 bg-accent font-display uppercase tracking-wider hover:bg-accent/90">
                  Закрыть
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-4 p-6"
              >
                {[
                  ['Ваше имя', 'text', 'Иван Петров'],
                  ['Компания', 'text', 'ООО «Завод»'],
                  ['Телефон', 'tel', '+7 (___) ___-__-__'],
                ] .map(([label, type, ph]) => (
                  <div key={label}>
                    <label className="mb-1.5 block font-display text-xs uppercase tracking-wide text-muted-foreground">{label}</label>
                    <input
                      type={type}
                      placeholder={ph}
                      required
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block font-display text-xs uppercase tracking-wide text-muted-foreground">Задача</label>
                  <textarea
                    rows={3}
                    placeholder="Опишите оборудование и требования к горелке"
                    className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full bg-accent font-display uppercase tracking-wider hover:bg-accent/90">
                  Отправить заявку
                </Button>
                <p className="text-center text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;