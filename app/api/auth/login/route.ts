import { NextResponse } from 'next/server';

// This would typically be stored in a secure environment variable
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123' // In production, use a strong password
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // In a real app, you would:
      // 1. Generate a secure session token
      // 2. Store it in a secure HTTP-only cookie
      // 3. Set appropriate expiration
      
      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: 'admin-session',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return response;
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
