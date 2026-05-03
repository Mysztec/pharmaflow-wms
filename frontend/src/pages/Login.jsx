import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Link adicionado aqui
import { loginUser } from '../api/api';

export default function Login() {
  const navigate = useNavigate();
  
  // Estados para o formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados de controle de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        // O token já é tratado pelo interceptor no api.js
        navigate('/dashboard'); 
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Falha crítica na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f10] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-[#161819] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Detalhe visual de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 blur-[80px] rounded-full" />

        <div className="text-center mb-10 relative">
          <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
            PharmaFlow <span className="text-orange-600">WMS</span>
          </h1>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Logística e Armazenagem
          </p>
        </div>

        {/* Alerta de Erro */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] p-4 rounded-2xl mb-6 text-center font-bold animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Identificação do Usuário
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-orange-600/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="exemplo@pharma.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Senha de Acesso
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-orange-600 transition-colors" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm text-white focus:border-orange-600/50 outline-none transition-all placeholder:text-gray-700"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-orange-900 disabled:cursor-not-allowed text-white font-black uppercase text-[11px] py-4 rounded-2xl shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Autenticando...
              </>
            ) : (
              'Acessar Dashboard'
            )}
          </button>
        </form>

        {/* Link para Cadastro */}
        <div className="mt-8 text-center">
          <Link 
            to="/cadastro" 
            className="text-[10px] font-black text-gray-500 hover:text-orange-600 uppercase tracking-widest transition-colors"
          >
            Não tem uma conta? Cadastre-se
          </Link>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
            © 2026 PharmaFlow Systems — Ugv Engineering Project
          </p>
        </div>
      </div>
    </div>
  );
}