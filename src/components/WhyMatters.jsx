export default function WhyMatters() {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">Why Aviation English Matters</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Safety First" desc="Standard phrases reduce misunderstandings during critical phases of flight."/>
          <Card title="Global Standard" desc="ICAO phraseology lets pilots and controllers coordinate worldwide."/>
          <Card title="Confident Flying" desc="Clear radio work builds confidence and keeps cockpit workload lower."/>
        </div>
      </div>
    </section>
  )
}

function Card({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow bg-gradient-to-br from-sky-50 to-white">
      <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-700 text-sm">{desc}</p>
    </div>
  )
}
