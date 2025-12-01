import React, { useState } from 'react';
import { Shield, Lock, Key, Hash, Info } from 'lucide-react';
import AesModule from './components/AesModule';
import RsaModule from './components/RsaModule';
import HashModule from './components/HashModule';

// Tipos para la navegación
type Tab = 'intro' | 'aes' | 'rsa' | 'hash';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('intro');

  const renderContent = () => {
    switch (activeTab) {
      case 'aes': return <AesModule />;
      case 'rsa': return <RsaModule />;
      case 'hash': return <HashModule />;
      default: return <IntroView onChangeTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('intro')}>
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Aplicación</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Seguridad</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <NavButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon={Info}>Inicio</NavButton>
            <NavButton active={activeTab === 'aes'} onClick={() => setActiveTab('aes')} icon={Lock}>AES</NavButton>
            <NavButton active={activeTab === 'rsa'} onClick={() => setActiveTab('rsa')} icon={Key}>RSA</NavButton>
            <NavButton active={activeTab === 'hash'} onClick={() => setActiveTab('hash')} icon={Hash}>SHA-256</NavButton>
          </nav>
        </div>
      </header>

      {/* Mobile Nav (Simple) */}
      <div className="md:hidden bg-white border-b border-slate-200 p-2 flex justify-around overflow-x-auto">
         <NavButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon={Info} size="sm">Inicio</NavButton>
         <NavButton active={activeTab === 'aes'} onClick={() => setActiveTab('aes')} icon={Lock} size="sm">AES</NavButton>
         <NavButton active={activeTab === 'rsa'} onClick={() => setActiveTab('rsa')} icon={Key} size="sm">RSA</NavButton>
         <NavButton active={activeTab === 'hash'} onClick={() => setActiveTab('hash')} icon={Hash} size="sm">Hash</NavButton>
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>@Jiménez Enríquez José Miguel</p>
        </div>
      </footer>
    </div>
  );
}

// Componente de Botón de Navegación
const NavButton = ({ 
  children, 
  active, 
  onClick, 
  icon: Icon,
  size = 'md'
}: { 
  children?: React.ReactNode; 
  active: boolean; 
  onClick: () => void; 
  icon: React.ElementType;
  size?: 'sm' | 'md'
}) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 rounded-md transition-all font-medium
      ${size === 'sm' ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'}
      ${active 
        ? 'bg-white text-blue-600 shadow-sm' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
      }
    `}
  >
    <Icon size={size === 'sm' ? 14 : 16} />
    {children}
  </button>
);

// Vista de Introducción
const IntroView = ({ onChangeTab }: { onChangeTab: (t: Tab) => void }) => (
  <div className="max-w-4xl mx-auto space-y-12">
    <div className="text-center space-y-4 py-10">
      <h2 className="text-4xl font-extrabold text-slate-900">Herramientas de Criptografía</h2>
      <p className="text-xl text-slate-600 max-w-2xl mx-auto">
        Selecciona una herramienta para comenzar.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <FeatureCard 
        title="AES (Simétrico)" 
        description="Cifrado y descifrado con clave secreta."
        icon={Lock}
        onClick={() => onChangeTab('aes')}
        color="bg-blue-500"
      />
      <FeatureCard 
        title="RSA (Asimétrico)" 
        description="Generación de claves y cifrado asimétrico."
        icon={Key}
        onClick={() => onChangeTab('rsa')}
        color="bg-purple-500"
      />
      <FeatureCard 
        title="SHA-256 (Hashing)" 
        description="Generador de hash seguro."
        icon={Hash}
        onClick={() => onChangeTab('hash')}
        color="bg-emerald-500"
      />
    </div>
  </div>
);

const FeatureCard = ({ title, description, icon: Icon, onClick, color }: any) => (
  <div 
    onClick={onClick}
    className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
  >
    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
      Abrir <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </div>
  </div>
);

export default App;