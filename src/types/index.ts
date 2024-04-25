export interface Transaction {
  _id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: string;
  date: string;
  description?: string;
}

export interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Transaction | null;
  onSubmit: (transaction: Transaction) => void;
  categories?: { name: string; id: string }[];
}

export interface TransactionsTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}
