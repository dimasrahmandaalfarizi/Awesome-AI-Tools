import { hashIdentifier } from './crypto';

export type SecurityEventType = 
  | 'RATE_LIMIT_EXCEEDED'
  | 'SSRF_BLOCKED'
  | 'PAYLOAD_TOO_LARGE'
  | 'MALICIOUS_PROBE_BLOCKED'
  | 'INVALID_SCHEMA'
  | 'CONFIG_UPDATED'
  | 'CONFIG_ENCRYPTED';

export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: string;
  hashedIp: string;
  path: string;
  timestamp: string;
}

interface SecurityStats {
  totalRequestsFiltered: number;
  threatsBlocked: number;
  rateLimitHits: number;
  ssrfAttemptsBlocked: number;
  invalidPayloadsBlocked: number;
  uptimeSeconds: number;
  lastEvents: SecurityEvent[];
}

const startTime = Date.now();
const eventBuffer: SecurityEvent[] = [];
const MAX_BUFFER = 50;

let statsCounters = {
  totalRequestsFiltered: 0,
  threatsBlocked: 0,
  rateLimitHits: 0,
  ssrfAttemptsBlocked: 0,
  invalidPayloadsBlocked: 0,
};

export function logSecurityEvent(
  type: SecurityEventType,
  severity: 'low' | 'medium' | 'high' | 'critical',
  details: string,
  rawIp: string,
  requestPath: string
): void {
  statsCounters.totalRequestsFiltered++;
  if (severity === 'high' || severity === 'critical') {
    statsCounters.threatsBlocked++;
  }
  if (type === 'RATE_LIMIT_EXCEEDED') statsCounters.rateLimitHits++;
  if (type === 'SSRF_BLOCKED') statsCounters.ssrfAttemptsBlocked++;
  if (type === 'PAYLOAD_TOO_LARGE' || type === 'INVALID_SCHEMA') statsCounters.invalidPayloadsBlocked++;

  const event: SecurityEvent = {
    id: `sec_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type,
    severity,
    details,
    hashedIp: hashIdentifier(rawIp || 'unknown'),
    path: requestPath,
    timestamp: new Date().toISOString()
  };

  eventBuffer.unshift(event);
  if (eventBuffer.length > MAX_BUFFER) {
    eventBuffer.pop();
  }

  // Also log critical alerts to stdout
  if (severity === 'critical' || severity === 'high') {
    console.warn(`[SECURITY ALERT] ${type} (${severity.toUpperCase()}): ${details} [Path: ${requestPath}]`);
  }
}

export function recordRequestFiltered(): void {
  statsCounters.totalRequestsFiltered++;
}

export function getSecurityStats(): SecurityStats {
  return {
    ...statsCounters,
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    lastEvents: [...eventBuffer]
  };
}
