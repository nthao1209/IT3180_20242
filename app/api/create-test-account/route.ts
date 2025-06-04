import { createTestAccount } from '@/actions/actions';
import { NextResponse } from 'next/server';

// Handle GET requests
export async function GET() {
    try {
        const result = await createTestAccount();
        
        if (result.success) {
            return NextResponse.json({ 
                message: 'Test account created successfully',
                user: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            });
        } else {
            return NextResponse.json({ 
                message: 'Failed to create test account',
                error: result.error 
            }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ 
            message: 'Error creating test account',
            error 
        }, { status: 500 });
    }
}

// Handle POST requests
export async function POST() {
    try {
        const result = await createTestAccount();
        
        if (result.success) {
            return NextResponse.json({ 
                message: 'Test account created successfully',
                user: {
                    email: 'test@example.com',
                    password: 'password123'
                }
            });
        } else {
            return NextResponse.json({ 
                message: 'Failed to create test account',
                error: result.error 
            }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ 
            message: 'Error creating test account',
            error 
        }, { status: 500 });
    }
} 