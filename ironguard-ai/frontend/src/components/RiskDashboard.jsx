import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShieldAlert, Activity, AlertTriangle, Cpu, TrendingDown, Lock, ChevronDown, ChevronUp, IndianRupee, FileWarning, Scale } from 'lucide-react'

export default function RiskDashboard() {
  const [endpoints, setEndpoints] = useState([])
  const [stats, setStats] = useState({ total: 0, zombies: 0, declining: 0, highRisk: 0, totalPenalty: 0 })
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api-inventory')
      const data = res.data.endpoints
      setEndpoints(data)
      setStats({
        total: data.length,
        zombies: data.filter(e => e.status === 'Zombie').length,
        declining: data.filter(e => e.status === 'Declining').length,
        highRisk: data.filter(e => e.violation_count > 0).length,
        totalPenalty: data.reduce((sum, e) => sum + (e.total_penalty_max || 0), 0)
      })
    } catch (err) { console.error(err) }
  }

  const formatPenalty = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(0)} Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)} L`
    return `₹${amount.toLocaleString('en-IN')}`
  }

  return (
    <div className="space-y-6">
      {/* ─── Stat Cards ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Endpoints"
          value={stats.total}
          icon={<Cpu className="w-5 h-5" />}
          accentColor="var(--info)"
          glowColor="var(--info-glow)"
        />
        <StatCard
          title="Zombie APIs"
          value={stats.zombies}
          icon={<ShieldAlert className="w-5 h-5" />}
          accentColor="var(--danger)"
          glowColor="var(--danger-glow)"
          pulse
        />
        <StatCard
          title="RBI Violations"
          value={stats.highRisk}
          icon={<AlertTriangle className="w-5 h-5" />}
          accentColor="var(--danger)"
          glowColor="var(--danger-glow)"
          pulse
        />
        <StatCard
          title="Penalty Exposure"
          value={formatPenalty(stats.totalPenalty)}
          icon={<IndianRupee className="w-5 h-5" />}
          accentColor="var(--warning)"
          glowColor="var(--warning-glow)"
          isText
        />
      </div>

      {/* ─── Threat Table ─── */}
      <div className="card-dark corner-accent rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--accent)' }}>THREAT REGISTER</span>
            </div>
            <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Critical Vulnerability Inventory</h3>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
            {endpoints.length} endpoints
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-cyber">
            <thead>
              <tr>
                <th style={{ width: '30px' }}></th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>Status</th>
                <th>Risk</th>
                <th>Violations</th>
                <th>Penalty Exposure</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                    <span className="cursor-blink">No scan results loaded</span>
                  </td>
                </tr>
              ) : (
                endpoints.sort((a,b) => b.risk_score - a.risk_score).slice(0, 10).map((ep) => (
                  <>
                    {/* Main Row */}
                    <tr
                      key={ep.id}
                      onClick={() => setExpandedRow(expandedRow === ep.id ? null : ep.id)}
                      style={{ cursor: ep.violation_count > 0 ? 'pointer' : 'default' }}
                    >
                      <td style={{ padding: '14px 8px 14px 18px' }}>
                        {ep.violation_count > 0 && (
                          expandedRow === ep.id 
                            ? <ChevronUp className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            : <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                        )}
                      </td>
                      <td className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{ep.path}</td>
                      <td>
                        <span className="px-2 py-1 rounded text-xs font-bold font-mono" style={{
                          background: ep.method === 'POST' ? 'rgba(255,176,32,0.1)' : 'rgba(56,189,248,0.1)',
                          color: ep.method === 'POST' ? 'var(--warning)' : 'var(--info)'
                        }}>
                          {ep.method}
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-2 text-xs font-bold">
                          <span className="status-dot" style={{
                            background: ep.status === 'Zombie' ? 'var(--danger)' : ep.status === 'Declining' ? 'var(--warning)' : 'var(--accent)',
                            boxShadow: `0 0 6px ${ep.status === 'Zombie' ? 'var(--danger)' : ep.status === 'Declining' ? 'var(--warning)' : 'var(--accent)'}`
                          }}></span>
                          <span style={{ color: ep.status === 'Zombie' ? 'var(--danger)' : ep.status === 'Declining' ? 'var(--warning)' : 'var(--accent)' }}>
                            {ep.status.toUpperCase()}
                          </span>
                        </span>
                      </td>
                      <td><RiskBar score={ep.risk_score} /></td>
                      <td>
                        {ep.violation_count > 0 ? (
                          <span className="text-xs font-bold flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ background: 'var(--danger-glow)', color: 'var(--danger)', border: '1px solid rgba(255,59,92,0.15)' }}>
                            <AlertTriangle className="w-3 h-3" />
                            {ep.violation_count} VIOLATED
                          </span>
                        ) : (
                          <span className="text-xs font-medium flex items-center gap-1.5 px-2.5 py-1 rounded" style={{ background: 'var(--accent-glow)', color: 'var(--accent)', border: '1px solid rgba(0,255,65,0.15)' }}>
                            ✓ COMPLIANT
                          </span>
                        )}
                      </td>
                      <td>
                        {ep.total_penalty_max > 0 ? (
                          <span className="text-xs font-bold font-mono" style={{ color: 'var(--warning)' }}>
                            {formatPenalty(ep.total_penalty_min)} – {formatPenalty(ep.total_penalty_max)}
                          </span>
                        ) : (
                          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>
                    </tr>

                    {/* ─── Expanded Violation Details ─── */}
                    {expandedRow === ep.id && ep.violation_count > 0 && (
                      <tr key={`${ep.id}-details`}>
                        <td colSpan="7" style={{ padding: 0, border: 'none' }}>
                          <div style={{ background: 'rgba(255,59,92,0.03)', borderTop: '1px solid rgba(255,59,92,0.1)', borderBottom: '1px solid rgba(255,59,92,0.1)' }}>
                            <div className="px-8 py-5 space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Scale className="w-4 h-4" style={{ color: 'var(--danger)' }} />
                                <span className="text-xs font-bold tracking-widest" style={{ color: 'var(--danger)' }}>
                                  RBI COMPLIANCE VIOLATIONS — {ep.path}
                                </span>
                              </div>
                              {ep.violations.map((v, idx) => (
                                <ViolationCard key={idx} violation={v} />
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ─── Violation Detail Card ─── */
function ViolationCard({ violation }) {
  const severityColors = {
    CRITICAL: { bg: 'rgba(255,59,92,0.1)', color: '#ff3b5c', border: 'rgba(255,59,92,0.2)' },
    HIGH: { bg: 'rgba(255,176,32,0.1)', color: '#ffb020', border: 'rgba(255,176,32,0.2)' },
    MEDIUM: { bg: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: 'rgba(56,189,248,0.2)' },
  }
  const sev = severityColors[violation.severity] || severityColors.MEDIUM

  return (
    <div className="rounded-lg p-4" style={{ background: 'var(--bg-card)', border: `1px solid ${sev.border}` }}>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="flex-1">
          {/* Header row */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-xs font-black font-mono" style={{ background: sev.bg, color: sev.color, border: `1px solid ${sev.border}` }}>
              {violation.severity}
            </span>
            <span className="text-xs font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
              {violation.code}
            </span>
          </div>

          {/* Guideline name */}
          <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {violation.name}
          </h4>

          {/* Section */}
          <p className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
            {violation.section}
          </p>

          {/* Description */}
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {violation.description}
          </p>
        </div>

        {/* Penalty box */}
        <div className="shrink-0 rounded-lg p-3 text-center min-w-[140px]" style={{ background: 'rgba(255,176,32,0.05)', border: '1px solid rgba(255,176,32,0.15)' }}>
          <div className="flex items-center justify-center gap-1 mb-1">
            <FileWarning className="w-3.5 h-3.5" style={{ color: 'var(--warning)' }} />
            <span className="text-xs font-bold tracking-wider" style={{ color: 'var(--warning)' }}>PENALTY</span>
          </div>
          <p className="text-base font-black font-mono" style={{ color: 'var(--warning)' }}>
            {violation.penalty_display}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>per violation</p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, accentColor, glowColor, pulse, isText }) {
  return (
    <div className="card-dark corner-accent rounded-xl p-5 flex items-start gap-4 anim-fade-up">
      <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: glowColor, color: accentColor, border: `1px solid ${accentColor}22` }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{title}</p>
        <p className={`${isText ? 'text-xl' : 'text-3xl'} font-black font-mono mt-1 animate-count flex items-center gap-2`} style={{ color: accentColor }}>
          {value}
          {pulse && value > 0 && <span className="status-dot" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }}></span>}
        </p>
      </div>
    </div>
  )
}

function RiskBar({ score }) {
  const getColor = () => {
    if (score > 75) return 'var(--danger)'
    if (score > 50) return 'var(--warning)'
    return 'var(--accent)'
  }
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        <div className="h-full rounded-full transition-all" style={{
          width: `${Math.min(score, 100)}%`,
          background: getColor(),
          boxShadow: `0 0 8px ${getColor()}`
        }}></div>
      </div>
      <span className="text-xs font-bold font-mono" style={{ color: getColor() }}>{score}</span>
    </div>
  )
}
