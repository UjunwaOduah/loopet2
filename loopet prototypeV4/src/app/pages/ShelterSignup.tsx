import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogoMark } from '../components/LoopetIllustrations';
import { CheckCircle2, ArrowRight, ArrowLeft, Building2, CreditCard, Shield, Star } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const TIERS = [
  { id: 'starter',    name: 'Pebble',  price: '$49/mo',  animals: '25 animals',  features: ['Basic intake & outtake', 'Public animal profiles', 'Email support'], color: '#FBF9F8', textColor: '#090C02', border: 'rgba(9,12,2,0.12)' },
  { id: 'pro',        name: 'Stone',   price: '$99/mo',  animals: '100 animals', features: ['Digital ID system', 'Batch onboarding', 'Adopter matching', 'NFC tag integration'], color: '#23967F', textColor: 'white', recommended: true, border: '#23967F' },
  { id: 'enterprise', name: 'Boulder', price: '$199/mo', animals: 'Unlimited',    features: ['Everything in Stone', 'Multi-location support', 'API access', 'Dedicated support'], color: '#090C02', textColor: 'white', border: '#090C02' },
];

const STEPS = ['Shelter Details', 'Verification', 'Choose Plan', 'Admin Account'];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid rgba(9,12,2,0.1)',
  background: '#FBF9F8',
  color: '#090C02',
  fontSize: 14,
  fontFamily: FONT,
  outline: 'none',
};

export default function ShelterSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedTier, setSelectedTier] = useState('pro');
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); setVerified(true); }, 2000);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else navigate('/shelter/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: FONT, background: '#FBF9F8' }}>
      {/* Sidebar */}
      <div className="hidden lg:flex w-72 flex-col p-8 gap-8" style={{ background: '#135346' }}>
        <div className="flex items-center gap-3">
          <LogoMark className="w-9 h-9" />
          <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 22 }}>loopet</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-5">
          <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'In Care',  val: '142', light: '#EAF5F2', color: '#23967F' },
                { label: 'Adopted', val: '18',  light: '#FFF0EB', color: '#F6511D' },
              ].map(s => (
                <div key={s.label} className="p-3 text-center rounded-lg" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <p style={{ fontWeight: 700, fontSize: 20, color: '#ffffff' }}>{s.val}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ color: '#ffffff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Shelter Registration</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.65 }}>Join 48+ shelters already using Loopet to transform animal care.</p>
          </div>
        </div>
        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className="w-7 h-7 flex items-center justify-center flex-shrink-0 transition-all"
                style={{ borderRadius: '50%', background: i <= step ? '#ffffff' : 'rgba(255,255,255,0.15)', color: i <= step ? '#135346' : 'white', fontSize: 12, fontWeight: 700 }}
              >
                {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: i === step ? '#ffffff' : 'rgba(255,255,255,0.45)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Mobile header */}
          <div className="flex items-center gap-3 mb-6 lg:hidden">
            <LogoMark className="w-8 h-8" />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#23967F' }}>Shelter Sign Up</span>
          </div>

          {/* Progress bar (mobile) */}
          <div className="lg:hidden mb-6">
            <div className="flex justify-between mb-1.5" style={{ fontSize: 12, color: '#53584A' }}>
              <span>Step {step + 1} of {STEPS.length}</span>
              <span>{STEPS[step]}</span>
            </div>
            <div className="h-2" style={{ background: 'rgba(9,12,2,0.08)', borderRadius: 100, overflow: 'hidden' }}>
              <div className="h-2 transition-all" style={{ background: '#23967F', borderRadius: 100, width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 12, boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px', padding: 32 }}>
            {step === 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#23967F' }}>
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Shelter Details</p>
                    <p style={{ fontSize: 13, color: '#53584A' }}>Tell us about your organisation</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Shelter Name', placeholder: 'Happy Paws Animal Rescue', full: true },
                    { label: 'Registration Number', placeholder: 'e.g. 2024-SHELTER-001' },
                    { label: 'Phone Number', placeholder: '+1 (555) 000-0000' },
                    { label: 'Website (optional)', placeholder: 'https://yoursite.com' },
                    { label: 'Street Address', placeholder: '123 Main Street', full: true },
                    { label: 'City', placeholder: 'San Francisco' },
                    { label: 'State / Province', placeholder: 'CA' },
                    { label: 'ZIP / Postal Code', placeholder: '94102' },
                  ].map(f => (
                    <div key={f.label} className={f.full ? 'md:col-span-2' : ''}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>{f.label}</label>
                      <input placeholder={f.placeholder} style={inputStyle} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#EAF5F2' }}>
                    <Shield className="w-5 h-5" style={{ color: '#23967F' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Verification</p>
                    <p style={{ fontSize: 13, color: '#53584A' }}>Chamber of Commerce verification</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Chamber of Commerce ID', placeholder: 'CoC-2024-XXXXX' },
                    { label: 'EIN / Tax ID Number', placeholder: '12-3456789' },
                    { label: 'Charity Registration Number', placeholder: 'CR-000000' },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>{f.label}</label>
                      <input placeholder={f.placeholder} style={inputStyle} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Upload Verification Document</label>
                    <div className="p-6 text-center" style={{ border: '2px dashed #23967F', borderRadius: 8 }}>
                      <p style={{ fontSize: 13, color: '#53584A' }}>Drop your PDF or image here, or <span style={{ fontWeight: 500, color: '#23967F' }}>browse</span></p>
                      <p style={{ fontSize: 11, color: '#53584A', marginTop: 4 }}>Accepted: PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  </div>
                  {!verified && (
                    <button onClick={handleVerify} disabled={verifying} className="w-full py-3 text-white flex items-center justify-center gap-2" style={{ background: '#23967F', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                      {verifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Verifying with CoC database...
                        </>
                      ) : (
                        <>Verify Organisation <Shield className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                  {verified && (
                    <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#EAF5F2', borderLeft: '4px solid #23967F', borderRadius: 8 }}>
                      <CheckCircle2 className="w-5 h-5" style={{ color: '#23967F' }} />
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#23967F' }}>Verification Successful!</p>
                        <p style={{ fontSize: 12, color: '#53584A' }}>Your organisation has been verified as a legitimate shelter.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#FFF0EB' }}>
                    <Star className="w-5 h-5" style={{ color: '#F6511D' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Choose Your Plan</p>
                    <p style={{ fontSize: 13, color: '#53584A' }}>Start free for 30 days</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TIERS.map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTier(tier.id)}
                      className="text-left p-5 relative transition-all"
                      style={{ borderRadius: 12, background: selectedTier === tier.id ? tier.color : '#FBF9F8', border: `2px solid ${selectedTier === tier.id ? tier.border : 'rgba(9,12,2,0.1)'}` }}
                    >
                      {tier.recommended && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5" style={{ background: '#23967F', color: '#ffffff', fontSize: 11, fontWeight: 700 }}>Recommended</span>
                      )}
                      <p style={{ fontWeight: 700, fontSize: 16, color: selectedTier === tier.id ? tier.textColor : '#090C02', marginBottom: 4 }}>{tier.name}</p>
                      <p style={{ fontWeight: 700, fontSize: 22, color: selectedTier === tier.id ? tier.textColor : '#090C02', marginBottom: 2 }}>{tier.price}</p>
                      <p style={{ fontSize: 12, color: selectedTier === tier.id ? tier.textColor : '#53584A', opacity: 0.75, marginBottom: 12 }}>Up to {tier.animals}</p>
                      <ul className="space-y-1.5">
                        {tier.features.map(f => (
                          <li key={f} className="flex items-center gap-2" style={{ fontSize: 12, color: selectedTier === tier.id ? tier.textColor : '#53584A' }}>
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selectedTier === tier.id ? tier.textColor : '#23967F' }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#090C02' }}>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Create Admin Account</p>
                    <p style={{ fontSize: 13, color: '#53584A' }}>You'll be the primary admin</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>First Name</label>
                      <input placeholder="Jane" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Last Name</label>
                      <input placeholder="Smith" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Work Email</label>
                    <input type="email" placeholder="jane@happypaws.org" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Password</label>
                    <input type="password" placeholder="••••••••" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Confirm Password</label>
                    <input type="password" placeholder="••••••••" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Job Role</label>
                    <select style={{ ...inputStyle }}>
                      <option>Shelter Manager</option>
                      <option>Vet Staff</option>
                      <option>Volunteer Coordinator</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div className="flex items-start gap-3">
                    <input type="checkbox" className="mt-0.5" />
                    <p style={{ fontSize: 12, color: '#53584A' }}>I agree to Loopet's <span style={{ fontWeight: 500, color: '#23967F' }}>Terms of Service</span> and <span style={{ fontWeight: 500, color: '#23967F' }}>Privacy Policy</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}>
                  <ArrowLeft className="w-4 h-4" />Back
                </button>
              )}
              <button onClick={handleNext} className="flex-1 py-3 text-white flex items-center justify-center gap-2" style={{ background: '#23967F', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                {step === STEPS.length - 1 ? 'Create Shelter Account' : 'Continue'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p style={{ fontSize: 13, color: '#53584A' }}>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} style={{ fontWeight: 500, color: '#23967F' }}>Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
