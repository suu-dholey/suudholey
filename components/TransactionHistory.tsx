import React, { useState } from 'react';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'all' 
      ? true 
      : filter === 'income' 
        ? t.type === 'deposit' 
        : t.type !== 'deposit';
    
    const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase()) || 
                          t.amount.toString().includes(search);
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Statement History</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
             <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
             <input 
               type="text" 
               placeholder="Search transactions..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="w-full sm:w-64 bg-slate-800 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
             />
          </div>
          
          <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('income')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'income' ? 'bg-emerald-600/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
            >
              Income
            </button>
            <button 
              onClick={() => setFilter('expense')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === 'expense' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-white'}`}
            >
              Expense
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/50">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Transaction</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTransactions.length === 0 ? (
                <tr>
                   <td colSpan={5} className="p-8 text-center text-slate-500">No transactions found matching your criteria.</td>
                </tr>
              ) : (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          t.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-400' : 
                          t.type === 'transfer' ? 'bg-blue-500/10 text-blue-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          <i className={`fa-solid ${
                             t.type === 'deposit' ? 'fa-arrow-down' : 
                             t.type === 'transfer' ? 'fa-arrow-right-arrow-left' :
                             t.description.toLowerCase().includes('netflix') || t.description.toLowerCase().includes('spotify') ? 'fa-play' :
                             t.description.toLowerCase().includes('uber') ? 'fa-car' :
                             'fa-arrow-up'
                          }`}></i>
                        </div>
                        <div>
                          <p className="font-medium text-white">{t.description}</p>
                          {t.recipient && <p className="text-xs text-slate-500">To: {t.recipient}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                         t.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-400' : 
                         t.type === 'transfer' ? 'bg-blue-500/10 text-blue-400' :
                         'bg-slate-700 text-slate-300'
                      }`}>
                        {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-400 font-mono">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                       <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                         <i className="fa-solid fa-circle text-[6px]"></i> Completed
                       </span>
                    </td>
                    <td className={`p-4 text-right font-bold font-mono ${
                       t.type === 'deposit' ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {t.type === 'deposit' ? '+' : '-'}${t.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;