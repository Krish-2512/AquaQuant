import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  const { source_code, language_id, stdin } = await req.json();

  const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions',
    params: { base64_encoded: 'false', wait: 'true', fields: '*' },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
      'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
    },
    data: {
      source_code,
      language_id, // 63 for JS, 71 for Python, etc.
      stdin
    }
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}