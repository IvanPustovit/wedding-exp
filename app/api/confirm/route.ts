// app/api/confirmations/route.ts
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Інтерфейс для даних
interface ConfirmationData {
  guestName: string;
  invitationType: string;
  comments: string;
}

// Кешування клієнта MongoDB
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGO_URI) {
//   console.error('MONGO_URI is not defined');
//   throw new Error('MONGO_URI is not defined in environment variables');
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!(global as any)._mongoClientPromise) {
//     client = new MongoClient(process.env.MONGO_URI);
//     (global as any)._mongoClientPromise = client.connect();
//   }
//   clientPromise = (global as any)._mongoClientPromise;
// } else {
//   client = new MongoClient(process.env.MONGO_URI);
//   clientPromise = client.connect();
// }

export async function POST(req: Request) {
  try {
    // const client = await clientPromise;
    // const db = client.db('wedding');
    // const data = await req.json() as ConfirmationData;

    // Валідація даних
    // if (!data.guestName || typeof data.guestName !== 'string') {
    //   return NextResponse.json({ error: 'Ім’я гостя обов’язкове' }, { status: 400 });
    // }
    // if (!['guest', 'vip'].includes(data.invitationType)) {
    //   return NextResponse.json({ error: 'Невалідний тип запрошення' }, { status: 400 });
    // }
    // if (data.comments && typeof data.comments !== 'string') {
    //   return NextResponse.json({ error: 'Коментарі повинні бути рядком' }, { status: 400 });
    // }

    // await db.collection('confirmations').insertOne({
    //   guestName: data.guestName,
    //   invitationType: data.invitationType,
    //   comments: data.comments || '',
    //   createdAt: new Date(),
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering in Next.js 15