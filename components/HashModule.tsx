import React, { useState, useEffect } from 'react';
import { Fingerprint, ArrowDown } from 'lucide-react';
import { generateSHA256 } from '../utils/cryptoService';
import { Card, CardHeader, CardContent, Label, TextArea } from './SharedComponents';

export default function HashModule() {
  const [input, setInput] = useState('Texto de ejemplo');
  const [hash, setHash] = useState('');
  
  useEffect(() => {
    setHash(generateSHA256(input));
  }, [input]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader 
          title="Hashing (SHA-256)" 
          description="Generador de hash SHA-256."
          icon={Fingerprint}
        />
        <CardContent className="space-y-6">
          <div>
            <Label>Entrada de Texto</Label>
            <TextArea 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Escribe algo..."
              className="h-24"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-10">
              <ArrowDown size={24} />
            </div>
            <Label>Hash SHA-256 Output</Label>
            <div className="font-mono text-xs bg-slate-900 text-blue-400 p-4 rounded-lg break-all border-l-4 border-blue-500 shadow-inner">
              {hash}
            </div>
            <div className="flex justify-end mt-2 text-xs text-slate-400">
              Longitud: {hash.length} caracteres
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}