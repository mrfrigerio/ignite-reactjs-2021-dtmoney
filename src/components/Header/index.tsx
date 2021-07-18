import { Container, Content } from "./styles";
import dtmoney_logo from "../../assets/logo.svg";

type HeaderProps = {
  onOpenNewTransactionModal: () => void;
};

const Header: React.FC<HeaderProps> = ({
  onOpenNewTransactionModal,
}: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={dtmoney_logo} alt="de money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova Transação
        </button>
      </Content>
    </Container>
  );
};

export default Header;
