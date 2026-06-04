import { useState } from 'react';
import { useNavigate } from 'react-router';
import { LogoMark } from '../components/LoopetIllustrations';
import { ArrowRight, Heart, Building2 } from 'lucide-react';

const FONT = "'Lexend Deca', 'Inter', sans-serif";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<'adopter' | 'shelter' | null>(null);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ fontFamily: FONT, background: '#FBF9F8' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-10">
        <LogoMark className="w-8 h-8" />
        <span style={{ fontWeight: 700, fontSize: 20, color: '#090C02', letterSpacing: '-0.01em' }}>loopet</span>
      </div>

      {/* Header */}
      <div className="text-center mb-10" style={{ maxWidth: 480 }}>
        <h2 style={{ color: '#090C02', marginBottom: 10 }}>Who are you?</h2>
        <p style={{ fontSize: 16, color: '#53584A', lineHeight: 1.6 }}>
          Let us tailor the experience for you. Choose your role to get started.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full" style={{ maxWidth: 720 }}>
        {/* Adopter card */}
        <button
          onClick={() => navigate('/adopter/signup')}
          onMouseEnter={() => setHovered('adopter')}
          onMouseLeave={() => setHovered(null)}
          className="flex flex-col items-center gap-5 p-8 text-left transition-all"
          style={{
            background: hovered === 'adopter' ? '#FFF0EB' : '#ffffff',
            border: `2px solid ${hovered === 'adopter' ? '#F6511D' : 'rgba(9,12,2,0.1)'}`,
            borderRadius: 16,
            boxShadow: hovered === 'adopter' ? '0 8px 32px rgba(246,81,29,0.12)' : 'rgba(0,0,0,0.04) 0px 4px 12px',
            transform: hovered === 'adopter' ? 'translateY(-2px)' : 'translateY(0)',
            cursor: 'pointer',
          }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{
              borderRadius: 16,
              background: hovered === 'adopter' ? '#ffd5c2' : '#FBF9F8',
              transition: 'background 0.2s',
            }}
          >
            <Heart style={{ width: 40, height: 40, color: '#F6511D' }} />
          </div>
          <div className="text-center">
            <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 8 }}>
              I'm looking to adopt
            </p>
            <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.6, marginBottom: 16 }}>
              Find your perfect animal companion. Browse profiles, get matched, and meet your future pet.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 text-white"
              style={{
                background: hovered === 'adopter' ? '#F6511D' : '#090C02',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              Find a pet <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-2 mt-1">
            {['Smart matching', 'Verified profiles', 'Easy adoption'].map(tag => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5"
                style={{
                  background: hovered === 'adopter' ? '#F6511D' : '#FBF9F8',
                  color: hovered === 'adopter' ? 'white' : '#53584A',
                  fontSize: 11,
                  fontWeight: 500,
                  border: `1px solid ${hovered === 'adopter' ? '#F6511D' : 'rgba(9,12,2,0.1)'}`,
                  transition: 'all 0.2s',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </button>

        {/* Shelter card */}
        <button
          onClick={() => navigate('/shelter/signup')}
          onMouseEnter={() => setHovered('shelter')}
          onMouseLeave={() => setHovered(null)}
          className="flex flex-col items-center gap-5 p-8 text-left transition-all"
          style={{
            background: hovered === 'shelter' ? '#EAF5F2' : '#ffffff',
            border: `2px solid ${hovered === 'shelter' ? '#135346' : 'rgba(9,12,2,0.1)'}`,
            borderRadius: 16,
            boxShadow: hovered === 'shelter' ? '0 8px 32px rgba(19,83,70,0.12)' : 'rgba(0,0,0,0.04) 0px 4px 12px',
            transform: hovered === 'shelter' ? 'translateY(-2px)' : 'translateY(0)',
            cursor: 'pointer',
          }}
        >
          <div
            className="w-20 h-20 flex items-center justify-center"
            style={{
              borderRadius: 16,
              background: hovered === 'shelter' ? '#EAF5F2' : '#FBF9F8',
              transition: 'background 0.2s',
            }}
          >
            <Building2 style={{ width: 40, height: 40, color: '#135346' }} />
          </div>
          <div className="text-center">
            <p style={{ fontWeight: 700, fontSize: 18, color: '#090C02', marginBottom: 8 }}>
              We're a rescue or shelter
            </p>
            <p style={{ fontSize: 14, color: '#53584A', lineHeight: 1.6, marginBottom: 16 }}>
              Modernise your shelter operations. Manage intake, medical records, and connect with adopters.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 text-white"
              style={{
                background: hovered === 'shelter' ? '#135346' : '#090C02',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                transition: 'background 0.2s',
              }}
            >
              Register shelter <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-center gap-2 mt-1">
            {['Intake & outtake', 'Pet IDs', 'NFC logging'].map(tag => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5"
                style={{
                  background: hovered === 'shelter' ? '#135346' : '#FBF9F8',
                  color: hovered === 'shelter' ? 'white' : '#53584A',
                  fontSize: 11,
                  fontWeight: 500,
                  border: `1px solid ${hovered === 'shelter' ? '#135346' : 'rgba(9,12,2,0.1)'}`,
                  transition: 'all 0.2s',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Already have account */}
      <p className="mt-8" style={{ fontSize: 14, color: '#53584A' }}>
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          style={{ fontWeight: 500, color: '#F6511D' }}
        >
          Log in
        </button>
      </p>
    </div>
  );
}
