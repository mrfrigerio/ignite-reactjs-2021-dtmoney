import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { api } from "../services/api";

type Transaction = {
  id: string;
  title: string;
  value: number;
  type: "deposit" | "withdraw";
  category: string;
  date: Date;
};

interface TransactionsContextProps {
  transactions: Transaction[];
  addTransaction: (data: Omit<Transaction, "id">) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
);

const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => response.data.transactions)
      .then((data) => setTransactions(data));
  }, [transactions]);

  const addTransaction = async (
    data: Omit<Transaction, "id">
  ): Promise<void> => {
    await api.post("/transactions", { ...data, id: v4() });
  };
  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = (): TransactionsContextProps => {
  const transactionsContext = useContext(TransactionsContext);
  return transactionsContext;
};

export { TransactionsProvider, useTransactions };
