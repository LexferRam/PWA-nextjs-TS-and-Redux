import type { NextFetchEvent, NextRequest } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return console.log('Hello, world desde el middleware!')
  // return new Response('Hello, world!')
}