import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

// ==========================================
// 1. Cifrado Simétrico (AES)
// Caso de uso: Gestor de contraseñas, cifrado de archivos locales.
// ==========================================

/**
 * Cifra un texto usando AES.
 * @param message El mensaje a cifrar.
 * @param secretKey La clave secreta compartida.
 * @returns El texto cifrado (ciphertext).
 */
export const encryptAES = (message: string, secretKey: string): string => {
  if (!message || !secretKey) return '';
  // Usamos CryptoJS para cifrar. El resultado es un objeto CipherParams, lo convertimos a string.
  return CryptoJS.AES.encrypt(message, secretKey).toString();
};

/**
 * Descifra un texto cifrado usando AES.
 * @param cipherText El texto cifrado.
 * @param secretKey La clave secreta (debe ser la misma usada para cifrar).
 * @returns El mensaje original o string vacío si falla.
 */
export const decryptAES = (cipherText: string, secretKey: string): string => {
  if (!cipherText || !secretKey) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.error("Error al descifrar AES:", error);
    return '';
  }
};

// ==========================================
// 2. Cifrado Asimétrico (RSA)
// Caso de uso: Intercambio seguro de mensajes, firma digital.
// ==========================================

export interface RSAKeyPair {
  publicKey: string;
  privateKey: string;
}

/**
 * Genera un par de claves RSA (Pública y Privada).
 * Nota: Esta operación puede ser lenta en navegadores antiguos.
 */
export const generateRSAKeys = (): Promise<RSAKeyPair> => {
  return new Promise((resolve) => {
    // Usamos setTimeout para no bloquear el hilo principal de la UI
    setTimeout(() => {
      const crypt = new JSEncrypt({ default_key_size: '1024' }); // 1024 bits para demo (rápido). Usar 2048+ en prod.
      crypt.getKey(() => {
        resolve({
          publicKey: crypt.getPublicKey(),
          privateKey: crypt.getPrivateKey(),
        });
      });
    }, 100);
  });
};

/**
 * Cifra un mensaje usando una Clave Pública.
 */
export const encryptRSA = (message: string, publicKey: string): string | false => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(message);
};

/**
 * Descifra un mensaje usando una Clave Privada.
 */
export const decryptRSA = (cipherText: string, privateKey: string): string | false => {
  const decryptor = new JSEncrypt();
  decryptor.setPrivateKey(privateKey);
  return decryptor.decrypt(cipherText);
};

// ==========================================
// 3. Hashing (SHA-256)
// Caso de uso: Verificar integridad, guardar passwords (con salt).
// ==========================================

/**
 * Genera un hash SHA-256 de un texto.
 * Es irreversible (One-way).
 */
export const generateSHA256 = (message: string): string => {
  return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
};
