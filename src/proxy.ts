import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

// Known adversarial vulnerability scanner user-agents
const MALICIOUS_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /masscan/i,
  /wpscan/i,
  /dirbuster/i,
  /acunetix/i,
  /nmap/i,
  /openvas/i,
  /nessus/i,
  /gobuster/i,
  /zgrab/i,
  /havij/i,
  /netsparker/i
];

// Dangerous path traversal and LFI strings
const DANGEROUS_PATH_PATTERNS = [
  /\.\./,
  /%2e%2e/i,
  /etc\/passwd/i,
  /windows\\win\.ini/i,
  /\.env/i,
  /\.git/i,
  /wp-admin/i,
  /phpmyadmin/i
];

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get('user-agent') || '';

  // 1. Edge Firewall: Block Malicious User-Agents
  for (const uaPattern of MALICIOUS_UA_PATTERNS) {
    if (uaPattern.test(userAgent)) {
      return new NextResponse(
        JSON.stringify({ error: 'Access Denied: Malicious agent fingerprint detected by AgentShield Edge Firewall.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 2. Edge Firewall: Block Path Traversal & Sensitive Probes
  for (const pathPattern of DANGEROUS_PATH_PATTERNS) {
    if (pathPattern.test(pathname)) {
      return new NextResponse(
        JSON.stringify({ error: 'Access Denied: Dangerous path signature blocked by AgentShield Edge Firewall.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  // 3. Skip i18n for /api routes, static files, and icons
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    const response = NextResponse.next();
    
    // Add Security Headers to API response
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    return response;
  }

  // 4. Delegate to next-intl for localized page routing
  return intlMiddleware(req);
}

export const config = {
  // Match all request paths except internal nextjs chunks and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
};
