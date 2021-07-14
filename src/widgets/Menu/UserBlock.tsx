import React from "react";
import styled from "styled-components";
import { darken } from 'polished'
import Button from "../../components/Button/Button";
import { useWalletModal } from "../WalletModal";
import { Login } from "../WalletModal/types";

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const StyledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textSubtle};
  padding: 6px 12px;
  font-size: 20px;
  border-radius: 6px;
  margin-left: 20px;

  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.primary)};
  }
`

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <StyledButton onClick={() => {
      account ? onPresentAccountModal() : onPresentConnectModal();
    }}>
      {account ? accountEllipsis : 'Connect'}
    </StyledButton>
  );
};

export default UserBlock;
