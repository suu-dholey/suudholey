import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransferForm from './components/TransferForm';
import TransactionHistory from './components/TransactionHistory';
import Cards from './components/Cards';
import Login from './components/Login';
import SmartAssistant from './components/SmartAssistant';
import ProfileForm from './components/ProfileForm';
import AdminDashboard from './components/AdminDashboard';
import { ViewState, User, Transaction, Card, AdminRequest } from './types';

// Mock Data Helpers
const daysAgo = (days: number) => new Date(Date.now() - days * 86400000).toISOString();

const INITIAL_USER: User = {
  name: 'Alex Safi',
  accountNumber: '4458 9982 1234 5678',
  avatar: 'https://picsum.photos/100/100',
  email: 'alex.safi@example.com',
  phone: '+1 (555) 012-3456',
  address: '123 Finance District, New York, NY 10005',
  employmentStatus: 'Self-Employed',
  kycStatus: 'verified'
};

const INITIAL_REQUESTS: AdminRequest[] = [
  { id: 'REQ-001', userId: 'user-2', userName: 'Sarah Jenkins', type: 'address_change', details: 'Update address to 45 Park Ave, NY', date: daysAgo(1), status: 'pending' },
  { id: 'REQ-002', userId: 'user-3', userName: 'Mike Thompson', type: 'high_value_transfer', details: 'Transfer verification > $10,000', date: daysAgo(2), status: 'pending' }
];

// Richer, more "lived-in" history
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'deposit', amount: 4250.00, date: daysAgo(0), description: 'Payroll Deposit: Tech Corp', status: 'completed' },
  { id: '2', type: 'payment', amount: 14.99, date: daysAgo(1), description: 'Netflix Subscription', status: 'completed' },
  { id: '3', type: 'payment', amount: 45.20, date: daysAgo(2), description: 'Uber Ride', status: 'completed' },
  { id: '4', type: 'withdrawal', amount: 100.00, date: daysAgo(3), description: 'ATM Withdrawal - Downtown', status: 'completed' },
  { id: '5', type: 'transfer', amount: 250.00, date: daysAgo(5), description: 'Transfer to Sarah J.', recipient: 'Sarah Jenkins', status: 'completed' },
  { id: '6', type: 'payment', amount: 89.99, date: daysAgo(6), description: 'Internet Bill', status: 'completed' },
  { id: '7', type: 'payment', amount: 12.50, date: daysAgo(6), description: 'Spotify Premium', status: 'completed' },
  { id: '8', type: 'payment', amount: 120.00, date: daysAgo(8), description: 'Grocery Store', status: 'completed' },
  { id: '9', type: 'deposit', amount: 150.00, date: daysAgo(10), description: 'Refund: Amazon', status: 'completed' },
  { id: '10', type: 'payment', amount: 2400.00, date: daysAgo(15), description: 'Monthly Rent', status: 'completed' },
  { id: '11', type: 'payment', amount: 4.50, date: daysAgo(16), description: 'Coffee Shop', status: 'completed' },
  { id: '12', type: 'payment', amount: 65.00, date: daysAgo(18), description: 'Gas Station', status: 'completed' },
  { id: '13', type: 'deposit', amount: 4250.00, date: daysAgo(30), description: 'Payroll Deposit: Tech Corp', status: 'completed' },
  { id: '14', type: 'transfer', amount: 50.00, date: daysAgo(32), description: 'Birthday Gift', recipient: 'Mike T.', status: 'completed' },
];

const INITIAL_CARDS: Card[] = [
  { id: '1', number: '4582123456789012', holder: 'ALEX SAFI', expiry: '12/26', type: 'visa', variant: 'black', balance: 12500.50 },
  { id: '2', number: '5412789012345678', holder: 'ALEX SAFI', expiry: '09/25', type: 'mastercard', variant: 'gold', balance: 2450.00 },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [balance, setBalance] = useState(14850.75);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [cards] = useState<Card[]>(INITIAL_CARDS);
  const [loadingTx, setLoadingTx] = useState(false);
  const [adminRequests, setAdminRequests] = useState<AdminRequest[]>(INITIAL_REQUESTS);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView(ViewState.DASHBOARD);
  };

  const handleTransaction = (amount: number, description: string, type: 'deposit' | 'withdraw') => {
    setLoadingTx(true);
    // Simulate API Call
    setTimeout(() => {
      const newTx: Transaction = {
        id: Date.now().toString(),
        type: type === 'deposit' ? 'deposit' : 'withdrawal',
        amount: amount,
        date: new Date().toISOString(),
        description: description,
        status: 'completed'
      };
      
      setTransactions([newTx, ...transactions]);
      setBalance(prev => type === 'deposit' ? prev + amount : prev - amount);
      setLoadingTx(false);
      setView(ViewState.DASHBOARD);
    }, 1500);
  };

  const handleTransfer = (amount: number, recipient: string, account: string, description: string) => {
    setLoadingTx(true);
    setTimeout(() => {
       const newTx: Transaction = {
        id: Date.now().toString(),
        type: 'transfer',
        amount: amount,
        date: new Date().toISOString(),
        description: description,
        recipient: recipient,
        status: 'completed'
      };
      
      setTransactions([newTx, ...transactions]);
      setBalance(prev => prev - amount);
      setLoadingTx(false);
      setView(ViewState.HISTORY);
    }, 2000);
  }

  const handleUserUpdate = (updatedData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updatedData }));
    // Add a dummy admin request for the update
    const newRequest: AdminRequest = {
      id: `REQ-${Date.now()}`,
      userId: 'user-1',
      userName: user.name,
      type: 'kyc_update',
      details: 'Customer updated personal contact details.',
      date: new Date().toISOString(),
      status: 'pending'
    };
    setAdminRequests([newRequest, ...adminRequests]);
  };

  const handleAdminAction = (id: string, action: 'approve' | 'reject') => {
    setAdminRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
    ));
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return (
          <Dashboard 
            user={user} 
            balance={balance} 
            transactions={transactions} 
            onNavigate={setView}
          />
        );
      case ViewState.DEPOSIT:
        return (
          <TransactionForm 
            type="deposit" 
            onSubmit={(amount, desc) => handleTransaction(amount, desc, 'deposit')} 
            isLoading={loadingTx} 
          />
        );
      case ViewState.WITHDRAW:
        return (
          <TransactionForm 
            type="withdraw" 
            onSubmit={(amount, desc) => handleTransaction(amount, desc, 'withdraw')} 
            isLoading={loadingTx} 
            currentBalance={balance}
          />
        );
      case ViewState.TRANSFER:
        return (
          <TransferForm 
            onSubmit={handleTransfer}
            isLoading={loadingTx}
            currentBalance={balance}
          />
        );
      case ViewState.HISTORY:
        return <TransactionHistory transactions={transactions} />;
      case ViewState.CARDS:
        return <Cards cards={cards} />;
      case ViewState.PROFILE:
        return <ProfileForm user={user} onUpdate={handleUserUpdate} />;
      case ViewState.ADMIN:
        return (
          <AdminDashboard 
            requests={adminRequests} 
            currentUser={user}
            onApprove={(id) => handleAdminAction(id, 'approve')}
            onReject={(id) => handleAdminAction(id, 'reject')}
          />
        );
      case ViewState.ASSISTANT:
        return <SmartAssistant userBalance={balance} />;
      default:
        return <Dashboard user={user} balance={balance} transactions={transactions} onNavigate={setView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        onLogout={handleLogout} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-slate-700 flex items-center justify-between px-4 bg-slate-800">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-sm">S</div>
             <span className="font-bold text-white">I.B. Safi</span>
           </div>
           <button onClick={() => setIsSidebarOpen(true)} className="text-slate-300 p-2">
             <i className="fa-solid fa-bars text-xl"></i>
           </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8 relative">
          <div className="max-w-7xl mx-auto">
             {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;