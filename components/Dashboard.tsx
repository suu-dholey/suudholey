import React from 'react';
import { Transaction, User, ViewState } from '../types';

interface DashboardProps {
  user: User;
  balance: number;
  transactions: Transaction[];
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, balance, transactions, onNavigate }) => {
  const recentTransactions = transactions.slice(0, 5);
  
  const income = transactions
    .filter(t => t.type === 'deposit')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const expense = transactions
    .filter(t => t.type === 'withdrawal' || t.type === 'payment' || t.type === 'transfer')
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {user.name}</h2>
          <p className="text-slate-400">Here's your financial overview for today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-500">Live Secure Connection</span>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <p className="text-slate-400 font-medium mb-1">Total Available Balance</p>
          <h3 className="text-3xl font-bold text-white tracking-tight">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          <div className="mt-4 flex items-center text-emerald-400 text-sm gap-1">
            <i className="fa-solid fa-shield-check"></i>
            <span>Funds Protected</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 font-medium">Total In (30 Days)</p>
              <h3 className="text-2xl font-bold text-white">${income.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <i className="fa-solid fa-arrow-down"></i>
            </div>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 font-medium">Total Out (30 Days)</p>
              <h3 className="text-2xl font-bold text-white">${expense.toLocaleString()}</h3>
            </div>
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
              <i className="fa-solid fa-arrow-up"></i>
            </div>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button onClick={() => onNavigate(ViewState.TRANSFER)} className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex flex-col items-center gap-2 transition-all group">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-paper-plane"></i>
          </div>
          <span className="text-sm font-medium text-slate-300">Send Money</span>
        </button>
        <button onClick={() => onNavigate(ViewState.DEPOSIT)} className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex flex-col items-center gap-2 transition-all group">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <span className="text-sm font-medium text-slate-300">Deposit</span>
        </button>
        <button onClick={() => onNavigate(ViewState.WITHDRAW)} className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex flex-col items-center gap-2 transition-all group">
           <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-file-invoice-dollar"></i>
          </div>
          <span className="text-sm font-medium text-slate-300">Pay Bills</span>
        </button>
        <button onClick={() => onNavigate(ViewState.HISTORY)} className="p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex flex-col items-center gap-2 transition-all group">
           <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-list-check"></i>
          </div>
          <span className="text-sm font-medium text-slate-300">Statements</span>
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          <button onClick={() => onNavigate(ViewState.HISTORY)} className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">View All History</button>
        </div>
        <div className="divide-y divide-slate-700">
          {recentTransactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No transactions yet.</div>
          ) : (
            recentTransactions.map((t) => (
              <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    t.type === 'deposit' ? 'bg-emerald-500/20 text-emerald-400' : 
                    t.type === 'transfer' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    <i className={`fa-solid ${
                      t.type === 'deposit' ? 'fa-arrow-down' : 
                      t.type === 'transfer' ? 'fa-arrow-right-arrow-left' :
                      'fa-arrow-up'
                    }`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-white">{t.description}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(t.date).toLocaleDateString()} &bull; {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </p>
                  </div>
                </div>
                <div className={`font-bold ${
                  t.type === 'deposit' ? 'text-emerald-400' : 'text-slate-200'
                }`}>
                  {t.type === 'deposit' ? '+' : '-'}${t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;