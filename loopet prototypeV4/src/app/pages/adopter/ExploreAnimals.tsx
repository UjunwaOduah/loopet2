import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ANIMALS } from '../../data/mockData';
import {
  ChevronDown, ChevronUp, SlidersHorizontal, X, ArrowRight, LogOut,
} from 'lucide-react';
import {
  MagnifyingGlass, Heart, User, Dog, Cat, MapPin, Phone, Buildings,
  ArrowRight as PhArrowRight, SignOut, Infinity as InfinityIcon,
} from '@phosphor-icons/react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #E2DDD9',
  borderRadius: 16,
};

const REGION_CITIES = [
  'Antwerpen (stad)', 'Mechelen', 'Lier', 'Turnhout', 'Geel',
  'Brasschaat', 'Boom', 'Bornem', 'Herentals', 'Mortsel',
  'Kapellen', 'Schoten', 'Kontich', 'Willebroek',
];

const SHELTERS_AUTOCOMPLETE = [
  'Happy Paws Rescue – Antwerpen',
  'Mechelse Dierenvrienden vzw',
  'Lierse Asiel vzw',
  'Turnhoutse Dierenbescherming',
  'Geel Animal Rescue Hub',
  'Brasschaat Dierenopvang',
  'Boom Rescue Centre',
];

const ANTWERP_SHELTERS = [
  { id: 'sh1', name: 'Blauwe Kruis van Antwerpen', city: 'Antwerpen (stad)', vzw: 'BE 0407.234.107', phone: '+32 3 244 44 44', dogs: 28, cats: 42, desc: "One of Belgium's oldest animal welfare organizations, housing over 70 animals year-round." },
  { id: 'sh2', name: 'Dierenasiel Mechelen vzw', city: 'Mechelen', vzw: 'BE 0419.583.621', phone: '+32 15 28 09 10', dogs: 15, cats: 31, desc: 'Municipal shelter serving the greater Mechelen area and surrounding villages.' },
  { id: 'sh3', name: 'Dierenbescherming Lier vzw', city: 'Lier', vzw: 'BE 0453.127.884', phone: '+32 3 480 24 67', dogs: 12, cats: 19, desc: 'Community-run shelter with a dedicated foster network across the Lier region.' },
  { id: 'sh4', name: 'Dierenasiel Turnhout vzw', city: 'Turnhout', vzw: 'BE 0462.913.245', phone: '+32 14 42 08 81', dogs: 21, cats: 14, desc: "The Kempen region's primary shelter, specializing in dog rehabilitation programs." },
  { id: 'sh5', name: 'Geel Dierenopvang vzw', city: 'Geel', vzw: 'BE 0458.763.019', phone: '+32 14 58 20 33', dogs: 9, cats: 22, desc: 'Non-profit shelter focused on long-term care for senior and special-needs animals.' },
  { id: 'sh6', name: 'Dierenasiel Boom vzw', city: 'Boom', vzw: 'BE 0441.592.308', phone: '+32 3 844 12 97', dogs: 7, cats: 16, desc: 'Small but dedicated shelter near the Rupel river serving Boom and surrounds.' },
  { id: 'sh7', name: 'Dierenopvang Herentals vzw', city: 'Herentals', vzw: 'BE 0484.127.563', phone: '+32 14 21 67 90', dogs: 11, cats: 8, desc: 'Modern facility with indoor runs and enrichment programs for active dogs.' },
  { id: 'sh8', name: 'Dierenasiel Brasschaat vzw', city: 'Brasschaat', vzw: 'BE 0467.342.190', phone: '+32 3 650 18 42', dogs: 6, cats: 14, desc: 'Suburban shelter catering to the northern Antwerp municipalities.' },
  { id: 'sh9', name: 'Willebroek Dierenwelzijn vzw', city: 'Willebroek', vzw: 'BE 0489.364.712', phone: '+32 3 886 44 11', dogs: 8, cats: 11, desc: "Community shelter bridging Antwerp and Brussels's Rupel canal region." },
];

const DOG_SIZES = [
  { label: 'Very Small', sub: '< 5 kg' },
  { label: 'Small', sub: '5–10 kg' },
  { label: 'Medium', sub: '10–25 kg' },
  { label: 'Large', sub: '25–45 kg' },
  { label: 'Extra Large', sub: '> 45 kg' },
];

const DOG_BEHAVIOUR = [
  'House trained / Zindelijk',
  'Can stay home alone',
  'Requires experienced owner',
  'Garden required',
];

const CAT_COMPAT = ['Good with other cats', 'Good with dogs'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <div
      onClick={onChange}
      className="flex-shrink-0 flex items-center px-0.5 cursor-pointer"
      style={{ width: 36, height: 20, borderRadius: 100, background: checked ? '#F6511D' : '#E2DDD9', transition: 'background 0.2s' }}
    >
      <div
        className="bg-white"
        style={{ width: 16, height: 16, borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'transform 0.2s', transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
      />
    </div>
  );
}

function AccordionSection({ title, open, onToggle, children }: {
  title: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div style={{ borderTop: '1px solid #E2DDD9' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3"
        style={{ fontSize: 11, fontWeight: 700, color: '#090C02', textTransform: 'uppercase', letterSpacing: '0.07em' }}
      >
        {title}
        {open
          ? <ChevronUp className="w-3.5 h-3.5" style={{ color: '#53584A' }} />
          : <ChevronDown className="w-3.5 h-3.5" style={{ color: '#53584A' }} />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export default function ExploreAnimals() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'pets' | 'shelters'>('pets');
  const [species, setSpecies] = useState<'Cat' | 'Dog' | null>(null);
  const [city, setCity] = useState('');
  const [shelterSearch, setShelterSearch] = useState('');
  const [shelterFocused, setShelterFocused] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState('');
  const [dogSizes, setDogSizes] = useState<string[]>([]);
  const [dogBehaviour, setDogBehaviour] = useState<string[]>([]);
  const [catCompat, setCatCompat] = useState<string[]>([]);
  const [duoAdoptie, setDuoAdoptie] = useState(false);
  const [toddlers, setToddlers] = useState(false);
  const [children14, setChildren14] = useState(false);
  const [dogOpen, setDogOpen] = useState(true);
  const [catOpen, setCatOpen] = useState(true);
  const [sharedOpen, setSharedOpen] = useState(true);
  const [liked, setLiked] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const shelterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (shelterRef.current && !shelterRef.current.contains(e.target as Node)) {
        setShelterFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredShelterSuggestions = SHELTERS_AUTOCOMPLETE.filter(s =>
    s.toLowerCase().includes(shelterSearch.toLowerCase()) && s !== selectedShelter
  );

  const animals = ANIMALS.filter(a => {
    if (species && a.species !== species) return false;
    if (toddlers && a.kidFriendly < 4) return false;
    if (children14 && a.kidFriendly < 3) return false;
    return true;
  });

  const isReserved = (status: string) => status !== 'Available';

  const NAV_LINKS = [
    { label: 'Find a Pet',         mode: 'pets' as const,     action: () => setViewMode('pets') },
    { label: 'Shelters Directory', mode: 'shelters' as const, action: () => setViewMode('shelters') },
    { label: 'Adoption Guide',     mode: null,                action: () => {} },
    { label: 'About Us',           mode: null,                action: () => {} },
    { label: 'Pricing',            mode: null,                action: () => {} },
  ];

  const FilterSidebar = () => (
    <div>
      {/* Species segmented toggle */}
      <div className="mb-1 pb-4">
        <p style={{ fontSize: 10, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 }}>Species</p>
        <div
          className="flex p-1"
          style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 10 }}
        >
          {([null, 'Cat', 'Dog'] as const).map(s => (
            <button
              key={String(s)}
              onClick={() => setSpecies(s)}
              style={{
                flex: 1, padding: '7px 4px', borderRadius: 8,
                background: species === s ? '#ffffff' : 'transparent',
                color: species === s ? '#090C02' : '#53584A',
                fontSize: 12, fontWeight: species === s ? 600 : 400,
                boxShadow: species === s ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              }}
            >
              {s === 'Cat' && <Cat size={13} weight="regular" />}
              {s === 'Dog' && <Dog size={13} weight="regular" />}
              {s === null ? 'All' : s === 'Cat' ? 'Cats' : 'Dogs'}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div style={{ borderTop: '1px solid #E2DDD9' }}>
        <div className="py-3">
          <p style={{ fontSize: 10, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 4 }}>Location</p>
          <p className="flex items-center gap-1" style={{ fontSize: 11, color: '#23967F', fontWeight: 500, marginBottom: 8 }}>
            <MapPin size={11} weight="regular" /> Antwerpen – Mechelen region only
          </p>
          <select
            value={city}
            onChange={e => setCity(e.target.value)}
            style={{
              width: '100%', padding: '8px 10px', borderRadius: 8,
              border: `1px solid ${city ? '#F6511D' : '#E2DDD9'}`,
              background: '#FBF9F8', color: city ? '#090C02' : '#53584A',
              fontSize: 13, fontFamily: FONT, outline: 'none',
            }}
          >
            <option value="">All municipalities</option>
            {REGION_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Shelter search */}
      <div style={{ borderTop: '1px solid #E2DDD9' }}>
        <div className="py-3">
          <p style={{ fontSize: 10, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: 8 }}>Shelter</p>
          <div className="relative" ref={shelterRef}>
            <MagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" weight="regular" style={{ color: '#53584A' }} />
            <input
              value={selectedShelter || shelterSearch}
              onFocus={() => { setShelterFocused(true); if (selectedShelter) setShelterSearch(''); }}
              onChange={e => { setShelterSearch(e.target.value); setSelectedShelter(''); }}
              placeholder="Search shelter..."
              style={{
                width: '100%', padding: '8px 28px 8px 28px', borderRadius: 8,
                border: `1px solid ${shelterFocused ? '#F6511D' : '#E2DDD9'}`,
                background: '#FBF9F8', color: '#090C02', fontSize: 13, fontFamily: FONT, outline: 'none',
              }}
            />
            {selectedShelter && (
              <button
                onClick={() => { setSelectedShelter(''); setShelterSearch(''); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" style={{ color: '#53584A' }} />
              </button>
            )}
            {shelterFocused && filteredShelterSuggestions.length > 0 && (
              <div className="absolute z-20 top-full mt-1 w-full" style={{ background: '#fff', border: '1px solid #E2DDD9', borderRadius: 8, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                {filteredShelterSuggestions.map(s => (
                  <button
                    key={s}
                    onMouseDown={() => { setSelectedShelter(s); setShelterSearch(''); setShelterFocused(false); }}
                    className="w-full text-left px-3 py-2.5 transition-colors"
                    style={{ fontSize: 12, color: '#090C02', borderBottom: '1px solid #E2DDD9' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FBF9F8'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dog filters */}
      {(species === 'Dog' || species === null) && (
        <AccordionSection title="Dog Filters" open={dogOpen} onToggle={() => setDogOpen(o => !o)}>
          <div className="space-y-4">
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', marginBottom: 7 }}>Size</p>
              <div className="space-y-2">
                {DOG_SIZES.map(({ label, sub }) => (
                  <label key={label} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dogSizes.includes(label)}
                      onChange={() => setDogSizes(p => p.includes(label) ? p.filter(x => x !== label) : [...p, label])}
                      style={{ accentColor: '#23967F', width: 14, height: 14, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 13, color: '#090C02', flex: 1 }}>{label}</span>
                    <span style={{ fontSize: 11, color: '#53584A' }}>{sub}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#53584A', marginBottom: 8 }}>Behaviour</p>
              <div className="space-y-2.5">
                {DOG_BEHAVIOUR.map(b => (
                  <div key={b} className="flex items-center justify-between gap-3">
                    <span style={{ fontSize: 12, color: '#090C02' }}>{b}</span>
                    <Toggle checked={dogBehaviour.includes(b)} onChange={() => setDogBehaviour(p => p.includes(b) ? p.filter(x => x !== b) : [...p, b])} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionSection>
      )}

      {/* Cat filters */}
      {(species === 'Cat' || species === null) && (
        <AccordionSection title="Cat Filters" open={catOpen} onToggle={() => setCatOpen(o => !o)}>
          <div className="space-y-2.5">
            {CAT_COMPAT.map(c => (
              <label key={c} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={catCompat.includes(c)}
                  onChange={() => setCatCompat(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
                  style={{ accentColor: '#23967F', width: 14, height: 14 }}
                />
                <span style={{ fontSize: 13, color: '#090C02' }}>{c}</span>
              </label>
            ))}
            <div className="flex items-center justify-between mt-2">
              <span style={{ fontSize: 13, color: '#090C02' }}>Duo-Adoptie</span>
              <Toggle checked={duoAdoptie} onChange={() => setDuoAdoptie(p => !p)} />
            </div>
          </div>
        </AccordionSection>
      )}

      {/* Household */}
      <AccordionSection title="Household" open={sharedOpen} onToggle={() => setSharedOpen(o => !o)}>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, color: '#090C02' }}>Tolerates toddlers &lt;6yr</span>
            <Toggle checked={toddlers} onChange={() => setToddlers(p => !p)} />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 13, color: '#090C02' }}>Tolerates children 6–14yr</span>
            <Toggle checked={children14} onChange={() => setChildren14(p => !p)} />
          </div>
        </div>
      </AccordionSection>

      <div className="pt-4">
        <button
          onClick={() => {
            setSpecies(null); setCity(''); setSelectedShelter(''); setShelterSearch('');
            setDogSizes([]); setDogBehaviour([]); setCatCompat([]);
            setDuoAdoptie(false); setToddlers(false); setChildren14(false);
          }}
          style={{ width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #E2DDD9', background: '#FBF9F8', color: '#53584A', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
        >
          Clear all filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: FONT, background: '#FBF9F8' }}>

      {/* ── Top nav ── */}
      <header
        className="sticky top-0 z-30 flex items-center gap-4 px-6 lg:px-10"
        style={{ background: '#ffffff', borderBottom: '1px solid #E2DDD9', height: 56 }}
      >
        {/* Brand */}
        <button className="flex items-center gap-2 flex-shrink-0" onClick={() => navigate('/')}>
          <InfinityIcon size={22} weight="bold" color="#F6511D" />
          <span style={{ fontWeight: 700, fontSize: 18, color: '#090C02', letterSpacing: '-0.02em' }}>loopet</span>
        </button>

        {/* Center nav — extended with About Us & Pricing */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map(({ label, mode, action }) => {
            const active = mode !== null && viewMode === mode;
            return (
              <button
                key={label}
                onClick={action}
                style={{
                  padding: '6px 12px', borderRadius: 8, fontSize: 13,
                  color: active ? '#F6511D' : '#53584A',
                  fontWeight: active ? 600 : 400,
                  background: active ? '#FFF0EB' : 'transparent',
                  transition: 'all 0.15s', fontFamily: FONT,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right: My Profile + sign out */}
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => navigate('/adopter/profile')}
            className="flex items-center gap-2 px-3 py-1.5"
            style={{ borderRadius: 8, border: '1.5px solid #F6511D', background: '#FFF0EB', color: '#F6511D', fontSize: 13, fontWeight: 700, transition: 'all 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F6511D'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FFF0EB'; (e.currentTarget as HTMLElement).style.color = '#F6511D'; }}
          >
            <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1653512488965-c8a5b10427a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=60" alt="" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:inline">My Profile</span>
            <User size={14} weight="regular" className="sm:hidden" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-2"
            style={{ borderRadius: 8, color: '#53584A' }}
            title="Sign out"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <LogOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden p-2"
            style={{ borderRadius: 8, border: '1px solid #E2DDD9', color: '#090C02', background: '#FBF9F8' }}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Hero strip ── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #E2DDD9' }} className="px-6 lg:px-10 py-8 lg:py-10">
        <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, color: '#090C02', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10 }}>
          {viewMode === 'pets'
            ? <>Find your match on <span style={{ color: '#F6511D' }}>loopet</span></>
            : <>Shelter Directory — <span style={{ color: '#F6511D' }}>Province of Antwerp</span></>}
        </h1>
        <p style={{ fontSize: 15, color: '#53584A', maxWidth: 520, lineHeight: 1.6 }}>
          {viewMode === 'pets'
            ? 'Browse animals from shelters across the Antwerpen–Mechelen region. Apply directly, track your application, and welcome your new companion home.'
            : 'Verified shelter profiles from the Province of Antwerp. Each facility is registered under Belgian vzw corporate law and verified via adopteereendier.be.'}
        </p>
      </section>

      {/* ── Body ── */}
      <div className="flex flex-1 gap-5 px-6 lg:px-10 py-6 max-w-screen-xl mx-auto w-full">

        {/* Sidebar — desktop, only for pets view */}
        {viewMode === 'pets' && (
          <aside
            className="hidden lg:flex flex-col flex-shrink-0 self-start sticky top-[57px]"
            style={{ width: 276, ...CARD, borderRadius: 12, padding: '18px 16px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, color: '#090C02', marginBottom: 14 }}>Filter animals</p>
            <FilterSidebar />
          </aside>
        )}

        {/* ── PET GRID ── */}
        {viewMode === 'pets' && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p style={{ fontSize: 14, color: '#53584A' }}>
                <strong style={{ color: '#090C02' }}>{animals.length}</strong> animals in the Antwerpen–Mechelen region
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {animals.map(animal => {
                const reserved = isReserved(animal.status);
                const isLiked = liked.includes(animal.id);
                return (
                  <div key={animal.id} style={CARD} className="overflow-hidden flex flex-col group">
                    {/* Image 4:3 */}
                    <div style={{ position: 'relative', paddingBottom: '75%' }}>
                      <div className="absolute inset-0">
                        <img
                          src={animal.photo}
                          alt={animal.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          style={{ borderRadius: '16px 16px 0 0' }}
                        />

                        {/* Status badge */}
                        {reserved ? (
                          <div className="absolute top-3 left-3">
                            <span style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 100, border: '1.5px solid #F6511D' }}>
                              RESERVED
                            </span>
                          </div>
                        ) : (
                          <div className="absolute top-3 left-3 flex items-center gap-1.5" style={{ background: 'rgba(35,150,127,0.88)', borderRadius: 8, padding: '3px 8px' }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ffffff' }} />
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#ffffff' }}>AVAILABLE</span>
                          </div>
                        )}

                        {/* Like button */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setLiked(l => isLiked ? l.filter(id => id !== animal.id) : [...l, animal.id]);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all"
                          style={{ borderRadius: 8, background: isLiked ? '#F6511D' : 'rgba(255,255,255,0.92)', border: isLiked ? 'none' : '1px solid rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)' }}
                        >
                          <Heart size={14} weight={isLiked ? 'fill' : 'regular'} color={isLiked ? '#fff' : '#090C02'} />
                        </button>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-4 gap-3">
                      <div>
                        <div className="flex items-baseline justify-between mb-0.5">
                          <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>{animal.name}</p>
                          <span style={{ fontSize: 11, color: '#53584A', background: '#FBF9F8', border: '1px solid #E2DDD9', borderRadius: 100, padding: '2px 8px', fontWeight: 500 }}>
                            {Math.floor(animal.age / 12)}y {animal.age % 12}m
                          </span>
                        </div>
                        <p style={{ fontSize: 13, color: '#53584A' }}>{animal.breed}</p>
                        <p style={{ fontSize: 11, color: '#53584A', marginTop: 2 }}>Happy Paws Rescue · Antwerpen</p>
                      </div>

                      <button
                        onClick={() => navigate(`/adopter/animal/${animal.id}`)}
                        disabled={reserved}
                        className="w-full py-2.5 transition-all flex items-center justify-center gap-1.5"
                        style={{ borderRadius: 10, background: reserved ? '#E2DDD9' : '#23967F', color: reserved ? '#53584A' : '#ffffff', fontSize: 13, fontWeight: 700, cursor: reserved ? 'not-allowed' : 'pointer', opacity: reserved ? 0.65 : 1 }}
                      >
                        {reserved ? 'Currently Reserved' : (
                          <>{`View Profile & Apply`}<ArrowRight className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {animals.length === 0 && (
              <div className="text-center py-24">
                <p style={{ fontWeight: 700, fontSize: 20, color: '#090C02', marginBottom: 8 }}>No animals found</p>
                <p style={{ fontSize: 15, color: '#53584A' }}>Try adjusting your filters</p>
              </div>
            )}
          </div>
        )}

        {/* ── SHELTER DIRECTORY ── */}
        {viewMode === 'shelters' && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p style={{ fontSize: 14, color: '#53584A' }}>
                <strong style={{ color: '#090C02' }}>{ANTWERP_SHELTERS.length}</strong> verified shelters in the Province of Antwerp
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ANTWERP_SHELTERS.map(shelter => (
                <div key={shelter.id} style={{ ...CARD, borderRadius: 12, display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div className="p-5 pb-4 flex-1">
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: '#090C02', marginBottom: 14, lineHeight: 1.3 }}>{shelter.name}</h3>

                    {/* Metadata stack */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <Buildings size={14} weight="regular" color="#53584A" />
                        <span style={{ fontSize: 13, color: '#53584A' }}>VZW {shelter.vzw}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin size={14} weight="regular" color="#53584A" />
                        <span style={{ fontSize: 13, color: '#53584A' }}>{shelter.city}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone size={14} weight="regular" color="#53584A" />
                        <span style={{ fontSize: 13, color: '#53584A' }}>{shelter.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Our Animals section */}
                  <div style={{ background: '#FBF9F8', borderTop: '1px solid #E2DDD9', padding: '16px 20px', borderRadius: '0 0 12px 12px' }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>Our Animals</p>
                    <p style={{ fontSize: 13, color: '#53584A', lineHeight: 1.5, marginBottom: 12 }}>
                      Currently housing {shelter.dogs} dogs and {shelter.cats} cats available for matching.
                    </p>
                    <button
                      onClick={() => setViewMode('pets')}
                      className="w-full py-2.5 flex items-center justify-center gap-2"
                      style={{ borderRadius: 8, background: '#23967F', color: '#ffffff', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: FONT }}
                    >
                      Browse Sheltered Pets
                      <PhArrowRight size={14} weight="bold" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter drawer (pets view only) */}
      {mobileFilterOpen && viewMode === 'pets' && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto h-full overflow-y-auto" style={{ width: 300, background: '#ffffff', padding: '20px 16px' }}>
            <div className="flex items-center justify-between mb-4">
              <p style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>Filter animals</p>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5" style={{ color: '#53584A' }} />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* Mobile bottom bar */}
      <nav className="lg:hidden flex items-center" style={{ background: '#ffffff', borderTop: '1px solid #E2DDD9', position: 'sticky', bottom: 0, zIndex: 20 }}>
        <button
          onClick={() => setViewMode('pets')}
          className="flex-1 flex flex-col items-center gap-0.5 py-3"
          style={{ color: viewMode === 'pets' ? '#F6511D' : '#53584A', fontSize: 10, fontWeight: viewMode === 'pets' ? 700 : 500, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <MagnifyingGlass size={20} weight="regular" />Explore
        </button>
        <button
          onClick={() => setViewMode('shelters')}
          className="flex-1 flex flex-col items-center gap-0.5 py-3"
          style={{ color: viewMode === 'shelters' ? '#F6511D' : '#53584A', fontSize: 10, fontWeight: viewMode === 'shelters' ? 700 : 500, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Buildings size={20} weight="regular" />Shelters
        </button>
        <button
          onClick={() => navigate('/adopter/profile')}
          className="flex-1 flex flex-col items-center gap-0.5 py-3"
          style={{ color: '#53584A', fontSize: 10, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <User size={20} weight="regular" />My Profile
        </button>
      </nav>
    </div>
  );
}
