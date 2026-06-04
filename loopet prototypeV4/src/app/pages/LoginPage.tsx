import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogoMark, DogIllustration, CatIllustration } from '../components/LoopetIllustrations';
import { Building2, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD_STYLE = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'shelter' | 'adopter'>('adopter');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(role === 'shelter' ? '/shelter/dashboard' : '/adopter/explore');
  };

  const isShelter = role === 'shelter';
  const accent      = isShelter ? '#23967F' : '#F6511D';
  const accentLight = isShelter ? '#EAF5F2' : '#FFF0EB';

  const inputBase: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid rgba(9,12,2,0.12)',
    background: '#FBF9F8',
    color: '#090C02',
    fontSize: 16,
    fontFamily: FONT,
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ fontFamily: FONT }}>
      {/* Left brand panel */}
      <div
        className="hidden lg:flex lg:w-[44%] flex-col justify-between p-10 relative overflow-hidden"
        style={{ background: '#135346' }}
      >
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-[0.06]" style={{ background: '#23967F', transform: 'translate(35%,-35%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: '#23967F', transform: 'translate(-35%,35%)' }} />

        <div className="relative z-10 flex items-center gap-3">
          <LogoMark className="w-9 h-9" />
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 22 }}>loopet</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-10 relative z-10">
          <div className="flex gap-4 items-end">
            <DogIllustration className="w-32 h-32" />
            <CatIllustration className="w-24 h-24" />
          </div>
          <div className="text-center">
            <h2 style={{ color: '#ffffff', fontSize: 38, fontWeight: 700, lineHeight: 1.15, marginBottom: 12 }}>
              Find your<br />
              <span style={{ color: '#23967F' }}>forever friend.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, maxWidth: 280, margin: '0 auto', lineHeight: 1.6 }}>
              The all-in-one ecosystem connecting shelters and adopters.
            </p>
          </div>
          <div className="flex gap-8">
            {[['2,400+', 'Animals Rehomed'], ['48', 'Partner Shelters'], ['98%', 'Match Rate']].map(([num, label]) => (
              <div key={label} className="text-center">
                <div style={{ color: '#23967F', fontWeight: 700, fontSize: 24 }}>{num}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: '#FBF9F8' }}>
        <div className="w-full" style={{ maxWidth: 400 }}>
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <LogoMark className="w-8 h-8" />
            <span style={{ fontWeight: 700, fontSize: 20, color: '#135346' }}>loopet</span>
          </div>

          <div style={CARD_STYLE} className="p-8">
            <h4 style={{ color: '#090C02', marginBottom: 4 }}>Welcome back</h4>
            <p style={{ color: '#53584A', fontSize: 15, marginBottom: 24 }}>Sign in to your Loopet account</p>

            {/* Role toggle */}
            <div
              className="flex p-1 mb-6"
              style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 8 }}
            >
              {([['adopter', User, 'Adopter'], ['shelter', Building2, 'Shelter Staff']] as const).map(([r, Icon, lbl]) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 transition-all"
                  style={{
                    borderRadius: 6,
                    background: role === r ? '#ffffff' : 'transparent',
                    color: role === r ? (r === 'adopter' ? '#F6511D' : '#23967F') : '#53584A',
                    fontWeight: role === r ? 500 : 400,
                    fontSize: 14,
                    boxShadow: role === r ? 'rgba(0,0,0,0.06) 0px 2px 6px' : 'none',
                  }}
                >
                  <Icon style={{ width: 14, height: 14 }} />
                  {lbl}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputBase}
                  onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = '#ffffff'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(9,12,2,0.12)'; e.target.style.background = '#FBF9F8'; }}
                />
              </div>

              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>Password</label>
                  <button type="button" style={{ fontSize: 13, color: accent }}>Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ ...inputBase, paddingRight: 40 }}
                    onFocus={e => { e.target.style.borderColor = accent; e.target.style.background = '#ffffff'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(9,12,2,0.12)'; e.target.style.background = '#FBF9F8'; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: '#53584A' }}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 transition-opacity"
                style={{ background: accent, color: '#ffffff', borderRadius: 8, fontWeight: 500, fontSize: 15 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-5 text-center" style={{ fontSize: 14, color: '#53584A' }}>
              Don't have an account?{' '}
              <button
                onClick={() => navigate(isShelter ? '/shelter/signup' : '/adopter/signup')}
                style={{ color: accent, fontWeight: 500 }}
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Demo access */}
          <div className="mt-4">
            <p className="text-center mb-3" style={{ fontSize: 12, color: '#53584A' }}>Quick demo access</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/shelter/dashboard')}
                className="flex-1 py-2 transition-opacity"
                style={{ background: '#EAF5F2', color: '#23967F', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Shelter Portal
              </button>
              <button
                onClick={() => navigate('/adopter/explore')}
                className="flex-1 py-2 transition-opacity"
                style={{ background: '#FFF0EB', color: '#F6511D', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >
                Adopter Portal
              </button>
            </div>
            <p className="mt-3 text-center" style={{ fontSize: 12, color: '#53584A' }}>
              <button onClick={() => navigate('/')} style={{ textDecoration: 'underline' }}>← Back to homepage</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
