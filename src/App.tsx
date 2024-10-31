import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SideNav } from './components/SideNav';
import { DashboardNav } from './components/DashboardNav';
import { Dashboard } from './components/Dashboard';
import { DataScience } from './Tools/DataScience'

export function App() {
  const [showDashboard, setShowDashboard] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>('dashboard'); // New state for active section

  const handleStartClick = () => {
    setShowDashboard(true);
  };

  const handleSectionChange = (section: string | null) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {showDashboard ? (
        <>
          <DashboardNav onMenuClick={() => setShowMobileMenu(!showMobileMenu)} />
          <div className="flex justify-around">
            <SideNav 
              isOpen={showMobileMenu} 
              onClose={() => setShowMobileMenu(false)} 
              onSectionChange={handleSectionChange} // Pass the handler
            />
            {activeSection === 'dashboard' && <Dashboard />}
            {activeSection === 'data-science' && <DataScience />}
            {/* Add more sections here as needed */}
          </div>
        </>
      ) : (
        <>
          <Navbar onMenuClick={() => setShowMobileMenu(!showMobileMenu)} />
          <main className="relative">
            <Hero onStartClick={handleStartClick} />
            <Features />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
