/**
 * Конверсия в Google Ads.
 *
 * Формы заявки больше нет: запись идёт через WhatsApp или звонок, поэтому
 * конверсией считаем клик по этим кнопкам. Это осознанный клик взрослого,
 * а не случайно заполненная детьми анкета.
 *
 * ponytail: используем прежний conversion label — в Google Ads лучше завести
 * отдельную конверсию «WhatsApp/звонок» и подставить её сюда.
 */

const CONVERSION_ID = 'AW-17844260471/5JnSCKeI3t0bEPec57xC';

type Gtag = (command: string, event: string, params: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export type ContactMethod = 'whatsapp' | 'call';

/** Ничего не ждём: wa.me открывается в новой вкладке, tel: — системный звонок. */
export function trackContact(method: ContactMethod, source: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_ID,
      value: 1.0,
      currency: 'USD',
    });
    window.gtag('event', 'contact_click', { method, source });
  } catch {
    // аналитика не должна ломать кнопку
  }
}
