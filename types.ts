export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
  HISTORY = 'HISTORY',
  CARDS = 'CARDS',
  ASSISTANT = 'ASSISTANT',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN'
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  amount: number;
  date: string;
  description: string;
  recipient?: string; // For transfers
  status: 'completed' | 'pending' | 'failed';
}

export interface Card {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  type: 'visa' | 'mastercard';
  variant: 'gold' | 'black' | 'blue';
  balance: number;
}

export interface User {
  name: string;
  accountNumber: string;
  avatar: string;
  email: string;
  phone: string;
  address: string;
  employmentStatus: string;
  kycStatus: 'verified' | 'pending' | 'unverified';
}

export interface AdminRequest {
  id: string;
  userId: string;
  userName: string;
  type: 'kyc_update' | 'high_value_transfer' | 'address_change';
  details: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}