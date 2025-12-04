import React, { useState } from 'react';
import { AdminRequest, User } from '../types';

interface AdminDashboardProps {
  requests: AdminRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  currentUser: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ requests, onApprove, onReject, currentUser }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'users'>('requests');

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="bg-blue-600 px-3 py-1 rounded text-sm font-bold uppercase tracking-wider">Employee Portal</span>
            <span>Bank Administration</span>
          </h2>
          <p className="text-slate-400 mt-1">Manage customer data and approve pending requests.</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending Requests ({requests.filter(r => r.status === 'pending').length})
          </button>
           <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Customers
          </button>
        </div>
      </header>

      {activeTab === 'requests' && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 bg-slate-900/50">
             <h3 className="font-bold text-white">Action Required</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Request ID</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Details</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {requests.filter(r => r.status === 'pending').length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <i className="fa-solid fa-check-circle text-4xl text-emerald-500/50"></i>
                        <p>All caught up! No pending requests.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  requests.filter(r => r.status === 'pending').map((req) => (
                    <tr key={req.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="p-4 text-sm font-mono text-slate-500">#{req.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                            {req.userName.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{req.userName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                         <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                           {req.type.replace('_', ' ').toUpperCase()}
                         </span>
                      </td>
                      <td className="p-4 text-sm text-slate-300 max-w-xs truncate">{req.details}</td>
                      <td className="p-4 text-sm text-slate-400">{new Date(req.date).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => onApprove(req.id)}
                            className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button 
                            onClick={() => onReject(req.id)}
                            className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700 bg-slate-900/50 flex justify-between items-center">
             <h3 className="font-bold text-white">Client Database</h3>
             <button className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-white transition-colors">Export CSV</button>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {/* Mock User Card - representing the logged in user for demo purposes */}
             <div className="p-4 rounded-xl border border-slate-600 bg-slate-700/30 flex items-start gap-4">
                <img src={currentUser.avatar} alt="" className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                   <div className="flex justify-between items-start">
                     <h4 className="font-bold text-white">{currentUser.name}</h4>
                     <span className={`text-[10px] px-2 py-0.5 rounded-full ${currentUser.kycStatus === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                       {currentUser.kycStatus.toUpperCase()}
                     </span>
                   </div>
                   <p className="text-xs text-slate-400 mt-1">{currentUser.email}</p>
                   <p className="text-xs text-slate-500 mt-2 font-mono">{currentUser.accountNumber}</p>
                   <div className="mt-4 flex gap-2">
                      <button className="flex-1 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">View Details</button>
                      <button className="flex-1 py-1.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors">Freeze</button>
                   </div>
                </div>
             </div>

             {/* Mock Ghost Users */}
             {[1, 2, 3].map(i => (
                <div key={i} className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 flex items-start gap-4 opacity-75">
                  <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                    <i className="fa-solid fa-user"></i>
                  </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-300">Client #882{i}</h4>
                         <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">VERIFIED</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">client.882{i}@example.com</p>
                      <p className="text-xs text-slate-600 mt-2 font-mono">**** **** **** 102{i}</p>
                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors">View Details</button>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;