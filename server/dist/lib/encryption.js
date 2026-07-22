import crypto from 'crypto';
const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.ENCRYPTION_SECRET || '32-char-aes-256-encryption-key-for-social-keys!!';
// Ensure key is exactly 32 bytes
const KEY_BUFFER = crypto.scryptSync(SECRET_KEY, 'salt-social-automation-2026', 32);
export function encryptText(text) {
    if (!text)
        return '';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY_BUFFER, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}
export function decryptText(encryptedString) {
    if (!encryptedString)
        return '';
    try {
        const parts = encryptedString.split(':');
        if (parts.length !== 3)
            return encryptedString; // Fallback for raw text
        const [ivHex, authTagHex, encryptedHex] = parts;
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, KEY_BUFFER, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    catch (error) {
        console.error('Failed to decrypt text:', error);
        return '';
    }
}
