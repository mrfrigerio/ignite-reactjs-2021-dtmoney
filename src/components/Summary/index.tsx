import { Container } from "./styles";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../TransactionsContext";
import { useMemo } from "react";
import { currencyFormatter } from "../../utils/currencyFormatter";

type Transactionsbalance = {
  income: number;
  outcome: number;
  balance: number;
};

const Summary: React.FC = () => {
  const { transactions } = useTransactions();
  const transactionsBalance: Transactionsbalance = useMemo(() => {
    const income = transactions.reduce(
      (acc, transaction) =>
        transaction.type === "deposit" ? acc + transaction.value : acc,
      0
    );

    const outcome = transactions.reduce(
      (acc, transaction) =>
        transaction.type === "withdraw" ? acc + transaction.value : acc,
      0
    );

    const balance = income - outcome;

    return { income, outcome, balance };
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="income" />
        </header>
        <strong>{currencyFormatter(transactionsBalance.income)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="outcome" />
        </header>
        <strong>{currencyFormatter(transactionsBalance.outcome)}</strong>
      </div>
      <div className="background-highlight">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total" />
        </header>
        <strong>{currencyFormatter(transactionsBalance.balance)}</strong>
      </div>
    </Container>
  );
};

export default Summary;
