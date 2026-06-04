import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, Edit2, Heart, Calendar, MapPin, Phone, Mail, Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { ANIMALS } from '../../data/mockData';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid rgba(9,12,2,0.1)',
  background: '#FBF9F8',
  color: '#090C02',
  fontSize: 14,
  fontFamily: FONT,
  outline: 'none',
};

export default function AdopterProfile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const likedAnimals = ANIMALS.filter(a => a.status === 'Available').slice(0, 3);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-5 lg:p-7 max-w-2xl mx-auto space-y-4" style={{ fontFamily: FONT }}>
      {saved && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 text-white" style={{ background: '#23967F', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
          <CheckCircle2 className="w-5 h-5" />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Profile updated!</span>
        </div>
      )}

      {/* Profile hero card */}
      <div style={CARD} className="overflow-hidden">
        <div className="h-24" style={{ background: 'linear-gradient(135deg, #135346, #23967F)' }} />

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden" style={{ border: '3px solid white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1653512488965-c8a5b10427a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center text-white" style={{ background: '#F6511D', borderRadius: '50%' }}>
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-4 py-2"
              style={{ background: editing ? '#F6511D' : '#FBF9F8', color: editing ? 'white' : '#090C02', borderRadius: 8, fontSize: 13, fontWeight: 500, border: editing ? 'none' : '1px solid rgba(9,12,2,0.1)' }}
            >
              <Edit2 className="w-3.5 h-3.5" />
              {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>First Name</label>
                  <input defaultValue="Alex" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>Last Name</label>
                  <input defaultValue="Rivera" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>Email</label>
                <input type="email" defaultValue="alex@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>Phone</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>Location</label>
                <input defaultValue="San Francisco, CA" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>About Me</label>
                <textarea rows={2} defaultValue="Outdoor enthusiast and animal lover living in SF." style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#53584A', marginBottom: 4 }}>Living Situation</label>
                <select style={{ ...inputStyle }}>
                  <option>Apartment</option>
                  <option>House with yard</option>
                  <option>House without yard</option>
                </select>
              </div>
              <button onClick={handleSave} className="w-full py-2.5 text-white" style={{ background: '#F6511D', borderRadius: 8, fontWeight: 500, fontSize: 14 }}>
                Save Changes
              </button>
            </div>
          ) : (
            <div>
              <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Alex Rivera</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span className="flex items-center gap-1" style={{ fontSize: 13, color: '#53584A' }}>
                  <MapPin className="w-3 h-3" />San Francisco, CA
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: 13, color: '#53584A' }}>
                  <Mail className="w-3 h-3" />alex@example.com
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: 13, color: '#53584A' }}>
                  <Phone className="w-3 h-3" />+1 (555) 123-4567
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#53584A', marginTop: 8 }}>Outdoor enthusiast and animal lover living in SF. Looking for an active companion!</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: '3',  label: 'Favourited',   color: '#F6511D', bg: '#FFF0EB' },
          { val: '1',  label: 'Visit Booked', color: '#23967F', bg: '#EAF5F2' },
          { val: '12', label: 'Days Active',  color: '#135346', bg: '#EAF5F2' },
        ].map(s => (
          <div key={s.label} className="p-4 text-center" style={{ background: s.bg, borderRadius: 12 }}>
            <p style={{ fontSize: 24, fontWeight: 700, color: s.color }}>{s.val}</p>
            <p style={{ fontSize: 12, color: s.color, opacity: 0.8 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Preferences summary */}
      <div style={CARD} className="p-5">
        <div className="flex items-center justify-between mb-4">
          <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>My Preferences</p>
          <button onClick={() => navigate('/adopter/preferences')} className="flex items-center gap-1" style={{ fontSize: 13, fontWeight: 500, color: '#F6511D' }}>
            <Settings className="w-3 h-3" />Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Dogs', 'Cats', 'Calm Energy', 'Kid Friendly', 'Apartment-friendly', 'Young (1–3yr)'].map(pref => (
            <span key={pref} className="rounded-full px-3 py-1.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}>{pref}</span>
          ))}
        </div>
      </div>

      {/* Saved animals */}
      <div style={CARD} className="p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 15, color: '#090C02' }}>
            <Heart className="w-4 h-4" style={{ color: '#F6511D' }} />Saved Animals
          </p>
          <button onClick={() => navigate('/adopter/explore')} style={{ fontSize: 13, fontWeight: 500, color: '#F6511D' }}>Browse more</button>
        </div>
        <div className="space-y-3">
          {likedAnimals.map(animal => (
            <button
              key={animal.id}
              onClick={() => navigate(`/adopter/animal/${animal.id}`)}
              className="w-full flex items-center gap-3 text-left"
            >
              <img src={animal.photo} alt={animal.name} className="w-12 h-12 object-cover flex-shrink-0" style={{ borderRadius: 8 }} />
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{animal.name}</p>
                <p style={{ fontSize: 12, color: '#53584A' }}>{animal.breed} · {animal.gender}</p>
              </div>
              <span className="rounded-full px-2.5 py-1" style={{ background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500 }}>{animal.status}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming visits */}
      <div style={CARD} className="p-5">
        <p className="flex items-center gap-2" style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 14 }}>
          <Calendar className="w-4 h-4" style={{ color: '#F6511D' }} />Upcoming Visits
        </p>
        <div className="flex items-start gap-3 p-4" style={{ background: '#FFF0EB', borderRadius: 8 }}>
          <img src={ANIMALS[0].photo} alt={ANIMALS[0].name} className="w-10 h-10 object-cover" style={{ borderRadius: 6 }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>Meet & Greet with {ANIMALS[0].name}</p>
            <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>June 4 at 10:30 AM · Happy Paws Rescue</p>
            <span className="inline-block mt-1.5 rounded-full px-2.5 py-0.5" style={{ background: '#F6511D', color: 'white', fontSize: 11, fontWeight: 500 }}>Confirmed</span>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button
        onClick={() => navigate('/')}
        className="w-full flex items-center justify-center gap-2 py-3"
        style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.1)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
      >
        <LogOut className="w-4 h-4" />Sign Out
      </button>
    </div>
  );
}
