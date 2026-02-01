// Конфигурация Telegram Bot
const TELEGRAM_BOT_TOKEN = '8194151542:AAF7OaJppJpoj3kMAAHdn6RlN23PlLcBczc'; // Замените на токен вашего бота от @BotFather
const TELEGRAM_CHAT_ID = '-5277748590'; // Замените на ваш chat ID

interface FormData {
  childName: string;
  age: string;
  phone: string;
  time?: string;
  language?: string;
  source?: string;
}

export async function sendToTelegram(formData: FormData): Promise<boolean> {
  const message = `
🎓 *Новая заявка на пробный урок!*

👤 *Имя ребёнка:* ${formData.childName}
🎂 *Возраст:* ${formData.age} лет
📱 *Телефон:* ${formData.phone}
${formData.time ? `⏰ *Удобное время:* ${formData.time}` : ''}
${formData.language ? `🌐 *Язык:* ${formData.language}` : ''}
${formData.source ? `📍 *Источник:* ${formData.source}` : ''}

📅 *Дата:* ${new Date().toLocaleString('ru-RU')}
  `.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    const data = await response.json();
    
    if (!data.ok) {
      console.error('Telegram API error:', data);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}
