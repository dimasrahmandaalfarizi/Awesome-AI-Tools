import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Awesome AI Tools — Agentic AI Suite',
    short_name: 'Awesome AI',
    description: 'The premier open-source repository of 2,582 AI Skills, 68 Specialist Subagents, and Multi-Agent Workflows.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#09090b',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
