import styled from 'styled-components';

type GapProps = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

const Gap = styled.div`
  ${(props: GapProps) => props.left && `margin-left: ${props.left}`}
  ${(props: GapProps) => props.right && `margin-right: ${props.right}`}
  ${(props: GapProps) => props.top && `margin-top: ${props.top}`}
  ${(props: GapProps) => props.bottom && `margin-bottom: ${props.bottom}`}
`;

export default Gap;
