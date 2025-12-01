import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { encryptAES, decryptAES } from '../utils/cryptoService';
import { Card, CardHeader, CardContent, Label, Input, TextArea, Button } from './SharedComponents';

export default function AesModule() {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('mi_secreto_super_seguro');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    const result = encryptAES(message, key);
    setEncrypted(result);
    setDecrypted(''); // Limpiar descifrado anterior
  };

  const handleDecrypt = () => {
    const result = decryptAES(encrypted, key);
    setDecrypted(result);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader 
          title="Cifrado Simétrico (AES)" 
          description="Herramienta para cifrar y descifrar mensajes utilizando una clave secreta compartida."
          icon={Lock}
        />
        <CardContent className="space-y-4">
          <div>
            <Label>1. Clave Secreta</Label>
            <Input 
              value={key} 
              onChange={(e) => setKey(e.target.value)} 
              placeholder="Ingresa una clave secreta..."
            />
          </div>

          <div>
            <Label>2. Mensaje</Label>
            <TextArea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe el mensaje..."
              className="font-mono"
            />
          </div>

          <Button onClick={handleEncrypt} disabled={!message || !key} className="w-full">
            <Lock size={16} /> Cifrar Mensaje
          </Button>
        </CardContent>
      </Card>

      <Card className={!encrypted ? "opacity-50 pointer-events-none" : ""}>
        <CardContent className="space-y-4 bg-slate-50">
          <div>
            <Label>3. Resultado (Ciphertext)</Label>
            <div className="bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-xs break-all min-h-[60px]">
              {encrypted || "Esperando cifrado..."}
            </div>
          </div>

          <Button onClick={handleDecrypt} variant="secondary" className="w-full">
            <Unlock size={16} /> Descifrar
          </Button>

          {decrypted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
              <strong>Resultado:</strong> {decrypted}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}