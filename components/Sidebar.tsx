import React from 'react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout, isOpen, setIsOpen }) => {
  const menuItems = [
    { view: ViewState.DASHBOARD, icon: 'fa-chart-pie', label: 'Dashboard' },
    { view: ViewState.HISTORY, icon: 'fa-clock-rotate-left', label: 'Statements' },
    { view: ViewState.TRANSFER, icon: 'fa-money-bill-transfer', label: 'Transfer' },
    { view: ViewState.DEPOSIT, icon: 'fa-arrow-down', label: 'Deposit' },
    { view: ViewState.WITHDRAW, icon: 'fa-arrow-up', label: 'Withdraw' },
    { view: ViewState.CARDS, icon: 'fa-credit-card', label: 'My Cards' },
    { view: ViewState.PROFILE, icon: 'fa-user-gear', label: 'My Profile' },
    { view: ViewState.ASSISTANT, icon: 'fa-robot', label: 'Safi AI' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">I.B. Safi</h1>
                <p className="text-xs text-slate-400">International Bank</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setView(item.view);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  currentView === item.view 
                    ? 'bg-emerald-600/20 text-emerald-400 shadow-sm border border-emerald-600/30' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-5 text-center ${currentView === item.view ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'}`}></i>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
            {/* Employee Section Separator */}
            <div className="pt-4 mt-4 border-t border-slate-700/50">
              <p className="px-4 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Internal</p>
              <button
                onClick={() => {
                  setView(ViewState.ADMIN);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  currentView === ViewState.ADMIN
                    ? 'bg-blue-600/20 text-blue-400 shadow-sm border border-blue-600/30' 
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <i className={`fa-solid fa-building-shield w-5 text-center ${currentView === ViewState.ADMIN ? 'text-blue-400' : 'text-slate-500 group-hover:text-white'}`}></i>
                <span className="font-medium">Employee Portal</span>
              </button>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <div className="mb-4 px-4 py-3 rounded-xl bg-slate-700/30 border border-slate-600/50">
               <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Your Balance</p>
               <p className="font-bold text-emerald-400 font-mono">Verified Member</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <i className="fa-solid fa-sign-out-alt"></i>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;