import { useNavigate } from 'react-router-dom'
import UploadForm from '../components/UploadForm'
import { Shield, Zap, Terminal, ArrowRight, BarChart3, Network, FileSearch } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()

  const handleUploadSuccess = () => {
    navigate('/dashboard')
  }

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
            <NavLink label="Home" active />
            <NavLink label="Dashboard" onClick={() => navigate('/dashboard')} />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.2)' }}>
              <span className="status-dot" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }}></span>
              SYSTEM ONLINE
            </div>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center pt-12 pb-8">
          <div className="text-center mb-12 anim-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-8" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.15)' }}>
              <Zap className="w-3.5 h-3.5" />
              BANKING API THREAT INTELLIGENCE
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Map Your Entire API
              <br />
              <span style={{ color: 'var(--accent)' }} className="glow-text-green">Attack Surface</span> in 15 Minutes
            </h2>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Upload your API access logs to instantly discover zombie endpoints,
              analyze RBI compliance risk, and visualize service dependencies.
            </p>
          </div>

          {/* Upload Card */}
          <div className="w-full max-w-2xl anim-fade-up anim-delay-1">
            <div className="card-dark corner-accent rounded-xl p-8 scan-line" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>UPLOAD API ACCESS LOGS</span>
              </div>
              <UploadForm onSuccess={handleUploadSuccess} />
            </div>
          </div>
        </div>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-16 anim-fade-up anim-delay-2">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>HOW IT WORKS</span>
            <h3 className="text-2xl font-bold mt-3" style={{ color: 'var(--text-primary)' }}>Three Steps to Full API Visibility</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="01"
              icon={<FileSearch className="w-6 h-6" />}
              title="Discover"
              desc="Automated log parsing identifies all active APIs — documented and undocumented."
            />
            <StepCard
              step="02"
              icon={<BarChart3 className="w-6 h-6" />}
              title="Analyze"
              desc="AI-powered risk scoring with multi-factor analysis and RBI compliance context."
            />
            <StepCard
              step="03"
              icon={<Network className="w-6 h-6" />}
              title="Visualize"
              desc="Interactive dependency graph shows business impact and migration complexity."
            />
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="py-8 mb-8 anim-fade-up anim-delay-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatMini label="Banks at Risk" value="79+" />
            <StatMini label="Avg Zombie %" value="5.6%" />
            <StatMini label="Breach Cost" value="₹37Cr" />
            <StatMini label="Discovery Time" value="15min" />
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t py-6" style={{ borderColor: 'var(--border-color)' }}>
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

function StepCard({ step, icon, title, desc }) {
  return (
    <div className="card-dark corner-accent rounded-xl p-6 text-center group">
      <div className="text-xs font-black font-mono mb-4" style={{ color: 'var(--accent)', opacity: 0.4 }}>{step}</div>
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 transition-transform group-hover:scale-110" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.15)' }}>
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h4>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
  )
}

function StatMini({ label, value }) {
  return (
    <div className="card-dark rounded-lg p-4 text-center">
      <p className="text-2xl font-black font-mono animate-count" style={{ color: 'var(--accent)' }}>{value}</p>
      <p className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  )
}
