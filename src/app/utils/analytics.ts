/**
 * Отправка конверсии в Google Ads.
 *
 * Вызывается только когда заявка реально ушла на сервер, а не по клику
 * на кнопку: клик ещё ничего не значит — форма может не пройти валидацию
 * или отправка может упасть.
 */

const CONVERSION_ID = 'AW-17844260471/5JnSCKeI3t0bEPec57xC';

type Gtag = (command: string, event: string, params: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

/**
 * Сообщает Google Ads о конверсии и вызывает done().
 *
 * done() выполнится в любом случае: по колбэку от Google, по таймауту,
 * или сразу — если gtag недоступен (блокировщик рекламы, сбой загрузки).
 * Пользователь не должен застревать на форме из-за аналитики.
 */
export function reportLeadConversion(done: () => void): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    done();
    return;
  }

  let finished = false;
  const finishOnce = () => {
    if (finished) return;
    finished = true;
    done();
  };

  // страховка: если Google не ответит, всё равно уводим пользователя дальше
  const timer = window.setTimeout(finishOnce, 1200);

  try {
    window.gtag('event', 'conversion', {
      send_to: CONVERSION_ID,
      value: 1.0,
      currency: 'USD',
      event_callback: () => {
        window.clearTimeout(timer);
        finishOnce();
      },
    });
  } catch {
    window.clearTimeout(timer);
    finishOnce();
  }
}
