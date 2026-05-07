export interface ITransaction {
  _id: string;
  user: string;
  type: string;
  amount: number;
  category?: Category;
  description: string;
  date: string;
  isRecurring: boolean;
  createdAt: string;
  __v: number;
}

interface Category {
  _id: string;
  type: string;
}
