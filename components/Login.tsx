import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Lock, ArrowRight, Star } from 'lucide-react';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    // Simple hardcoded PIN for security demonstration
    if (pin === '2024') {
      onLogin(selectedUser);
    } else {
      setError('PIN Incorrecto');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Space Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0f172a] to-[#0f172a]"></div>
      <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      <div className="absolute bottom-40 right-40 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-6 group relative">
             <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_10s_linear_infinite]"></div>
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Universo Financiero</h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Edna & Ronaldo</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {!selectedUser ? (
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-white text-center mb-6">¿Quién eres?</h2>
              <button 
                onClick={() => setSelectedUser('Edna')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-900/50 to-purple-900/50 border border-pink-500/20 hover:border-pink-500/50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg mr-4">E</div>
                  <span className="text-white font-medium text-lg">Edna</span>
                </div>
                <ArrowRight className="w-5 h-5 text-pink-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>

              <button 
                onClick={() => setSelectedUser('Ronaldo')}
                className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border border-blue-500/20 hover:border-blue-500/50 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg mr-4">R</div>
                  <span className="text-white font-medium text-lg">Ronaldo</span>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6 animate-fadeIn">
              <div className="text-center">
                <button 
                   type="button" 
                   onClick={() => { setSelectedUser(null); setError(''); setPin(''); }}
                   className="text-slate-400 text-xs hover:text-white mb-4 flex items-center justify-center"
                >
                  ← Cambiar usuario
                </button>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mx-auto flex items-center justify-center text-2xl font-bold text-white mb-3">
                  {selectedUser[0]}
                </div>
                <h3 className="text-white font-medium">Hola, {selectedUser}</h3>
              </div>

              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    inputMode="numeric"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg leading-5 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                    placeholder="Ingresa tu PIN (2024)"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(''); }}
                    autoFocus
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-400 text-center">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02]"
              >
                Entrar al Sistema
              </button>
            </form>
          )}
        </div>
        <p className="text-center text-slate-600 text-xs mt-6">PIN por defecto: 2024</p>
      </div>
    </div>
  );
};