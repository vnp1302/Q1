import crypto from "crypto"
import forge from "node-forge"

export class AsymmetricEncryption {
  /**
   * Generate RSA key pair for secure communication
   */
  generateKeyPair(keySize = 2048): { publicKey: string; privateKey: string } {
    const keyPair = forge.pki.rsa.generateKeyPair(keySize)

    return {
      publicKey: forge.pki.publicKeyToPem(keyPair.publicKey),
      privateKey: forge.pki.privateKeyToPem(keyPair.privateKey),
    }
  }

  /**
   * Encrypt data with public key
   */
  encryptWithPublicKey(data: string, publicKeyPem: string): string {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
    const encrypted = publicKey.encrypt(data, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    })

    return forge.util.encode64(encrypted)
  }

  /**
   * Decrypt data with private key
   */
  decryptWithPrivateKey(encryptedData: string, privateKeyPem: string): string {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)
    const encrypted = forge.util.decode64(encryptedData)

    return privateKey.decrypt(encrypted, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: forge.mgf.mgf1.create(forge.md.sha256.create()),
    })
  }

  /**
   * Sign data with private key
   */
  signData(data: string, privateKeyPem: string): string {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)
    const md = forge.md.sha256.create()
    md.update(data, "utf8")

    const signature = privateKey.sign(md)
    return forge.util.encode64(signature)
  }

  /**
   * Verify signature with public key
   */
  verifySignature(data: string, signature: string, publicKeyPem: string): boolean {
    try {
      const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
      const md = forge.md.sha256.create()
      md.update(data, "utf8")

      const decodedSignature = forge.util.decode64(signature)
      return publicKey.verify(md.digest().bytes(), decodedSignature)
    } catch (error) {
      return false
    }
  }

  /**
   * Generate secure exchange for key agreement
   */
  generateECDHKeyPair(): { publicKey: string; privateKey: string } {
    const ecdh = crypto.createECDH("secp256k1")
    const privateKey = ecdh.generateKeys()
    const publicKey = ecdh.getPublicKey()

    return {
      publicKey: publicKey.toString("hex"),
      privateKey: privateKey.toString("hex"),
    }
  }

  /**
   * Compute shared secret for ECDH
   */
  computeSharedSecret(privateKey: string, publicKey: string): Buffer {
    const ecdh = crypto.createECDH("secp256k1")
    ecdh.setPrivateKey(Buffer.from(privateKey, "hex"))

    return ecdh.computeSecret(Buffer.from(publicKey, "hex"))
  }
}

export const asymmetricEncryption = new AsymmetricEncryption()
