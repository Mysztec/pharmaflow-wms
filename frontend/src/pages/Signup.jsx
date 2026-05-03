import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../api/api';

export default function Signup() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signupUser(nome, email, password);
    if (result.success) {
      navigate('/'); // Volta para o login após cadastrar
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0f10] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#161819] border border-white/5 rounded-3xl p-8 shadow-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-bold uppercase mb-6 transition-colors">
          <ArrowLeft size={14} /> Voltar
        </Link>
        <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-8">Novo Acesso</h1>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl mb-6 font-bold">{error}</div>}
        <form onSubmit={handleSignup} className="space-y-4">
          <InputGroup label="Nome" icon={User} placeholder="Seu nome" value={nome} onChange={setNome} />
          <InputGroup label="E-mail" icon={Mail} type="email" placeholder="marlon@pharma.com" value={email} onChange={setEmail} />
          <InputGroup label="Senha" icon={Lock} type="password" placeholder="••••••••" value={password} onChange={setPassword} />
          <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase text-xs py-4 rounded-2xl mt-4 flex items-center justify-center gap-2">
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Finalizar Cadastro'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputGroup({ label, icon: Icon, type = "text", placeholder, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
        <input type={type} required value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-orange-600/50 outline-none" placeholder={placeholder} />
      </div>
    </div>
  );
}