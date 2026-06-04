import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ANIMALS } from '../../data/mockData';
import {
  ArrowLeft, Heart, ShareNetwork, MapPin, ShieldCheck, PlayCircle,
  Star, Buildings, ChatCircle, CalendarBlank, CheckCircle, Scissors,
  Clock, Syringe, FileText, Stethoscope, PersonSimpleWalk, ForkKnife,
  Drop, Trophy,
} from '@phosphor-icons/react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #E2DDD9',
  borderRadius: 12,
};

const RATING_LABELS = ['Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];

function TraitRow({ label, score }: { label: string; score: number }) {
  const clamped = Math.max(1, Math.min(5, score));
  return (
    <div
      className="flex items-center gap-4 py-3"
      style={{ borderBottom: '1px solid #E2DDD9' }}
    >
      <span style={{ fontWeight: 700, fontSize: 14, color: '#090C02', flex: 1, minWidth: 0 }}>{label}</span>
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} size={17} weight={i <= clamped ? 'fill' : 'regular'} color={i <= clamped ? '#F6511D' : '#E2DDD9'} />
        ))}
      </div>
      <span style={{ fontSize: 13, color: '#53584A', flexShrink: 0, minWidth: 80, textAlign: 'right' }}>
        ({RATING_LABELS[clamped - 1]})
      </span>
    </div>
  );
}

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  Walk: <PersonSimpleWalk size={15} weight="regular" />,
  Feed: <ForkKnife size={15} weight="regular" />,
  Socialization: <Heart size={15} weight="regular" />,
  'Vet Visit': <Stethoscope size={15} weight="regular" />,
  Bath: <Drop size={15} weight="regular" />,
  Training: <Trophy size={15} weight="regular" />,
};

const ACTIVITY_COLORS: Record<string, string> = {
  Walk: '#23967F', Feed: '#F6511D', Socialization: '#135346',
  'Vet Visit': '#53584A', Bath: '#53584A', Training: '#F6511D',
};

export default function AnimalProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const animal = ANIMALS.find(a => a.id === id) || ANIMALS[0];
  const animalIdx = ANIMALS.findIndex(a => a.id === animal.id);

  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'bio' | 'medical' | 'activity'>('bio');
  const [showContact, setShowContact] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [visitBooked, setVisitBooked] = useState(false);
  const [message, setMessage] = useState('');

  const thumbs = [
    ANIMALS[(animalIdx + 1) % ANIMALS.length],
    ANIMALS[(animalIdx + 2) % ANIMALS.length],
    ANIMALS[(animalIdx + 3) % ANIMALS.length],
  ];

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 8,
    border: '1px solid #E2DDD9', background: '#FBF9F8',
    color: '#090C02', fontSize: 14, fontFamily: FONT, outline: 'none',
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px', borderRadius: 8, fontSize: 14,
    background: active ? '#FFF0EB' : 'transparent',
    color: active ? '#F6511D' : '#53584A',
    fontWeight: active ? 600 : 400,
    border: `1.5px solid ${active ? '#F6511D' : 'transparent'}`,
    cursor: 'pointer', transition: 'all 0.15s',
    fontFamily: FONT,
  });

  const chip = (bg: string, color: string): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 500,
    background: bg, color, border: bg === '#FBF9F8' ? '1px solid #E2DDD9' : 'none',
  });

  return (
    <div style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%', padding: '24px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
          style={{ color: '#53584A', fontSize: 14, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <ArrowLeft size={18} weight="regular" />
          Back to explore
        </button>

        {/* ── Two-column desktop grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ alignItems: 'start' }}>

          {/* ── LEFT (2/3): content ── */}
          <div className="lg:col-span-2 space-y-5">

            {/* ── Asymmetric Media Grid ── */}
            <div
              className="grid gap-2 overflow-hidden"
              style={{ gridTemplateColumns: '2fr 1fr', height: 360, borderRadius: 16 }}
            >
              {/* Flagship portrait (2/3) */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={animal.photo}
                  alt={animal.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9,12,2,0.55) 30%, transparent 60%)' }} />

                {/* Animal name overlay */}
                <div style={{ position: 'absolute', bottom: 52, left: 16 }}>
                  <h2 style={{ color: '#ffffff', fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>{animal.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 13, marginTop: 2 }}>
                    {animal.breed} · {animal.gender} · {Math.floor(animal.age / 12)}yr {animal.age % 12}mo
                  </p>
                </div>

                {/* Video Playback badge */}
                <div
                  className="absolute bottom-3 left-4 flex items-center gap-2"
                  style={{ background: 'rgba(9,12,2,0.72)', borderRadius: 8, padding: '6px 12px', backdropFilter: 'blur(4px)' }}
                >
                  <PlayCircle size={15} weight="fill" color="#ffffff" />
                  <span style={{ fontSize: 11, color: '#ffffff', fontWeight: 600 }}>Personality Video Playback</span>
                </div>

                {/* Share + Like */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}>
                    <ShareNetwork size={16} weight="regular" color="#090C02" />
                  </button>
                  <button
                    onClick={() => setLiked(!liked)}
                    style={{ width: 36, height: 36, borderRadius: 8, background: liked ? '#F6511D' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                  >
                    <Heart size={16} weight={liked ? 'fill' : 'regular'} color={liked ? '#ffffff' : '#090C02'} />
                  </button>
                </div>
              </div>

              {/* Thumbnail column (1/3) */}
              <div className="flex flex-col gap-2">
                {thumbs.map((a, i) => (
                  <div
                    key={i}
                    style={{ flex: 1, overflow: 'hidden', borderRadius: 8, border: '1px solid #E2DDD9', position: 'relative' }}
                  >
                    <img
                      src={a.photo}
                      alt="Behaviour shot"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2">
              <span style={chip(animal.status === 'Available' ? '#EAF5F2' : '#FFF0EB', animal.status === 'Available' ? '#23967F' : '#F6511D')}>
                <ShieldCheck size={13} weight="fill" />
                {animal.status}
              </span>
              <span style={chip('#FBF9F8', '#53584A')}>{animal.energyLevel}</span>
              <span style={chip('#FBF9F8', '#53584A')}>{animal.weight} kg</span>
              {animal.vaccinated && (
                <span style={chip('#EAF5F2', '#23967F')}>
                  <ShieldCheck size={13} weight="fill" /> Vaccinated
                </span>
              )}
              {animal.neutered && (
                <span style={chip('#EAF5F2', '#23967F')}>
                  <Scissors size={13} weight="regular" /> Neutered
                </span>
              )}
              <span style={chip('#FBF9F8', '#53584A')}>
                <MapPin size={13} weight="regular" /> 2.3 km away
              </span>
            </div>

            {/* Shelter info */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#ffffff', border: '1px solid #E2DDD9', borderRadius: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EAF5F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Buildings size={18} weight="regular" color="#23967F" />
              </div>
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600, color: '#090C02' }}>Happy Paws Animal Rescue</p>
                <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }}>123 Paw Street, Antwerpen · Open today 9:00–17:00</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {(['bio', 'medical', 'activity'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={tabBtn(activeTab === tab)}>
                  {tab === 'bio' ? 'Bio' : tab === 'medical' ? 'Medical' : 'Activity'}
                </button>
              ))}
            </div>

            {/* ── Bio tab ── */}
            {activeTab === 'bio' && (
              <div className="space-y-4">
                <div style={CARD} className="p-5">
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 10 }}>About {animal.name}</p>
                  <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.65 }}>{animal.description}</p>
                </div>

                {/* Trait Matrix */}
                <div style={CARD} className="p-5">
                  <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 4 }}>Trait Matrix</p>
                  <p style={{ fontSize: 12, color: '#53584A', marginBottom: 16 }}>Behavioural compatibility ratings assessed by shelter staff</p>
                  <TraitRow label="Friendliness with Children" score={animal.kidFriendly} />
                  <TraitRow label="Friendliness with Dogs" score={animal.dogFriendly} />
                  <TraitRow label="Friendliness with Cats" score={animal.catFriendly} />
                </div>

                {/* Pet ID */}
                <div style={{ background: '#090C02', borderRadius: 12, padding: '12px 16px' }}>
                  <div className="flex justify-between items-center">
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pet ID</span>
                    <span style={{ fontSize: 14, fontFamily: 'monospace', fontWeight: 700, color: '#23967F' }}>{animal.noraId}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ── Medical tab ── */}
            {activeTab === 'medical' && (
              <div className="space-y-4">
                <div style={CARD} className="p-5">
                  <p className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 10 }}>
                    <Syringe size={16} weight="regular" color="#23967F" /> Health Summary
                  </p>
                  <p style={{ fontSize: 14, color: '#53584A' }}>{animal.medicalNotes}</p>
                </div>
                <div style={CARD} className="p-5">
                  <p className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 14 }}>
                    <FileText size={16} weight="regular" color="#23967F" /> Medical History
                  </p>
                  <div className="space-y-2">
                    {animal.medicalHistory.map(record => (
                      <div key={record.id} className="p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ padding: '2px 10px', borderRadius: 100, background: record.type === 'Vaccine' ? '#EAF5F2' : record.type === 'Procedure' ? '#FFF0EB' : '#FBF9F8', color: record.type === 'Vaccine' ? '#23967F' : record.type === 'Procedure' ? '#F6511D' : '#53584A', fontSize: 11, fontWeight: 500 }}>{record.type}</span>
                          <span style={{ fontSize: 12, color: '#53584A' }}>{record.date}</span>
                        </div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: '#090C02' }}>{record.title}</p>
                        <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>{record.notes}</p>
                        {record.nextDue && (
                          <p className="flex items-center gap-1 mt-1" style={{ fontSize: 12, color: '#23967F' }}>
                            <Clock size={12} weight="regular" /> Next due: {record.nextDue}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Activity tab ── */}
            {activeTab === 'activity' && (
              <div style={CARD} className="p-5">
                <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02', marginBottom: 14 }}>Recent Activity</p>
                <div className="space-y-2">
                  {animal.activityLog.map(entry => {
                    const color = ACTIVITY_COLORS[entry.type] || '#53584A';
                    return (
                      <div key={entry.id} className="flex items-start gap-3 p-3" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#ffffff' }}>
                          {ACTIVITY_ICONS[entry.type] || <Trophy size={15} weight="regular" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#090C02' }}>{entry.type}</p>
                            {entry.duration && <span style={{ fontSize: 12, color: '#53584A' }}>{entry.duration} min</span>}
                          </div>
                          <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }}>{entry.notes}</p>
                          <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }}>{entry.staff} · {entry.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Action buttons ── */}
            {animal.status === 'Available' && (
              <div className="space-y-3 pb-8">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="w-full py-3 flex items-center justify-center gap-2"
                  style={{ background: '#23967F', borderRadius: 8, color: '#ffffff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer' }}
                >
                  <ChatCircle size={18} weight="regular" /> Contact Shelter
                </button>

                {showContact && (
                  <div style={CARD} className="p-5 space-y-3">
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>Send a Message</p>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={3}
                      placeholder={`Hi! I'm interested in adopting ${animal.name}. Could you tell me more about...`}
                      style={{ ...inputStyle, resize: 'none' }}
                    />
                    <button
                      onClick={() => { setShowContact(false); setMessage(''); }}
                      className="w-full py-2.5"
                      style={{ background: '#23967F', borderRadius: 8, color: '#ffffff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}
                    >
                      Send Message
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full py-3 flex items-center justify-center gap-2"
                  style={{ borderRadius: 8, border: '2px solid #F6511D', color: '#F6511D', background: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
                >
                  <CalendarBlank size={18} weight="regular" /> Set Up a Visit
                </button>

                {showCalendar && !visitBooked && (
                  <div style={CARD} className="p-5 space-y-4">
                    <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>Book a Meet & Greet</p>
                    <div>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Choose a Date</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['Jun 3', 'Jun 4', 'Jun 5', 'Jun 6', 'Jun 7', 'Jun 8', 'Jun 9', 'Jun 10'].map(d => (
                          <button key={d} onClick={() => setSelectedDate(d)} style={{ borderRadius: 8, background: selectedDate === d ? '#F6511D' : '#FBF9F8', color: selectedDate === d ? 'white' : '#090C02', fontSize: 12, fontWeight: 500, padding: '8px 4px', border: '1px solid #E2DDD9', cursor: 'pointer', fontFamily: FONT }}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#090C02', marginBottom: 8 }}>Choose a Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['9:00', '10:30', '12:00', '14:00', '15:30', '17:00'].map(t => (
                          <button key={t} onClick={() => setSelectedTime(t)} style={{ borderRadius: 8, background: selectedTime === t ? '#F6511D' : '#FBF9F8', color: selectedTime === t ? 'white' : '#090C02', fontSize: 12, fontWeight: 500, padding: '8px 4px', border: '1px solid #E2DDD9', cursor: 'pointer', fontFamily: FONT }}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => { if (selectedDate && selectedTime) setVisitBooked(true); }}
                      className="w-full py-2.5"
                      style={{ background: '#F6511D', borderRadius: 8, color: '#ffffff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', opacity: (selectedDate && selectedTime) ? 1 : 0.5, fontFamily: FONT }}
                    >
                      Confirm Visit — {selectedDate || '—'} at {selectedTime || '—'}
                    </button>
                  </div>
                )}

                {visitBooked && (
                  <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#FFF0EB', borderLeft: '4px solid #F6511D', borderRadius: 12 }}>
                    <CheckCircle size={20} weight="fill" color="#F6511D" />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#F6511D' }}>Visit Confirmed!</p>
                      <p style={{ fontSize: 12, color: '#53584A' }}>{selectedDate} at {selectedTime} · Happy Paws Animal Rescue</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate('/adopter/adoption')}
                  className="w-full py-3 flex items-center justify-center gap-2"
                  style={{ background: '#090C02', borderRadius: 8, color: '#ffffff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer' }}
                >
                  <Star size={18} weight="regular" /> Begin Adoption Process
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT (1/3): sidebar ── */}
          <div className="space-y-4">

            {/* General Adoption Guide */}
            <div style={{ ...CARD, padding: 24 }}>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02', marginBottom: 12 }}>General Adoption Guide</p>
              <p style={{ fontStyle: 'italic', fontSize: 13, color: '#53584A', lineHeight: 1.6, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #E2DDD9' }}>
                Please note: Adoption criteria, timelines, screening questionnaires, and veterinary contributions vary completely by individual shelter requirements.
              </p>

              {/* 3-step stepper */}
              {[
                {
                  title: 'Digital Match Request',
                  desc: 'Submit your adoption enquiry through the shelter\'s digital platform or directly via Loopet.',
                },
                {
                  title: 'Meet & Greet Verification Visit',
                  desc: 'Arrange an in-person visit to meet your companion in a safe, supervised shelter environment.',
                },
                {
                  title: 'Statutory Flemish Registration Transfer',
                  desc: 'Complete the legally required documents in compliance with Flemish animal welfare legislation.',
                },
              ].map((step, i, arr) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#23967F', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
                      {i + 1}
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: '#E2DDD9', marginTop: 4, minHeight: 20 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < arr.length - 1 ? 20 : 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#090C02', marginBottom: 4 }}>{step.title}</p>
                    <p style={{ fontSize: 13, color: '#53584A', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div style={{ ...CARD, padding: 16 }} className="space-y-2">
              <p style={{ fontSize: 11, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Quick Actions</p>
              <button
                onClick={() => navigate(-1)}
                className="w-full py-2.5 flex items-center justify-center gap-2"
                style={{ borderRadius: 8, border: '1px solid #E2DDD9', color: '#53584A', fontSize: 13, fontWeight: 500, background: '#FBF9F8', cursor: 'pointer', fontFamily: FONT }}
              >
                Back to Browse
              </button>
              <button
                onClick={() => navigate('/adopter/preferences')}
                className="w-full py-2.5 flex items-center justify-center gap-2"
                style={{ borderRadius: 8, border: '1px solid #E2DDD9', color: '#53584A', fontSize: 13, fontWeight: 500, background: '#FBF9F8', cursor: 'pointer', fontFamily: FONT }}
              >
                Update My Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
