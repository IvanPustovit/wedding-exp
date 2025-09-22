import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGO_URI as string;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    await client.connect();
    const db = client.db('wedding');
    const data = await req.json();
    await db.collection('confirmations').insertOne(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Помилка' }, { status: 500 });
  } finally {
    await client.close();
  }
}