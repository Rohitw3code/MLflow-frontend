import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, LayoutDashboard, Brain, Cog, Camera, Plus, User, Users, FolderOpen } from 'lucide-react';
import { WorkflowPipeline } from './WorkflowPipeline';

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 text-sm ${
        active
          ? 'text-white bg-purple-600/20 border-r-2 border-purple-600'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      } transition-colors`}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <span>{text}</span>
      </div>
    </button>
  );
}

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideNav({ isOpen, onClose }: SideNavProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
    onClose(); // Close the side nav when a section is clicked
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target as Node)) {
        onClose(); // Close if clicked outside
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const baseClasses = "fixed inset-y-0 left-0 w-64 bg-slate-900 z-50 transform transition-transform duration-300 ease-in-out";
  const translateClasses = isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0";

  return (
    <>
      <div ref={sideNavRef} className={`${baseClasses} ${translateClasses}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 flex items-center justify-between border-b border-gray-700">
            <h2 className="text-white font-semibold">Tools</h2>
            <button 
              onClick={onClose} // Close the side nav when clicked
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Plus size={18} />
              <span>New Project</span>
            </button>

            <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <FolderOpen size={18} />
              <span>View All Projects</span>
            </button>

            <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              <Users size={18} />
              <span>Invite Friends</span>
            </button>
          </div>

          <nav className="flex-1 mt-2">
            <NavItem 
              icon={<LayoutDashboard size={18} />} 
              text="Data Science" 
              active={activeSection === 'data-science'}
              onClick={() => handleSectionClick('data-science')}
            />
            <NavItem 
              icon={<Brain size={18} />} 
              text="Deep Learning" 
              active={activeSection === 'deep-learning'}
              onClick={() => handleSectionClick('deep-learning')}
            />
            <NavItem 
              icon={<Cog size={18} />} 
              text="Fine-Tuning" 
              active={activeSection === 'fine-tuning'}
              onClick={() => handleSectionClick('fine-tuning')}
            />
            <NavItem 
              icon={<Camera size={18} />} 
              text="Computer Vision" 
              active={activeSection === 'computer-vision'}
              onClick={() => handleSectionClick('computer-vision')}
            />
          </nav>

          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-700 p-2 rounded-full">
                <User size={20} className="text-gray-300" />
              </div>
              <div>
                <p className="text-sm text-white font-medium">Guest User</p>
                <p className="text-xs text-gray-400">Sign in to save progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeSection === 'data-science' && (
        <WorkflowPipeline />
      )}
    </>
  );
}

export default SideNav;
