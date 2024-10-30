import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SideNav } from './components/SideNav';
import { DashboardNav } from './components/DashboardNav';
import { Dashboard } from './components/Dashboard';

export function App() {
  const [showDashboard, setShowDashboard] = React.useState(false);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const handleStartClick = () => {
    setShowDashboard(true);
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
            />
              <Dashboard />
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
