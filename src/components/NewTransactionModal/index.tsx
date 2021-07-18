import Modal from "react-modal";
import { Container, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useRef, useState } from "react";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type TransactionType = "deposit" | "withdraw";

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [type, setType] = useState<TransactionType>("deposit");
  const [title, setTitle] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { addTransaction } = useTransactions();

  function handleSetTransaction(type: TransactionType) {
    setType(type);
  }

  async function handleCreateNewTransaction(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const data = {
      title,
      value,
      category,
      type,
      date: new Date(),
    };

    await addTransaction(data);
    setType("deposit");
    setTitle("");
    setValue(0);
    setCategory("");

    const titleInput = titleRef.current;
    titleInput && titleInput.focus();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <button type="button" onClick={onRequestClose}>
          <img src={closeImg} alt="close" className="close-icon" />
        </button>
        <h2>Cadastrar Transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          ref={titleRef}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer type={type}>
          <button type="button" onClick={() => handleSetTransaction("deposit")}>
            <img src={incomeImg} alt="deposit" />
            <span>Entrada</span>
          </button>
          <button
            type="button"
            onClick={() => handleSetTransaction("withdraw")}
          >
            <img src={outcomeImg} alt="witdhraw" />
            <span>Saída</span>
          </button>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
