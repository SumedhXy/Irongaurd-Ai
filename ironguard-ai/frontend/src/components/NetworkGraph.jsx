import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import axios from 'axios'
import { Loader2 } from 'lucide-react'

export default function NetworkGraph() {
  const svgRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [hoveredNode, setHoveredNode] = useState(null)

  useEffect(() => { fetchGraphData() }, [])

  const fetchGraphData = async () => {
    try {
      setLoading(true)
      const [invRes, depRes] = await Promise.all([
        axios.get('http://localhost:8000/api-inventory'),
        axios.get('http://localhost:8000/dependencies')
      ])
      const nodesData = invRes.data.endpoints.map(e => ({
        id: e.id, path: e.path, status: e.status, risk: e.risk_score, rbi: e.rbi_violation
      }))
      const linksData = depRes.data.dependencies.map(d => ({ source: d.source_id, target: d.target_id }))
      drawGraph(nodesData, linksData)
      setLoading(false)
    } catch (err) { console.error(err); setLoading(false) }
  }

  const drawGraph = (nodes, links) => {
    if (!svgRef.current) return
    d3.select(svgRef.current).selectAll("*").remove()
    const width = svgRef.current.clientWidth
    const height = 520
    const svgMain = d3.select(svgRef.current).attr("width", "100%").attr("height", height)
    const svg = svgMain.append("g")

    // Defs for glows
    const defs = svgMain.append("defs")
    const glowGreen = defs.append("filter").attr("id", "glow-green")
    glowGreen.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur")
    glowGreen.append("feComposite").attr("in", "SourceGraphic").attr("in2", "blur").attr("operator", "over")

    const glowRed = defs.append("filter").attr("id", "glow-red")
    glowRed.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "blur")
    glowRed.append("feComposite").attr("in", "SourceGraphic").attr("in2", "blur").attr("operator", "over")

    const validLinks = links.filter(l =>
      nodes.find(n => n.id === l.source) && nodes.find(n => n.id === l.target)
    ).map(l => Object.create(l))
    const validNodes = nodes.map(d => Object.create(d))

    const simulation = d3.forceSimulation(validNodes)
      .force("link", d3.forceLink(validLinks).id(d => d.id).distance(140))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50))

    // Links
    const link = svg.append("g").selectAll("line").data(validLinks).join("line")
      .attr("stroke", "#1e293b")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4,4")

    // Node Groups
    const nodeGroup = svg.append("g").selectAll("g").data(validNodes).join("g")
      .call(drag(simulation))
      .style("cursor", "grab")

    const getColor = (status) => status === 'Zombie' ? '#ff3b5c' : status === 'Declining' ? '#ffb020' : '#00ff41'
    const getRadius = (risk) => risk > 80 ? 24 : risk > 50 ? 20 : 16
    const getFilter = (status) => status === 'Zombie' ? 'url(#glow-red)' : 'url(#glow-green)'

    // Outer ring pulse for zombies
    nodeGroup.filter(d => d.status === 'Zombie')
      .append("circle")
      .attr("r", d => getRadius(d.risk) + 8)
      .attr("fill", "none")
      .attr("stroke", "#ff3b5c")
      .attr("stroke-width", 1)
      .attr("opacity", 0.3)
      .each(function() {
        const el = d3.select(this)
        function pulse() {
          el.transition().duration(1500)
            .attr("opacity", 0.05).attr("r", function(d) { return getRadius(d.risk) + 16 })
            .transition().duration(1500)
            .attr("opacity", 0.3).attr("r", function(d) { return getRadius(d.risk) + 8 })
            .on("end", pulse)
        }
        pulse()
      })

    // Main circle
    nodeGroup.append("circle")
      .attr("r", d => getRadius(d.risk))
      .attr("fill", d => getColor(d.status))
      .attr("fill-opacity", 0.15)
      .attr("stroke", d => getColor(d.status))
      .attr("stroke-width", 2)
      .attr("filter", d => getFilter(d.status))

    // Inner dot
    nodeGroup.append("circle")
      .attr("r", 4)
      .attr("fill", d => getColor(d.status))

    // Labels
    nodeGroup.append("text")
      .text(d => {
        const parts = d.path.split('/')
        return parts[parts.length-1] || parts[parts.length-2] || d.path
      })
      .attr("x", d => getRadius(d.risk) + 10)
      .attr("y", 4)
      .style("font-size", "11px")
      .style("font-weight", "600")
      .style("font-family", "'JetBrains Mono', monospace")
      .style("fill", d => getColor(d.status))
      .style("pointer-events", "none")

    // Tooltip
    nodeGroup.append("title")
      .text(d => `${d.path}\nStatus: ${d.status}\nRisk: ${d.risk}/100\n${d.rbi}`)

    // Hover effects
    nodeGroup.on("mouseenter", function(event, d) {
      d3.select(this).select("circle:nth-child(2)").transition().duration(200)
        .attr("fill-opacity", 0.35).attr("stroke-width", 3)
      link.attr("stroke", l => (l.source.id === d.id || l.target.id === d.id) ? getColor(d.status) : '#1e293b')
        .attr("stroke-opacity", l => (l.source.id === d.id || l.target.id === d.id) ? 0.8 : 0.3)
        .attr("stroke-width", l => (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1)
    })
    .on("mouseleave", function() {
      d3.select(this).select("circle:nth-child(2)").transition().duration(200)
        .attr("fill-opacity", 0.15).attr("stroke-width", 2)
      link.attr("stroke", "#1e293b").attr("stroke-opacity", 0.6).attr("stroke-width", 1.5)
    })

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x).attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x).attr("y2", d => d.target.y)
      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`)
    })

    // Zoom
    svgMain.call(d3.zoom().scaleExtent([0.3, 4]).on("zoom", e => svg.attr("transform", e.transform)))
  }

  const drag = simulation => {
    return d3.drag()
      .on("start", (e, d) => { if (!e.active) simulation.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y })
      .on("end", (e, d) => { if (!e.active) simulation.alphaTarget(0); d.fx = null; d.fy = null })
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[520px] gap-3">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--accent)' }} />
        <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Mapping dependencies...</span>
      </div>
    )
  }

  return (
    <div className="w-full relative rounded-lg overflow-hidden" style={{ cursor: 'grab', background: 'var(--bg-card)' }}>
      <svg ref={svgRef} className="w-full" style={{ height: '520px' }} />
      {/* Legend */}
      <div className="absolute top-4 left-4 p-4 rounded-xl text-xs space-y-2.5" style={{ background: 'rgba(10,14,26,0.9)', border: '1px solid var(--border-color)', backdropFilter: 'blur(8px)' }}>
        <h4 className="font-bold text-xs tracking-widest pb-2 mb-2" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border-color)' }}>LEGEND</h4>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#00ff41', boxShadow: '0 0 6px #00ff41' }}></div>
          <span style={{ color: 'var(--text-secondary)' }}>Active</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ffb020', boxShadow: '0 0 6px #ffb020' }}></div>
          <span style={{ color: 'var(--text-secondary)' }}>Declining</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff3b5c', boxShadow: '0 0 6px #ff3b5c' }}></div>
          <span style={{ color: 'var(--text-secondary)' }}>Zombie</span>
        </div>
        <p className="pt-2 mt-2 italic" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)' }}>Node size = risk level</p>
      </div>
    </div>
  )
}
