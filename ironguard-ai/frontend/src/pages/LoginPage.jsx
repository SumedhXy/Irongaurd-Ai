import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff, Lock, User, ChevronRight, Zap } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false)
      navigate('/home')
    }, 1200)
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Geometric Background */}
      <div className="geo-bg">
        <div className="geo-shape tri-1"></div>
        <div className="geo-shape tri-2"></div>
        <div className="geo-shape hex-1"></div>
        <div className="geo-shape circle-1"></div>
        <div className="geo-shape line-1"></div>
      </div>

      {/* ─── LEFT BRANDING PANEL ─── */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-center items-center p-16">
        <div className="max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}>
                <Shield className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                IRON <span style={{ color: 'var(--accent)' }} className="glow-text-green">GUARD</span> AI
              </h1>
              <p className="text-xs tracking-widest font-medium" style={{ color: 'var(--text-muted)' }}>ZOMBIE API DEFENSE SYSTEM</p>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-4xl font-black leading-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Detect. Defend.
            <br />
            Eliminate <span style={{ color: 'var(--accent)' }} className="glow-text-green">Zombie APIs.</span>
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
            Enterprise-grade API surface mapping engineered for banking institutions.
            Discover forgotten endpoints and neutralize threats — in 15 minutes.
          </p>

          {/* Key features */}
          <div className="space-y-4">
            <FeatureItem icon="🛡️" text="RBI Compliance & Risk Mapping" />
            <FeatureItem icon="🔗" text="Visual Dependency Intelligence" />
            <FeatureItem icon="⚡" text="15-Minute API Surface Discovery" />
            <FeatureItem icon="🎯" text="Prioritized Remediation Engine" />
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div>
              <p className="text-2xl font-black font-mono" style={{ color: 'var(--accent)' }}>79+</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Banks at Risk</p>
            </div>
            <div>
              <p className="text-2xl font-black font-mono" style={{ color: 'var(--accent)' }}>₹37Cr</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Avg Breach Cost</p>
            </div>
            <div>
              <p className="text-2xl font-black font-mono" style={{ color: 'var(--accent)' }}>15min</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Discovery Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT LOGIN PANEL ─── */}
      <div className="w-full lg:w-1/2 relative z-10 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-glow)', border: '1px solid var(--accent)' }}>
              <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            </div>
            <h1 className="text-lg font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              IRON <span style={{ color: 'var(--accent)' }}>GUARD</span> AI
            </h1>
          </div>

          {/* Card */}
          <div className="card-dark corner-accent rounded-2xl p-8" style={{ background: 'var(--bg-card)' }}>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.15)' }}>
                <Lock className="w-3 h-3" />
                SECURE ACCESS
              </div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Welcome back</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Enter your credentials to access the defense console.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-xs font-bold tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>EMAIL OR ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="analyst@bank.gov.in"
                    className="w-full pl-11 pr-4 py-3.5 rounded-lg text-sm font-medium outline-none transition-all"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold tracking-wider block mb-2" style={{ color: 'var(--text-muted)' }}>PASSWORD</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-lg text-sm font-medium outline-none transition-all"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-color)'}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                  <input type="checkbox" className="rounded" style={{ accentColor: 'var(--accent)' }} />
                  Remember session
                </label>
                <a href="#" className="font-medium transition-colors" style={{ color: 'var(--accent)' }}>Forgot password?</a>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isLoading} className="btn-primary w-full py-3.5 rounded-lg text-sm font-bold tracking-wider flex items-center justify-center gap-2">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: '#0a0e1a', borderTopColor: 'transparent' }}></div>
                ) : (
                  <>
                    ACCESS CONSOLE
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }}></div>
              <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>or</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }}></div>
            </div>

            {/* Guest button */}
            <button onClick={() => navigate('/home')} className="btn-outline w-full py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Continue as Guest
            </button>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
            PSBs Hackathon Series 2026 · PS9 Zombie API Discovery & Defence
          </p>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{text}</span>
    </div>
  )
}
