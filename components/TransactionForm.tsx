import React, { useState } from 'react';

interface TransactionFormProps {
  type: 'deposit' | 'withdraw';
  onSubmit: (amount: number, description: string) => void;
  isLoading: boolean;
  currentBalance?: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ type, onSubmit, isLoading, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (type === 'withdraw' && currentBalance !== undefined && val > currentBalance) {
      setError('Insufficient funds.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a description.');
      return;
    }

    onSubmit(val, description);
    setAmount('');
    setDescription('');
  };

  const isDeposit = type === 'deposit';

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDeposit ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              <i className={`fa-solid ${isDeposit ? 'fa-wallet' : 'fa-hand-holding-dollar'} text-xl`}></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{isDeposit ? 'Deposit Funds' : 'Withdraw Funds'}</h2>
              <p className="text-slate-400 text-sm">
                {isDeposit ? 'Add money to your account securely.' : 'Transfer money to your linked accounts.'}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Amount (USD)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                placeholder="0.00"
                step="0.01"
              />
            </div>
            {currentBalance !== undefined && type === 'withdraw' && (
              <p className="text-xs text-slate-500 mt-2 text-right">Available: ${currentBalance.toLocaleString()}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Description / Note</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              placeholder={isDeposit ? "e.g., Salary, Freelance" : "e.g., Rent, Groceries"}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            } ${
              isDeposit 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20' 
                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-amber-500/20'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch fa-spin"></i> Processing...
              </span>
            ) : (
              <span>Confirm {isDeposit ? 'Deposit' : 'Withdrawal'}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;