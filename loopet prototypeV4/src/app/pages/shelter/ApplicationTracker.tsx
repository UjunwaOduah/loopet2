import { useState } from 'react';
import { ANIMALS } from '../../data/mockData';
import {
  ClipboardList, Settings, ArrowLeftRight, ChevronRight, ChevronLeft,
  X, CheckCircle2, Plus, ExternalLink, Calendar, FileText, Upload,
} from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #E2DDD9',
  borderRadius: 12,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: 8,
  border: '1px solid #E2DDD9',
  background: '#FBF9F8',
  color: '#090C02',
  fontSize: 14,
  fontFamily: FONT,
  outline: 'none',
};

type Stage = 'new' | 'interview' | 'homecheck' | 'reserved';
type TabKey = 'applications' | 'forms' | 'outtake';

interface Application {
  id: string;
  adopter: string;
  email: string;
  phone: string;
  animal: string;
  animalId: string;
  date: string;
  stage: Stage;
  householdType: string;
  workingHours: string;
  priorPets: string;
  experience: string;
  notes: string;
}

const MOCK_APPS: Application[] = [
  { id: 'APP-001', adopter: 'Thomas Declercq', email: 'thomas.d@gmail.com', phone: '+32 479 12 34 56', animal: 'Mango', animalId: '1', date: '2026-05-28', stage: 'new', householdType: 'Apartment, couple, no children', workingHours: 'Partner works from home full-time', priorPets: 'Had two labradors growing up', experience: 'Moderate — familiar with basic training', notes: 'Very detailed and thoughtful application.' },
  { id: 'APP-002', adopter: 'Amélie Fontaine', email: 'amelie.f@outlook.be', phone: '+32 471 98 76 54', animal: 'Luna', animalId: '2', date: '2026-05-26', stage: 'new', householdType: 'House with garden, family of 4', workingHours: 'Both parents work, kids home at 4pm', priorPets: 'Currently have an older cat (11yr)', experience: 'Experienced — had cats for 15 years', notes: 'Looking for a second cat companion for their senior cat.' },
  { id: 'APP-003', adopter: 'Pieter Van den Berg', email: 'pieter.vdb@telenet.be', phone: '+32 465 55 12 78', animal: 'Biscuit', animalId: '3', date: '2026-05-22', stage: 'interview', householdType: 'House, single occupant, retired', workingHours: 'Retired, home all day', priorPets: 'Had dogs for 30 years, extensive experience', experience: 'Expert — trained dogs professionally', notes: 'Interview completed 28/05. Very positive. Reference check pending.' },
  { id: 'APP-004', adopter: 'Sophie Lecomte', email: 'sophie.l@gmail.com', phone: '+32 492 34 56 78', animal: 'Whisker', animalId: '4', date: '2026-05-20', stage: 'homecheck', householdType: 'Apartment, couple, 1 toddler (3yr)', workingHours: 'One partner part-time remote', priorPets: 'First pet together as a couple', experience: 'Beginner — attended adoption readiness workshop', notes: 'Home visit booked for June 3. Apartment suitable per photos submitted.' },
  { id: 'APP-005', adopter: 'Nathan Dubois', email: 'nathan.d@proximus.be', phone: '+32 476 88 23 45', animal: 'Mango', animalId: '1', date: '2026-05-18', stage: 'reserved', householdType: 'House with enclosed garden', workingHours: 'Freelancer, flexible schedule', priorPets: 'Previously adopted from this shelter (Bella, 2021)', experience: 'Experienced adopter — repeat adopter', notes: 'Pre-approved. Awaiting final paperwork and departure date.' },
  { id: 'APP-006', adopter: 'Emma Claes', email: 'emma.claes@live.be', phone: '+32 468 11 22 33', animal: 'Rex', animalId: '5', date: '2026-05-30', stage: 'new', householdType: 'Apartment, single, no pets', workingHours: 'Office-based, 9–6', priorPets: 'None', experience: 'Beginner', notes: 'Short application. Needs follow-up call.' },
];

const COLUMNS: { key: Stage; label: string; color: string; bg: string }[] = [
  { key: 'new',       label: 'New Submissions',        color: '#53584A', bg: '#FBF9F8' },
  { key: 'interview', label: 'Interview Stage',         color: '#F6511D', bg: '#FFF0EB' },
  { key: 'homecheck', label: 'Home-Check Pending',      color: '#23967F', bg: '#EAF5F2' },
  { key: 'reserved',  label: 'Reserved / Pre-Approved', color: '#ffffff', bg: '#135346' },
];

const FORM_QUESTIONS = [
  { key: 'household',  label: 'Household Type & Living Situation', on: true },
  { key: 'working',    label: 'Working Hours & Daily Schedule Context', on: true },
  { key: 'prior',      label: 'Prior Pet Experience Log', on: true },
  { key: 'references', label: 'Personal References (2 required)', on: false },
  { key: 'garden',     label: 'Garden / Outdoor Space Details', on: false },
  { key: 'vet',        label: 'Preferred Veterinarian Info', on: false },
  { key: 'financial',  label: 'Pet Care Financial Readiness', on: false },
];

const OUTTAKE_ANIMALS = ANIMALS.filter(a => a.status === 'Available').slice(0, 4);

interface OuttakeModalProps {
  animal: (typeof OUTTAKE_ANIMALS)[0];
  onClose: () => void;
}

function OuttakeModal({ animal, onClose }: OuttakeModalProps) {
  const [step, setStep] = useState(1);
  const [legalId, setLegalId] = useState('');
  const [contractUploaded, setContractUploaded] = useState(false);
  const [checks, setChecks] = useState({ chip: false, passport: false, meds: false });
  const [departureDate, setDepartureDate] = useState('');
  const [departureNotes, setDepartureNotes] = useState('');
  const [done, setDone] = useState(false);

  const toggleCheck = (key: keyof typeof checks) =>
    setChecks(c => ({ ...c, [key]: !c[key] }));

  const step2Complete = checks.chip && checks.passport && checks.meds;

  if (done) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(9,12,2,0.45)' }}>
        <div style={{ ...CARD, width: '100%', maxWidth: 480, padding: 32, textAlign: 'center' }}>
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: '#23967F' }} />
          </div>
          <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 6 }}>Outtake Recorded</p>
          <p style={{ fontSize: 14, color: '#53584A', marginBottom: 20 }}>
            {animal.name}'s profile has been archived and moved to the Outtake Registry.
          </p>
          <button onClick={onClose} className="px-8 py-2.5 text-white" style={{ background: '#23967F', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(9,12,2,0.45)' }}>
      <div style={{ ...CARD, width: '100%', maxWidth: 520, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #E2DDD9' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>Record Official Outtake / Animal Departure</p>
            <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>{animal.name} · {animal.noraId}</p>
          </div>
          <button onClick={onClose} style={{ color: '#53584A' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex px-6 pt-4 pb-3 gap-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 24, height: 24, borderRadius: '50%', background: step >= s ? '#F6511D' : '#E2DDD9', color: step >= s ? '#ffffff' : '#53584A', fontSize: 12, fontWeight: 700 }}
              >
                {step > s ? <CheckCircle2 className="w-3.5 h-3.5" /> : s}
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, color: step >= s ? '#090C02' : '#53584A', whiteSpace: 'nowrap' }}>
                {s === 1 ? 'Adopter Verification' : s === 2 ? 'Medical Check' : 'Finalisation'}
              </span>
              {s < 3 && <div className="flex-1 h-px" style={{ background: step > s ? '#F6511D' : '#E2DDD9' }} />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {step === 1 && (
            <>
              {/* Auto-populated adopter */}
              <div style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8, padding: '12px 14px' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Adopter on file</p>
                <div className="grid grid-cols-2 gap-y-1.5">
                  {[
                    ['Name', 'Nathan Dubois'],
                    ['Email', 'nathan.d@proximus.be'],
                    ['Phone', '+32 476 88 23 45'],
                    ['Application', 'APP-005'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p style={{ fontSize: 11, color: '#53584A' }}>{k}</p>
                      <p style={{ fontSize: 13, fontWeight: 500, color: '#090C02' }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Legal ID Number *</label>
                <input value={legalId} onChange={e => setLegalId(e.target.value)} placeholder="National register number or passport #" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Adoption Contract</label>
                {contractUploaded ? (
                  <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: '#EAF5F2', border: '1px solid #23967F', borderRadius: 8 }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: '#23967F' }} />
                    <span style={{ fontSize: 13, color: '#23967F', fontWeight: 500 }}>adoption_contract_signed.pdf</span>
                    <button onClick={() => setContractUploaded(false)} className="ml-auto"><X className="w-3.5 h-3.5" style={{ color: '#23967F' }} /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => setContractUploaded(true)}
                    className="w-full flex items-center justify-center gap-2 py-3"
                    style={{ border: '1.5px dashed #E2DDD9', borderRadius: 8, color: '#53584A', fontSize: 13, background: '#FBF9F8' }}
                  >
                    <Upload className="w-4 h-4" /> Upload signed contract (PDF)
                  </button>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <p style={{ fontSize: 14, color: '#53584A', marginBottom: 4 }}>Confirm all items have been completed before finalising the departure.</p>
              {[
                { key: 'chip' as const, label: 'Microchip registry transferred to new owner', sub: 'EUROPETNET / CentralRegister confirmed' },
                { key: 'passport' as const, label: 'European Pet Passport handed over', sub: 'Physical document signed and dated' },
                { key: 'meds' as const, label: 'Medication / Vaccination log signed', sub: 'Owner has received copy of full medical dossier' },
              ].map(({ key, label, sub }) => (
                <button
                  key={key}
                  onClick={() => toggleCheck(key)}
                  className="w-full flex items-start gap-3 p-4 text-left transition-all"
                  style={{
                    borderRadius: 10,
                    border: `1.5px solid ${checks[key] ? '#23967F' : '#E2DDD9'}`,
                    background: checks[key] ? '#EAF5F2' : '#ffffff',
                  }}
                >
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ border: `1.5px solid ${checks[key] ? '#23967F' : '#E2DDD9'}`, background: checks[key] ? '#23967F' : '#ffffff' }}
                  >
                    {checks[key] && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#090C02' }}>{label}</p>
                    <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }}>{sub}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Departure Date *</label>
                <input type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#090C02', marginBottom: 6 }}>Departure Notes</label>
                <textarea
                  value={departureNotes}
                  onChange={e => setDepartureNotes(e.target.value)}
                  rows={4}
                  placeholder="Any final notes about the adoption, special circumstances, follow-up needed..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>
              <div className="p-4" style={{ background: '#FFF0EB', borderRadius: 8, border: '1px solid rgba(246,81,29,0.2)' }}>
                <p style={{ fontSize: 13, color: '#F6511D', fontWeight: 500 }}>This action is irreversible. The animal profile will be archived and removed from the active intake list.</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderTop: '1px solid #E2DDD9' }}>
          <button
            onClick={step === 1 ? onClose : () => setStep(s => s - 1)}
            style={{ fontSize: 14, fontWeight: 500, color: '#090C02', background: 'transparent', padding: '8px 16px', borderRadius: 8 }}
          >
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 ? (!legalId || !contractUploaded) : !step2Complete}
              className="px-6 py-2.5 text-white"
              style={{ background: '#F6511D', borderRadius: 8, fontWeight: 600, fontSize: 14, opacity: (step === 1 ? (!legalId || !contractUploaded) : !step2Complete) ? 0.4 : 1, cursor: (step === 1 ? (!legalId || !contractUploaded) : !step2Complete) ? 'not-allowed' : 'pointer' }}
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={() => { if (departureDate) setDone(true); }}
              disabled={!departureDate}
              className="px-6 py-2.5 text-white"
              style={{ background: '#F6511D', borderRadius: 8, fontWeight: 700, fontSize: 14, opacity: !departureDate ? 0.4 : 1, cursor: !departureDate ? 'not-allowed' : 'pointer' }}
            >
              Complete Outtake & Archive Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ApplicationOverlay({ app, onClose, onMove }: { app: Application; onClose: () => void; onMove: (id: string, stage: Stage) => void }) {
  const currentIdx = COLUMNS.findIndex(c => c.key === app.stage);

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-end p-4 lg:p-6" style={{ background: 'rgba(9,12,2,0.3)' }} onClick={onClose}>
      <div
        className="relative h-full overflow-y-auto"
        style={{ ...CARD, width: '100%', maxWidth: 460, background: '#ffffff' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #E2DDD9', position: 'sticky', top: 0, background: '#ffffff', zIndex: 1 }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>{app.adopter}</p>
            <p style={{ fontSize: 12, color: '#53584A' }}>{app.id} · Submitted {app.date}</p>
          </div>
          <button onClick={onClose}><X className="w-5 h-5" style={{ color: '#53584A' }} /></button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Stage */}
          <div className="flex items-center gap-2 flex-wrap">
            {COLUMNS.map((col, i) => (
              <button
                key={col.key}
                onClick={() => onMove(app.id, col.key)}
                style={{
                  borderRadius: 100,
                  padding: '4px 12px',
                  background: app.stage === col.key ? col.bg : '#FBF9F8',
                  color: app.stage === col.key ? col.color : '#53584A',
                  border: `1.5px solid ${app.stage === col.key ? col.color : '#E2DDD9'}`,
                  fontSize: 11,
                  fontWeight: app.stage === col.key ? 700 : 400,
                  cursor: 'pointer',
                }}
              >
                {i + 1}. {col.label}
              </button>
            ))}
          </div>

          {/* Animal */}
          <div className="flex items-center gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
            <img
              src={ANIMALS.find(a => a.id === app.animalId)?.photo}
              alt={app.animal}
              className="w-12 h-12 object-cover flex-shrink-0"
              style={{ borderRadius: 8 }}
            />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#090C02' }}>Applying for: {app.animal}</p>
              <p style={{ fontSize: 12, color: '#53584A' }}>Pet ID: {ANIMALS.find(a => a.id === app.animalId)?.noraId}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Contact Details</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 12, color: '#53584A', width: 48 }}>Email</span>
                <a href={`mailto:${app.email}`} className="flex items-center gap-1" style={{ fontSize: 13, color: '#F6511D', fontWeight: 500 }}>
                  {app.email} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 12, color: '#53584A', width: 48 }}>Phone</span>
                <span style={{ fontSize: 13, color: '#090C02' }}>{app.phone}</span>
              </div>
            </div>
          </div>

          {/* Form responses */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Application Responses</p>
            <div className="space-y-3">
              {[
                { q: 'Household Type & Living Situation', a: app.householdType },
                { q: 'Working Hours / Daily Schedule', a: app.workingHours },
                { q: 'Prior Pet Experience', a: app.priorPets },
                { q: 'Experience Level', a: app.experience },
              ].map(({ q, a }) => (
                <div key={q} className="p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', marginBottom: 4 }}>{q}</p>
                  <p style={{ fontSize: 13, color: '#090C02' }}>{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {app.notes && (
            <div className="p-3" style={{ background: '#FFF0EB', border: '1px solid rgba(246,81,29,0.2)', borderRadius: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#F6511D', marginBottom: 4 }}>Staff Notes</p>
              <p style={{ fontSize: 13, color: '#090C02' }}>{app.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            {currentIdx < COLUMNS.length - 1 && (
              <button
                onClick={() => onMove(app.id, COLUMNS[currentIdx + 1].key)}
                className="flex items-center justify-center gap-1.5 py-2.5 text-white"
                style={{ background: '#23967F', borderRadius: 8, fontWeight: 600, fontSize: 13 }}
              >
                Advance <ChevronRight className="w-4 h-4" />
              </button>
            )}
            {currentIdx > 0 && (
              <button
                onClick={() => onMove(app.id, COLUMNS[currentIdx - 1].key)}
                className="flex items-center justify-center gap-1.5 py-2.5"
                style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8, fontWeight: 500, fontSize: 13, color: '#53584A' }}
              >
                <ChevronLeft className="w-4 h-4" /> Move Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ApplicationTracker() {
  const [tab, setTab] = useState<TabKey>('applications');
  const [apps, setApps] = useState<Application[]>(MOCK_APPS);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [outtakeAnimal, setOuttakeAnimal] = useState<(typeof OUTTAKE_ANIMALS)[0] | null>(null);
  const [formToggles, setFormToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(FORM_QUESTIONS.map(q => [q.key, q.on]))
  );

  const moveApp = (id: string, stage: Stage) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, stage } : a));
    setSelectedApp(prev => prev?.id === id ? { ...prev, stage } : prev);
  };

  const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'applications', label: 'Applications Workspace', icon: ClipboardList },
    { key: 'forms', label: 'Forms Builder', icon: Settings },
    { key: 'outtake', label: 'Outtake Registry', icon: ArrowLeftRight },
  ];

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: FONT, background: '#FBF9F8' }}>
      {/* Sub-nav */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #E2DDD9' }}>
        <div className="px-6 pt-5 pb-0">
          <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 12 }}>Shelter Management Workspace</p>
          <div className="flex gap-1">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="flex items-center gap-2 px-4 py-2.5 transition-all"
                style={{
                  borderRadius: '8px 8px 0 0',
                  background: tab === key ? '#FBF9F8' : 'transparent',
                  color: tab === key ? '#090C02' : '#53584A',
                  fontWeight: tab === key ? 600 : 400,
                  fontSize: 13,
                  borderTop: tab === key ? '1px solid #E2DDD9' : 'none',
                  borderLeft: tab === key ? '1px solid #E2DDD9' : 'none',
                  borderRight: tab === key ? '1px solid #E2DDD9' : 'none',
                  borderBottom: tab === key ? '2px solid #FBF9F8' : 'none',
                  marginBottom: tab === key ? -1 : 0,
                }}
              >
                <Icon style={{ width: 14, height: 14 }} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Applications Workspace — Kanban */}
        {tab === 'applications' && (
          <div className="p-5 lg:p-6 h-full">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 style={{ color: '#090C02', marginBottom: 2 }}>Applications Workspace</h4>
                <p style={{ fontSize: 14, color: '#53584A' }}>{apps.length} total applications across {COLUMNS.length} stages</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
              {COLUMNS.map(col => {
                const colApps = apps.filter(a => a.stage === col.key);
                return (
                  <div key={col.key}>
                    {/* Column header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="rounded-full px-2.5 py-0.5"
                          style={{ background: col.bg, color: col.color, fontSize: 11, fontWeight: 700 }}
                        >
                          {colApps.length}
                        </span>
                        <p style={{ fontSize: 12, fontWeight: 600, color: '#090C02' }}>{col.label}</p>
                      </div>
                    </div>

                    {/* Cards */}
                    <div className="space-y-3">
                      {colApps.length === 0 && (
                        <div
                          className="py-8 text-center"
                          style={{ border: '1.5px dashed #E2DDD9', borderRadius: 10 }}
                        >
                          <p style={{ fontSize: 12, color: '#53584A' }}>No applications</p>
                        </div>
                      )}
                      {colApps.map(app => (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className="w-full text-left transition-all hover:-translate-y-0.5"
                          style={{ ...CARD, padding: '14px 14px', display: 'block', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#090C02' }}>{app.adopter}</p>
                            <span style={{ fontSize: 10, color: '#53584A', fontFamily: 'monospace' }}>{app.id}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <img
                              src={ANIMALS.find(a => a.id === app.animalId)?.photo}
                              alt=""
                              className="w-6 h-6 object-cover flex-shrink-0"
                              style={{ borderRadius: 4 }}
                            />
                            <p style={{ fontSize: 12, color: '#53584A' }}>{app.animal}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span style={{ fontSize: 11, color: '#53584A' }}>{app.date}</span>
                            <span style={{ fontSize: 11, color: col.color, fontWeight: 500 }}>View →</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Forms Builder */}
        {tab === 'forms' && (
          <div className="p-5 lg:p-6">
            <div className="mb-5">
              <h4 style={{ color: '#090C02', marginBottom: 2 }}>Editable Forms Builder</h4>
              <p style={{ fontSize: 14, color: '#53584A' }}>Customise which questions appear on your shelter's adoption application form.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Preview */}
              <div style={CARD} className="p-5">
                <p style={{ fontWeight: 700, fontSize: 14, color: '#090C02', marginBottom: 14 }}>Form Preview</p>
                <div className="space-y-3">
                  {FORM_QUESTIONS.filter(q => formToggles[q.key]).map((q, i) => (
                    <div key={q.key} className="p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
                      <div className="flex items-start gap-2">
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#53584A', minWidth: 18 }}>{i + 1}.</span>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#090C02' }}>{q.label}</p>
                      </div>
                      <div className="mt-2 ml-5 h-8 rounded" style={{ background: '#E2DDD9' }} />
                    </div>
                  ))}
                  {Object.values(formToggles).every(v => !v) && (
                    <p style={{ fontSize: 13, color: '#53584A', textAlign: 'center', padding: 20 }}>Enable questions using the switchboard →</p>
                  )}
                </div>
              </div>

              {/* Switchboard */}
              <div style={CARD} className="p-5">
                <p style={{ fontWeight: 700, fontSize: 14, color: '#090C02', marginBottom: 14 }}>Question Switchboard</p>
                <div className="space-y-3">
                  {FORM_QUESTIONS.map(q => (
                    <div
                      key={q.key}
                      className="flex items-center justify-between gap-3 p-3"
                      style={{ background: formToggles[q.key] ? '#EAF5F2' : '#FBF9F8', border: `1px solid ${formToggles[q.key] ? '#23967F' : '#E2DDD9'}`, borderRadius: 8, transition: 'all 0.15s' }}
                    >
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#090C02' }}>{q.label}</p>
                        <p style={{ fontSize: 11, color: '#53584A', marginTop: 1 }}>{q.key === 'household' || q.key === 'working' || q.key === 'prior' ? 'Standard' : 'Optional'}</p>
                      </div>
                      <div
                        onClick={() => setFormToggles(t => ({ ...t, [q.key]: !t[q.key] }))}
                        className="flex-shrink-0 flex items-center px-0.5 cursor-pointer"
                        style={{ width: 36, height: 20, borderRadius: 100, background: formToggles[q.key] ? '#23967F' : '#E2DDD9', transition: 'background 0.2s' }}
                      >
                        <div
                          className="bg-white"
                          style={{ width: 16, height: 16, borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'transform 0.2s', transform: formToggles[q.key] ? 'translateX(16px)' : 'translateX(0)' }}
                        />
                      </div>
                    </div>
                  ))}

                  <button
                    className="w-full flex items-center justify-center gap-2 py-3 transition-colors"
                    style={{ border: '1.5px dashed #E2DDD9', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#23967F'; (e.currentTarget as HTMLElement).style.color = '#23967F'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2DDD9'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
                  >
                    <Plus className="w-4 h-4" />Add Custom Shelter Requirement Field
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Outtake Registry */}
        {tab === 'outtake' && (
          <div className="p-5 lg:p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h4 style={{ color: '#090C02', marginBottom: 2 }}>Outtake Registry</h4>
                <p style={{ fontSize: 14, color: '#53584A' }}>Record official departures and archive animal profiles.</p>
              </div>
            </div>

            {/* Active animals ready for outtake */}
            <div style={CARD} className="overflow-hidden">
              <div className="px-5 py-4" style={{ borderBottom: '1px solid #E2DDD9' }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>Animals Ready for Departure</p>
                <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>Pre-approved applications awaiting official outtake record</p>
              </div>
              <div>
                {OUTTAKE_ANIMALS.map((animal, i) => (
                  <div
                    key={animal.id}
                    className="flex items-center gap-4 px-5 py-4"
                    style={{ borderTop: i > 0 ? '1px solid #E2DDD9' : 'none' }}
                  >
                    <img src={animal.photo} alt={animal.name} className="w-12 h-12 object-cover flex-shrink-0" style={{ borderRadius: 8 }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>{animal.name}</p>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#53584A' }}>{animal.noraId}</span>
                      </div>
                      <p style={{ fontSize: 13, color: '#53584A', marginTop: 1 }}>{animal.breed} · {animal.gender}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full px-2.5 py-1" style={{ background: '#135346', color: '#ffffff', fontSize: 11, fontWeight: 700 }}>Pre-Approved</span>
                      <button
                        onClick={() => setOuttakeAnimal(animal)}
                        className="flex items-center gap-1.5 px-4 py-2 text-white"
                        style={{ background: '#F6511D', borderRadius: 8, fontSize: 13, fontWeight: 600 }}
                      >
                        <FileText className="w-3.5 h-3.5" />Record Outtake
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed outtakes */}
            <div className="mt-5" style={CARD}>
              <div className="px-5 py-4" style={{ borderBottom: '1px solid #E2DDD9' }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>Archived Departures</p>
              </div>
              <div className="px-5 py-8 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3" style={{ color: '#E2DDD9' }} />
                <p style={{ fontSize: 13, color: '#53584A' }}>No archived departures yet this period.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Application overlay */}
      {selectedApp && (
        <ApplicationOverlay
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onMove={moveApp}
        />
      )}

      {/* Outtake modal */}
      {outtakeAnimal && (
        <OuttakeModal animal={outtakeAnimal} onClose={() => setOuttakeAnimal(null)} />
      )}
    </div>
  );
}
