import styled from 'styled-components';

const Button = styled.button`
  transition: background-color 0.3s;
  background: var(--oc-white);
  border: 1px solid var(--oc-black);
  border-radius: 2px;
  &:disabled {
    border: 1px solid var(--oc-gray-6);
    color: var(--oc-gray-6);
  }
  &:hover {
    background: var(--oc-gray-2);
    cursor: pointer;
  }
`;

export default Button;
