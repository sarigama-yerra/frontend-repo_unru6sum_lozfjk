import Hero from './components/Hero'
import Categories from './components/Categories'
import PracticeModule from './components/PracticeModule'
import WhyMatters from './components/WhyMatters'

function App() {
  const handleStart = () => {
    // For now, smooth scroll to practice module
    const el = document.getElementById('practice')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span className="font-semibold">AeroSpeak</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
            <a href="#categories" className="hover:text-slate-900">Categories</a>
            <a href="#practice" className="hover:text-slate-900">Practice</a>
            <a href="#why" className="hover:text-slate-900">Why</a>
          </nav>
          <a href="#practice" className="px-3 py-1.5 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700">Start</a>
        </div>
      </header>

      <main>
        <Hero onCTAClick={handleStart} />
        <div id="categories"><Categories /></div>
        <div id="practice"><PracticeModule /></div>
        <div id="why"><WhyMatters /></div>
      </main>

      <footer className="py-10 text-center text-slate-500 text-sm bg-sky-50">
        Built for aspiring pilots • Smooth, simple, professional
      </footer>
    </div>
  )
}

export default App
