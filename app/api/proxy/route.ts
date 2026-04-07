import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 })
    }

    const baseUrl = 'https://nt-spidyuniverse.onrender.com/api'
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    const targetUrl = `${baseUrl}/${cleanPath}`

    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Upstream error: ${response.status}`,
        path: cleanPath
      }, { status: response.status })
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow'
      }
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal proxy error' }, { status: 500 })
  }
}
