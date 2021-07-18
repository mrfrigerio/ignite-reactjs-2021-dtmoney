import styled, { css } from "styled-components";

interface TransactionTypeProps {
  type: "deposit" | "withdraw";
}

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.25rem;
    border: 1px solid #d7d7d7;
    background: #e7e9ee;
    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: var(--green);
    color: #fff;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    margin-top: 1.5rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  img.close-icon {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

export const TransactionTypeContainer = styled.div<TransactionTypeProps>`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    border: 1px solid #d7d7d7;
    background: var(--background);
    font-size: 1rem;
    color: var(--text-title);
    filter: grayscale(0.9);
    ${(props) =>
      props.type === "deposit" &&
      css`
        border-color: transparent;
        background: rgba(18, 164, 84, 0.1);
        filter: none;
      `}

    img {
      margin-right: 0.5rem;
      width: 20px;
      height: 20px;
    }

    & + button {
      margin-left: 0.5rem;
      border: 1px solid #d7d7d7;
      background: var(--background);
      filter: grayscale(0.9);
      ${(props) =>
        props.type === "withdraw" &&
        css`
          border-color: transparent;
          background: rgba(229, 46, 77, 0.1);
          filter: none;
        `}
    }

    &:hover {
      filter: brightness(0.95);
    }
  }
`;
