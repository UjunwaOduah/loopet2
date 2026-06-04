import { useState } from 'react';
import { ANIMALS } from '../../data/mockData';
import { Search, Heart, ArrowRight, MapPin, AlertTriangle, CheckCircle2, FileText } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

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

type OuttakeType = 'Adopted' | 'Transferred' | 'Deceased' | null;

export default function OuttakeFlow() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<typeof ANIMALS[0] | null>(null);
  const [action, setAction] = useState<OuttakeType>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showFolder, setShowFolder] = useState(false);

  const results = ANIMALS.filter(a =>
    a.status !== 'Adopted' && a.status !== 'Deceased' && a.status !== 'Transferred' &&
    (a.name.toLowerCase().includes(query.toLowerCase()) || a.noraId.toLowerCase().includes(query.toLowerCase()) || a.breed.toLowerCase().includes(query.toLowerCase()))
  );

  const handleConfirm = () => {
    setConfirmed(true);
    if (action === 'Adopted') setTimeout(() => setShowFolder(true), 500);
  };

  const reset = () => { setSelected(null); setAction(null); setConfirmed(false); setShowFolder(false); setQuery(''); };

  const actionConfig = {
    Adopted:     { color: '#F6511D', bg: '#FFF0EB',  icon: Heart,         label: 'Mark as Adopted',    desc: 'Generate digital adoption folder and transfer data to adopter profile' },
    Transferred: { color: '#23967F', bg: '#EAF5F2',  icon: MapPin,        label: 'Log Transfer',       desc: 'Record the new location / receiving shelter' },
    Deceased:    { color: '#53584A', bg: '#FBF9F8',  icon: AlertTriangle, label: 'Mark as Deceased',   desc: 'Archive profile with resolution notes' },
  };

  return (
    <div className="p-5 lg:p-7 max-w-3xl mx-auto" style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%' }}>
      <div className="mb-5">
        <h4 style={{ color: '#090C02', marginBottom: 2 }}>Animal Outtake</h4>
        <p style={{ fontSize: 14, color: '#53584A' }}>Search and update status for animals leaving the shelter</p>
      </div>

      {!selected ? (
        <div className="space-y-4">
          <div style={CARD} className="p-4">
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Find Animal</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#53584A' }} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by name, Pet ID, or breed..."
                style={{ ...inputStyle, paddingLeft: 44 }}
              />
            </div>
          </div>

          {query && (
            <div style={CARD} className="p-4 space-y-2">
              <p style={{ fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 8 }}>{results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p style={{ fontSize: 14, color: '#53584A' }}>No active animals found matching "{query}"</p>
                </div>
              ) : (
                results.map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => setSelected(animal)}
                    className="w-full flex items-center gap-4 p-3 text-left transition-all"
                    style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}
                  >
                    <img src={animal.photo} alt={animal.name} className="w-12 h-12 object-cover flex-shrink-0" style={{ borderRadius: 8 }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p style={{ fontWeight: 500, fontSize: 14, color: '#090C02' }}>{animal.name}</p>
                        <span className="rounded-full px-2.5 py-0.5" style={{ background: animal.status === 'Available' ? '#EAF5F2' : '#FFF0EB', color: animal.status === 'Available' ? '#23967F' : '#F6511D', fontSize: 11, fontWeight: 500 }}>
                          {animal.status}
                        </span>
                      </div>
                      <p style={{ fontSize: 12, color: '#53584A' }}>{animal.noraId} · {animal.breed} · {animal.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#53584A' }} />
                  </button>
                ))
              )}
            </div>
          )}

          {!query && (
            <div style={CARD} className="p-4">
              <p style={{ fontSize: 12, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Recently Active Animals</p>
              <div className="space-y-2">
                {ANIMALS.filter(a => a.status === 'Available').slice(0, 5).map(animal => (
                  <button
                    key={animal.id}
                    onClick={() => setSelected(animal)}
                    className="w-full flex items-center gap-4 p-3 text-left transition-all"
                    style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}
                  >
                    <img src={animal.photo} alt={animal.name} className="w-10 h-10 object-cover flex-shrink-0" style={{ borderRadius: 8 }} />
                    <div className="flex-1 min-w-0">
                      <p style={{ fontWeight: 500, fontSize: 14, color: '#090C02' }} className="truncate">{animal.name}</p>
                      <p style={{ fontSize: 12, color: '#53584A' }} className="truncate">{animal.breed} · {animal.location}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#53584A' }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : !confirmed ? (
        <div className="space-y-4">
          <div style={CARD} className="p-5">
            <button onClick={reset} style={{ fontSize: 13, color: '#53584A', marginBottom: 16 }}>← Back to search</button>
            <div className="flex gap-4 items-center mb-4">
              <img src={selected.photo} alt={selected.name} className="w-20 h-20 object-cover" style={{ borderRadius: 10 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>{selected.name}</p>
                <p style={{ fontSize: 13, color: '#53584A' }}>{selected.noraId}</p>
                <p style={{ fontSize: 13, color: '#53584A' }}>{selected.breed} · {selected.gender}</p>
                <span className="inline-block mt-1 rounded-full px-2.5 py-0.5" style={{ background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500 }}>{selected.status}</span>
              </div>
            </div>
            <div className="px-3 py-2" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8, fontSize: 14 }}>
              <span style={{ fontWeight: 500, color: '#090C02' }}>Location:</span>{' '}
              <span style={{ color: '#53584A' }}>{selected.location}</span>
            </div>
          </div>

          <div style={CARD} className="p-5">
            <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 14 }}>Select Outtake Reason</p>
            <div className="space-y-3">
              {(Object.entries(actionConfig) as [OuttakeType, typeof actionConfig['Adopted']][]).filter(([k]) => k !== null).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setAction(key)}
                    className="w-full flex items-center gap-4 p-4 text-left transition-all"
                    style={{ borderRadius: 8, border: `2px solid ${action === key ? cfg.color : 'transparent'}`, background: action === key ? cfg.bg : '#FBF9F8' }}
                  >
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: 8, background: action === key ? cfg.color : '#ffffff', border: '1px solid rgba(9,12,2,0.08)' }}>
                      <Icon className="w-5 h-5" style={{ color: action === key ? 'white' : cfg.color }} />
                    </div>
                    <div className="flex-1">
                      <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{cfg.label}</p>
                      <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>{cfg.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {action && (
            <div style={CARD} className="p-5 space-y-4">
              <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>
                {action === 'Adopted' ? 'Adoption Details' : action === 'Transferred' ? 'Transfer Details' : 'Deceased Record'}
              </p>

              {action === 'Adopted' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Adopter Name</label>
                    <input placeholder="Full name of adopter" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Adopter Email</label>
                    <input type="email" placeholder="adopter@email.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Adoption Date</label>
                    <input type="date" defaultValue="2026-06-01" style={inputStyle} />
                  </div>
                  <label className="flex items-center gap-2" style={{ fontSize: 13, color: '#090C02' }}>
                    <input type="checkbox" defaultChecked />Generate digital adoption folder
                  </label>
                  <label className="flex items-center gap-2" style={{ fontSize: 13, color: '#090C02' }}>
                    <input type="checkbox" defaultChecked />Email records to adopter
                  </label>
                </>
              )}

              {action === 'Transferred' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Receiving Shelter</label>
                    <input placeholder="Shelter or rescue name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>New Location</label>
                    <input placeholder="City, State" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Transfer Date</label>
                    <input type="date" defaultValue="2026-06-01" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Reason for Transfer</label>
                    <textarea rows={2} placeholder="e.g. Capacity overflow, specialist care needed..." style={{ ...inputStyle, resize: 'none' }} />
                  </div>
                </>
              )}

              {action === 'Deceased' && (
                <>
                  <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 8 }}>
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#53584A' }} />
                    <p style={{ fontSize: 12, color: '#53584A' }}>This action will archive the profile. It cannot be undone.</p>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Date of Passing</label>
                    <input type="date" defaultValue="2026-06-01" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Cause / Resolution Notes</label>
                    <textarea rows={3} placeholder="Please provide notes for the record..." style={{ ...inputStyle, resize: 'none' }} />
                  </div>
                  <label className="flex items-center gap-2" style={{ fontSize: 13, color: '#090C02' }}>
                    <input type="checkbox" />Notify relevant staff members
                  </label>
                </>
              )}

              <button
                onClick={handleConfirm}
                className="w-full py-3 text-white flex items-center justify-center gap-2"
                style={{ background: actionConfig[action].color, borderRadius: 8, fontWeight: 500, fontSize: 14 }}
              >
                {actionConfig[action].label}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ ...CARD, padding: 32, textAlign: 'center' }} className="space-y-5">
          {showFolder && action === 'Adopted' ? (
            <>
              <div className="w-20 h-20 flex items-center justify-center mx-auto" style={{ borderRadius: 12, background: '#FFF0EB' }}>
                <FileText className="w-10 h-10" style={{ color: '#F6511D' }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02' }}>Digital Adoption Folder Created!</p>
              <p style={{ fontSize: 14, color: '#53584A' }}>{selected.name}'s full record has been transferred to the adopter's profile</p>

              <div className="space-y-2 text-left">
                {['Medical history transferred', 'Activity log included', 'Vaccination records attached', 'Adoption agreement generated', 'Welcome email sent to adopter'].map(item => (
                  <div key={item} className="flex items-center gap-3 px-3 py-2" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#23967F' }} />
                    <span style={{ fontSize: 14, color: '#090C02' }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={reset} className="px-6 py-2.5 text-white" style={{ background: '#F6511D', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                Done — Back to Search
              </button>
            </>
          ) : (
            <>
              <div className="w-20 h-20 flex items-center justify-center mx-auto" style={{ borderRadius: '50%', background: '#EAF5F2' }}>
                <CheckCircle2 className="w-10 h-10" style={{ color: '#23967F' }} />
              </div>
              <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02' }}>
                {action === 'Transferred' ? 'Transfer Logged' : 'Record Updated'}
              </p>
              <p style={{ fontSize: 14, color: '#53584A' }}>
                {selected.name}'s status has been updated to <strong>{action}</strong>
              </p>
              <button onClick={reset} className="px-6 py-2.5 text-white" style={{ background: '#23967F', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                Done — Back to Search
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
