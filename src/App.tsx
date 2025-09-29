import React from 'react'
import Navigation from './components/layout/navigation/Navigation'
import Hero from './components/layout/hero/Hero'
import About from './components/layout/about/About'
import Education from './components/layout/education/Education'
import Projects from './components/layout/projects/Projects'
import Gallery from './components/layout/gallery/Gallery'
import Contact from './components/layout/contact/Contact'
import Dock from './components/dock/Dock'

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
            <Navigation />

            <main className="relative">
                <Hero />
                <About />
                <Education />
                <Projects />
                <Gallery />
                <Contact />
            </main>

            <Dock />

            {/* Background Elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-pink-500 bg-opacity-10 rounded-full blur-3xl animate-pulse" />
            </div>
        </div>
    )
}

export default App