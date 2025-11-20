import { Headset, TowerControl, Plane, ShieldAlert } from 'lucide-react'

const categories = [
  { icon: Headset, title: 'ATC Basics', desc: 'Clearances, readbacks, and standard phraseology.' },
  { icon: Plane, title: 'In-Flight Communication', desc: 'Altitude/heading changes, position reports.' },
  { icon: ShieldAlert, title: 'Emergency Phrases', desc: 'Mayday, Pan-Pan, and abnormal situations.' },
  { icon: TowerControl, title: 'Ground Operations', desc: 'Taxi, pushback, ramp and gate calls.' },
]

export default function Categories() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Flight Phrase Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-sky-50 border border-sky-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-sky-100 text-sky-700">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
              </div>
              <p className="text-slate-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
