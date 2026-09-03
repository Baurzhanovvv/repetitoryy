import { ReactNode, useRef, useState } from "react";

/** Простые поля редактора. Стиль утилитарный: это рабочий инструмент, не витрина. */

const labelCls = "block text-[13px] font-semibold text-[#5A6480] mb-1.5";
const inputCls =
  "w-full px-3 py-2.5 text-[15px] text-[#101A2E] bg-white border border-[#DCE1ED] rounded-lg " +
  "focus:outline-none focus:border-[#1E45B8] focus:ring-2 focus:ring-[#E8EDFB]";

export function Field({
  label, value, onChange, placeholder, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <input
        className={inputCls}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="block text-[12px] text-[#8B94AB] mt-1">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label, value, onChange, rows = 4, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <textarea
        className={inputCls + " leading-relaxed resize-y"}
        rows={rows}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint && <span className="block text-[12px] text-[#8B94AB] mt-1">{hint}</span>}
    </label>
  );
}

export function Toggle({
  label, value, onChange,
}: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 accent-[#1E45B8]"
      />
      <span className="text-[14px] text-[#101A2E]">{label}</span>
    </label>
  );
}

/** Картинка: превью, загрузка файла и ручной ввод пути. */
export function ImageField({
  label, value, onChange, onError,
}: {
  label: string; value: string; onChange: (v: string) => void; onError: (msg: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: file });
      const data = await res.json();
      if (data.ok) onChange(data.url);
      else onError(data.error || 'не удалось загрузить файл');
    } catch {
      onError('не удалось загрузить файл');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 rounded-lg border border-[#DCE1ED] bg-[#EFF1F7] overflow-hidden flex-shrink-0">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full grid place-items-center text-[11px] text-[#8B94AB] text-center px-1">
              нет фото
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            className={inputCls + " text-[13px]"}
            value={value ?? ""}
            placeholder="/uploads/имя.jpg"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 text-[13px] font-semibold rounded-lg border border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB] disabled:opacity-50"
            >
              {busy ? 'Загружаю…' : 'Загрузить фото'}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 text-[13px] rounded-lg border border-[#DCE1ED] text-[#5A6480] hover:bg-[#EFF1F7]"
              >
                Убрать
              </button>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Редактор списка однотипных элементов с добавлением, удалением и перестановкой. */
export function ListEditor<T>({
  items, onChange, makeEmpty, title, renderItem, itemLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  makeEmpty: () => T;
  title: string;
  itemLabel: (item: T, index: number) => string;
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const update = (index: number, patch: Partial<T>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
    setOpen(target);
  };

  const remove = (index: number) => {
    if (!confirm('Удалить этот элемент?')) return;
    onChange(items.filter((_, i) => i !== index));
    setOpen(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={labelCls + " mb-0"}>{title}</span>
        <button
          type="button"
          onClick={() => { onChange([...items, makeEmpty()]); setOpen(items.length); }}
          className="px-3 py-1.5 text-[13px] font-semibold rounded-lg border border-[#1E45B8] text-[#1E45B8] hover:bg-[#E8EDFB]"
        >
          + Добавить
        </button>
      </div>

      <div className="border border-[#DCE1ED] rounded-lg divide-y divide-[#DCE1ED] overflow-hidden">
        {items.length === 0 && (
          <p className="px-3 py-4 text-[14px] text-[#8B94AB]">Пусто — секция не будет показана на сайте.</p>
        )}
        {items.map((item, index) => (
          <div key={index} className="bg-white">
            <div className="flex items-center gap-2 px-3 py-2.5">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex-1 text-left text-[14px] text-[#101A2E] truncate hover:text-[#1E45B8]"
              >
                {open === index ? '▾' : '▸'} {itemLabel(item, index) || `Элемент ${index + 1}`}
              </button>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0}
                className="px-2 text-[#8B94AB] hover:text-[#101A2E] disabled:opacity-30" title="Выше">↑</button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}
                className="px-2 text-[#8B94AB] hover:text-[#101A2E] disabled:opacity-30" title="Ниже">↓</button>
              <button type="button" onClick={() => remove(index)}
                className="px-2 text-[#8B94AB] hover:text-[#D9541C]" title="Удалить">✕</button>
            </div>
            {open === index && (
              <div className="px-3 pb-4 pt-1 grid gap-3 bg-[#F7F9FC]">
                {renderItem(item, (patch) => update(index, patch))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="border border-[#DCE1ED] rounded-xl bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#F7F9FC]"
      >
        <span className="text-[16px] font-bold text-[#101A2E]" style={{ fontFamily: 'Onest, sans-serif' }}>
          {title}
        </span>
        <span className="text-[#8B94AB]">{open ? '▾' : '▸'}</span>
      </button>
      {open && <div className="px-4 pb-5 pt-1 grid gap-4 border-t border-[#DCE1ED]">{children}</div>}
    </section>
  );
}
