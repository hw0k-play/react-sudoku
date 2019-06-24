import styled from 'styled-components';

type GapperProps = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

const Gapper = styled.div`
  ${(props: GapperProps) => props.left && `margin-left: ${props.left}`}
  ${(props: GapperProps) => props.right && `margin-right: ${props.right}`}
  ${(props: GapperProps) => props.top && `margin-top: ${props.top}`}
  ${(props: GapperProps) => props.bottom && `margin-bottom: ${props.bottom}`}
`;

export default Gapper;
