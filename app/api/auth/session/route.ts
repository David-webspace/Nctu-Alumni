import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This would typically be stored in a secure environment variable
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123' // In production, use a strong password
};

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin-session')?.value;
    
    if (!session) {
      return NextResponse.json({ isAdmin: false });
    }

    // In a real app, you would validate the session token here
    // For simplicity, we'll just check if the session exists
    return NextResponse.json({ 
      isAdmin: true,
      username: ADMIN_CREDENTIALS.username 
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { isAdmin: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
