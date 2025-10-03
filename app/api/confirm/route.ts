// app/api/confirm/route.ts
import { NextResponse } from 'next/server';

interface ConfirmationData {
  name: string;
  attending: boolean;
}

export async function POST(req: Request) {
  try {
    const data = await req.json() as ConfirmationData;
    const { name, attending } = data;

    // Валідація даних
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Ім’я гостя обов’язкове' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram bot token or chat ID is not defined in environment variables');
      // Повертаємо успіх, щоб не блокувати користувача, але логуємо помилку
      return NextResponse.json({ success: true });
    }

    const message = `Нове підтвердження:

Ім'я: ${name}
Присутність: ${attending ? 'Так' : 'Ні'}`;

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Failed to send Telegram message:', errorData);
    }

    // Тут ви можете додати логіку для збереження в базу даних, якщо потрібно
    // наприклад, розкоментувавши та адаптувавши ваш існуючий код.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
