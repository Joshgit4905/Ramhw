import { NextResponse } from 'next/server';
import { BookingController } from '../../../controllers/BookingController';

export async function GET() {
  const result = BookingController.getEvents();
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.data, { status: result.status });
}
