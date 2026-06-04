import { useState, useMemo } from 'react';
import { ANIMALS } from '../../data/mockData';
import { NfcIllustration } from '../../components/LoopetIllustrations';
import { Search, Footprints, UtensilsCrossed, Heart, Stethoscope, Bath, GraduationCap, Nfc, CheckCircle2, X, Loader2 } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 16,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const ACTIVITY_TYPES = [
  { type: 'Walk',          icon: Footprints,      color: '#23967F', bg: '#EAF5F2' },
  { type: 'Feed',          icon: UtensilsCrossed, color: '#F6511D', bg: '#FFF0EB' },
  { type: 'Socialization', icon: Heart,            color: '#135346', bg: '#EAF5F2' },
  { type: 'Vet Visit',     icon: Stethoscope,     color: '#090C02', bg: '#FBF9F8' },
  { type: 'Bath',          icon: Bath,             color: '#53584A', bg: '#FBF9F8' },
  { type: 'Training',      icon: GraduationCap,   color: '#F6511D', bg: '#FFF0EB' },
];

type NfcStep = 'scan' | 'confirm' | 'done';

interface LogEntry {
  animalId: string;
  animalName: string;
  animalPhoto: string;
  type: string;
  duration: string;
  notes: string;
  time: string;
}

export default function ActivityLog() {
  const [query, setQuery] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState<typeof ANIMALS[0] | null>(null);
  const [activeType, setActiveType] = useState('Walk');
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('30');
  const [sessionLog, setSessionLog] = useState<LogEntry[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const [showNfcPopup, setShowNfcPopup] = useState(false);
  const [nfcStep, setNfcStep] = useState<NfcStep>('scan');
  const [nfcTagId, setNfcTagId] = useState('');

  const filtered = ANIMALS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.breed.toLowerCase().includes(query.toLowerCase())
  );

  const todayCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ACTIVITY_TYPES.forEach(a => { counts[a.type] = 0; });
    ANIMALS.forEach(animal => {
      animal.activityLog.forEach(entry => {
        if (counts[entry.type] !== undefined) counts[entry.type]++;
      });
    });
    counts['Walk'] += 4;
    counts['Feed'] += 7;
    counts['Socialization'] += 3;
    return counts;
  }, []);

  const allActivityLog = useMemo(() =>
    ANIMALS.flatMap(a =>
      a.activityLog.map(entry => ({ ...entry, animalName: a.name, animalPhoto: a.photo }))
    ).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 15),
  []);

  const handleLog = () => {
    if (!selectedAnimal) return;
    const entry: LogEntry = {
      animalId: selectedAnimal.id,
      animalName: selectedAnimal.name,
      animalPhoto: selectedAnimal.photo,
      type: activeType,
      duration,
      notes,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setSessionLog(prev => [entry, ...prev].slice(0, 8));
    setNotes('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const openNfcPopup = () => {
    setNfcStep('scan');
    setNfcTagId('');
    setShowNfcPopup(true);
  };

  const handleNfcScan = () => {
    setNfcStep('confirm');
    setTimeout(() => {
      const id = `NFC-${selectedAnimal!.id.replace('PET-', '')}`;
      setNfcTagId(id);
      setNfcStep('done');
    }, 1800);
  };

  const closeNfcPopup = () => {
    setShowNfcPopup(false);
    setTimeout(() => setNfcStep('scan'), 300);
  };

  const actConfig = (type: string) => ACTIVITY_TYPES.find(a => a.type === type) || ACTIVITY_TYPES[0];

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

  return (
    <div className="p-5 lg:p-7" style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%' }}>

      {/* NFC Popup — 3 state machine */}
      {showNfcPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/25" onClick={closeNfcPopup} />
          <div className="relative max-w-sm w-full text-center" style={{ ...CARD, padding: 36, borderRadius: 20 }}>
            <button className="absolute top-4 right-4 p-1" onClick={closeNfcPopup} style={{ borderRadius: 6 }}>
              <X className="w-5 h-5" style={{ color: '#53584A' }} />
            </button>

            {nfcStep === 'scan' && (
              <>
                <div className="flex items-center justify-center mb-5">
                  <NfcIllustration className="w-24 h-24" />
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 6 }}>Assign NFC Tag</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 24, lineHeight: 1.5 }}>
                  Hold an NFC tag near the reader to link it to <strong style={{ color: '#090C02' }}>{selectedAnimal?.name}</strong>
                </p>
                <div className="flex gap-1.5 mb-6">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-2 animate-pulse"
                      style={{ borderRadius: 100, background: '#23967F', animationDelay: `${i * 0.15}s`, animationDuration: '1.2s' }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNfcScan}
                  className="w-full py-3.5"
                  style={{ background: '#23967F', borderRadius: 10, color: '#ffffff', fontSize: 14, fontWeight: 600 }}
                >
                  <Nfc className="w-4 h-4 inline mr-2 -mt-0.5" />
                  Simulate NFC Scan
                </button>
                <p style={{ fontSize: 12, color: '#53584A', marginTop: 12 }}>
                  Once linked, tap the tag to instantly log activities without opening the app
                </p>
              </>
            )}

            {nfcStep === 'confirm' && (
              <>
                <div className="flex items-center justify-center mb-5">
                  <div className="w-24 h-24 flex items-center justify-center" style={{ borderRadius: '50%', background: 'rgba(35,150,127,0.15)', border: '2px dashed #23967F' }}>
                    <Loader2 className="w-10 h-10 animate-spin" style={{ color: '#23967F' }} />
                  </div>
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 6 }}>Reading Tag...</p>
                <p style={{ fontSize: 14, color: '#53584A' }}>Establishing secure link with NFC chip</p>
                <div className="flex gap-1.5 mt-6">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-2 animate-pulse"
                      style={{ borderRadius: 100, background: '#23967F', animationDelay: `${i * 0.12}s`, animationDuration: '0.8s' }}
                    />
                  ))}
                </div>
              </>
            )}

            {nfcStep === 'done' && (
              <>
                <div className="flex items-center justify-center mb-5">
                  <div className="w-24 h-24 flex items-center justify-center" style={{ borderRadius: '50%', background: '#23967F' }}>
                    <CheckCircle2 className="w-12 h-12" style={{ color: '#ffffff' }} />
                  </div>
                </div>
                <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 6 }}>Tag Linked!</p>
                <p style={{ fontSize: 14, color: '#53584A', marginBottom: 16, lineHeight: 1.5 }}>
                  NFC tag successfully linked to <strong style={{ color: '#090C02' }}>{selectedAnimal?.name}</strong>
                </p>
                <div className="px-4 py-3 mb-6" style={{ background: '#FBF9F8', borderRadius: 8, border: '1px solid rgba(9,12,2,0.08)' }}>
                  <p style={{ fontSize: 11, color: '#53584A', marginBottom: 2 }}>Tag ID</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#090C02', letterSpacing: '0.04em' }}>{nfcTagId}</p>
                </div>
                <button
                  onClick={closeNfcPopup}
                  className="w-full py-3.5"
                  style={{ background: '#135346', borderRadius: 10, color: '#ffffff', fontSize: 14, fontWeight: 600 }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Success toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 animate-in fade-in slide-in-from-right-4"
          style={{ background: '#23967F', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#ffffff' }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#ffffff' }}>Activity logged!</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>
              {activeType} · {selectedAnimal?.name} · {duration} min
            </p>
          </div>
        </div>
      )}

      {/* Page header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h4 style={{ color: '#090C02', marginBottom: 3 }}>NFC Activity Log</h4>
          <p style={{ fontSize: 14, color: '#53584A' }}>Tap to log daily tasks — assign NFC tags for instant scanning</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-2" style={{ background: 'rgba(200,241,53,0.12)', borderRadius: 8, border: '1px solid rgba(200,241,53,0.4)' }}>
          <Nfc className="w-4 h-4" style={{ color: '#135346' }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#135346' }}>NFC Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Left: Animal selector + Quick log ── */}
        <div className="lg:col-span-1 space-y-4">
          <div style={CARD} className="p-4">
            <p style={{ fontSize: 13, fontWeight: 600, color: '#090C02', marginBottom: 10 }}>Select Animal</p>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#53584A' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name or breed..."
                style={{ ...inputStyle, paddingLeft: 40 }}
              />
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {(query ? filtered : ANIMALS).map(animal => (
                <button
                  key={animal.id}
                  onClick={() => { setSelectedAnimal(animal); setQuery(''); }}
                  className="w-full flex items-center gap-3 p-2.5 text-left transition-all"
                  style={{
                    borderRadius: 8,
                    background: selectedAnimal?.id === animal.id ? '#23967F' : '#FBF9F8',
                    border: `1px solid ${selectedAnimal?.id === animal.id ? '#23967F' : 'rgba(9,12,2,0.06)'}`,
                  }}
                >
                  <img src={animal.photo} alt={animal.name} className="w-8 h-8 object-cover flex-shrink-0" style={{ borderRadius: 6 }} />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: 13, fontWeight: 600, color: selectedAnimal?.id === animal.id ? '#ffffff' : '#090C02' }} className="truncate">
                      {animal.name}
                    </p>
                    <p style={{ fontSize: 11, color: selectedAnimal?.id === animal.id ? 'rgba(255,255,255,0.65)' : '#53584A' }} className="truncate">
                      {animal.species} · {animal.location}
                    </p>
                  </div>
                  {selectedAnimal?.id === animal.id && (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#ffffff' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quick-log panel */}
          {selectedAnimal ? (
            <div style={CARD} className="p-4 space-y-4">
              <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid rgba(9,12,2,0.06)' }}>
                <img src={selectedAnimal.photo} alt={selectedAnimal.name} className="w-10 h-10 object-cover" style={{ borderRadius: 8 }} />
                <div className="flex-1">
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>{selectedAnimal.name}</p>
                  <p style={{ fontSize: 12, color: '#53584A' }}>{selectedAnimal.breed} · {selectedAnimal.location}</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#53584A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Activity Type</p>
                <div className="grid grid-cols-3 gap-2">
                  {ACTIVITY_TYPES.map(act => {
                    const Icon = act.icon;
                    const isActive = activeType === act.type;
                    return (
                      <button
                        key={act.type}
                        onClick={() => setActiveType(act.type)}
                        className="flex flex-col items-center gap-1.5 py-3 transition-all"
                        style={{
                          borderRadius: 10,
                          background: isActive ? act.color : '#FBF9F8',
                          border: `1.5px solid ${isActive ? act.color : 'rgba(9,12,2,0.06)'}`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isActive ? '#ffffff' : act.color }} />
                        <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? '#ffffff' : '#53584A', lineHeight: 1.2, textAlign: 'center' }}>
                          {act.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#53584A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Duration</p>
                <div className="flex gap-2">
                  {['15', '30', '45', '60', '90'].map(d => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className="flex-1 py-2"
                      style={{
                        borderRadius: 8,
                        background: duration === d ? '#23967F' : '#FBF9F8',
                        color: duration === d ? '#ffffff' : '#090C02',
                        fontSize: 12,
                        fontWeight: 600,
                        border: `1px solid ${duration === d ? '#23967F' : 'rgba(9,12,2,0.08)'}`,
                      }}
                    >
                      {d}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#53584A', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Notes</p>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Any observations..."
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              <button
                onClick={handleLog}
                className="w-full flex items-center justify-center gap-2"
                style={{
                  background: actConfig(activeType).color,
                  borderRadius: 10,
                  color: '#ffffff',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '16px 0',
                }}
              >
                <span>Log {activeType}</span>
              </button>

              <button
                onClick={openNfcPopup}
                className="w-full py-3 flex items-center justify-center gap-2 transition-all hover:bg-lime-50"
                style={{
                  borderRadius: 10,
                  border: '2px dashed #23967F',
                  color: '#090C02',
                  background: 'rgba(200,241,53,0.06)',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <Nfc className="w-4 h-4" style={{ color: '#135346' }} />
                Assign NFC Tag to {selectedAnimal.name}
              </button>
            </div>
          ) : (
            <div style={{ ...CARD, padding: 24, textAlign: 'center' }}>
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
                <Footprints className="w-6 h-6" style={{ color: '#23967F' }} />
              </div>
              <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.5 }}>Select an animal above to start logging activities</p>
            </div>
          )}
        </div>

        {/* ── Right: Summary + logs ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Today's summary */}
          <div style={CARD} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>Today's Activity Summary</p>
              <span style={{ fontSize: 12, color: '#53584A' }}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ACTIVITY_TYPES.map(act => (
                <div key={act.type} className="flex items-center gap-3 p-3" style={{ background: act.bg, borderRadius: 10 }}>
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 8, background: act.color }}>
                    <act.icon className="w-4 h-4" style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 20, fontWeight: 700, color: act.color, lineHeight: 1 }}>{todayCounts[act.type] ?? 0}</p>
                    <p style={{ fontSize: 11, color: act.color, opacity: 0.8, marginTop: 1 }}>{act.type}s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session log (logged this session) */}
          {sessionLog.length > 0 && (
            <div style={CARD} className="p-5">
              <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 12 }}>This Session</p>
              <div className="space-y-2">
                {sessionLog.map((entry, i) => {
                  const cfg = actConfig(entry.type);
                  return (
                    <div key={i} className="flex items-center gap-3 p-3" style={{ background: cfg.bg, borderRadius: 8 }}>
                      <img src={entry.animalPhoto} alt={entry.animalName} className="w-8 h-8 object-cover flex-shrink-0" style={{ borderRadius: 6 }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: 13, fontWeight: 600, color: '#090C02' }}>{entry.animalName}</span>
                          <span style={{ fontSize: 11, fontWeight: 600, color: cfg.color }}>{entry.type}</span>
                          <span style={{ fontSize: 11, color: '#53584A' }}>· {entry.duration} min</span>
                        </div>
                        {entry.notes && <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }} className="truncate">{entry.notes}</p>}
                      </div>
                      <span style={{ fontSize: 11, color: '#53584A', flexShrink: 0 }}>{entry.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Historical feed */}
          <div style={CARD} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>Recent Activity Feed</p>
              <span style={{ fontSize: 12, color: '#53584A' }}>All animals</span>
            </div>
            <div className="space-y-2">
              {allActivityLog.map((entry, i) => {
                const cfg = ACTIVITY_TYPES.find(a => a.type === entry.type) || ACTIVITY_TYPES[0];
                return (
                  <div key={i} className="flex items-start gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                    <img src={entry.animalPhoto} alt={entry.animalName} className="w-8 h-8 object-cover flex-shrink-0 mt-0.5" style={{ borderRadius: 6 }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#090C02' }}>{entry.animalName}</span>
                        <span className="px-2 py-0.5" style={{ background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 600, borderRadius: 100 }}>
                          {entry.type}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }} className="truncate">{entry.notes}</p>
                      <p style={{ fontSize: 11, color: '#53584A', marginTop: 1 }}>
                        {entry.staff} · {entry.date}
                        {entry.duration ? ` · ${entry.duration} min` : ''}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
