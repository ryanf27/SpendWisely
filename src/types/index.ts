export interface Transaction {
  _id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: string;
  date: string;
  description?: string;
}

export interface Category {
  name: string;
  _id: string;
}

export interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Transaction | null;
  onSubmit: (transaction: Transaction) => void;
  categories: Category[];
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  categories: Category[];
  setTransactions: (transactions: Transaction[]) => void;
  onEdit: (transaction: Transaction) => void;
}
