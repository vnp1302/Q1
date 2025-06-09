export class KeyManagement {
  private static keys: Map<string, Buffer> = new Map()

  static async rotateKeys(): Promise<void> {
    // پیاده‌سازی چرخش کلیدها
    const newKey = crypto.randomBytes(32)
    const keyId = `key_${Date.now()}`

    this.keys.set(keyId, newKey)

    // حذف کلیدهای قدیمی (نگه‌داری 3 کلید آخر)
    if (this.keys.size > 3) {
      const oldestKey = this.keys.keys().next().value
      this.keys.delete(oldestKey)
    }
  }

  static getCurrentKey(): Buffer {
    const keys = Array.from(this.keys.values())
    return keys[keys.length - 1]
  }

  static getKey(keyId: string): Buffer | undefined {
    return this.keys.get(keyId)
  }
}
