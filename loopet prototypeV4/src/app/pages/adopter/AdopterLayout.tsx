import { Outlet, useNavigate, useLocation } from 'react-router';
import { LogoMark } from '../../components/LoopetIllustrations';
import { Search, Heart, User, Settings, LogOut, ClipboardList } from 'lucide-react';

const NAV_ITEMS = [
  { icon: Heart,         label: 'Favourites',   path: '/adopter/favourites' },
  { icon: ClipboardList, label: 'Applications',  path: '/adopter/adoption' },
  { icon: User,          label: 'My Profile',    path: '/adopter/profile' },
  { icon: Settings,      label: 'Preferences',   path: '/adopter/preferences' },
];

const FONT = "'Lexend Deca', 'Inter', sans-serif";

export default function AdopterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/adopter/favourites') return false;
    return location.pathname.startsWith(path.split('/').slice(0, 3).join('/'));
  };

  return (
    <div className="flex flex-col h-screen" style={{ fontFamily: FONT }}>
      {/* Desktop top nav */}
      <header
        className="hidden lg:flex items-center h-14 px-6 flex-shrink-0"
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(9,12,2,0.1)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mr-8">
          <LogoMark className="w-7 h-7" />
          <span style={{ fontWeight: 700, fontSize: 17, color: '#090C02', letterSpacing: '-0.01em' }}>loopet</span>
          <span
            className="ml-1 rounded-full px-2.5 py-0.5"
            style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 11, fontWeight: 500 }}
          >
            Adopter
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="flex items-center gap-1.5 px-3 py-1.5 transition-colors"
                style={{
                  borderRadius: 8,
                  background: active ? '#FFF0EB' : 'transparent',
                  color: active ? '#F6511D' : '#53584A',
                  fontWeight: active ? 500 : 400,
                  fontSize: 15,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Icon style={{ width: 15, height: 15 }} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: '#53584A' }} />
            <input
              placeholder="Search animals..."
              className="pl-9 pr-3 py-1.5 outline-none"
              style={{
                borderRadius: 8,
                border: '1px solid rgba(9,12,2,0.12)',
                background: '#FBF9F8',
                color: '#090C02',
                fontSize: 14,
                width: 200,
                fontFamily: FONT,
              }}
              onFocus={e => { e.target.style.borderColor = '#F6511D'; e.target.style.background = '#ffffff'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(9,12,2,0.12)'; e.target.style.background = '#FBF9F8'; }}
            />
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden" style={{ border: '1.5px solid rgba(9,12,2,0.12)' }}>
            <img
              src="https://images.unsplash.com/photo-1653512488965-c8a5b10427a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-1.5 transition-colors"
            style={{ color: '#53584A', borderRadius: 8 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; (e.currentTarget as HTMLElement).style.color = '#090C02'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile header */}
      <header
        className="lg:hidden flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: '#ffffff', borderBottom: '1px solid rgba(9,12,2,0.1)' }}
      >
        <div className="flex items-center gap-2">
          <LogoMark className="w-6 h-6" />
          <span style={{ fontWeight: 700, fontSize: 15, color: '#090C02' }}>loopet</span>
          <span className="ml-1 rounded-full px-2 py-0.5" style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 10, fontWeight: 500 }}>Adopter</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5" style={{ background: '#FBF9F8', borderRadius: 8, color: '#53584A' }}>
            <Search className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1653512488965-c8a5b10427a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto" style={{ background: '#FBF9F8' }}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden flex"
        style={{ background: '#ffffff', borderTop: '1px solid rgba(9,12,2,0.1)' }}
      >
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
            style={{ color: isActive(path) ? '#F6511D' : '#53584A', fontSize: 10, fontWeight: 500 }}
          >
            <Icon style={{ width: 20, height: 20 }} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
