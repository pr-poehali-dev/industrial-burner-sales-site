import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/f3d07043-9a46-4c66-8100-2be86ce83116/files/c09f3acb-f3a9-4d26-b7cb-43154549aead.jpg';

type Fuel = 'Газ' | 'Дизель' | 'Мазут' | 'Комбинированная';

interface Burner {
  id: number;
  name: string;
  series: string;
  fuel: Fuel;
  power: number; // кВт
  temp: number; // °C
  price: string;
}

const BURNERS: Burner[] = [
  { id: 1, name: 'ВГ-150', series: 'Vulcan', fuel: 'Газ', power: 150, temp: 1100, price: '142 000 ₽' },
  { id: 2, name: 'ВД-220', series: 'Vulcan', fuel: 'Дизель', power: 220, temp: 1250, price: '198 000 ₽' },
  { id: 3, name: 'ТК-400', series: 'Titan', fuel: 'Комбинированная', power: 400, temp: 1400, price: '356 000 ₽' },
  { id: 4, name: 'ТМ-600', series: 'Titan', fuel: 'Мазут', power: 600, temp: 1350, price: '412 000 ₽' },
  { id: 5, name: 'ФГ-90', series: 'Forge', fuel: 'Газ', power: 90, temp: 950, price: '96 000 ₽' },
  { id: 6, name: 'ФД-320', series: 'Forge', fuel: 'Дизель', power: 320, temp: 1300, price: '274 000 ₽' },
  { id: 7, name: 'ПК-900', series: 'Prometheus', fuel: 'Комбинированная', power: 900, temp: 1500, price: '688 000 ₽' },
  { id: 8, name: 'ПГ-1200', series: 'Prometheus', fuel: 'Газ', power: 1200, temp: 1450, price: '845 000 ₽' },
];

const FUEL_OPTIONS: Fuel[] = ['Газ', 'Дизель', 'Мазут', 'Комбинированная'];
const FUEL_ICONS: Record<Fuel, string> = {
  Газ: 'Flame',
  Дизель: 'Droplet',
  Мазут: 'Fuel',
  Комбинированная: 'Combine',
};

const Index = () => {
  const [fuels, setFuels] = useState<Fuel[]>([]);
  const [minPower, setMinPower] = useState(0);
  const [minTemp, setMinTemp] = useState(0);

  const toggleFuel = (f: Fuel) =>
    setFuels((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  const filtered = useMemo(
    () =>
      BURNERS.filter(
        (b) =>
          (fuels.length === 0 || fuels.includes(b.fuel)) &&
          b.power >= minPower &&
          b.temp >= minTemp,
      ),
    [fuels, minPower, minTemp],
  );

  const resetFilters = () => {
    setFuels([]);
    setMinPower(0);
    setMinTemp(0);
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
          <Button asChild className="hidden bg-accent font-display uppercase tracking-wider hover:bg-accent/90 md:inline-flex">
            <a href="#contacts">Заказать КП</a>
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
                ['1500', '°C темп. горения'],
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
              <label className="mb-3 block font-display text-sm uppercase tracking-wide text-muted-foreground">
                Тип топлива
              </label>
              <div className="space-y-2">
                {FUEL_OPTIONS.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFuel(f)}
                    className={`flex w-full items-center gap-3 border px-3 py-2 text-left text-sm transition-colors ${
                      fuels.includes(f)
                        ? 'border-accent bg-accent/10 text-foreground'
                        : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    <Icon
                      name={FUEL_ICONS[f]}
                      size={16}
                      className={fuels.includes(f) ? 'text-accent' : ''}
                    />
                    {f}
                    {fuels.includes(f) && <Icon name="Check" size={14} className="ml-auto text-accent" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 flex items-center justify-between font-display text-sm uppercase tracking-wide text-muted-foreground">
                Мощность <span className="text-accent">от {minPower} кВт</span>
              </label>
              <input
                type="range"
                min={0}
                max={1200}
                step={50}
                value={minPower}
                onChange={(e) => setMinPower(Number(e.target.value))}
                className="w-full accent-[hsl(18,95%,54%)]"
              />
            </div>

            <div>
              <label className="mb-2 flex items-center justify-between font-display text-sm uppercase tracking-wide text-muted-foreground">
                Темп. горения <span className="text-accent">от {minTemp} °C</span>
              </label>
              <input
                type="range"
                min={0}
                max={1500}
                step={50}
                value={minTemp}
                onChange={(e) => setMinTemp(Number(e.target.value))}
                className="w-full accent-[hsl(18,95%,54%)]"
              />
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
                        Серия {b.series}
                      </span>
                      <Icon name={FUEL_ICONS[b.fuel]} size={18} className="text-accent" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-2xl font-700 uppercase">{b.name}</h3>
                      <span className="mb-4 text-sm text-muted-foreground">{b.fuel}</span>
                      <dl className="mb-5 space-y-2 text-sm">
                        <div className="flex items-center justify-between border-b border-dashed border-border pb-1">
                          <dt className="text-muted-foreground">Мощность</dt>
                          <dd className="font-display font-600">{b.power} кВт</dd>
                        </div>
                        <div className="flex items-center justify-between border-b border-dashed border-border pb-1">
                          <dt className="text-muted-foreground">Темп. горения</dt>
                          <dd className="font-display font-600">{b.temp} °C</dd>
                        </div>
                      </dl>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="font-display text-lg font-700 text-accent">{b.price}</span>
                        <Button asChild size="sm" variant="outline" className="font-display uppercase tracking-wider">
                          <a href="#contacts">Запросить</a>
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
                ['ShieldCheck', 'Гарантия 3 года', 'на всё оборудование'],
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
              ['98%', 'довольных клиентов'],
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
                ['Phone', '+7 (495) 120-45-67', 'Пн–Пт, 9:00–18:00'],
                ['Mail', 'sales@teploenergo.ru', 'отдел продаж'],
                ['MapPin', 'г. Москва, ул. Заводская, 12', 'производство и офис'],
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
    </div>
  );
};

export default Index;