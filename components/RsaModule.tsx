import React, { useState } from 'react';
import { Key, Send, ShieldCheck, ArrowDown } from 'lucide-react';
import { generateRSAKeys, encryptRSA, decryptRSA, RSAKeyPair } from '../utils/cryptoService';
import { Card, CardHeader, CardContent, Label, TextArea, Button } from './SharedComponents';

export default function RsaModule() {
  const [keys, setKeys] = useState<RSAKeyPair | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    // Resetear estados
    setMessage('');
    setEncrypted('');
    setDecrypted('');
    
    try {
      const newKeys = await generateRSAKeys();
      setKeys(newKeys);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEncrypt = () => {
    if (!keys || !message) return;
    // Ciframos con la PÚBLICA
    const result = encryptRSA(message, keys.publicKey);
    if (result) setEncrypted(result);
  };

  const handleDecrypt = () => {
    if (!keys || !encrypted) return;
    // Desciframos con la PRIVADA
    const result = decryptRSA(encrypted, keys.privateKey);
    if (result) setDecrypted(result);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Generación de Llaves */}
      <Card>
        <CardHeader 
          title="Cifrado Asimétrico (RSA)" 
          description="Generador de pares de claves y herramienta de cifrado/descifrado."
          icon={Key}
        />
        <CardContent>
          {!keys ? (
            <div className="text-center py-8">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-500">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">Generar Par de Claves</h3>
              <Button onClick={handleGenerateKeys} disabled={isGenerating}>
                {isGenerating ? 'Generando...' : 'Generar Keys RSA'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Clave Pública</Label>
                  <TextArea readOnly value={keys.publicKey} className="text-[10px] h-24 bg-green-50/50 border-green-200 text-slate-500" />
                </div>
                <div>
                  <Label>Clave Privada</Label>
                  <TextArea readOnly value={keys.privateKey} className="text-[10px] h-24 bg-red-50/50 border-red-200 text-slate-500" />
                </div>
              </div>
              <Button onClick={handleGenerateKeys} variant="outline" size="sm" className="w-full text-xs">
                Regenerar Claves
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Flujo de Mensajería */}
      {keys && (
        <Card>
          <CardContent className="space-y-6">
            <div className="relative border-l-2 border-slate-200 pl-6 ml-2 space-y-6">
              
              {/* Paso 1: Cifrar */}
              <div className="relative">
                <span className="absolute -left-[33px] bg-slate-100 border border-slate-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600">1</span>
                <Label>Mensaje</Label>
                <div className="flex gap-2">
                  <TextArea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Escribe el mensaje..."
                    className="h-20"
                  />
                </div>
                <Button onClick={handleEncrypt} disabled={!message} className="mt-2 w-full" variant="secondary">
                  <Send size={14} /> Cifrar con Clave Pública
                </Button>
              </div>

              {/* Paso 2: Tránsito */}
              {encrypted && (
                <div className="relative animate-in slide-in-from-top-4 duration-500">
                   <span className="absolute -left-[33px] bg-slate-100 border border-slate-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-slate-600">2</span>
                  <Label>Mensaje Cifrado</Label>
                  <div className="bg-slate-900 text-yellow-400 text-[10px] p-3 rounded font-mono break-all line-clamp-4 hover:line-clamp-none cursor-pointer transition-all">
                    {encrypted}
                  </div>
                  <div className="flex justify-center my-2 text-slate-300">
                    <ArrowDown size={20} />
                  </div>
                  <Button onClick={handleDecrypt} className="w-full">
                    <ShieldCheck size={14} /> Descifrar con Clave Privada
                  </Button>
                </div>
              )}

              {/* Paso 3: Descifrado */}
              {decrypted && (
                 <div className="relative animate-in slide-in-from-top-4 duration-500">
                 <span className="absolute -left-[33px] bg-green-100 border border-green-300 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-green-600">3</span>
                  <Label>Resultado Descifrado</Label>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-900 font-medium">
                    {decrypted}
                  </div>
                </div>
              )}

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}