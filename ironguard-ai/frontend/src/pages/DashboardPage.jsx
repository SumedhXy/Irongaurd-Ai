import { useNavigate } from 'react-router-dom'
import RiskDashboard from '../components/RiskDashboard'
import NetworkGraph from '../components/NetworkGraph'
import { Shield, Zap, Terminal, ArrowLeft } from 'lucide-react'

export default function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-primary)' }}>
      {/* Geometric Background */}
      <div className="geo-bg">
        <div className="geo-shape tri-1"></div>
        <div className="geo-shape tri-2"></div>
        <div className="geo-shape hex-1"></div>
        <div className="geo-shape circle-1"></div>
        <div className="geo-shape line-1"></div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="relative z-10 border-b" style={{ borderColor: 'var(--border-color)', background: 'rgba(10,14,26,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}>
                <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></div>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                IRON <span style={{ color: 'var(--accent)' }} className="glow-text-green">GUARD</span> AI
              </h1>
              <p className="text-xs tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>ZOMBIE API DEFENSE SYSTEM</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink label="Home" onClick={() => navigate('/home')} />
            <NavLink label="Dashboard" active />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.2)' }}>
              <span className="status-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}></span>
              SYSTEM ONLINE
            </div>
          </nav>
        </div>
      </header>

      {/* ─── DASHBOARD CONTENT ─── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8 anim-fade-up">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>THREAT ANALYSIS COMPLETE</span>
            </div>
            <h2 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              Risk Intelligence Dashboard
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Real-time analysis of your API attack surface and compliance posture.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="btn-outline px-5 py-2.5 rounded-lg text-sm flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              New Scan
            </button>
          </div>
        </div>

        {/* Risk Dashboard cards + table */}
        <RiskDashboard />

        {/* Network Graph */}
        <div className="card-dark corner-accent rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)', background: 'rgba(0,255,65,0.02)' }}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>DEPENDENCY MAP</span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                Visual Dependency Intelligence
              </h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Interactive network graph — drag nodes, scroll to zoom, hover for details.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.15)' }}>
              <span className="status-dot" style={{ background: 'var(--accent)' }}></span>
              LIVE
            </div>
          </div>
          <div className="p-2 dot-grid" style={{ minHeight: '520px' }}>
            <NetworkGraph />
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t mt-12 py-6" style={{ borderColor: 'var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            © 2026 IRON GUARD AI — PS9 ZOMBIE API DISCOVERY & DEFENCE
          </p>
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            v1.0.0 · PSBs Hackathon Series 2026
          </p>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ label, active, onClick }) {
  return (
    <button onClick={onClick} className="text-sm font-medium transition-all px-1 py-0.5" style={{
      color: active ? 'var(--accent)' : 'var(--text-secondary)',
      borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
      background: 'none', cursor: 'pointer'
    }}>
      {label}
    </button>
  )
}
