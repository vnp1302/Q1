import crypto from "crypto";

interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  ivSize: number;
  authTagLength: number;
  aad?: string;
}

const DEFAULT_CONFIG: EncryptionConfig = {
  algorithm: "aes-256-gcm",
  keySize: 32, // 256 bits
  ivSize: 12,  // 96 bits - recommended for GCM
  authTagLength: 16,
  aad: "Q2-Platform-Auth",
};

export class SymmetricEncryption {
  private readonly config: EncryptionConfig;

  constructor(config: Partial<EncryptionConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  generateKey(): Buffer {
    return crypto.randomBytes(this.config.keySize);
  }

  encrypt(data: string, key: Buffer): { ciphertext: string; iv: string; tag: string } {
    if (key.length !== this.config.keySize) {
      throw new Error(`Invalid key length. Expected ${this.config.keySize} bytes`);
    }

    const iv = crypto.randomBytes(this.config.ivSize);
    const cipher = crypto.createCipheriv(this.config.algorithm, key, iv) as crypto.CipherGCM;

    // تنظیم authTagLength به صورت جداگانه
    cipher.setAutoPadding(true);
    
    if (this.config.aad) {
      cipher.setAAD(Buffer.from(this.config.aad), {
        plaintextLength: Buffer.from(data).length,
      });
    }

    let ciphertext = cipher.update(data, "utf8", "hex");
    ciphertext += cipher.final("hex");
    const tag = cipher.getAuthTag();

    return {
      ciphertext,
      iv: iv.toString("hex"),
      tag: tag.toString("hex"),
    };
  }

  decrypt(encryptedData: string, key: Buffer, iv: string, tag: string): string {
    if (key.length !== this.config.keySize) {
      throw new Error(`Invalid key length. Expected ${this.config.keySize} bytes`);
    }

    const decipher = crypto.createDecipheriv(
      this.config.algorithm,
      key,
      Buffer.from(iv, "hex")
    ) as crypto.DecipherGCM;

    decipher.setAuthTag(Buffer.from(tag, "hex"));
    
    if (this.config.aad) {
      decipher.setAAD(Buffer.from(this.config.aad));
    }

    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  encryptJSON(data: object, key: Buffer): string {
    try {
      const jsonData = JSON.stringify(data);
      const { ciphertext, iv, tag } = this.encrypt(jsonData, key);
      return Buffer.from(JSON.stringify({ ciphertext, iv, tag })).toString("base64");
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  decryptJSON<T = any>(encryptedData: string, key: Buffer): T {
    try {
      const decoded = JSON.parse(Buffer.from(encryptedData, "base64").toString());
      if (!decoded.ciphertext || !decoded.iv || !decoded.tag) {
        throw new Error("Invalid encrypted data format");
      }
      const decrypted = this.decrypt(decoded.ciphertext, key, decoded.iv, decoded.tag);
      return JSON.parse(decrypted);
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export const symmetricEncryption = new SymmetricEncryption();
