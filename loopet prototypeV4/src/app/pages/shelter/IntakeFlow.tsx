import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Camera, ArrowRight, ArrowLeft, Scan, MapPin, Tag, AlertCircle } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const STEPS = ['Chip Check', 'Core Details', 'Location & Status', 'Complete'];

type Gender = 'Male' | 'Female' | 'Unknown';
type Species = 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Other';

interface FormData {
  noChip: boolean;
  chipId: string;
  name: string;
  species: Species;
  breed: string;
  gender: Gender;
  weight: string;
  age: string;
  birthdate: string;
  hasPhoto: boolean;
  kennel: string;
  status: string;
}

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

export default function IntakeFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [chipFlash, setChipFlash] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [form, setForm] = useState<FormData>({
    noChip: false, chipId: '', name: '', species: 'Dog', breed: '', gender: 'Unknown',
    weight: '', age: '', birthdate: '', hasPhoto: false, kennel: '', status: 'Quarantine',
  });

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanDone(true);
      setChipFlash(true);
      setField('chipId', '985112003456' + Math.floor(Math.random() * 900 + 100));
      setTimeout(() => setChipFlash(false), 700);
    }, 2000);
  };

  const handleChipInput = (val: string) => {
    setField('chipId', val);
    if (val.length === 15) {
      setScanDone(true);
      setChipFlash(true);
      setTimeout(() => setChipFlash(false), 700);
    }
  };

  const generateNoraId = () => {
    const id = `PET-2025-${String(Math.floor(Math.random() * 90 + 10)).padStart(4, '0')}`;
    setGeneratedId(id);
    setStep(3);
  };

  const InputField = ({ label, value, onChange, placeholder, type = 'text' }: any) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={(e: any) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  );

  const pillBtn = (active: boolean) => ({
    borderRadius: 8,
    border: '1px solid rgba(9,12,2,0.1)',
    background: active ? '#23967F' : '#FBF9F8',
    color: active ? '#ffffff' : '#53584A',
    fontSize: 13,
    fontWeight: 500 as const,
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'all 0.15s',
  });

  return (
    <div className="p-5 lg:p-7 max-w-2xl mx-auto" style={{ fontFamily: FONT }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 style={{ color: '#090C02', marginBottom: 2 }}>New Animal Intake</h4>
          <p style={{ fontSize: 14, color: '#53584A' }}>Individual arrival — Flow V1</p>
        </div>
        <button
          onClick={() => navigate('/shelter/dashboard')}
          style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500, padding: '6px 12px' }}
        >
          Cancel
        </button>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-6">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all"
              style={{ borderRadius: '50%', ...(i < step ? { background: '#EAF5F2', color: '#23967F' } : i === step ? { background: '#23967F', color: 'white' } : { background: 'rgba(9,12,2,0.06)', color: '#53584A' }), fontSize: 12, fontWeight: 700 }}
            >
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className="hidden sm:block" style={{ fontSize: 12, fontWeight: 500, color: i === step ? '#090C02' : '#53584A' }}>{s}</span>
            {i < STEPS.length - 1 && <div className="flex-1 h-0.5" style={{ background: i < step ? '#23967F' : 'rgba(9,12,2,0.08)' }} />}
          </div>
        ))}
      </div>

      <div style={CARD} className="p-6">
        {/* Step 0: Chip Check */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <p style={{ fontWeight: 600, fontSize: 16, color: '#090C02', marginBottom: 4 }}>Microchip Scan</p>
              <p style={{ fontSize: 14, color: '#53584A' }}>Scan the animal's microchip or enter the ID manually</p>
            </div>

            <div
              className={`relative flex flex-col items-center justify-center p-8 transition-all ${scanning ? 'animate-pulse' : ''}`}
              style={{
                borderRadius: 12,
                border: `2px dashed ${chipFlash ? '#23967F' : scanDone ? '#23967F' : '#135346'}`,
                background: chipFlash ? '#EAF5F2' : scanDone ? '#EAF5F2' : scanning ? 'rgba(35,150,127,0.06)' : '#FBF9F8',
                transition: chipFlash ? 'background 0.05s ease' : 'background 0.4s ease, border-color 0.4s ease',
              }}
            >
              {scanDone ? (
                <>
                  <CheckCircle2 className="w-12 h-12 mb-3" style={{ color: chipFlash ? '#090C02' : '#23967F' }} />
                  <p style={{ fontWeight: 700, fontSize: 14, color: chipFlash ? '#090C02' : '#23967F' }}>Chip Detected!</p>
                  <p style={{ fontSize: 12, marginTop: 4, fontFamily: 'monospace', color: chipFlash ? '#090C02' : '#53584A' }}>{form.chipId}</p>
                </>
              ) : scanning ? (
                <>
                  <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mb-3" style={{ borderColor: '#23967F', borderTopColor: 'transparent' }} />
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#53584A' }}>Scanning for chip...</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 flex items-center justify-center mb-3" style={{ borderRadius: 12, background: '#EAF5F2' }}>
                    <Scan className="w-8 h-8" style={{ color: '#23967F' }} />
                  </div>
                  <p style={{ fontWeight: 500, fontSize: 14, color: '#090C02' }}>Place scanner near animal</p>
                  <p style={{ fontSize: 12, marginTop: 4, color: '#53584A' }}>Auto-fills when chip is detected</p>
                  <button
                    onClick={handleScan}
                    className="mt-4 px-6 py-2 text-white"
                    style={{ background: '#23967F', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
                  >
                    Activate Scanner
                  </button>
                </>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Microchip ID</label>
              <input
                value={form.chipId}
                onChange={e => handleChipInput(e.target.value)}
                placeholder="Enter 15-digit microchip number"
                maxLength={15}
                style={{
                  ...inputStyle,
                  fontFamily: 'monospace',
                  background: chipFlash ? '#EAF5F2' : '#FBF9F8',
                  border: chipFlash ? '2px solid #23967F' : '1px solid rgba(9,12,2,0.1)',
                  color: chipFlash ? '#090C02' : '#090C02',
                  transition: chipFlash ? 'none' : 'background 0.4s ease, border 0.4s ease',
                  fontWeight: scanDone ? 700 : 400,
                  letterSpacing: scanDone ? '0.08em' : 'normal',
                }}
              />
              {form.chipId && form.chipId.length < 15 && (
                <p style={{ fontSize: 11, color: '#53584A', marginTop: 4 }}>{form.chipId.length}/15 digits</p>
              )}
            </div>

            <label className="flex items-center gap-3 px-4 py-3 cursor-pointer" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 8 }}>
              <input type="checkbox" checked={form.noChip} onChange={e => setField('noChip', e.target.checked)} className="w-4 h-4" />
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>No Chip Detected</p>
                <p style={{ fontSize: 12, color: '#53584A' }}>Animal has no microchip — will be flagged for implant</p>
              </div>
              {form.noChip && (
                <span className="flex items-center gap-1 rounded-full px-2.5 py-0.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}>
                  <AlertCircle className="w-3 h-3" />Flag set
                </span>
              )}
            </label>
          </div>
        )}

        {/* Step 1: Core Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p style={{ fontWeight: 600, fontSize: 16, color: '#090C02', marginBottom: 4 }}>Core Details</p>
              <p style={{ fontSize: 14, color: '#53584A' }}>Fill in the animal's basic information</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setField('hasPhoto', true)}
                className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed transition-all"
                style={{ borderRadius: 12, background: form.hasPhoto ? '#EAF5F2' : '#FBF9F8', borderColor: form.hasPhoto ? '#23967F' : 'rgba(9,12,2,0.15)' }}
              >
                {form.hasPhoto ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 mb-1" style={{ color: '#23967F' }} />
                    <span style={{ fontSize: 11, color: '#23967F' }}>Photo saved</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-6 h-6 mb-1" style={{ color: '#53584A' }} />
                    <span style={{ fontSize: 11, color: '#53584A' }}>Add photo</span>
                  </>
                )}
              </button>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02', marginBottom: 4 }}>Animal Photo</p>
                <p style={{ fontSize: 12, color: '#53584A', marginBottom: 8 }}>Tap to capture or upload from device</p>
                <button style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 12, fontWeight: 500, padding: '4px 10px' }}>Upload from device</button>
              </div>
            </div>

            <InputField label="Animal Name" value={form.name} onChange={(v: string) => setField('name', v)} placeholder="e.g. Buddy, Luna..." />

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Species</label>
              <div className="flex gap-2 flex-wrap">
                {(['Dog', 'Cat', 'Rabbit', 'Bird', 'Other'] as Species[]).map(s => (
                  <button key={s} onClick={() => setField('species', s)} style={pillBtn(form.species === s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <InputField label="Breed" value={form.breed} onChange={(v: string) => setField('breed', v)} placeholder="e.g. Labrador Mix, Tabby..." />

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Gender</label>
                <div className="flex flex-col gap-1.5">
                  {(['Male', 'Female', 'Unknown'] as Gender[]).map(g => (
                    <button key={g} onClick={() => setField('gender', g)} style={{ ...pillBtn(form.gender === g), padding: '6px 8px', width: '100%', textAlign: 'left' as const }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <InputField label="Weight (kg)" value={form.weight} onChange={(v: string) => setField('weight', v)} placeholder="e.g. 12.5" type="number" />
              <InputField label="Age (months)" value={form.age} onChange={(v: string) => setField('age', v)} placeholder="e.g. 24" type="number" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Date of Birth (if known)</label>
              <input type="date" value={form.birthdate} onChange={e => setField('birthdate', e.target.value)} style={inputStyle} />
            </div>
          </div>
        )}

        {/* Step 2: Location & Status */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <p style={{ fontWeight: 600, fontSize: 16, color: '#090C02', marginBottom: 4 }}>Location & Status</p>
              <p style={{ fontSize: 14, color: '#53584A' }}>Assign a kennel and set initial status</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Zone / Block</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Dog Block A', 'Dog Block B', 'Cat Room 1', 'Cat Room 2', 'Small Animals', 'Medical Wing'].map(zone => (
                  <button
                    key={zone}
                    onClick={() => setField('kennel', zone + ', Cage 1')}
                    className="flex items-center gap-1 py-2 px-3 text-left"
                    style={{ ...pillBtn(form.kennel.startsWith(zone)), width: '100%' }}
                  >
                    <MapPin className="w-3 h-3" /> {zone}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Specific Kennel / Unit</label>
              <div className="flex gap-2">
                <input value={form.kennel} onChange={e => setField('kennel', e.target.value)} placeholder="e.g. Dog Block A, Cage 4" style={{ ...inputStyle, flex: 1 }} />
                <button style={{ background: '#23967F', borderRadius: 8, padding: '0 12px' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#ffffff' }} />
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Initial Status</label>
              <div className="space-y-2">
                {[
                  { value: 'Quarantine', bg: '#EAF5F2', color: '#23967F', desc: 'New arrivals — 14-day isolation period' },
                  { value: 'Available', bg: '#090C02', color: '#FBF9F8', desc: 'Ready for adoption listing' },
                  { value: 'Medical Hold', bg: '#FFF0EB', color: '#F6511D', desc: 'Requires medical treatment first' },
                  { value: 'Foster', bg: '#ffd5c2', color: '#090C02', desc: 'Placed with foster family' },
                ].map(s => (
                  <button
                    key={s.value}
                    onClick={() => setField('status', s.value)}
                    className="w-full flex items-center gap-3 p-3 text-left transition-all"
                    style={{ borderRadius: 8, border: `2px solid ${form.status === s.value ? s.color : 'transparent'}`, background: form.status === s.value ? s.bg : '#FBF9F8' }}
                  >
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ border: `2px solid ${form.status === s.value ? s.color : '#53584A'}`, background: form.status === s.value ? s.color : 'transparent' }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: form.status === s.value ? s.color : '#090C02' }}>{s.value}</p>
                      <p style={{ fontSize: 12, color: form.status === s.value ? s.color : '#53584A', opacity: form.status === s.value ? 0.8 : 1 }}>{s.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Initial Notes</label>
              <textarea rows={3} placeholder="Any observations at intake..." style={{ ...inputStyle, resize: 'none' }} />
            </div>
          </div>
        )}

        {/* Step 3: Complete */}
        {step === 3 && (
          <div className="text-center py-4 space-y-5">
            <div className="w-20 h-20 flex items-center justify-center mx-auto" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
              <CheckCircle2 className="w-10 h-10" style={{ color: '#23967F' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 6 }}>Profile Created!</p>
              <p style={{ fontSize: 14, color: '#53584A' }}>Your unique Pet ID has been generated</p>
            </div>
            <div className="px-5 py-4" style={{ background: '#090C02', borderRadius: 12 }}>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Pet ID</p>
              <div className="flex items-center justify-center gap-3">
                <Tag className="w-5 h-5" style={{ color: '#23967F' }} />
                <span style={{ fontSize: 24, fontWeight: 700, fontFamily: 'monospace', color: '#23967F' }}>{generatedId}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                { label: 'Name', value: form.name || 'Unnamed' },
                { label: 'Species', value: form.species },
                { label: 'Kennel', value: form.kennel || 'Unassigned' },
                { label: 'Status', value: form.status },
              ].map(({ label, value }) => (
                <div key={label} className="p-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                  <p style={{ fontSize: 11, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02', marginTop: 2 }}>{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setStep(0); setForm({ noChip: false, chipId: '', name: '', species: 'Dog', breed: '', gender: 'Unknown', weight: '', age: '', birthdate: '', hasPhoto: false, kennel: '', status: 'Quarantine' }); setScanDone(false); }}
                className="flex-1 py-2.5"
                style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
              >
                Add Another
              </button>
              <button
                onClick={() => navigate('/shelter/dashboard')}
                className="flex-1 py-2.5 text-white"
                style={{ background: '#23967F', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 3 && (
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            <button
              onClick={step === 2 ? generateNoraId : () => setStep(step + 1)}
              className="flex-1 py-2.5 text-white font-medium flex items-center justify-center gap-2"
              style={{ background: '#23967F', borderRadius: 8, fontSize: 14 }}
            >
              {step === 2 ? (
                <><Tag className="w-4 h-4" />Save & Generate Pet ID</>
              ) : (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
