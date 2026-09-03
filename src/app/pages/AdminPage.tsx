import { useEffect, useState } from "react";
import { Field, TextArea, Toggle, ImageField, ListEditor, Section } from "../admin/fields";
import defaultContent from "../content/default-content.json";
import type { SiteContent, Language } from "../content/types";

type Status = { kind: 'idle' | 'saving' | 'ok' | 'error'; message?: string };
type Version = { id: string; savedAt: string; size: number };

const LANGS: { key: Language; label: string }[] = [
  { key: 'english', label: 'Английский' },
  { key: 'kazakh', label: 'Казахский' },
];

export function AdminPage() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [versions, setVersions] = useState<Version[] | null>(null);
  const [lang, setLang] = useState<Language>('english');

  // админку не должно быть в поиске
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    const previousTitle = document.title;
    document.title = 'Редактор сайта — Репетитор Рядом';
    return () => { meta.remove(); document.title = previousTitle; };
  }, []);

  useEffect(() => {
    fetch('/api/admin/session')
      .then((r) => r.json())
      .then((d) => setAuthorized(!!d.authorized))
      .catch(() => setAuthorized(false));
  }, []);

  useEffect(() => {
    if (!authorized) return;
    fetch('/content.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
      .then((d) => setContent(d))
      .catch(() => setContent(defaultContent as unknown as SiteContent));
  }, [authorized]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) { setAuthorized(true); setPassword(''); }
      else setLoginError(data.error || 'не удалось войти');
    } catch {
      setLoginError('сервер недоступен');
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
    setAuthorized(false);
    setContent(null);
  };

  const save = async () => {
    if (!content) return;
    setStatus({ kind: 'saving' });
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus({ kind: 'ok', message: 'Сохранено — обновите сайт, чтобы увидеть' });
        setVersions(null);
      } else {
        setStatus({ kind: 'error', message: data.error || 'не удалось сохранить' });
      }
    } catch {
      setStatus({ kind: 'error', message: 'сервер недоступен' });
    }
  };

  const loadVersions = async () => {
    const res = await fetch('/api/admin/versions');
    const data = await res.json();
    setVersions(data.ok ? data.versions : []);
  };

  const restore = async (id: string) => {
    if (!confirm('Вернуть эту версию? Текущая уйдёт в историю.')) return;
    const res = await fetch('/api/admin/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data.ok) {
      const fresh = await fetch('/content.json', { cache: 'no-cache' }).then((r) => r.json());
      setContent(fresh);
      setStatus({ kind: 'ok', message: 'Версия восстановлена' });
      setVersions(null);
    } else {
      setStatus({ kind: 'error', message: data.error || 'не удалось восстановить' });
    }
  };

  const fail = (message: string) => setStatus({ kind: 'error', message });

  // --- экраны -------------------------------------------------------------

  if (authorized === null) {
    return <div className="min-h-screen grid place-items-center text-[#5A6480]">Загрузка…</div>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#EFF1F7] px-4" style={{ fontFamily: "'Golos Text', sans-serif" }}>
        <form onSubmit={login} className="w-full max-w-sm bg-white border border-[#DCE1ED] rounded-2xl p-7">
          <h1 className="text-[22px] font-bold text-[#101A2E] mb-1" style={{ fontFamily: 'Onest, sans-serif' }}>
            Редактор сайта
          </h1>
          <p className="text-[14px] text-[#5A6480] mb-5">Введите пароль администратора</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="w-full px-3 py-2.5 text-[15px] border border-[#DCE1ED] rounded-lg focus:outline-none focus:border-[#1E45B8] focus:ring-2 focus:ring-[#E8EDFB]"
          />
          {loginError && <p className="text-[13px] text-[#D9541C] mt-2">{loginError}</p>}
          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-lg bg-[#1E45B8] text-white font-semibold hover:bg-[#16359A]"
            style={{ fontFamily: 'Onest, sans-serif' }}
          >
            Войти
          </button>
        </form>
      </div>
    );
  }

  if (!content) {
    return <div className="min-h-screen grid place-items-center text-[#5A6480]">Загружаю контент…</div>;
  }

  const patch = (updater: (draft: SiteContent) => void) => {
    const copy: SiteContent = JSON.parse(JSON.stringify(content));
    updater(copy);
    setContent(copy);
    setStatus({ kind: 'idle' });
  };

  const L = content.languages[lang];

  return (
    <div className="min-h-screen bg-[#EFF1F7] pb-28" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <header className="sticky top-0 z-20 bg-white border-b border-[#DCE1ED]">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center gap-4">
          <span className="font-bold text-[#101A2E]" style={{ fontFamily: 'Onest, sans-serif' }}>
            Редактор сайта
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#1E45B8] hover:underline">
            открыть сайт ↗
          </a>
          <button onClick={logout} className="ml-auto text-[14px] text-[#5A6480] hover:text-[#101A2E]">
            Выйти
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 grid gap-3">

        <Section title="Контакты">
          <Field label="Телефон (как показывать)" value={content.contacts.phone}
            onChange={(v) => patch((d) => { d.contacts.phone = v; })} />
          <Field label="Телефон для ссылок" value={content.contacts.phoneRaw}
            hint="только цифры, например 77475252582 — используется в WhatsApp и tel:"
            onChange={(v) => patch((d) => { d.contacts.phoneRaw = v; })} />
          <Field label="Город" value={content.contacts.city}
            onChange={(v) => patch((d) => { d.contacts.city = v; })} />
          <TextArea label="Описание в футере" rows={2} value={content.contacts.footerAbout}
            onChange={(v) => patch((d) => { d.contacts.footerAbout = v; })} />
        </Section>

        <Section title="Полоса доверия (под формой)">
          <ListEditor
            title="Плашки"
            items={content.trust}
            makeEmpty={() => ({ title: '', note: '' })}
            itemLabel={(i) => i.title}
            onChange={(items) => patch((d) => { d.trust = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Заголовок" value={item.title} onChange={(v) => up({ title: v })} />
                <Field label="Пояснение" value={item.note} onChange={(v) => up({ note: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Главная страница (выбор языка)">
          <Field label="Надзаголовок" value={content.home.eyebrow}
            onChange={(v) => patch((d) => { d.home.eyebrow = v; })} />
          <Field label="Заголовок" value={content.home.title}
            onChange={(v) => patch((d) => { d.home.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.home.subtitle}
            onChange={(v) => patch((d) => { d.home.subtitle = v; })} />
          <ListEditor
            title="Карточки языков"
            items={content.home.courses}
            makeEmpty={() => ({ to: '/english', title: '', lead: '', points: [] })}
            itemLabel={(i) => i.title}
            onChange={(items) => patch((d) => { d.home.courses = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Заголовок" value={item.title} onChange={(v) => up({ title: v })} />
                <Field label="Ссылка" value={item.to} hint="/english или /kazakh" onChange={(v) => up({ to: v })} />
                <TextArea label="Описание" rows={2} value={item.lead} onChange={(v) => up({ lead: v })} />
                <TextArea label="Пункты (по одному в строке)" rows={3} value={item.points.join('\n')}
                  onChange={(v) => up({ points: v.split('\n').filter((s) => s.trim()) } as never)} />
              </>
            )}
          />
        </Section>

        <Section title="Почему мы">
          <Field label="Надзаголовок" value={content.solutions.eyebrow}
            onChange={(v) => patch((d) => { d.solutions.eyebrow = v; })} />
          <Field label="Заголовок" value={content.solutions.title}
            onChange={(v) => patch((d) => { d.solutions.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.solutions.subtitle}
            onChange={(v) => patch((d) => { d.solutions.subtitle = v; })} />
          <ListEditor
            title="Блоки"
            items={content.solutions.items}
            makeEmpty={() => ({ title: '', subtitle: '', description: '' })}
            itemLabel={(i) => i.title}
            onChange={(items) => patch((d) => { d.solutions.items = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Заголовок" value={item.title} onChange={(v) => up({ title: v })} />
                <Field label="Подзаголовок (можно пусто)" value={item.subtitle} onChange={(v) => up({ subtitle: v })} />
                <TextArea label="Текст" value={item.description} onChange={(v) => up({ description: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Как это устроено (шаги)">
          <Field label="Надзаголовок" value={content.howItWorks.eyebrow}
            onChange={(v) => patch((d) => { d.howItWorks.eyebrow = v; })} />
          <Field label="Заголовок" value={content.howItWorks.title}
            onChange={(v) => patch((d) => { d.howItWorks.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.howItWorks.subtitle}
            onChange={(v) => patch((d) => { d.howItWorks.subtitle = v; })} />
          <ListEditor
            title="Шаги"
            items={content.howItWorks.steps}
            makeEmpty={() => ({ number: '', title: '', description: '' })}
            itemLabel={(i) => `${i.number} · ${i.title}`}
            onChange={(items) => patch((d) => { d.howItWorks.steps = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Номер" value={item.number} onChange={(v) => up({ number: v })} />
                <Field label="Заголовок" value={item.title} onChange={(v) => up({ title: v })} />
                <TextArea label="Текст" value={item.description} onChange={(v) => up({ description: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Преподаватели">
          <Field label="Надзаголовок" value={content.teachers.eyebrow}
            onChange={(v) => patch((d) => { d.teachers.eyebrow = v; })} />
          <Field label="Заголовок" value={content.teachers.title}
            onChange={(v) => patch((d) => { d.teachers.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.teachers.subtitle}
            onChange={(v) => patch((d) => { d.teachers.subtitle = v; })} />
          <ListEditor
            title="Список"
            items={content.teachers.items}
            makeEmpty={() => ({ name: '', role: '', facts: [], about: '' })}
            itemLabel={(i) => i.name}
            onChange={(items) => patch((d) => { d.teachers.items = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Имя" value={item.name} onChange={(v) => up({ name: v })} />
                <Field label="Роль" value={item.role} onChange={(v) => up({ role: v })} />
                <TextArea label="Факты (по одному в строке)" rows={3} value={item.facts.join('\n')}
                  onChange={(v) => up({ facts: v.split('\n').filter((s) => s.trim()) } as never)} />
                <TextArea label="Описание" value={item.about} onChange={(v) => up({ about: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Цены и абонементы">
          <Field label="Надзаголовок" value={content.pricing.eyebrow}
            onChange={(v) => patch((d) => { d.pricing.eyebrow = v; })} />
          <Field label="Заголовок" value={content.pricing.title}
            onChange={(v) => patch((d) => { d.pricing.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.pricing.subtitle}
            onChange={(v) => patch((d) => { d.pricing.subtitle = v; })} />
          <TextArea label="Плашка с акцией" rows={2} value={content.pricing.promo}
            hint="оставьте пустой, чтобы убрать плашку"
            onChange={(v) => patch((d) => { d.pricing.promo = v; })} />
          <ListEditor
            title="Тарифы"
            items={content.pricing.plans}
            makeEmpty={() => ({ name: '', lessons: '', price: '', oldPrice: '', pricePerLesson: '', duration: '', popular: false, discount: '', saving: '' })}
            itemLabel={(i) => `${i.name} — ${i.price}`}
            onChange={(items) => patch((d) => { d.pricing.plans = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Название" value={item.name} onChange={(v) => up({ name: v })} />
                <Field label="Количество занятий" value={item.lessons} onChange={(v) => up({ lessons: v })} />
                <Field label="Цена" value={item.price} onChange={(v) => up({ price: v })} />
                <Field label="Старая цена (зачёркнутая)" value={item.oldPrice} onChange={(v) => up({ oldPrice: v })} />
                <Field label="Цена за занятие" value={item.pricePerLesson} onChange={(v) => up({ pricePerLesson: v })} />
                <Field label="Срок" value={item.duration} onChange={(v) => up({ duration: v })} />
                <Field label="Скидка (например -18%)" value={item.discount} onChange={(v) => up({ discount: v })} />
                <Field label="Экономия" value={item.saving} onChange={(v) => up({ saving: v })} />
                <Toggle label="Отметить как «чаще всего берут»" value={item.popular} onChange={(v) => up({ popular: v })} />
              </>
            )}
          />
          <Field label="Заголовок «что входит»" value={content.pricing.includedTitle}
            onChange={(v) => patch((d) => { d.pricing.includedTitle = v; })} />
          <TextArea label="Что входит (по одному в строке)" rows={5} value={content.pricing.included.join('\n')}
            onChange={(v) => patch((d) => { d.pricing.included = v.split('\n').filter((s) => s.trim()); })} />
        </Section>

        <Section title="Вопросы и ответы">
          <Field label="Заголовок" value={content.faq.title}
            onChange={(v) => patch((d) => { d.faq.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.faq.subtitle}
            onChange={(v) => patch((d) => { d.faq.subtitle = v; })} />
          <ListEditor
            title="Вопросы"
            items={content.faq.items}
            makeEmpty={() => ({ question: '', answer: '' })}
            itemLabel={(i) => i.question}
            onChange={(items) => patch((d) => { d.faq.items = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Вопрос" value={item.question} onChange={(v) => up({ question: v })} />
                <TextArea label="Ответ" value={item.answer} onChange={(v) => up({ answer: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Финальная форма">
          <Field label="Заголовок" value={content.contactForm.title}
            onChange={(v) => patch((d) => { d.contactForm.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={content.contactForm.subtitle}
            onChange={(v) => patch((d) => { d.contactForm.subtitle = v; })} />
          <TextArea label="Гарантии (по одной в строке)" rows={4} value={content.contactForm.guarantees.join('\n')}
            onChange={(v) => patch((d) => { d.contactForm.guarantees = v.split('\n').filter((s) => s.trim()); })} />
          <Field label="Текст кнопки" value={content.contactForm.cta}
            onChange={(v) => patch((d) => { d.contactForm.cta = v; })} />
        </Section>

        {/* --- языковые секции --- */}
        <div className="flex gap-2 mt-4">
          {LANGS.map((l) => (
            <button
              key={l.key}
              onClick={() => setLang(l.key)}
              className={
                "px-4 py-2 rounded-lg text-[14px] font-semibold border " +
                (lang === l.key
                  ? "bg-[#1E45B8] text-white border-[#1E45B8]"
                  : "bg-white text-[#5A6480] border-[#DCE1ED] hover:border-[#C3CCE2]")
              }
              style={{ fontFamily: 'Onest, sans-serif' }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <Section title={`Первый экран — ${lang === 'english' ? 'английский' : 'казахский'}`}>
          <Field label="Надзаголовок" value={L.hero.eyebrow}
            onChange={(v) => patch((d) => { d.languages[lang].hero.eyebrow = v; })} />
          <TextArea label="Заголовок" rows={2} value={L.hero.title}
            onChange={(v) => patch((d) => { d.languages[lang].hero.title = v; })} />
          <TextArea label="Выделенная часть заголовка" rows={2} value={L.hero.titleHighlight}
            hint="показывается синим, продолжает заголовок"
            onChange={(v) => patch((d) => { d.languages[lang].hero.titleHighlight = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={L.hero.subtitle}
            onChange={(v) => patch((d) => { d.languages[lang].hero.subtitle = v; })} />
          <ListEditor
            title="Обещания"
            items={L.hero.benefits}
            makeEmpty={() => ({ bold: '', text: '' })}
            itemLabel={(i) => i.bold}
            onChange={(items) => patch((d) => { d.languages[lang].hero.benefits = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Жирная часть" value={item.bold} onChange={(v) => up({ bold: v })} />
                <TextArea label="Продолжение" rows={2} value={item.text} onChange={(v) => up({ text: v })} />
              </>
            )}
          />
          <Field label="Заголовок формы" value={L.hero.formTitle}
            onChange={(v) => patch((d) => { d.languages[lang].hero.formTitle = v; })} />
          <Field label="Подпись под заголовком формы" value={L.hero.formSubtitle}
            onChange={(v) => patch((d) => { d.languages[lang].hero.formSubtitle = v; })} />
          <Field label="Текст кнопки" value={L.hero.ctaButton}
            onChange={(v) => patch((d) => { d.languages[lang].hero.ctaButton = v; })} />
        </Section>

        <Section title={`Боли родителей — ${lang === 'english' ? 'английский' : 'казахский'}`}>
          <Field label="Надзаголовок" value={L.painPoints.eyebrow}
            onChange={(v) => patch((d) => { d.languages[lang].painPoints.eyebrow = v; })} />
          <Field label="Заголовок" value={L.painPoints.title}
            onChange={(v) => patch((d) => { d.languages[lang].painPoints.title = v; })} />
          <TextArea label="Подзаголовок" rows={2} value={L.painPoints.subtitle}
            onChange={(v) => patch((d) => { d.languages[lang].painPoints.subtitle = v; })} />
          <TextArea label="Плашка внизу" rows={2} value={L.painPoints.footer}
            onChange={(v) => patch((d) => { d.languages[lang].painPoints.footer = v; })} />
          <ListEditor
            title="Реплики"
            items={L.painPoints.items}
            makeEmpty={() => ({ title: '', description: '' })}
            itemLabel={(i) => i.title}
            onChange={(items) => patch((d) => { d.languages[lang].painPoints.items = items; })}
            renderItem={(item, up) => (
              <>
                <Field label="Реплика (без кавычек)" value={item.title} onChange={(v) => up({ title: v })} />
                <TextArea label="Пояснение" value={item.description} onChange={(v) => up({ description: v })} />
              </>
            )}
          />
        </Section>

        <Section title={`Истории учеников — ${lang === 'english' ? 'английский' : 'казахский'}`}>
          {!L.results ? (
            <div>
              <p className="text-[14px] text-[#5A6480] mb-3">
                Секция выключена — на сайте её нет. Включите, если есть реальные истории.
              </p>
              <button
                type="button"
                onClick={() => patch((d) => {
                  d.languages[lang].results = { eyebrow: 'История ученика', title: 'Реальные истории наших учеников', subtitle: '', cta: 'Хочу такой же результат', cases: [] };
                })}
                className="px-3 py-2 text-[14px] font-semibold rounded-lg border border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB]"
              >
                Включить секцию
              </button>
            </div>
          ) : (
            <>
              <Field label="Надзаголовок" value={L.results.eyebrow}
                onChange={(v) => patch((d) => { d.languages[lang].results!.eyebrow = v; })} />
              <Field label="Заголовок" value={L.results.title}
                onChange={(v) => patch((d) => { d.languages[lang].results!.title = v; })} />
              <TextArea label="Подзаголовок" rows={2} value={L.results.subtitle}
                onChange={(v) => patch((d) => { d.languages[lang].results!.subtitle = v; })} />
              <Field label="Текст кнопки" value={L.results.cta}
                onChange={(v) => patch((d) => { d.languages[lang].results!.cta = v; })} />
              <ListEditor
                title="Истории"
                items={L.results.cases}
                makeEmpty={() => ({ image: '', title: '', story: '', testimonial: '', conclusion: '', duration: '' })}
                itemLabel={(i) => i.title}
                onChange={(items) => patch((d) => { d.languages[lang].results!.cases = items; })}
                renderItem={(item, up) => (
                  <>
                    <ImageField label="Фото" value={item.image} onChange={(v) => up({ image: v })} onError={fail} />
                    <Field label="Заголовок" value={item.title} onChange={(v) => up({ title: v })} />
                    <Field label="Длительность" value={item.duration} hint="например: 1 год занятий" onChange={(v) => up({ duration: v })} />
                    <TextArea label="История" rows={8} value={item.story}
                      hint="пустая строка между абзацами разделит их на сайте"
                      onChange={(v) => up({ story: v })} />
                    <TextArea label="Цитата родителя (можно пусто)" rows={5} value={item.testimonial}
                      onChange={(v) => up({ testimonial: v })} />
                    <TextArea label="Вывод" rows={3} value={item.conclusion} onChange={(v) => up({ conclusion: v })} />
                  </>
                )}
              />
            </>
          )}
        </Section>

        <Section title={`Отзывы — ${lang === 'english' ? 'английский' : 'казахский'}`}>
          {!L.testimonials ? (
            <div>
              <p className="text-[14px] text-[#5A6480] mb-3">
                Секция выключена — на сайте её нет.
              </p>
              <button
                type="button"
                onClick={() => patch((d) => {
                  d.languages[lang].testimonials = { title: 'Что говорят родители наших учеников', subtitle: '', items: [] };
                })}
                className="px-3 py-2 text-[14px] font-semibold rounded-lg border border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB]"
              >
                Включить секцию
              </button>
            </div>
          ) : (
            <>
              <Field label="Заголовок" value={L.testimonials.title}
                onChange={(v) => patch((d) => { d.languages[lang].testimonials!.title = v; })} />
              <TextArea label="Подзаголовок" rows={2} value={L.testimonials.subtitle}
                onChange={(v) => patch((d) => { d.languages[lang].testimonials!.subtitle = v; })} />
              <ListEditor
                title="Отзывы"
                items={L.testimonials.items}
                makeEmpty={() => ({ text: '', parent: '', relation: '', image: '' })}
                itemLabel={(i) => i.parent || i.text.slice(0, 40)}
                onChange={(items) => patch((d) => { d.languages[lang].testimonials!.items = items; })}
                renderItem={(item, up) => (
                  <>
                    <TextArea label="Текст отзыва" rows={6} value={item.text} onChange={(v) => up({ text: v })} />
                    <Field label="Подпись" value={item.parent} hint="имя или «Родитель»" onChange={(v) => up({ parent: v })} />
                    <Field label="Уточнение (можно пусто)" value={item.relation} onChange={(v) => up({ relation: v })} />
                    <ImageField label="Фото (можно без него)" value={item.image} onChange={(v) => up({ image: v })} onError={fail} />
                  </>
                )}
              />
            </>
          )}
        </Section>

        {/* --- история версий --- */}
        <Section title="История правок">
          <button
            type="button"
            onClick={loadVersions}
            className="px-3 py-2 text-[14px] font-semibold rounded-lg border border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB] w-fit"
          >
            Показать сохранённые версии
          </button>
          {versions && (
            versions.length === 0 ? (
              <p className="text-[14px] text-[#8B94AB]">Пока нет сохранённых версий.</p>
            ) : (
              <ul className="border border-[#DCE1ED] rounded-lg divide-y divide-[#DCE1ED]">
                {versions.map((v) => (
                  <li key={v.id} className="flex items-center gap-3 px-3 py-2.5 bg-white">
                    <span className="text-[14px] text-[#101A2E]">{v.savedAt}</span>
                    <span className="text-[13px] text-[#8B94AB]">{Math.round(v.size / 1024)} КБ</span>
                    <button
                      onClick={() => restore(v.id)}
                      className="ml-auto text-[13px] font-semibold text-[#1E45B8] hover:underline"
                    >
                      Вернуть
                    </button>
                  </li>
                ))}
              </ul>
            )
          )}
        </Section>
      </main>

      {/* --- панель сохранения --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#DCE1ED] z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <span className={
            "text-[14px] " +
            (status.kind === 'error' ? 'text-[#D9541C]' : status.kind === 'ok' ? 'text-[#1FA855]' : 'text-[#8B94AB]')
          }>
            {status.kind === 'saving' ? 'Сохраняю…' : status.message || 'Изменения применятся сразу после сохранения'}
          </span>
          <button
            onClick={save}
            disabled={status.kind === 'saving'}
            className="ml-auto px-5 py-2.5 rounded-lg bg-[#D9541C] text-white font-semibold hover:bg-[#F07135] disabled:opacity-60"
            style={{ fontFamily: 'Onest, sans-serif' }}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
