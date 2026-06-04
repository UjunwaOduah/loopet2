import { useNavigate } from 'react-router';
import { ANIMALS, ADOPTION_STATS, PENDING_TASKS } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, CheckCircle2, PlusCircle, ArrowRight, ArrowLeftRight, AlertCircle, Clock } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

const CARD: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid rgba(9,12,2,0.08)',
  borderRadius: 12,
  boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px',
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  Available:      { bg: '#EAF5F2', text: '#23967F' },
  Quarantine:     { bg: '#FFF0EB', text: '#F6511D' },
  'Medical Hold': { bg: '#FFF0EB', text: '#F6511D' },
  Adopted:        { bg: '#090C02', text: '#FBF9F8' },
  Transferred:    { bg: '#FBF9F8', text: '#53584A' },
  Deceased:       { bg: '#FBF9F8', text: '#53584A' },
  Foster:         { bg: '#EAF5F2', text: '#23967F' },
};

const BAR_COLORS: Record<string, string> = {
  Available: '#23967F', Quarantine: '#F6511D', 'Medical Hold': '#F6511D',
  Adopted: '#135346', Transferred: '#53584A', Deceased: '#53584A', Foster: '#23967F',
};

const PRIORITY_STYLE: Record<string, { bg: string; color: string }> = {
  High:   { bg: '#FFF0EB', color: '#F6511D' },
  Medium: { bg: '#EAF5F2', color: '#23967F' },
  Low:    { bg: '#FBF9F8', color: '#53584A' },
};

export default function ShelterDashboard() {
  const navigate = useNavigate();
  const animals = ANIMALS;
  const byStatus = animals.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const STAT_CARDS = [
    {
      label: 'Animals in Care',
      value: ADOPTION_STATS.totalAnimals,
      badge: `${ADOPTION_STATS.availableAnimals} available`,
      badgeBg: '#EAF5F2', badgeColor: '#23967F',
    },
    {
      label: 'Adoptions This Month',
      value: ADOPTION_STATS.adoptionsThisMonth,
      badge: `+${ADOPTION_STATS.adoptionsThisMonth - ADOPTION_STATS.adoptionsLastMonth} vs last month`,
      badgeBg: '#FFF0EB', badgeColor: '#F6511D',
    },
    {
      label: 'Active Applications',
      value: ADOPTION_STATS.activeApplications,
      badge: `${ADOPTION_STATS.pendingHomeChecks} home checks pending`,
      badgeBg: '#EAF5F2', badgeColor: '#23967F',
    },
    {
      label: 'Avg Days to Adopt',
      value: ADOPTION_STATS.averageDaysToAdoption,
      badge: 'days avg in shelter',
      badgeBg: '#FBF9F8', badgeColor: '#53584A',
    },
  ];

  const pendingTasks = PENDING_TASKS.filter(t => !t.completed);

  return (
    <div className="p-6 lg:p-7 space-y-5" style={{ fontFamily: FONT, background: '#FBF9F8', minHeight: '100%' }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h4 style={{ color: '#090C02', marginBottom: 2 }}>Good morning, Sarah</h4>
          <p style={{ color: '#53584A', fontSize: 14 }}>Happy Paws Animal Rescue · Monday, May 11, 2025</p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => navigate('/shelter/intake')}
            className="flex items-center gap-1.5 px-4 py-2 text-white transition-opacity"
            style={{ background: '#F6511D', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E04413'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F6511D'}
          >
            <PlusCircle className="w-3.5 h-3.5" /> New Intake
          </button>
          <button
            onClick={() => navigate('/shelter/outtake')}
            className="flex items-center gap-1.5 px-4 py-2 transition-opacity"
            style={{ background: '#FFF0EB', color: '#F6511D', borderRadius: 8, fontSize: 14, fontWeight: 500 }}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" /> Outtake
          </button>
        </div>
      </div>

      {/* Alert */}
      <div
        className="flex items-center gap-3 px-5 py-3.5"
        style={{ background: '#EAF5F2', borderLeft: '4px solid #23967F', borderRadius: 12 }}
      >
        <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#23967F' }} />
        <p style={{ fontSize: 14, color: '#090C02', flex: 1 }}>
          <strong>4 animals need attention today</strong>
          <span style={{ color: '#53584A' }}> — Shadow's post-op check · Cleo quarantine · 2 vaccine due-dates</span>
        </p>
        <button
          onClick={() => navigate('/shelter/medical')}
          className="flex items-center gap-1 flex-shrink-0 px-3 py-1.5"
          style={{ background: '#23967F', color: '#ffffff', borderRadius: 8, fontSize: 13, fontWeight: 500 }}
        >
          View <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(card => (
          <div key={card.label} style={{ ...CARD, padding: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: '#53584A', marginBottom: 8 }}>{card.label}</p>
            <p style={{ fontSize: 28, fontWeight: 700, color: '#090C02', lineHeight: 1.2, marginBottom: 10 }}>{card.value}</p>
            <span
              className="rounded-full px-2.5 py-0.5 inline-block"
              style={{ background: card.badgeBg, color: card.badgeColor, fontSize: 12, fontWeight: 500 }}
            >
              {card.badge}
            </span>
          </div>
        ))}
      </div>

      {/* Chart + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ ...CARD, padding: 24 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>Adoption Trend</p>
              <p style={{ fontSize: 13, color: '#53584A', marginTop: 2 }}>Last 6 months</p>
            </div>
            <span
              className="flex items-center gap-1 rounded-full px-3 py-1"
              style={{ background: '#EAF5F2', color: '#23967F', fontSize: 12, fontWeight: 500 }}
            >
              <TrendingUp className="w-3 h-3" /> +40% vs 3mo ago
            </span>
          </div>
          <div style={{ height: 176 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADOPTION_STATS.monthlyAdoptions} barSize={22}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#53584A', fontFamily: FONT }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid rgba(9,12,2,0.08)', boxShadow: 'rgba(0,0,0,0.04) 0px 4px 12px', fontSize: 13, fontFamily: FONT }}
                  cursor={{ fill: '#FBF9F8' }}
                />
                <Bar dataKey="adoptions" radius={[6, 6, 0, 0]}>
                  {ADOPTION_STATS.monthlyAdoptions.map((_, i) => (
                    <Cell key={i} fill={i === ADOPTION_STATS.monthlyAdoptions.length - 1 ? '#23967F' : '#EAF5F2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ ...CARD, padding: 24 }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02', marginBottom: 16 }}>Animals by Status</p>
          <div className="space-y-3.5">
            {Object.entries(byStatus).map(([status, count]) => (
              <div key={status}>
                <div className="flex justify-between mb-1.5" style={{ fontSize: 13 }}>
                  <span style={{ color: '#53584A' }}>{status}</span>
                  <span style={{ fontWeight: 600, color: '#090C02' }}>{count}</span>
                </div>
                <div style={{ height: 5, background: '#FBF9F8', borderRadius: 100, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(count / animals.length) * 100}%`,
                      background: BAR_COLORS[status] || '#53584A',
                      borderRadius: 100,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(9,12,2,0.06)', fontSize: 13 }}>
            <span style={{ color: '#53584A' }}>Total tracked</span>
            <span style={{ fontWeight: 600, color: '#090C02' }}>{animals.length}</span>
          </div>
        </div>
      </div>

      {/* Tasks + Recent arrivals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div style={{ ...CARD, padding: 24 }} className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>Pending Tasks</p>
            <span
              className="rounded-full px-2.5 py-0.5"
              style={{ background: '#FFF0EB', color: '#F6511D', fontSize: 12, fontWeight: 500 }}
            >
              {pendingTasks.length} open
            </span>
          </div>
          <div className="space-y-2">
            {pendingTasks.slice(0, 5).map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 px-3 py-2.5"
                style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.06)', borderRadius: 8 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: PRIORITY_STYLE[task.priority]?.color || '#53584A' }}
                />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, color: '#090C02' }} className="truncate">{task.title}</p>
                  <p className="flex items-center gap-1 mt-0.5" style={{ fontSize: 12, color: '#53584A' }}>
                    <Clock className="w-3 h-3" /> {task.assignee} · Due {task.dueDate}
                  </p>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 flex-shrink-0"
                  style={{ background: PRIORITY_STYLE[task.priority]?.bg, color: PRIORITY_STYLE[task.priority]?.color, fontSize: 12, fontWeight: 500 }}
                >
                  {task.priority}
                </span>
                <button
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                  style={{ background: '#ffffff', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 6 }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#53584A' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...CARD, padding: 24 }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ fontWeight: 700, fontSize: 16, color: '#090C02' }}>Recent Arrivals</p>
            <button
              onClick={() => navigate('/shelter/intake')}
              style={{ fontSize: 13, fontWeight: 500, color: '#23967F' }}
            >
              Add new
            </button>
          </div>
          <div className="space-y-3">
            {animals.slice(-4).reverse().map(animal => (
              <div key={animal.id} className="flex items-center gap-3">
                <img
                  src={animal.photo}
                  alt={animal.name}
                  className="object-cover flex-shrink-0"
                  style={{ width: 38, height: 38, borderRadius: 8, border: '1px solid rgba(9,12,2,0.08)' }}
                />
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#090C02' }}>{animal.name}</p>
                  <p style={{ fontSize: 12, color: '#53584A', marginTop: 1 }}>{animal.breed} · {animal.intakeDate}</p>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 flex-shrink-0"
                  style={{
                    background: STATUS_COLORS[animal.status]?.bg || '#FBF9F8',
                    color: STATUS_COLORS[animal.status]?.text || '#53584A',
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {animal.status}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/shelter/activity')}
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-4"
            style={{ background: '#FBF9F8', border: '1px solid rgba(9,12,2,0.08)', borderRadius: 8, color: '#53584A', fontSize: 13, fontWeight: 500 }}
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
