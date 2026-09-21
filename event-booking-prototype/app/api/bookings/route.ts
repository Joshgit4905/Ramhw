import { NextRequest, NextResponse } from 'next/server';
import { BookingController } from '../../../controllers/BookingController';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = BookingController.createBooking(body);
  
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.data, { status: result.status });
}
