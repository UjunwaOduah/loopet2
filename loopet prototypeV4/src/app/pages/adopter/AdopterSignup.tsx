import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogoMark } from '../../components/LoopetIllustrations';
import { ArrowRight, User, Camera, Check, MapPin, Home, Heart, Briefcase } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 13px',
  borderRadius: 8,
  border: '1px solid #E2DDD9',
  background: '#FBF9F8',
  color: '#090C02',
  fontSize: 14,
  fontFamily: FONT,
  outline: 'none',
  transition: 'border-color 0.15s',
};

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #E2DDD9',
  borderRadius: 16,
};

const STEPS = ['Basic Info', 'Home Setup', 'Experience'];

const LIVING_OPTIONS = [
  { id: 'apartment', label: 'Apartment', icon: Home, sub: 'No private outdoor space' },
  { id: 'house_yard', label: 'House + Garden', icon: Home, sub: 'Private garden / yard' },
  { id: 'house_no_yard', label: 'House, no garden', icon: Home, sub: 'Access to parks nearby' },
  { id: 'condo', label: 'Condo / Townhouse', icon: Home, sub: 'Shared outdoor areas' },
];

const EXPERIENCE_TAGS = ['Dogs', 'Cats', 'Rabbits', 'Birds', 'Farm animals', 'First-time owner'];

export default function AdopterSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [livingSetup, setLivingSetup] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [hasChildren, setHasChildren] = useState<boolean | null>(null);
  const [petExperience, setPetExperience] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [agreed, setAgreed] = useState(false);

  const toggleExperience = (exp: string) =>
    setPetExperience(prev => prev.includes(exp) ? prev.filter(e => e !== exp) : [...prev, exp]);

  const profileComplete = Math.round(
    ([firstName, lastName, email, city, phone].filter(Boolean).length / 5) * 100
  );

  const advance = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1);
    else navigate('/explore');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: FONT, background: '#FBF9F8' }}>

      {/* Top nav strip */}
      <div className="flex items-center justify-between px-6 py-4" style={{ background: '#ffffff', borderBottom: '1px solid #E2DDD9' }}>
        <div className="flex items-center gap-2.5">
          <LogoMark className="w-7 h-7" />
          <span style={{ fontWeight: 700, fontSize: 17, color: '#090C02' }}>loopet</span>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 24, height: 24, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                  background: i < step ? '#23967F' : i === step ? '#F6511D' : '#E2DDD9',
                  color: i <= step ? '#ffffff' : '#53584A',
                }}
              >
                {i < step ? <Check style={{ width: 12, height: 12 }} /> : i + 1}
              </div>
              <span className="hidden sm:inline" style={{ fontSize: 12, fontWeight: i === step ? 600 : 400, color: i === step ? '#090C02' : '#53584A' }}>
                {s}
              </span>
              {i < STEPS.length - 1 && <div style={{ width: 24, height: 1, background: i < step ? '#23967F' : '#E2DDD9' }} />}
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/login')} style={{ fontSize: 13, color: '#53584A' }}>
          Already have an account?
        </button>
      </div>

      {/* Main: form + live profile */}
      <div className="flex-1 flex flex-col lg:flex-row gap-0 max-w-screen-lg mx-auto w-full p-5 lg:p-8 gap-5 lg:gap-6">

        {/* ── Form wizard ── */}
        <div className="flex-1" style={{ minWidth: 0 }}>
          <div style={CARD} className="p-7">

            {/* Step 0: Basic Info */}
            {step === 0 && (
              <div>
                <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 4 }}>Create your profile</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 24 }}>Start with your basic details — you can edit everything from your profile at any time.</p>

                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 flex items-center justify-center" style={{ borderRadius: '50%', background: '#FFF0EB' }}>
                      <User className="w-8 h-8" style={{ color: '#F6511D' }} />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center text-white" style={{ background: '#F6511D', borderRadius: '50%' }}>
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>First Name</label>
                      <input
                        value={firstName} onChange={e => setFirstName(e.target.value)}
                        placeholder="Alex" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                        onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Last Name</label>
                      <input
                        value={lastName} onChange={e => setLastName(e.target.value)}
                        placeholder="Rivera" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                        onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Email Address</label>
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="alex@example.com" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Password</label>
                    <input type="password" placeholder="Min. 8 characters" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>City / Location</label>
                    <input
                      value={city} onChange={e => setCity(e.target.value)}
                      placeholder="e.g. Antwerpen" style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Phone Number</label>
                    <input
                      type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                      placeholder="+32 (0)4 … " style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Home Setup */}
            {step === 1 && (
              <div>
                <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 4 }}>Your home setup</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 24 }}>This helps us match you with animals that suit your living environment.</p>

                <div className="space-y-5">
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 10 }}>Living situation</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {LIVING_OPTIONS.map(opt => {
                        const Icon = opt.icon;
                        const active = livingSetup === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setLivingSetup(opt.id)}
                            className="flex items-start gap-3 p-3 text-left transition-all"
                            style={{
                              borderRadius: 10,
                              border: `1.5px solid ${active ? '#F6511D' : '#E2DDD9'}`,
                              background: active ? '#FFF0EB' : '#ffffff',
                            }}
                          >
                            <div
                              className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                              style={{ borderRadius: 8, background: active ? '#F6511D' : '#FBF9F8' }}
                            >
                              <Icon style={{ width: 16, height: 16, color: active ? '#fff' : '#53584A' }} />
                            </div>
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: active ? '#F6511D' : '#090C02' }}>{opt.label}</p>
                              <p style={{ fontSize: 11, color: '#53584A' }}>{opt.sub}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 8 }}>Work schedule</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Home full-time', 'Part-time remote', 'Office-based', 'Flexible hours'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setWorkHours(opt)}
                          style={{
                            padding: '9px 12px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                            background: workHours === opt ? '#FFF0EB' : '#FBF9F8',
                            border: `1.5px solid ${workHours === opt ? '#F6511D' : '#E2DDD9'}`,
                            color: workHours === opt ? '#F6511D' : '#53584A',
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 8 }}>Children in household</label>
                    <div className="flex gap-3">
                      {[['yes', 'Yes'], ['no', 'No']].map(([val, lbl]) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setHasChildren(val === 'yes')}
                          style={{
                            flex: 1, padding: '9px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                            background: hasChildren === (val === 'yes') ? '#FFF0EB' : '#FBF9F8',
                            border: `1.5px solid ${hasChildren === (val === 'yes') ? '#F6511D' : '#E2DDD9'}`,
                            color: hasChildren === (val === 'yes') ? '#F6511D' : '#53584A',
                          }}
                        >
                          {lbl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Experience */}
            {step === 2 && (
              <div>
                <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 4 }}>Your pet experience</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 24 }}>Help our matching engine find your ideal companion.</p>

                <div className="space-y-5">
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 10 }}>Previous experience with</label>
                    <div className="flex flex-wrap gap-2">
                      {EXPERIENCE_TAGS.map(exp => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => toggleExperience(exp)}
                          className="rounded-full px-4 py-1.5 transition-all"
                          style={{
                            background: petExperience.includes(exp) ? '#F6511D' : '#FBF9F8',
                            color: petExperience.includes(exp) ? '#ffffff' : '#090C02',
                            fontSize: 13, fontWeight: 500,
                            border: `1.5px solid ${petExperience.includes(exp) ? '#F6511D' : '#E2DDD9'}`,
                          }}
                        >
                          {exp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>About you</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="e.g. I'm an active person who loves long walks. Looking for an energetic companion..."
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#fff'; }}
                      onBlur={e => { e.target.style.borderColor = '#E2DDD9'; e.target.style.background = '#FBF9F8'; }}
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={e => setAgreed(e.target.checked)}
                      style={{ accentColor: '#F6511D', marginTop: 2 }}
                    />
                    <p style={{ fontSize: 12, color: '#53584A', lineHeight: 1.5 }}>
                      I agree to Loopet's{' '}
                      <span style={{ fontWeight: 600, color: '#F6511D' }}>Terms of Service</span> and{' '}
                      <span style={{ fontWeight: 600, color: '#F6511D' }}>Privacy Policy</span>
                    </p>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(s => s - 1)}
                  style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid #E2DDD9', color: '#53584A', fontSize: 14, fontWeight: 500, background: '#FBF9F8' }}
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                onClick={advance}
                disabled={step === 2 && !agreed}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-white transition-opacity"
                style={{
                  background: '#F6511D', borderRadius: 8, fontWeight: 700, fontSize: 14,
                  opacity: step === 2 && !agreed ? 0.4 : 1,
                  cursor: step === 2 && !agreed ? 'not-allowed' : 'pointer',
                }}
              >
                {step < STEPS.length - 1 ? <>Continue <ArrowRight className="w-4 h-4" /></> : <>Create My Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </div>
        </div>

        {/* ── Live Profile Preview — always visible, always editable ── */}
        <div className="lg:w-72 flex-shrink-0">
          <div style={{ position: 'sticky', top: 80 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
              Your Profile Preview
            </p>
            <div style={CARD} className="overflow-hidden">
              {/* Header */}
              <div style={{ background: '#135346', padding: '20px 16px 24px' }}>
                <div className="flex items-end gap-3">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0" style={{ borderRadius: '50%', background: '#FFF0EB', border: '3px solid rgba(255,255,255,0.3)' }}>
                    <User className="w-7 h-7" style={{ color: '#F6511D' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontWeight: 700, fontSize: 16, color: '#ffffff' }}>
                      {firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Your Name'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPin style={{ width: 11, height: 11, color: '#23967F' }} />
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{city || 'Your city'}</p>
                    </div>
                  </div>
                </div>

                {/* Profile completeness */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Profile completion</p>
                    <p style={{ fontSize: 11, fontWeight: 700, color: '#23967F' }}>{profileComplete}%</p>
                  </div>
                  <div style={{ height: 4, borderRadius: 100, background: 'rgba(255,255,255,0.15)' }}>
                    <div style={{ width: `${profileComplete}%`, height: '100%', borderRadius: 100, background: '#23967F', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6, background: '#FBF9F8', border: '1px solid #E2DDD9' }}>
                    <Home style={{ width: 14, height: 14, color: '#53584A' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: '#53584A', fontWeight: 500 }}>Living situation</p>
                    <p style={{ fontSize: 13, color: '#090C02', fontWeight: 500 }}>
                      {LIVING_OPTIONS.find(o => o.id === livingSetup)?.label || <span style={{ color: '#E2DDD9' }}>Not set yet</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6, background: '#FBF9F8', border: '1px solid #E2DDD9' }}>
                    <Briefcase style={{ width: 14, height: 14, color: '#53584A' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: '#53584A', fontWeight: 500 }}>Work schedule</p>
                    <p style={{ fontSize: 13, color: '#090C02', fontWeight: 500 }}>
                      {workHours || <span style={{ color: '#E2DDD9' }}>Not set yet</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 6, background: '#FBF9F8', border: '1px solid #E2DDD9' }}>
                    <Heart style={{ width: 14, height: 14, color: '#53584A' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, color: '#53584A', fontWeight: 500 }}>Pet experience</p>
                    <p style={{ fontSize: 13, color: '#090C02', fontWeight: 500 }}>
                      {petExperience.length > 0 ? petExperience.join(', ') : <span style={{ color: '#E2DDD9' }}>Not set yet</span>}
                    </p>
                  </div>
                </div>

                {bio && (
                  <div className="p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
                    <p style={{ fontSize: 12, color: '#53584A', lineHeight: 1.5 }}>"{bio}"</p>
                  </div>
                )}

                {/* Tip */}
                <div className="p-3" style={{ background: '#FFF0EB', border: '1px solid rgba(246,81,29,0.15)', borderRadius: 8 }}>
                  <p style={{ fontSize: 11, color: '#F6511D', fontWeight: 600, marginBottom: 2 }}>Always editable</p>
                  <p style={{ fontSize: 11, color: '#53584A', lineHeight: 1.4 }}>
                    All of this information can be updated anytime from your profile page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
