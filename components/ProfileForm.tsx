import React, { useState } from 'react';
import { User } from '../types';

interface ProfileFormProps {
  user: User;
  onUpdate: (updatedUser: Partial<User>) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    email: user.email,
    phone: user.phone,
    address: user.address,
    employmentStatus: user.employmentStatus
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onUpdate(formData);
      setIsLoading(false);
      setIsEditing(false);
      setSuccessMsg('Profile updated successfully! Some changes may require admin approval.');
      setTimeout(() => setSuccessMsg(''), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
       <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-white">My Profile</h2>
           <p className="text-slate-400">Manage your personal information and account security.</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${
          user.kycStatus === 'verified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
          'bg-amber-500/10 text-amber-400 border-amber-500/20'
        }`}>
          Status: {user.kycStatus.toUpperCase()}
        </div>
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden p-6 text-center h-full">
            <div className="relative inline-block">
               <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-slate-700 mx-auto mb-4" />
               <button className="absolute bottom-4 right-0 w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors text-white border-2 border-slate-800">
                 <i className="fa-solid fa-camera text-xs"></i>
               </button>
            </div>
            <h3 className="text-xl font-bold text-white">{user.name}</h3>
            <p className="text-slate-400 mb-6">Client ID: {user.accountNumber.split(' ').slice(-1)}</p>
            
            <div className="space-y-3 text-left">
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Account Tier</p>
                 <div className="flex items-center gap-2 text-emerald-400 font-bold">
                   <i className="fa-solid fa-crown"></i> Premium Member
                 </div>
              </div>
               <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                 <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Member Since</p>
                 <div className="flex items-center gap-2 text-slate-300">
                   <i className="fa-solid fa-calendar"></i> Jan 2022
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
           <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
             <div className="p-6 border-b border-slate-700 flex justify-between items-center">
               <h3 className="font-bold text-white">Personal Details</h3>
               {!isEditing && (
                 <button 
                   onClick={() => setIsEditing(true)}
                   className="text-sm text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-2"
                 >
                   <i className="fa-solid fa-pen"></i> Edit Details
                 </button>
               )}
             </div>
             
             <div className="p-8">
                {successMsg && (
                  <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm flex items-center gap-2 animate-pulse">
                    <i className="fa-solid fa-check-circle"></i>
                    {successMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                      <div className="relative">
                         <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                         <input 
                           type="email" 
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                           disabled={!isEditing}
                           className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                         />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <div className="relative">
                         <i className="fa-solid fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                         <input 
                           type="tel" 
                           value={formData.phone}
                           onChange={e => setFormData({...formData, phone: e.target.value})}
                           disabled={!isEditing}
                           className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                         />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Residential Address</label>
                    <div className="relative">
                       <i className="fa-solid fa-location-dot absolute left-4 top-3.5 text-slate-500"></i>
                       <textarea 
                         rows={2}
                         value={formData.address}
                         onChange={e => setFormData({...formData, address: e.target.value})}
                         disabled={!isEditing}
                         className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
                       />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Employment Status</label>
                    <div className="relative">
                       <i className="fa-solid fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                       <select 
                         value={formData.employmentStatus}
                         onChange={e => setFormData({...formData, employmentStatus: e.target.value})}
                         disabled={!isEditing}
                         className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all appearance-none"
                       >
                         <option value="Employed">Employed</option>
                         <option value="Self-Employed">Self-Employed</option>
                         <option value="Student">Student</option>
                         <option value="Retired">Retired</option>
                       </select>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            employmentStatus: user.employmentStatus
                          });
                        }}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-[2] py-3 rounded-xl font-bold text-white shadow-lg bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                      >
                         {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </form>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;