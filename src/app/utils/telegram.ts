/**
 * Отправка заявки.
 *
 * Заявка уходит на наш же сервер (/api/lead), а он уже пересылает её в Telegram.
 * Токен бота лежит на сервере в /etc/lead-proxy.env и в браузер не попадает —
 * раньше он был вписан прямо сюда и уезжал в JS-бандл, доступный кому угодно.
 */

const LEAD_ENDPOINT = '/api/lead';

interface FormData {
  childName: string;
  age: string;
  phone: string;
  time?: string;
  language?: string;
  source?: string;
}

export async function sendToTelegram(formData: FormData): Promise<boolean> {
  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.error('Не удалось отправить заявку, статус:', response.status);
      return false;
    }

    const data = await response.json();
    return data.ok === true;
  } catch (error) {
    console.error('Ошибка при отправке заявки:', error);
    return false;
  }
}
