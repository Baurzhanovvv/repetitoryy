import { useLocale } from "../i18n/LocaleProvider";
import { LOCALES, LOCALE_LABEL } from "../i18n/ui";

export function LangSwitcher({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const size = compact ? "min-w-[36px] h-9 px-1.5 text-xs" : "min-w-[44px] h-9 px-2.5 text-[13px]";

  return (
    <div role="group" aria-label={t.lang.label} className={`inline-flex rounded-lg border border-[#DCE1ED] p-0.5 bg-white ${className}`}>
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          className={
            `${size} rounded-md font-semibold transition-colors ` +
            (l === locale ? "bg-[#1E45B8] text-white" : "text-[#5A6480] hover:text-[#101A2E]")
          }
          style={{ fontFamily: "Onest, sans-serif" }}
        >
          {LOCALE_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
