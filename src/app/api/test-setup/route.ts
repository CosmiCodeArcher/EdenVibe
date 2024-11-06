// src/app/api/test-setup/route.ts
import { NextResponse } from 'next/server';
import { testSetup } from '@/utils/test-setup';

export async function GET() {
  try {
    await testSetup();
    return NextResponse.json({ message: 'Setup test completed. Check server logs for details.' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Setup test failed', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}