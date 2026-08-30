import crypto from 'crypto';

// Master key derived from environment or machine identifier
const MASTER_SECRET = process.env.ENCRYPTION_MASTER_KEY || 'awesome-ai-tools-default-secure-vault-key-2026';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;
const SALT_LENGTH = 32;
const KEY_LENGTH = 32;

// Derive a strong 256-bit key using PBKDF2
function deriveKey(salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(MASTER_SECRET, salt, 100000, KEY_LENGTH, 'sha256');
}

/**
 * Encrypt sensitive string (e.g. API key) with AES-256-GCM
 * Output format: enc:v1:<salt_hex>:<iv_hex>:<auth_tag_hex>:<ciphertext_hex>
 */
export function encryptSecret(plainText: string): string {
  if (!plainText || plainText.trim() === '') return '';
  if (plainText.startsWith('enc:v1:')) return plainText; // Already encrypted

  try {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const key = deriveKey(salt);
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `enc:v1:${salt.toString('hex')}:${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch (error) {
    console.error('Encryption failed:', error);
    return plainText; // Fallback
  }
}

/**
 * Decrypt sensitive string with AES-256-GCM verification
 */
export function decryptSecret(cipherString: string): string {
  if (!cipherString || typeof cipherString !== 'string') return '';
  if (!cipherString.startsWith('enc:v1:')) return cipherString; // Raw unencrypted key

  try {
    const parts = cipherString.split(':');
    if (parts.length !== 6) return cipherString;

    const [, , saltHex, ivHex, authTagHex, encryptedHex] = parts;
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const key = deriveKey(salt);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    console.error('Decryption failed or data tampered:', error);
    return '';
  }
}

/**
 * Anonymize sensitive identifier (e.g. IP address or email) with salted SHA-256 for GDPR compliance
 */
export function hashIdentifier(input: string): string {
  return crypto.createHmac('sha256', MASTER_SECRET).update(input).digest('hex').substring(0, 16);
}
