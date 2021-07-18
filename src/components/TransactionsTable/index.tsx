import { createServer, Model } from "miragejs";
import { Container } from "./styles";
import { currencyFormatter } from "../../utils/currencyFormatter";
import { dateformatter } from "../../utils/dateFormatter";
import { useTransactions } from "../../hooks/useTransactions";
import { v4 } from "uuid";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: v4(),
          title: "Website freelance",
          category: "Dev",
          value: 6000,
          type: "deposit",
          date: new Date(),
        },
        {
          id: v4(),
          title: "Aluguel",
          category: "Casa",
          value: 1100,
          type: "withdraw",
          date: new Date("2021-02-14 09:00;00"),
        },
      ],
    });
  },
  routes() {
    this.namespace = "api";
    this.get("/transactions", () => this.schema.all("transaction"));

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

export const TransactionTable: React.FC = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {currencyFormatter(transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>{dateformatter(transaction.date)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
};
