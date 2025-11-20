import { Gauge, Radio, Volume2 } from 'lucide-react'

export default function PracticeModule() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Interactive Practice Module</h2>
            <p className="text-slate-700 mb-6">
              Train with audio examples, flashcards, and real-time practice. Follow airplane-style gauges to track clarity, pace, and accuracy as you speak.
            </p>
            <ul className="space-y-3 text-slate-700">
              <li className="flex items-center gap-2"><Volume2 className="w-5 h-5 text-sky-600"/> High-quality audio examples with native cadence</li>
              <li className="flex items-center gap-2"><Radio className="w-5 h-5 text-sky-600"/> ATC-style call-and-response drills</li>
              <li className="flex items-center gap-2"><Gauge className="w-5 h-5 text-sky-600"/> Gauges show pronunciation and timing feedback</li>
            </ul>
          </div>
          <div className="relative">
            <div className="rounded-2xl bg-slate-900 text-white p-6 shadow-2xl border border-sky-400/20">
              <div className="grid grid-cols-3 gap-4">
                <GaugeCard label="Clarity" value={92} color="text-emerald-400" />
                <GaugeCard label="Pace" value={78} color="text-amber-300" />
                <GaugeCard label="Accuracy" value={84} color="text-sky-300" />
              </div>
              <div className="mt-6 rounded-xl bg-slate-800/60 p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Sample Phrase</p>
                  <p className="font-semibold">Request taxi to runway 27 via Alpha.</p>
                </div>
                <button className="bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg">Play</button>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-sky-400/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function GaugeCard({ label, value, color }) {
  return (
    <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700 text-center">
      <div className="mx-auto w-24 h-24 rounded-full bg-slate-900 grid place-items-center relative">
        <div className={`text-2xl font-bold ${color}`}>{value}%</div>
        <div className="absolute inset-0 rounded-full border-2 border-sky-500/30" />
      </div>
      <div className="mt-2 text-slate-300 text-sm">{label}</div>
    </div>
  )
}
