import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowRight, ArrowLeft, CheckCircle2, Save } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

type Prefs = {
  species: string[];
  ageRange: string;
  kidFriendly: boolean | null;
  dogFriendly: boolean | null;
  energyLevel: string;
  size: string;
  indoorOutdoor: string;
  experience: string;
};

const QUIZ_STEPS = [
  { title: "What type of animal?", field: 'species' },
  { title: "What age range?", field: 'ageRange' },
  { title: "Do you have children?", field: 'kidFriendly' },
  { title: "Do you have other dogs?", field: 'dogFriendly' },
  { title: "What energy level suits you?", field: 'energyLevel' },
  { title: "Preferred size?", field: 'size' },
  { title: "Your lifestyle", field: 'experience' },
];

export default function PreferenceQuiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({
    species: [], ageRange: '', kidFriendly: null, dogFriendly: null,
    energyLevel: '', size: '', indoorOutdoor: '', experience: '',
  });

  const setField = <K extends keyof Prefs>(key: K, value: Prefs[K]) =>
    setPrefs(p => ({ ...p, [key]: value }));

  const toggleSpecies = (s: string) =>
    setPrefs(p => ({ ...p, species: p.species.includes(s) ? p.species.filter(x => x !== s) : [...p.species, s] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => navigate('/adopter/explore'), 1500);
  };

  const progress = ((step + 1) / QUIZ_STEPS.length) * 100;

  const OptionCard = ({ label, selected, onClick, sub }: { label: string; selected: boolean; onClick: () => void; sub?: string }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 p-4 text-center transition-all"
      style={{ borderRadius: 12, border: `2px solid ${selected ? '#F6511D' : 'rgba(9,12,2,0.1)'}`, background: selected ? '#FFF0EB' : '#ffffff' }}
    >
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: selected ? '#F6511D' : '#E2DDD9', marginBottom: 4, transition: 'background 0.15s' }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: selected ? '#F6511D' : '#090C02' }}>{label}</span>
      {sub && <span style={{ fontSize: 11, color: selected ? '#F6511D' : '#53584A', opacity: 0.85 }}>{sub}</span>}
    </button>
  );

  const OptionRow = ({ label, sub, selected, onClick }: { label: string; sub: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 text-left transition-all"
      style={{ borderRadius: 12, border: `2px solid ${selected ? '#F6511D' : 'rgba(9,12,2,0.1)'}`, background: selected ? '#FFF0EB' : '#ffffff' }}
    >
      <div style={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, background: selected ? '#F6511D' : '#E2DDD9', transition: 'background 0.15s' }} />
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: selected ? '#F6511D' : '#090C02' }}>{label}</p>
        <p style={{ fontSize: 12, color: selected ? '#F6511D' : '#53584A', opacity: 0.85 }}>{sub}</p>
      </div>
    </button>
  );

  if (saved) {
    return (
      <div className="flex items-center justify-center min-h-full p-6" style={{ fontFamily: FONT }}>
        <div className="text-center">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
            <CheckCircle2 className="w-10 h-10" style={{ color: '#23967F' }} />
          </div>
          <p style={{ fontWeight: 700, fontSize: 22, color: '#090C02', marginBottom: 6 }}>Preferences saved!</p>
          <p style={{ fontSize: 14, color: '#53584A' }}>Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-7 max-w-xl mx-auto" style={{ fontFamily: FONT }}>
      <div className="mb-5">
        <h4 style={{ color: '#090C02', marginBottom: 2 }}>Your Preferences</h4>
        <p style={{ fontSize: 14, color: '#53584A' }}>Help us find your perfect match</p>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between mb-2" style={{ fontSize: 13 }}>
          <span style={{ color: '#F6511D', fontWeight: 500 }}>{QUIZ_STEPS[step].title}</span>
          <span style={{ color: '#53584A' }}>{step + 1}/{QUIZ_STEPS.length}</span>
        </div>
        <div className="h-2" style={{ background: 'rgba(9,12,2,0.08)', borderRadius: 100, overflow: 'hidden' }}>
          <div className="h-2 transition-all" style={{ background: '#F6511D', borderRadius: 100, width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {QUIZ_STEPS.map((_, i) => (
            <div key={i} className="w-2 h-2 transition-all" style={{ borderRadius: '50%', background: i <= step ? '#F6511D' : 'rgba(9,12,2,0.1)' }} />
          ))}
        </div>
      </div>

      <div style={CARD} className="p-6">
        {/* Step 0: Species */}
        {step === 0 && (
          <div className="grid grid-cols-3 gap-3">
            {['Dog', 'Cat', 'Rabbit', 'Bird', 'Any', 'Small Pet'].map(s => (
              <OptionCard key={s} label={s} selected={prefs.species.includes(s)} onClick={() => toggleSpecies(s)} />
            ))}
          </div>
        )}

        {/* Step 1: Age range */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {[['Puppy/Kitten', '< 1 year'], ['Young', '1–3 years'], ['Adult', '3–8 years'], ['Senior', '8+ years']].map(([label, sub]) => (
              <OptionCard key={label} label={label} sub={sub} selected={prefs.ageRange === label} onClick={() => setField('ageRange', label)} />
            ))}
          </div>
        )}

        {/* Step 2: Kid friendly */}
        {step === 2 && (
          <div className="space-y-4">
            <p style={{ fontSize: 14, color: '#53584A' }}>We'll prioritise animals that are great with children</p>
            <div className="grid grid-cols-2 gap-3">
              {[['Yes, I have kids', true, 'Must be kid-friendly'], ['No kids at home', false, 'No specific requirement']].map(([label, val, sub]) => (
                <OptionCard key={String(label)} label={label as string} sub={sub as string} selected={prefs.kidFriendly === val} onClick={() => setField('kidFriendly', val as boolean)} />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Dog friendly */}
        {step === 3 && (
          <div className="grid grid-cols-2 gap-3">
            {[['Yes, I have dogs', true, 'Must get along with dogs'], ['No other dogs', false, 'No specific requirement']].map(([label, val, sub]) => (
              <OptionCard key={String(label)} label={label as string} sub={sub as string} selected={prefs.dogFriendly === val} onClick={() => setField('dogFriendly', val as boolean)} />
            ))}
          </div>
        )}

        {/* Step 4: Energy level */}
        {step === 4 && (
          <div className="space-y-3">
            {[
              { label: 'Calm & Relaxed',   sub: 'Couch companion, minimal exercise',   value: 'Calm' },
              { label: 'Moderate Energy',  sub: 'Daily walks, some playtime',           value: 'Moderate' },
              { label: 'Active',           sub: 'Regular runs, loves to play',          value: 'Active' },
              { label: 'Very Active',      sub: 'Hiking, agility, high energy always',  value: 'Very Active' },
            ].map(opt => (
              <OptionRow key={opt.value} label={opt.label} sub={opt.sub} selected={prefs.energyLevel === opt.value} onClick={() => setField('energyLevel', opt.value)} />
            ))}
          </div>
        )}

        {/* Step 5: Size */}
        {step === 5 && (
          <div className="grid grid-cols-2 gap-3">
            {[['Small', '< 10kg'], ['Medium', '10–25kg'], ['Large', '25–45kg'], ['Any Size', 'No preference']].map(([label, sub]) => (
              <OptionCard key={label} label={label} sub={sub} selected={prefs.size === label} onClick={() => setField('size', label)} />
            ))}
          </div>
        )}

        {/* Step 6: Experience */}
        {step === 6 && (
          <div className="space-y-3">
            {[
              { label: 'First-time Owner',  sub: "I've never owned a pet before",    value: 'Beginner' },
              { label: 'Some Experience',   sub: "I've had pets but not recently",    value: 'Intermediate' },
              { label: 'Experienced Owner', sub: "I've had many pets over the years", value: 'Experienced' },
              { label: 'Expert / Trainer',  sub: 'I can handle challenging animals',  value: 'Expert' },
            ].map(opt => (
              <OptionRow key={opt.value} label={opt.label} sub={opt.sub} selected={prefs.experience === opt.value} onClick={() => setField('experience', opt.value)} />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-2 px-4 py-2.5"
              style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {step < QUIZ_STEPS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              className="flex-1 py-2.5 text-white font-medium flex items-center justify-center gap-2"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 14 }}
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex-1 py-2.5 text-white font-medium flex items-center justify-center gap-2"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 14 }}
            >
              <Save className="w-4 h-4" />Save Preferences & Explore
            </button>
          )}
        </div>
        <p className="text-center mt-3" style={{ fontSize: 13, color: '#53584A' }}>
          <button onClick={() => navigate('/adopter/explore')} style={{ textDecoration: 'underline' }}>Skip for now</button>
        </p>
      </div>
    </div>
  );
}
