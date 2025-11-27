import React from 'react';
import { View, UserProfile } from '../types';
import { LayoutDashboard, CreditCard, PieChart, Sparkles, CalendarClock, User, Bell, Menu, X, LogOut } from 'lucide-react';

interface NavbarProps {
  currentView: View;
  onChangeView: (view: View) => void;
  currentUser: UserProfile;
  onUserChange: (user: UserProfile) => void;
  pushEnabled: boolean;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onChangeView, 
  currentUser, 
  onUserChange,
  pushEnabled,
  onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: View.DASHBOARD, label: 'Resumen', icon: LayoutDashboard },
    { id: View.DEBTS, label: 'Mis Deudas', icon: CreditCard },
    { id: View.PROJECTION, label: 'Proyección', icon: CalendarClock },
    { id: View.BUDGET, label: 'Presupuesto', icon: PieChart },
    { id: View.ADVISOR, label: 'Asesor AI', icon: Sparkles },
  ];

  const handleLogoutClick = () => {
      if (onLogout) {
          onLogout();
      } else {
          // Fallback if no logout handler provided
          window.location.reload();
      }
  };

  return (
    <header className="bg-[#0f172a] text-white shadow-xl sticky top-0 z-50 border-b border-slate-800/50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO: Universe & Stars of Love */}
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" 
              onClick={() => onChangeView(View.DASHBOARD)}
            >
              {/* Custom SVG Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)] overflow-hidden group-hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-500">
                {/* Background Space Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-indigo-950 to-purple-900"></div>
                
                {/* Tiny Stars */}
                <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                <div className="absolute bottom-3 left-2 w-0.5 h-0.5 bg-blue-300 rounded-full animate-pulse delay-75"></div>
                <div className="absolute top-1 left-4 w-0.5 h-0.5 bg-purple-200 rounded-full animate-pulse delay-150"></div>

                {/* Orbital Ring */}
                <div className="absolute w-12 h-4 border border-white/20 rounded-[100%] rotate-[-25deg] top-3"></div>

                {/* Heart Planet Core */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-500 relative z-10 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transform group-hover:scale-110 transition-transform duration-300">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                  Universo
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-[0.2em] uppercase group-hover:text-pink-300 transition-colors">
                  Finanzas E&R
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex ml-10 space-x-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onChangeView(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 mr-2 ${isActive ? 'text-pink-400' : 'text-slate-500'}`} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: User & Notifications */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
               <span className={`w-2 h-2 rounded-full ${pushEnabled ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`} />
               <span>{pushEnabled ? 'Sincronizado' : 'Local'}</span>
            </div>

            <div className="h-6 w-px bg-slate-800 mx-2"></div>

            {/* User Selector */}
            <div className="flex items-center space-x-3">
               <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium text-slate-200 leading-none">Hola, {currentUser}</p>
                  <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Perfil Activo</p>
               </div>
               
               <div className="relative group">
                  <button className="flex items-center space-x-2 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white pl-3 pr-2 py-1.5 rounded-full border border-slate-700 transition-all shadow-md">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                        {currentUser.substring(0,1)}
                      </div>
                      <span className="md:hidden lg:inline text-sm font-medium pr-1">{currentUser}</span>
                  </button>
                  
                  {/* Invisible Select Overlay for Interaction */}
                  <select 
                    value={currentUser}
                    onChange={(e) => onUserChange(e.target.value as UserProfile)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  >
                    <option value="Edna">Edna</option>
                    <option value="Ronaldo">Ronaldo</option>
                  </select>
               </div>

               <button 
                onClick={handleLogoutClick}
                className="p-2 text-slate-500 hover:text-white transition-colors"
                title="Cerrar Sesión"
               >
                 <LogOut className="w-4 h-4" />
               </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 pb-4 animate-slideUp">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onChangeView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-3 py-3 rounded-lg text-base font-medium ${
                  currentView === item.id
                    ? 'bg-slate-800 text-pink-400 border border-slate-700'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-800 px-4">
             <div className="flex items-center px-5 mb-4">
                <div className="flex-shrink-0">
                   <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                     {currentUser.substring(0,1)}
                   </div>
                </div>
                <div className="ml-3">
                   <div className="text-base font-medium leading-none text-white">{currentUser}</div>
                   <div className="text-sm font-medium leading-none text-slate-400 mt-1">Usuario Activo</div>
                </div>
                <button 
                    onClick={handleLogoutClick}
                    className="ml-auto p-2 text-slate-400 hover:text-white"
                >
                    <LogOut className="w-5 h-5" />
                </button>
             </div>
             <div className="mt-3 space-y-2">
                <button 
                    onClick={() => onUserChange('Edna')}
                    className={`block w-full text-left px-4 py-2 rounded-md text-sm ${currentUser === 'Edna' ? 'bg-pink-900/20 text-pink-300 border border-pink-900/30' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                    Cambiar a Edna
                </button>
                <button 
                    onClick={() => onUserChange('Ronaldo')}
                    className={`block w-full text-left px-4 py-2 rounded-md text-sm ${currentUser === 'Ronaldo' ? 'bg-blue-900/20 text-blue-300 border border-blue-900/30' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                    Cambiar a Ronaldo
                </button>
             </div>
          </div>
        </div>
      )}
    </header>
  );
};