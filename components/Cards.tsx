import React from 'react';
import { Card } from '../types';

interface CardsProps {
  cards: Card[];
}

const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">My Cards</h2>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
          <i className="fa-solid fa-plus"></i> New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="relative w-full aspect-[1.586/1] rounded-2xl p-6 shadow-2xl transition-transform hover:-translate-y-2 duration-300 overflow-hidden group select-none">
            {/* Background Gradients based on variant */}
            <div className={`absolute inset-0 z-0 ${
              card.variant === 'black' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black' :
              card.variant === 'gold' ? 'bg-gradient-to-br from-yellow-700 via-amber-600 to-yellow-800' :
              'bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900'
            }`}></div>
            
            {/* Decorative circles */}
            <div className="absolute top-[-50%] right-[-20%] w-[100%] h-[150%] rounded-full border border-white/10"></div>
            <div className="absolute bottom-[-50%] left-[-20%] w-[100%] h-[150%] rounded-full border border-white/5"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 shadow-md"></div>
                <div className="text-right">
                  <span className="block text-xs uppercase tracking-widest opacity-70">Current Balance</span>
                  <span className="text-lg font-bold font-mono tracking-wide">${card.balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4">
                 <p className="font-mono text-xl sm:text-2xl tracking-[0.15em] drop-shadow-md">
                   {card.number.match(/.{1,4}/g)?.join(' ')}
                 </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <div className="flex gap-8">
                    <div>
                       <span className="block text-[10px] uppercase opacity-60">Card Holder</span>
                       <span className="text-sm font-medium tracking-wide uppercase">{card.holder}</span>
                    </div>
                    <div>
                       <span className="block text-[10px] uppercase opacity-60">Expires</span>
                       <span className="text-sm font-medium tracking-wide font-mono">{card.expiry}</span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl opacity-90">
                  <i className={`fa-brands ${card.type === 'visa' ? 'fa-cc-visa' : 'fa-cc-mastercard'}`}></i>
                </div>
              </div>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out"></div>
          </div>
        ))}
        
        {/* Add Card Placeholder */}
        <button className="relative w-full aspect-[1.586/1] rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all flex flex-col items-center justify-center gap-3 group text-slate-500 hover:text-emerald-500">
           <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-emerald-500/10 flex items-center justify-center text-xl transition-colors">
             <i className="fa-solid fa-plus"></i>
           </div>
           <span className="font-medium">Order New Card</span>
        </button>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-white mb-4">Card Settings</h3>
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center"><i className="fa-solid fa-lock"></i></div>
               <span className="text-slate-200">Lock Card</span>
            </div>
            <div className="w-10 h-5 bg-slate-700 rounded-full relative">
               <div className="w-5 h-5 bg-slate-400 rounded-full absolute left-0 top-0 shadow-sm border border-slate-600"></div>
            </div>
          </div>
          <div className="p-4 border-b border-slate-700 flex items-center justify-between hover:bg-slate-700/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><i className="fa-solid fa-globe"></i></div>
               <span className="text-slate-200">International Usage</span>
            </div>
             <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative">
               <div className="w-5 h-5 bg-emerald-500 rounded-full absolute right-0 top-0 shadow-sm"></div>
            </div>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center"><i className="fa-solid fa-bell"></i></div>
               <span className="text-slate-200">Transaction Alerts</span>
            </div>
            <span className="text-xs text-slate-500">On ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;