import { useNavigate } from 'react-router';
import { LogoMark } from '../components/LoopetIllustrations';
import {
  ArrowRight, Sparkles, ShieldCheck, ClipboardList,
  LayoutGrid, Upload, Activity, BarChart3, Quote,
  Calendar, MapPin, Building2,
} from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";
const MAX_W = { maxWidth: 1280, margin: '0 auto' };

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #E2DDD9',
  borderRadius: 12,
};

const ADOPTER_FEATS = [
  { icon: Sparkles,     title: 'Smart Matching',           desc: 'Our engine analyses lifestyle, space, and family composition to surface animals with the highest real-world fit score.' },
  { icon: ShieldCheck,  title: 'Verified Profiles',        desc: 'Full health history, vaccine records, behavioural notes, and activity logs — all verified and in one digital profile.' },
  { icon: Calendar,     title: 'Easy Visit Booking',       desc: 'Schedule meet-and-greet visits directly through the platform. Confirmed instantly, no phone tag.' },
  { icon: ClipboardList,title: 'Application Tracking',     desc: 'Track every step — submission, home check, visit, and approval — in one clear dashboard.' },
];

const SHELTER_FEATS = [
  { icon: LayoutGrid,   title: 'Guided Intake',            desc: 'A multi-step wizard with chip scanner integration, digital ID generation, and kennel assignment in seconds.' },
  { icon: Upload,       title: 'Bulk Import',              desc: 'Drop a CSV or Excel file, map columns visually, preview, and sync your entire legacy registry in one click.' },
  { icon: Activity,     title: 'NFC Activity Logging',     desc: "Tap any kennel's NFC tag to log walks, feeding, and socialisation instantly — no paperwork." },
  { icon: BarChart3,    title: 'Analytics Dashboard',      desc: 'Live adoption trends, medical timelines, and staff activity — all on your command-centre dashboard.' },
];

const TESTIMONIALS = [
  { quote: 'Loopet cut our intake paperwork time by 70%. What used to take 45 minutes is now five taps on a tablet.', name: 'Maria Chen',   role: 'Director, Happy Paws Rescue',        initials: 'MC', accent: '#23967F', accentLight: '#EAF5F2' },
  { quote: 'I found my dog Biscuit through Loopet. The match score was 94% — and honestly, they nailed it perfectly.', name: 'Jordan Patel', role: 'Adopter, San Francisco',              initials: 'JP', accent: '#F6511D', accentLight: '#FFF0EB' },
  { quote: "The NFC logging means our volunteers actually record activities now. It's as easy as tapping a phone.",   name: 'Sam Torres',  role: 'Volunteer Coordinator, City Shelter', initials: 'ST', accent: '#23967F', accentLight: '#EAF5F2' },
];

const STATS = [
  { value: '2,400+', label: 'Animals Rehomed' },
  { value: '48',     label: 'Partner Shelters' },
  { value: '98%',    label: 'Match Satisfaction' },
  { value: '70%',    label: 'Less Paperwork' },
];

const HERO_PETS = [
  { name: 'Biscuit', breed: 'Golden Retriever', age: '2y', location: 'SF, CA',       match: 94, photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=260&fit=crop', top: true },
  { name: 'Luna',    breed: 'Maine Coon',        age: '1y', location: 'Oakland, CA',  match: 88, photo: 'https://images.unsplash.com/photo-1769634847835-9695efaf2c2e?w=400&h=260&fit=crop' },
  { name: 'Marty',   breed: 'Labrador Mix',      age: '3y', location: 'Berkeley, CA', match: 82, photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400&h=260&fit=crop' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: FONT, background: '#FBF9F8', color: '#090C02' }}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40" style={{ background: 'rgba(255,255,255,0.97)', borderBottom: '1px solid #E2DDD9' }}>
        <div className="flex items-center justify-between px-6 py-4" style={MAX_W}>
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-8 h-8" />
            <span style={{ fontWeight: 700, fontSize: 18, color: '#090C02', letterSpacing: '-0.01em' }}>loopet</span>
          </div>
          <div className="hidden md:flex items-center gap-7" style={{ fontSize: 15, fontWeight: 500, color: '#53584A' }}>
            {[['adopters', 'For Adopters'], ['shelters', 'For Shelters'], ['testimonials', 'Stories']].map(([id, label]) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                style={{ color: '#53584A' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#090C02'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#53584A'}
              >{label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2"
              style={{ borderRadius: 8, border: '1px solid #E2DDD9', color: '#53584A', fontSize: 14, fontWeight: 500, background: '#FBF9F8' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#090C02'; (e.currentTarget as HTMLElement).style.color = '#090C02'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2DDD9'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
            >Log In</button>
            <button
              onClick={() => navigate('/get-started')}
              className="px-4 py-2 text-white"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 14, fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E04413'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F6511D'}
            >Get Started</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="px-6 pt-20 pb-0" style={{ background: '#FBF9F8' }}>
        <div style={{ ...MAX_W, textAlign: 'center' }}>

          {/* Badge */}
          

          {/* Headline */}
          <h1 style={{ color: '#090C02', fontSize: 'clamp(38px, 5.5vw, 64px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20, maxWidth: 780, marginLeft: 'auto', marginRight: 'auto' }}>
            Closing the loop on care,<br />from shelter to forever home.
          </h1>
          <p style={{ color: '#53584A', fontSize: 18, lineHeight: 1.65, marginBottom: 36, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            The all-in-one ecosystem connecting animal shelters with people ready to give a pet their perfect home.
          </p>

          {/* CTAs */}
          <div className="flex justify-center gap-3 flex-wrap mb-14">
            <button
              onClick={() => navigate('/adopter/explore')}
              className="flex items-center gap-2 px-6 py-3 text-white"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 15, fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E04413'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F6511D'}
            >Find a pet <ArrowRight className="w-4 h-4" /></button>
            <button
              onClick={() => navigate('/shelter/dashboard')}
              className="flex items-center gap-2 px-6 py-3"
              style={{ border: '1.5px solid #23967F', color: '#23967F', borderRadius: 8, fontSize: 15, fontWeight: 600, background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#EAF5F2'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >For shelters</button>
          </div>

          {/* ── Product mockup ── */}
          <div className="mx-auto relative" style={{ maxWidth: 960 }}>
            <div style={{ background: '#ffffff', border: '1px solid #E2DDD9', borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 80px rgba(9,12,2,0.07)' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: '#FBF9F8', borderBottom: '1px solid #E2DDD9' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#E2DDD9' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#E2DDD9' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#E2DDD9' }} />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-5 py-1.5 rounded-full" style={{ background: '#ffffff', border: '1px solid #E2DDD9', fontSize: 12, color: '#53584A', minWidth: 200, textAlign: 'center' }}>
                    loopet.app/explore
                  </div>
                </div>
                <div style={{ width: 64 }} />
              </div>

              {/* App content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1.5 rounded-full" style={{ background: '#F6511D', color: 'white', fontSize: 12, fontWeight: 600 }}>All</span>
                    <span className="px-3 py-1.5 rounded-full" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', color: '#53584A', fontSize: 12 }}>Dogs</span>
                    <span className="px-3 py-1.5 rounded-full" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', color: '#53584A', fontSize: 12 }}>Cats</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#53584A' }}>24 matches near you</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {HERO_PETS.map(pet => (
                    <div key={pet.name} style={{ border: `2px solid ${pet.top ? '#F6511D' : '#E2DDD9'}`, borderRadius: 12, overflow: 'hidden' }}>
                      <div className="relative" style={{ height: 160 }}>
                        <img src={pet.photo} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {pet.top && (
                          <span className="absolute" style={{ top: 8, right: 8, background: '#F6511D', color: 'white', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>Top Match</span>
                        )}
                        
                      </div>
                      <div className="p-3">
                        <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>{pet.name}</p>
                        <p style={{ fontSize: 12, color: '#53584A', marginTop: 2 }}>{pet.breed} · {pet.age}</p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <MapPin style={{ width: 10, height: 10, color: '#53584A', flexShrink: 0 }} />
                          <p style={{ fontSize: 11, color: '#53584A' }}>{pet.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Fade bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #FBF9F8)' }} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: '#ffffff', borderTop: '1px solid #E2DDD9', borderBottom: '1px solid #E2DDD9' }}>
        <div className="px-6 py-8" style={MAX_W}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p style={{ fontWeight: 700, fontSize: 28, color: '#090C02', lineHeight: 1.2 }}>{s.value}</p>
                <p style={{ fontSize: 14, color: '#53584A', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADOPTER FEATURES ── */}
      <section id="adopters" className="px-6 py-16 md:py-24" style={{ background: '#FBF9F8' }}>
        <div style={MAX_W}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: feature list */}
            <div>
              <span className="inline-block px-3 py-1 mb-5 rounded-full" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 12, fontWeight: 600 }}>For Adopters</span>
              <h2 style={{ color: '#090C02', marginBottom: 14 }}>Your perfect match<br />is waiting.</h2>
              <p style={{ color: '#53584A', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
                Smart tools that make the path from "I want a pet" to "this is my pet" simple, transparent, and joyful.
              </p>
              <div className="space-y-6">
                {ADOPTER_FEATS.map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: '#FFF0EB', borderRadius: 8, border: '1px solid rgba(246,81,29,0.15)' }}>
                      <f.icon style={{ width: 17, height: 17, color: '#F6511D' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 4 }}>{f.title}</p>
                      <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.65 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/adopter/explore')}
                className="inline-flex items-center gap-2 mt-10 px-5 py-2.5 text-white"
                style={{ background: '#F6511D', borderRadius: 8, fontSize: 14, fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E04413'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F6511D'}
              >Explore Pets <ArrowRight className="w-4 h-4" /></button>
            </div>

            {/* Right: pet profile card */}
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div style={{ height: 240, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1626736637845-53045bb9695b?w=600&h=360&fit=crop"
                  alt="A golden retriever puppy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02' }}>Biscuit</p>
                    <p style={{ fontSize: 13, color: '#53584A', marginTop: 3 }}>Golden Retriever · 2 years · San Francisco, CA</p>
                  </div>
                  
                </div>
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="rounded-full px-2.5 py-0.5" style={{ background: '#EAF5F2', color: '#23967F', fontSize: 12, fontWeight: 500 }}>Vaccinated</span>
                  <span className="rounded-full px-2.5 py-0.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 12, fontWeight: 500 }}>Kid friendly</span>
                  <span className="rounded-full px-2.5 py-0.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 12, fontWeight: 500 }}>Loves dogs</span>
                </div>
                <button className="w-full py-2.5 text-white" style={{ background: '#F6511D', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
                  Schedule a Visit
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SHELTER FEATURES ── */}
      <section id="shelters" className="px-6 py-16 md:py-24" style={{ background: '#ffffff' }}>
        <div style={MAX_W}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: shelter dashboard mockup */}
            <div style={{ ...CARD, overflow: 'hidden' }}>
              <div className="px-5 py-4 flex items-center gap-2" style={{ background: '#FBF9F8', borderBottom: '1px solid #E2DDD9' }}>
                <Building2 style={{ width: 15, height: 15, color: '#23967F' }} />
                <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>Shelter Dashboard</p>
              </div>
              <div className="p-5 space-y-4">
                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'In Care',  val: '142', color: '#23967F', bg: '#EAF5F2' },
                    { label: 'Adopted',  val: '18',  color: '#F6511D', bg: '#FFF0EB' },
                    { label: 'Pending',  val: '7',   color: '#090C02', bg: '#FBF9F8', border: '1px solid #E2DDD9' },
                  ].map(s => (
                    <div key={s.label} className="p-3 text-center" style={{ background: s.bg, borderRadius: 8, border: s.border }}>
                      <p style={{ fontWeight: 700, fontSize: 22, color: s.color }}>{s.val}</p>
                      <p style={{ fontSize: 11, color: s.color, opacity: 0.75, marginTop: 2 }}>{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent intake */}
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Recent Intake</p>
                  {[
                    { name: 'Daisy', species: 'Cat',    status: 'Quarantine', ago: '2h ago',  statusColor: '#53584A' },
                    { name: 'Bruno', species: 'Dog',    status: 'Available',  ago: '5h ago',  statusColor: '#23967F' },
                    { name: 'Pearl', species: 'Rabbit', status: 'Medical',    ago: '1d ago',  statusColor: '#F6511D' },
                  ].map((a, i) => (
                    <div key={a.name} className="flex items-center gap-3 py-2.5" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2DDD9' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#FBF9F8', border: '1px solid #E2DDD9', fontSize: 11, fontWeight: 600, color: '#53584A' }}>
                        {a.species.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{a.name}</p>
                        <p style={{ fontSize: 12, color: '#53584A' }}>{a.species}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="px-2 py-0.5 rounded-full" style={{ background: a.status === 'Available' ? '#EAF5F2' : '#FBF9F8', color: a.statusColor, fontSize: 11, fontWeight: 500, border: '1px solid #E2DDD9' }}>{a.status}</span>
                        <p style={{ fontSize: 11, color: '#53584A', marginTop: 2 }}>{a.ago}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: feature list */}
            <div>
              <span className="inline-block px-3 py-1 mb-5 rounded-full" style={{ background: '#EAF5F2', color: '#23967F', fontSize: 12, fontWeight: 600 }}>For Shelters</span>
              <h2 style={{ color: '#090C02', marginBottom: 14 }}>Professional tools built for real operations.</h2>
              <p style={{ color: '#53584A', fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
                Replace clipboards and spreadsheets with a streamlined digital system your whole team will actually use.
              </p>
              <div className="space-y-6">
                {SHELTER_FEATS.map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{ background: '#EAF5F2', borderRadius: 8, border: '1px solid rgba(35,150,127,0.15)' }}>
                      <f.icon style={{ width: 17, height: 17, color: '#23967F' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: '#090C02', marginBottom: 4 }}>{f.title}</p>
                      <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.65 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/shelter/dashboard')}
                className="inline-flex items-center gap-2 mt-10 px-5 py-2.5"
                style={{ border: '1.5px solid #23967F', color: '#23967F', borderRadius: 8, fontSize: 14, fontWeight: 600, background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#EAF5F2'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >See Shelter Portal <ArrowRight className="w-4 h-4" /></button>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="px-6 py-16 md:py-24" style={{ background: '#FBF9F8' }}>
        <div style={MAX_W}>
          <h2 style={{ color: '#090C02', textAlign: 'center', marginBottom: 48 }}>Real stories, real impact.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ ...CARD, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Quote className="w-5 h-5" style={{ color: t.accent, opacity: 0.3 }} />
                <p style={{ color: '#53584A', fontSize: 15, lineHeight: 1.7, flex: 1 }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #E2DDD9' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.accentLight, color: t.accent, fontSize: 12, fontWeight: 700 }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: '#090C02' }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: '#53584A' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-16 md:py-24" style={{ background: '#090C02' }}>
        <div style={{ ...MAX_W, textAlign: 'center' }}>
          <h2 style={{ color: '#ffffff', marginBottom: 12 }}>Ready to close the loop?</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 36 }}>
            Join thousands of adopters and dozens of shelters already using Loopet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/adopter/signup')}
              className="flex items-center justify-center gap-2 px-7 py-3 text-white"
              style={{ background: '#F6511D', borderRadius: 8, fontSize: 15, fontWeight: 600 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E04413'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F6511D'}
            >Start Adopting <ArrowRight className="w-4 h-4" /></button>
            <button
              onClick={() => navigate('/shelter/signup')}
              className="flex items-center justify-center gap-2 px-7 py-3"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: '#ffffff', borderRadius: 8, fontSize: 15, fontWeight: 600, background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'}
            >Register Your Shelter <ArrowRight className="w-4 h-4" /></button>
          </div>
          <p className="mt-6" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline' }}>Log in →</button>
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#FBF9F8', borderTop: '1px solid #E2DDD9' }}>
        <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4" style={MAX_W}>
          <div className="flex items-center gap-2.5">
            <LogoMark className="w-6 h-6" />
            <span style={{ fontWeight: 700, color: '#090C02', fontSize: 15 }}>loopet</span>
          </div>
          <div className="flex gap-6" style={{ fontSize: 13, color: '#53584A' }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <button key={l}
                style={{ color: '#53584A' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#090C02'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#53584A'}
              >{l}</button>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'rgba(9,12,2,0.3)' }}>© 2026 Loopet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
