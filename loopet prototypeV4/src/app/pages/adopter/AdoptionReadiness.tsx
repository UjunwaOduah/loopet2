import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, FileText, Home, Shield, BookOpen, Download, Heart, Moon } from 'lucide-react';
import { ForkKnife, Stethoscope, Trophy, PawPrint, Confetti } from '@phosphor-icons/react';
import { ANIMALS } from '../../data/mockData';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const STEPS = ['Home Check', 'Legal Agreement', 'Pre-Adoption Guide', 'Confirm'];

const HOME_CHECKLIST = [
  { id: 'h1', label: 'Secure fencing in yard (if applicable)', required: true },
  { id: 'h2', label: 'No toxic plants accessible to pets', required: true },
  { id: 'h3', label: 'Designated sleeping area ready', required: true },
  { id: 'h4', label: 'Food and water bowls purchased', required: true },
  { id: 'h5', label: 'Pet-safe cleaning products', required: false },
  { id: 'h6', label: 'Nearest vet identified', required: true },
  { id: 'h7', label: 'All household members on board', required: true },
  { id: 'h8', label: 'Pet insurance considered', required: false },
];

const LEGAL_ITEMS = [
  { id: 'l1', label: 'I understand this adoption is a lifetime commitment' },
  { id: 'l2', label: 'I will provide proper veterinary care including annual check-ups' },
  { id: 'l3', label: 'I will not transfer, sell, or give the animal to another party without shelter approval' },
  { id: 'l4', label: 'I understand the shelter may conduct welfare check visits' },
  { id: 'l5', label: 'I will report any lost animal immediately' },
  { id: 'l6', label: 'I agree to the adoption fee and understand it is non-refundable' },
];

const GUIDE_TOPICS = [
  { Icon: Home,        title: 'First 24 Hours',  desc: 'Keep things calm. Let your new pet explore at their own pace. Avoid introducing to many people at once.' },
  { Icon: ForkKnife,   title: 'Feeding Guide',   desc: 'Start with the same food they had at the shelter. Transition slowly over 7-10 days to avoid digestive upset.' },
  { Icon: Stethoscope, title: 'Vet Visit',       desc: 'Schedule a vet check within the first week. Bring all medical records provided in your digital adoption folder.' },
  { Icon: Moon,        title: 'Sleep & Routine', desc: 'Establish a consistent schedule from day one. Routines help anxious animals feel safe and settled.' },
  { Icon: Heart,       title: 'Building Trust',  desc: 'Be patient — it can take 3 days, 3 weeks, or 3 months for a shelter animal to fully decompress.' },
  { Icon: Trophy,      title: 'Training Tips',   desc: 'Use positive reinforcement. Short sessions (5-10 min) are most effective. Enroll in a local obedience class.' },
];

export default function AdoptionReadiness() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [homeChecked, setHomeChecked] = useState<string[]>([]);
  const [legalChecked, setLegalChecked] = useState<string[]>([]);
  const [adopted, setAdopted] = useState(false);
  const animal = ANIMALS[0];

  const toggleCheck = (id: string, list: string[], setList: (l: string[]) => void) =>
    setList(list.includes(id) ? list.filter(i => i !== id) : [...list, id]);

  const requiredDone = HOME_CHECKLIST.filter(i => i.required).every(i => homeChecked.includes(i.id));
  const allLegalDone = LEGAL_ITEMS.every(i => legalChecked.includes(i.id));

  if (adopted) {
    return (
      <div className="flex items-center justify-center min-h-full p-6" style={{ fontFamily: FONT }}>
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-5" style={{ background: '#EAF5F2', borderRadius: '50%' }}>
            <Confetti size={40} color="#23967F" weight="fill" />
          </div>
          <p style={{ fontWeight: 700, fontSize: 28, color: '#090C02', marginBottom: 8 }}>Congratulations!</p>
          <p style={{ fontSize: 14, color: '#53584A', marginBottom: 6 }}>You're officially adopting</p>
          <p style={{ fontWeight: 700, fontSize: 32, color: '#F6511D', marginBottom: 24 }}>{animal.name}!</p>

          <div style={CARD} className="p-5 mb-4 text-left">
            <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 12 }}>Your Digital Adoption Folder</p>
            {['Medical history & vaccines', 'Adoption certificate', 'Care guide PDF', 'Local vet recommendations', 'Follow-up schedule'].map(item => (
              <div key={item} className="flex items-center gap-2 py-2" style={{ borderBottom: '1px solid rgba(9,12,2,0.06)' }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#23967F' }} />
                <span style={{ fontSize: 14, color: '#090C02' }}>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#090C02', fontSize: 13, fontWeight: 500 }}>
              <Download className="w-4 h-4" />Download Kit
            </button>
            <button onClick={() => navigate('/adopter/explore')} className="flex-1 py-3 text-white" style={{ background: '#F6511D', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
              Back to Explore
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-7 max-w-2xl mx-auto" style={{ fontFamily: FONT }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <img src={animal.photo} alt={animal.name} className="w-14 h-14 object-cover" style={{ borderRadius: 10 }} />
        <div>
          <h4 style={{ color: '#090C02', marginBottom: 2 }}>Adoption Readiness</h4>
          <p style={{ fontSize: 14, color: '#53584A' }}>For <strong>{animal.name}</strong> · {animal.breed}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 flex items-center justify-center"
                style={{ borderRadius: '50%', fontSize: 12, fontWeight: 700, ...(i < step ? { background: '#EAF5F2', color: '#23967F' } : i === step ? { background: '#F6511D', color: 'white' } : { background: 'rgba(9,12,2,0.06)', color: '#53584A' }) }}
              >
                {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <span style={{ fontSize: 11, marginTop: 4, whiteSpace: 'nowrap', color: i === step ? '#F6511D' : '#53584A' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div className="w-8 h-0.5 mb-4" style={{ background: i < step ? '#23967F' : 'rgba(9,12,2,0.1)' }} />}
          </div>
        ))}
      </div>

      <div style={CARD} className="p-6">
        {/* Step 0: Home Check */}
        {step === 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#EAF5F2' }}>
                <Home className="w-5 h-5" style={{ color: '#23967F' }} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>Home Readiness Check</p>
                <p style={{ fontSize: 12, color: '#53584A' }}>Complete all required items to proceed</p>
              </div>
            </div>

            <div className="space-y-2">
              {HOME_CHECKLIST.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id, homeChecked, setHomeChecked)}
                  className="w-full flex items-start gap-3 p-3 text-left transition-all"
                  style={{ borderRadius: 8, background: homeChecked.includes(item.id) ? '#EAF5F2' : '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)' }}
                >
                  {homeChecked.includes(item.id) ?
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#23967F' }} /> :
                    <Circle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#53584A' }} />}
                  <div className="flex-1">
                    <span style={{ fontSize: 14, color: '#090C02' }}>{item.label}</span>
                    {item.required && <span style={{ fontSize: 12, color: '#F6511D', marginLeft: 6 }}>*required</span>}
                  </div>
                </button>
              ))}
            </div>

            {!requiredDone && (
              <p className="text-center mt-3" style={{ fontSize: 12, color: '#F6511D' }}>
                Complete all required items (*) to continue
              </p>
            )}

            <div className="mt-4 px-4 py-3" style={{ background: '#EAF5F2', borderRadius: 8 }}>
              <p style={{ fontSize: 12, color: '#090C02' }}>
                <strong>Did you know?</strong> Our team may conduct a voluntary home visit before finalising the adoption to ensure the best match.
              </p>
            </div>
          </div>
        )}

        {/* Step 1: Legal */}
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#FFF0EB' }}>
                <FileText className="w-5 h-5" style={{ color: '#F6511D' }} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>Adoption Agreement</p>
                <p style={{ fontSize: 12, color: '#53584A' }}>Please read and agree to all items</p>
              </div>
            </div>

            <div className="px-4 py-3 mb-4" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
              <p style={{ fontSize: 13, color: '#53584A' }}>
                By adopting <strong style={{ color: '#090C02' }}>{animal.name}</strong> from Happy Paws Animal Rescue, you agree to provide a safe, loving, and permanent home. This agreement is legally binding.
              </p>
            </div>

            <div className="space-y-2">
              {LEGAL_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id, legalChecked, setLegalChecked)}
                  className="w-full flex items-start gap-3 p-3 text-left transition-all"
                  style={{ borderRadius: 8, background: legalChecked.includes(item.id) ? '#FFF0EB' : '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)' }}
                >
                  {legalChecked.includes(item.id) ?
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F6511D' }} /> :
                    <Circle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#53584A' }} />}
                  <span style={{ fontSize: 14, color: '#090C02' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Guide */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center" style={{ borderRadius: 8, background: '#EAF5F2' }}>
                <BookOpen className="w-5 h-5" style={{ color: '#23967F' }} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>Pre-Adoption Guidance</p>
                <p style={{ fontSize: 12, color: '#53584A' }}>Tips to set you and {animal.name} up for success</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GUIDE_TOPICS.map(topic => (
                <div key={topic.title} className="p-4" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                  <div className="mb-2"><topic.Icon size={22} color="#23967F" /></div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02', marginBottom: 4 }}>{topic.title}</p>
                  <p style={{ fontSize: 12, color: '#53584A', lineHeight: 1.6 }}>{topic.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4 px-3 py-2.5" style={{ background: '#EAF5F2', borderRadius: 8 }}>
              <Download className="w-4 h-4 flex-shrink-0" style={{ color: '#090C02' }} />
              <p style={{ fontSize: 12, color: '#090C02' }}>A full PDF guide will be included in your digital adoption folder</p>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ background: '#FFF0EB', borderRadius: '50%' }}>
            <PawPrint size={32} color="#F6511D" weight="fill" />
          </div>
            <p style={{ fontWeight: 700, fontSize: 22, color: '#090C02', marginBottom: 6 }}>You're ready!</p>
            <p style={{ fontSize: 14, color: '#53584A', marginBottom: 24 }}>Review your adoption summary and confirm</p>

            <div className="text-left space-y-3 mb-6">
              <div className="flex items-center gap-3 p-4" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                <img src={animal.photo} alt={animal.name} className="w-12 h-12 object-cover" style={{ borderRadius: 8 }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>{animal.name}</p>
                  <p style={{ fontSize: 12, color: '#53584A' }}>{animal.breed} · {animal.gender} · {Math.floor(animal.age / 12)} years</p>
                  <p style={{ fontSize: 12, color: '#53584A' }}>Happy Paws Animal Rescue</p>
                </div>
              </div>

              {[
                { icon: <CheckCircle2 className="w-4 h-4" style={{ color: '#23967F' }} />, label: 'Home check complete' },
                { icon: <CheckCircle2 className="w-4 h-4" style={{ color: '#23967F' }} />, label: 'Adoption agreement signed' },
                { icon: <CheckCircle2 className="w-4 h-4" style={{ color: '#23967F' }} />, label: 'Pre-adoption guide reviewed' },
                { icon: <Shield className="w-4 h-4" style={{ color: '#23967F' }} />, label: 'Adoption fee: $150 (paid on pickup)' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                  {icon}
                  <span style={{ fontSize: 14, color: '#090C02' }}>{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setAdopted(true)}
              className="w-full py-4 text-white"
              style={{ background: '#090C02', borderRadius: 8, fontWeight: 700, fontSize: 16 }}
            >
              Confirm Adoption of {animal.name}
            </button>
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
              <ArrowLeft className="w-4 h-4" />Back
            </button>
          )}
          {step < STEPS.length - 1 && (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 0 ? !requiredDone : step === 1 ? !allLegalDone : false}
              className="flex-1 py-2.5 text-white font-medium flex items-center justify-center gap-2 transition-all"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 14, opacity: (step === 0 ? !requiredDone : step === 1 ? !allLegalDone : false) ? 0.5 : 1 }}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
