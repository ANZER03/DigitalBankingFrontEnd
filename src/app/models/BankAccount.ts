export interface BankAccount {
  id: string;
  type: string;
  balance: number;
  createdAt: string;
  status: string | null;
  customerDTO: {
    id: number;
    name: string;
    email: string;
  };
  interestRate?: number;
  overDraft?: number;
}
