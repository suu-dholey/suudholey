import React, { useState } from 'react';

interface TransferFormProps {
  onSubmit: (amount: number, recipient: string, recipientAccount: string, description: string) => void;
  isLoading: boolean;
  currentBalance: number;
}

const TransferForm: React.FC<TransferFormProps> = ({ onSubmit, isLoading, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [account, setAccount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 = Details, 2 = Confirm

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (val > currentBalance) {
      setError('Insufficient funds for this transfer.');
      return;
    }
    if (!recipient.trim()) {
      setError('Recipient name is required.');
      return;
    }
    if (account.length < 8) {
      setError('Please enter a valid account number (min 8 digits).');
      return;
    }

    setStep(2);
  };

  const handleConfirm = () => {
    onSubmit(parseFloat(amount), recipient, account, description || 'Transfer');
    // Reset handled by parent re-mount usually, but good to clean up
    setAmount('');
    setRecipient('');
    setAccount('');
    setDescription('');
    setStep(1);
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center">
              <i className="fa-solid fa-money-bill-transfer text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Transfer Funds</h2>
              <p className="text-slate-400 text-sm">Send money securely to anyone.</p>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <form onSubmit={handleNext} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Recipient Name</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Recipient Account Number</label>
              <input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                placeholder="0000 0000 0000"
                maxLength={16}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-right">Available: ${currentBalance.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reference / Note (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="e.g. Dinner split"
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
              className="w-full py-4 rounded-xl font-bold text-white shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Review Transfer
            </button>
          </form>
        ) : (
          <div className="p-8 space-y-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Confirm Details</h3>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">To</span>
                <span className="font-medium text-white">{recipient}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Account</span>
                <span className="font-mono text-slate-300">**** {account.slice(-4)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                <span className="text-slate-400">Note</span>
                <span className="text-slate-300">{description || '-'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-400">Total Amount</span>
                <span className="text-xl font-bold text-emerald-400">${parseFloat(amount).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-xl font-bold text-slate-300 bg-slate-700 hover:bg-slate-600 transition-colors"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-[2] py-4 rounded-xl font-bold text-white shadow-lg bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
              >
                 {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i> Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check"></i> Confirm Transfer
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferForm;