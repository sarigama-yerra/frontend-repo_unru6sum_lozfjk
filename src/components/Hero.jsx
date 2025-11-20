import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function clamp(val, min, max) { return Math.min(max, Math.max(min, val)) }

export default function Hero({ onCTAClick }) {
  const containerRef = useRef(null)
  const [t, setT] = useState(0) // progress 0..1
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState(0)
  const [speedBoost, setSpeedBoost] = useState(1)

  useEffect(() => {
    let raf
    let last = performance.now()

    const loop = (now) => {
      const dt = (now - last) / 1000 // seconds
      last = now
      // Base speed cycles every ~10s; hover speeds up
      const baseSpeed = 0.1 // cycles per second
      const next = t + dt * baseSpeed * (hovered ? 1.8 : 1) * speedBoost
      setT(next % 1)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, speedBoost, t])

  // Quadratic bezier path helper (0..1)
  const pathWidth = 1200
  const pathHeight = 320
  const P0 = { x: -150, y: pathHeight * 0.75 }
  const P1 = { x: pathWidth * 0.5, y: pathHeight * 0.05 }
  const P2 = { x: pathWidth + 150, y: pathHeight * 0.6 }

  const tt = t // progress
  const x = (1 - tt) * (1 - tt) * P0.x + 2 * (1 - tt) * tt * P1.x + tt * tt * P2.x
  const y = (1 - tt) * (1 - tt) * P0.y + 2 * (1 - tt) * tt * P1.y + tt * tt * P2.y

  // Direction (tangent) for rotation
  const dxdt = -2 * (1 - tt) * P0.x + (2 - 4 * tt) * P1.x + 2 * tt * P2.x
  const dydt = -2 * (1 - tt) * P0.y + (2 - 4 * tt) * P1.y + 2 * tt * P2.y
  const angle = Math.atan2(dydt, dxdt) * 180 / Math.PI + tilt

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = (e.clientX - rect.left) / rect.width // 0..1
    const my = (e.clientY - rect.top) / rect.height // 0..1
    const localTilt = clamp((mx - 0.5) * 20 + (0.5 - my) * 10, -18, 18)
    setTilt(localTilt)
    // Subtle speed change with mouse X
    setSpeedBoost(0.9 + Math.abs(mx - 0.5) * 0.8)
  }

  return (
    <section className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      <div
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt(0); setSpeedBoost(1) }}
        className="relative h-[520px] sm:h-[560px] md:h-[640px] w-full flex items-center"
      >
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white" />
        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,0.15),transparent_60%)]" />

        {/* Clouds layers */}
        <div className="absolute inset-0 overflow-hidden">
          <Clouds speed={12} opacity={0.65} size={220} y={80} />
          <Clouds speed={20} opacity={0.45} size={280} y={140} reverse />
          <Clouds speed={35} opacity={0.3} size={320} y={30} />
        </div>

        {/* Headline content */}
        <div className="relative z-10 px-6 md:px-10 max-w-6xl mx-auto w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-sky-700 shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              Beginner friendly training
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Practice Aviation English Like a Pilot
            </h1>
            <p className="mt-4 text-slate-700 text-lg md:text-xl max-w-xl">
              Learn essential flight phrases with real-world examples and interactive training.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={onCTAClick}
                className="group inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-sky-600/30 transition-colors"
              >
                Start Practicing
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Airplane animation canvas */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute"
            style={{ transform: `translate(${x}px, ${y}px) rotate(${angle}deg)` }}
            initial={{ scale: 0.9 }}
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          >
            <AirplaneSVG />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Clouds({ speed = 20, opacity = 0.5, size = 240, y = 80, reverse = false }) {
  const items = new Array(7).fill(0)
  return (
    <div className="absolute left-0 right-0" style={{ top: y }}>
      {items.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: Math.sin(i) * 10, opacity }}
          initial={{ x: reverse ? -1400 : 1400 }}
          animate={{ x: reverse ? 1400 : -1400 }}
          transition={{ repeat: Infinity, duration: speed + i * 0.8, ease: 'linear', delay: i * 0.6 }}
        >
          <Cloud size={size + i * 14} />
        </motion.div>
      ))}
    </div>
  )
}

function Cloud({ size = 240 }) {
  return (
    <div
      className="rounded-full bg-white/80 blur-xl shadow-[0_0_60px_rgba(255,255,255,0.8)]"
      style={{ width: size, height: size * 0.55 }}
    />
  )
}

function AirplaneSVG() {
  return (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
      <g filter="url(#a)">
        <path d="M10 80 L90 70 L120 50 L125 55 L100 85 L10 95 Z" fill="#0ea5e9" />
        <path d="M10 80 L90 70 L120 50" stroke="#083344" strokeWidth="3" opacity="0.2" />
        <circle cx="95" cy="70" r="6" fill="#0c4a6e" />
      </g>
      <defs>
        <filter id="a" x="0" y="40" width="140" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="0.5" />
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0ea5e9" floodOpacity="0.35" />
        </filter>
      </defs>
    </svg>
  )
}
