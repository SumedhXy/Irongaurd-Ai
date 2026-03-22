import { useState, useRef } from 'react'
import axios from 'axios'
import { UploadCloud, FileText, Loader2, AlertCircle, ChevronRight } from 'lucide-react'

export default function UploadForm({ onSuccess }) {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => e.preventDefault()
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) { setFile(e.dataTransfer.files[0]); setError('') }
  }
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) { setFile(e.target.files[0]); setError('') }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsUploading(true)
    setError('')
    const formData = new FormData()
    formData.append('file', file)
    try {
      await axios.post('http://localhost:8000/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      onSuccess()
    } catch {
      setError('Failed to process logs. Ensure the backend is running and file is valid CSV.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="w-full">
      {/* Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center py-14 px-6 rounded-lg cursor-pointer transition-all group"
        style={{
          border: '2px dashed rgba(0,255,65,0.15)',
          background: 'rgba(0,255,65,0.02)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,255,65,0.35)'; e.currentTarget.style.background = 'rgba(0,255,65,0.04)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,255,65,0.15)'; e.currentTarget.style.background = 'rgba(0,255,65,0.02)' }}
      >
        <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: 'var(--accent-glow)', border: '1px solid rgba(0,255,65,0.2)' }}>
          {file ? <FileText className="w-6 h-6" style={{ color: 'var(--accent)' }} /> : <UploadCloud className="w-6 h-6" style={{ color: 'var(--accent)' }} />}
        </div>
        {file ? (
          <div className="text-center">
            <p className="text-base font-bold font-mono" style={{ color: 'var(--accent)' }}>{file.name}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB · Ready to analyze</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Drop your API logs here
            </p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Supports <span className="font-mono" style={{ color: 'var(--accent)' }}>.csv</span> and <span className="font-mono" style={{ color: 'var(--accent)' }}>.json</span> formats
            </p>
          </div>
        )}
        <input type="file" accept=".csv,.json" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 py-3 px-4 rounded-lg flex items-center gap-2 text-sm" style={{ background: 'var(--danger-glow)', color: 'var(--danger)', border: '1px solid rgba(255,59,92,0.2)' }}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="btn-primary flex items-center gap-2.5 px-8 py-3.5 rounded-lg text-sm tracking-wide"
          style={{
            opacity: (!file || isUploading) ? 0.35 : 1,
            cursor: (!file || isUploading) ? 'not-allowed' : 'pointer',
          }}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              SCANNING SURFACE...
            </>
          ) : (
            <>
              INITIATE DISCOVERY
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
