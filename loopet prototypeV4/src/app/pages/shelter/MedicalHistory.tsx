import { useState } from 'react';
import { ANIMALS } from '../../data/mockData';
import { Search, Syringe, FileText, Plus, CheckCircle2, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Hospital, Stethoscope, Pill, NotePencil } from '@phosphor-icons/react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const TYPE_CONFIG = {
  Vaccine:   { color: '#23967F', bg: '#EAF5F2', Icon: Syringe },
  Procedure: { color: '#F6511D', bg: '#FFF0EB', Icon: Hospital },
  Checkup:   { color: '#135346', bg: '#EAF5F2', Icon: Stethoscope },
  Treatment: { color: '#090C02', bg: '#FBF9F8', Icon: Pill },
  Note:      { color: '#53584A', bg: '#FBF9F8', Icon: NotePencil },
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

export default function MedicalHistory() {
  const [query, setQuery] = useState('');
  const [selectedAnimal, setSelectedAnimal] = useState(ANIMALS[0]);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [addingRecord, setAddingRecord] = useState(false);
  const [newRecord, setNewRecord] = useState({ type: 'Checkup', title: '', notes: '', vet: '', nextDue: '' });

  const filtered = ANIMALS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase()) || a.noraId.toLowerCase().includes(query.toLowerCase())
  );

  const monthsDiff = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));
  };

  return (
    <div className="p-5 lg:p-7" style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%' }}>
      <div className="mb-5">
        <h4 style={{ color: '#090C02', marginBottom: 2 }}>Medical Records</h4>
        <p style={{ fontSize: 14, color: '#53584A' }}>Full veterinary history and health tracking</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Animal list */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#53584A' }} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search animals..."
              style={{ ...inputStyle, paddingLeft: 40 }}
            />
          </div>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {filtered.map(animal => (
              <button
                key={animal.id}
                onClick={() => setSelectedAnimal(animal)}
                className="w-full flex items-center gap-3 p-3 text-left transition-all"
                style={{ borderRadius: 8, background: selectedAnimal.id === animal.id ? '#23967F' : '#ffffff', border: '1px solid rgba(9,12,2,0.08)' }}
              >
                <img src={animal.photo} alt={animal.name} className="w-10 h-10 object-cover flex-shrink-0" style={{ borderRadius: 8 }} />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, fontWeight: 500, color: selectedAnimal.id === animal.id ? 'white' : '#090C02' }} className="truncate">{animal.name}</p>
                  <p style={{ fontSize: 12, color: selectedAnimal.id === animal.id ? 'rgba(255,255,255,0.6)' : '#53584A' }} className="truncate">
                    {animal.medicalHistory.length} records
                  </p>
                </div>
                <span
                  className="flex-shrink-0"
                  style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 100, ...(selectedAnimal.id === animal.id ? { background: '#23967F', color: '#ffffff' } : { background: '#FBF9F8', color: '#53584A' }) }}
                >
                  {animal.species.slice(0, 2).toUpperCase()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Medical detail panel */}
        <div className="flex-1 space-y-4">
          {/* Animal health summary */}
          <div style={CARD} className="p-5">
            <div className="flex items-start gap-4 mb-4">
              <img src={selectedAnimal.photo} alt={selectedAnimal.name} className="w-16 h-16 object-cover" style={{ borderRadius: 10 }} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>{selectedAnimal.name}</p>
                  <span className="rounded-full px-2.5 py-0.5" style={{ background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500 }}>{selectedAnimal.noraId}</span>
                </div>
                <p style={{ fontSize: 13, color: '#53584A' }}>{selectedAnimal.breed} · {selectedAnimal.gender} · {Math.floor(selectedAnimal.age / 12)} yr {selectedAnimal.age % 12} mo</p>
                <p style={{ fontSize: 13, color: '#53584A' }}>{selectedAnimal.weight} kg · {selectedAnimal.location}</p>
              </div>
              <button
                onClick={() => setAddingRecord(!addingRecord)}
                className="flex items-center gap-1.5 px-3 py-2 text-white flex-shrink-0"
                style={{ background: '#23967F', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
              >
                <Plus className="w-4 h-4" />Add Record
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 rounded-full px-3 py-1" style={selectedAnimal.vaccinated ? { background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500 } : { background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}>
                {selectedAnimal.vaccinated ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {selectedAnimal.vaccinated ? 'Vaccinated' : 'Vaccines Needed'}
              </span>
              <span className="flex items-center gap-1 rounded-full px-3 py-1" style={selectedAnimal.neutered ? { background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500 } : { background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}>
                {selectedAnimal.neutered ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {selectedAnimal.neutered ? 'Neutered/Spayed' : 'Intact — Procedure Needed'}
              </span>
              <span className="rounded-full px-3 py-1" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.08)', color: '#53584A', fontSize: 11, fontWeight: 500 }}>
                {selectedAnimal.status}
              </span>
            </div>
          </div>

          {/* Add record form */}
          {addingRecord && (
            <div style={{ ...CARD, borderLeft: '4px solid #23967F' }} className="p-5">
              <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 14 }}>Add Medical Record</p>
              <div className="space-y-3">
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Record Type</label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(TYPE_CONFIG).map(type => (
                      <button
                        key={type}
                        onClick={() => setNewRecord(r => ({ ...r, type }))}
                        className="rounded-full px-3 py-1"
                        style={{ background: newRecord.type === type ? '#23967F' : '#FBF9F8', color: newRecord.type === type ? 'white' : '#53584A', fontSize: 12, fontWeight: 500, border: '1px solid rgba(9,12,2,0.08)' }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Title</label>
                    <input value={newRecord.title} onChange={e => setNewRecord(r => ({ ...r, title: e.target.value }))} placeholder="e.g. Rabies Vaccine" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Veterinarian</label>
                    <select style={{ ...inputStyle }}>
                      <option>Dr. Patel</option>
                      <option>Dr. Chen</option>
                      <option>Dr. Smith</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Clinical Notes</label>
                  <textarea rows={2} placeholder="Procedure details, observations, dosage..." style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#090C02', marginBottom: 6 }}>Next Due Date (optional)</label>
                  <input type="date" style={inputStyle} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setAddingRecord(false)} style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500, padding: '8px 16px' }}>Cancel</button>
                  <button onClick={() => setAddingRecord(false)} className="flex-1 py-2 text-white" style={{ background: '#23967F', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>Save Record</button>
                </div>
              </div>
            </div>
          )}

          {/* Vaccine tracker */}
          <div style={CARD} className="p-5">
            <p className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 14 }}>
              <Syringe className="w-4 h-4" style={{ color: '#23967F' }} /> Vaccine Tracker
            </p>
            <div className="space-y-2">
              {[
                { name: 'Rabies',        lastDate: '2024-11-16', nextDue: '2027-11-16', status: 'current' },
                { name: 'DHPP/FVRCP',    lastDate: '2024-11-16', nextDue: '2025-11-16', status: 'current' },
                { name: 'Bordetella',    lastDate: '2024-11-16', nextDue: '2025-05-16', status: 'due_soon' },
                { name: 'Leptospirosis', lastDate: '',           nextDue: '',           status: 'missing' },
              ].map(vaccine => (
                <div key={vaccine.name} className="flex items-center gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                  <div className="w-2.5 h-2.5 flex-shrink-0" style={{ borderRadius: '50%', background: vaccine.status === 'current' ? '#23967F' : vaccine.status === 'due_soon' ? '#135346' : '#F6511D' }} />
                  <div className="flex-1">
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{vaccine.name}</p>
                    <p style={{ fontSize: 12, color: '#53584A' }}>
                      {vaccine.lastDate ? `Last: ${vaccine.lastDate}` : 'No record found'}
                      {vaccine.nextDue && ` · Due: ${vaccine.nextDue}`}
                    </p>
                  </div>
                  <span className="rounded-full px-2.5 py-0.5" style={{ ...(vaccine.status === 'current' ? { background: '#EAF5F2', color: '#23967F' } : vaccine.status === 'due_soon' ? { background: '#EAF5F2', color: '#135346' } : { background: '#FFF0EB', color: '#F6511D' }), fontSize: 11, fontWeight: 500 }}>
                    {vaccine.status === 'current' ? 'Current' : vaccine.status === 'due_soon' ? 'Due Soon' : 'Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Medical history timeline */}
          <div style={CARD} className="p-5">
            <p className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 14 }}>
              <FileText className="w-4 h-4" style={{ color: '#23967F' }} />
              Medical History ({selectedAnimal.medicalHistory.length} records)
            </p>
            <div className="space-y-2">
              {selectedAnimal.medicalHistory.map(record => {
                const cfg = TYPE_CONFIG[record.type as keyof typeof TYPE_CONFIG] || TYPE_CONFIG.Note;
                const isExpanded = expandedRecord === record.id;
                return (
                  <div key={record.id} className="overflow-hidden" style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}>
                    <button className="w-full flex items-center gap-3 p-3 text-left" onClick={() => setExpandedRecord(isExpanded ? null : record.id)}>
                      <cfg.Icon size={18} color={cfg.color} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{record.title}</p>
                          <span className="rounded-full px-2.5 py-0.5" style={{ background: cfg.bg, color: cfg.color, fontSize: 11, fontWeight: 500 }}>{record.type}</span>
                        </div>
                        <p style={{ fontSize: 12, color: '#53584A' }}>{record.date} · {record.vet}</p>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: '#53584A' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: '#53584A' }} />}
                    </button>
                    {isExpanded && (
                      <div className="px-4 pb-4 space-y-2">
                        <p style={{ fontSize: 14, color: '#090C02' }}>{record.notes}</p>
                        {record.nextDue && (
                          <div className="flex items-center gap-2" style={{ fontSize: 12, color: '#53584A' }}>
                            <Clock className="w-3 h-3" />
                            Next due: {record.nextDue}
                            {monthsDiff(record.nextDue) <= 1 && (
                              <span className="rounded-full px-2 py-0.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}>Soon!</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
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
