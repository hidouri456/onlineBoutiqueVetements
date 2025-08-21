import { NextResponse } from 'next/server'

export async function POST() {
  // Clear cookie/session - this is a minimal placeholder.
  const res = NextResponse.json({ ok: true })
  // Remove cookie by setting expired Set-Cookie header (adjust name if you use a specific cookie)
  res.headers.set('Set-Cookie', `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)
  return res
}
