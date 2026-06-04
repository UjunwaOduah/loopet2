import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { LogoMark } from '../../components/LoopetIllustrations';
import {
  LayoutDashboard, PlusCircle, Upload, LogOut as LogOutIcon,
  Stethoscope, Activity, X, Menu, ArrowLeftRight, ChevronLeft, ChevronRight,
  ClipboardList,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',        path: '/shelter/dashboard' },
  { icon: PlusCircle,      label: 'Intake',           path: '/shelter/intake' },
  { icon: Upload,          label: 'Batch Onboarding', path: '/shelter/batch' },
  { icon: ArrowLeftRight,  label: 'Outtake',          path: '/shelter/outtake' },
  { icon: ClipboardList,   label: 'Applications',     path: '/shelter/applications' },
  { icon: Stethoscope,     label: 'Medical Records',  path: '/shelter/medical' },
  { icon: Activity,        label: 'Activity Log',     path: '/shelter/activity' },
];

const FONT = "'Lexend Deca', 'Inter', sans-serif";

export default function ShelterLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = ({ mini }: { mini?: boolean }) => (
    <>
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 py-4"
        style={{ borderBottom: '1px solid rgba(9,12,2,0.08)', minHeight: 57 }}
      >
        <LogoMark className="w-7 h-7 flex-shrink-0" />
        {!mini && (
          <>
            <span style={{ fontWeight: 700, fontSize: 18, color: '#090C02', letterSpacing: '-0.01em' }}>loopet</span>
            <span
              className="ml-auto rounded-full px-2.5 py-0.5"
              style={{ background: '#EAF5F2', color: '#23967F', fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap' }}
            >
              Shelter
            </span>
          </>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        {!mini && (
          <p className="px-2 mb-2" style={{ fontSize: 11, fontWeight: 500, color: '#53584A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Navigation
          </p>
        )}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const active = isActive(path);
            return (
              <button
                key={path}
                onClick={() => { navigate(path); setSidebarOpen(false); }}
                title={mini ? label : undefined}
                className="w-full flex items-center gap-2.5 transition-colors"
                style={{
                  borderRadius: 8,
                  padding: mini ? '8px' : '8px 12px',
                  justifyContent: mini ? 'center' : undefined,
                  background: active ? '#EAF5F2' : 'transparent',
                  color: active ? '#23967F' : '#53584A',
                  fontWeight: active ? 500 : 400,
                  fontSize: 15,
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Icon style={{ width: 16, height: 16, flexShrink: 0 }} />
                {!mini && <span className="truncate">{label}</span>}
                {!mini && active && <span className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#23967F' }} />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User footer */}
      {!mini && (
        <div className="px-2 py-4" style={{ borderTop: '1px solid rgba(9,12,2,0.08)' }}>
          <div
            className="flex items-center gap-2.5 px-3 py-2 cursor-pointer"
            style={{ borderRadius: 8 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#FBF9F8'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: '#135346', color: '#ffffff', fontSize: 11, fontWeight: 700 }}
            >
              SK
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }} className="truncate">Sarah Kimura</p>
              <p style={{ fontSize: 12, color: '#53584A' }} className="truncate">Shelter Manager</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-2.5 px-3 py-2 mt-0.5 transition-colors"
            style={{ borderRadius: 8, color: '#53584A', fontSize: 14, fontWeight: 400 }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; (e.currentTarget as HTMLElement).style.color = '#090C02'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
          >
            <LogOutIcon style={{ width: 15, height: 15 }} />
            Sign out
          </button>
        </div>
      )}

      {/* Mini footer: just sign-out icon */}
      {mini && (
        <div className="px-2 py-4 flex flex-col items-center gap-2" style={{ borderTop: '1px solid rgba(9,12,2,0.08)' }}>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            title="Sarah Kimura"
            style={{ background: '#135346', color: '#ffffff', fontSize: 11, fontWeight: 700 }}
          >
            SK
          </div>
          <button
            onClick={() => navigate('/')}
            title="Sign out"
            className="flex items-center justify-center p-2 transition-colors"
            style={{ borderRadius: 8, color: '#53584A' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; (e.currentTarget as HTMLElement).style.color = '#090C02'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
          >
            <LogOutIcon style={{ width: 15, height: 15 }} />
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="flex h-screen" style={{ fontFamily: FONT, background: '#FBF9F8' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 relative"
        style={{
          background: '#ffffff',
          borderRight: '1px solid rgba(9,12,2,0.08)',
          width: collapsed ? 56 : 224,
          transition: 'width 0.2s ease',
          overflow: 'hidden',
        }}
      >
        <SidebarContent mini={collapsed} />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute flex items-center justify-center transition-colors"
          style={{
            top: 16,
            right: collapsed ? '50%' : 12,
            transform: collapsed ? 'translateX(50%)' : 'none',
            width: 22,
            height: 22,
            borderRadius: 6,
            background: '#FBF9F8',
            border: '1px solid rgba(9,12,2,0.1)',
            color: '#53584A',
            zIndex: 10,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#EAF5F2'; (e.currentTarget as HTMLElement).style.color = '#23967F'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#FBF9F8'; (e.currentTarget as HTMLElement).style.color = '#53584A'; }}
        >
          {collapsed
            ? <ChevronRight style={{ width: 13, height: 13 }} />
            : <ChevronLeft style={{ width: 13, height: 13 }} />
          }
        </button>
      </aside>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/25" onClick={() => setSidebarOpen(false)} />
          <aside
            className="relative w-56 flex flex-col"
            style={{ background: '#ffffff', borderRight: '1px solid rgba(9,12,2,0.08)', boxShadow: '4px 0 24px rgba(9,12,2,0.08)' }}
          >
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-3 p-1"
              style={{ color: '#53584A', borderRadius: 6 }}
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <div
          className="lg:hidden flex items-center justify-between px-4 py-3"
          style={{ background: '#ffffff', borderBottom: '1px solid rgba(9,12,2,0.08)' }}
        >
          <button onClick={() => setSidebarOpen(true)} style={{ color: '#090C02' }}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <LogoMark className="w-6 h-6" />
            <span style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>loopet</span>
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: '#135346', color: '#ffffff', fontSize: 11, fontWeight: 700 }}
          >
            SK
          </div>
        </div>

        <main className="flex-1 overflow-y-auto" style={{ background: '#FBF9F8' }}>
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <nav
          className="lg:hidden flex"
          style={{ background: '#ffffff', borderTop: '1px solid rgba(9,12,2,0.08)' }}
        >
          {NAV_ITEMS.slice(0, 5).map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
              style={{ color: isActive(path) ? '#23967F' : '#53584A', fontSize: 10, fontWeight: 500 }}
            >
              <Icon style={{ width: 18, height: 18 }} />
              {label.split(' ')[0]}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
