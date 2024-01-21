import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';


export async function POST(req: NextRequest, res: NextResponse) {
    const { title, author, genre, release_date, pages, cover } = await req.json();

    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies });

    // get current user session
    const { data: { session } } = await supabase.auth.getSession();

    try {
        // Insert the book into the database
        const { data, error } = await supabase
            .from('books')
            .insert([{ title, author, genre, release_date, pages, cover }]);

        if (error) {
            throw error;
        }

        return NextResponse.json({ data, error });
    } catch (error) {
        console.error('Error adding book:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
