import styled from "styled-components";

export const Handle = styled.div`
  background-color: ${({ theme }) => theme.toggle.handleBackground};
  border-radius: 50%;
  cursor: pointer;
  height: 20px;
  left: 1px;
  position: absolute;
  top: 1px;
  transition: left 200ms ease-in;
  width: 20px;
  z-index: 1;
`;

export const Input = styled.input`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: calc(100% - 22px);
    background-color: #423308;
  }

  &:focus + ${Handle} {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

const StyledToggle = styled.div<{ checked: boolean }>`
  align-items: center;
  background-color: ${({ theme, checked }) => theme.colors[checked ? "success" : "input"]};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.inset};
  cursor: pointer;
  display: inline-flex;
  height: 22px;
  position: relative;
  transition: background-color 200ms;
  width: 72px;
`;

export default StyledToggle;
