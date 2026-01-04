import { NextRequest, NextResponse } from 'next/server';

// GET handler
export async function GET(request: NextRequest) {
  // Simulate a small delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    message: 'Data fetched successfully',
    timestamp,
    data: {
      text: 'This is fetched data from GET request',
      randomValue: Math.random(),
    },
  });
}

// POST handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a valid text field' },
        { status: 400 }
      );
    }
    
    // Simulate a small delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = new Date().toISOString();
    
    return NextResponse.json({
      message: 'Data submitted successfully',
      timestamp,
      data: {
        text: text.trim(),
        submittedAt: timestamp,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON in request body' },
      { status: 400 }
    );
  }
}

