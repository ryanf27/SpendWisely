export interface Transaction {
  _id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: string;
  date: string;
  description?: string;
}

export interface Budget {
  _id: string;
  userId: string;
  limitAmount: number;
  period: string;
  startDate: string;
  endDate: string;
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

export interface BudgetsTableProps {
  budgets: Budget[];
  setBudgets: (Budget: Budget[]) => void;
  onEdit: (Budget: Budget) => void;
}

export interface BudgetFormProps {
  open: boolean;
  onClose: () => void;
  initialValues?: Budget | null;
  onSubmit: (transaction: Budget) => void;
}

export interface DataItem {
  category: string;
  amount: number;
}

export interface BarChartComponentProps {
  data: DataItem[] | undefined;
}

export interface MonthlyTransaction {
  expense: number;
  income: number;
  month: string;
}

export interface LineChartComponentProps {
  data: MonthlyTransaction[] | undefined;
}
